import { GoogleGenAI, Type } from "@google/genai";
import { UserPreferences, GardenLayout, GardenStyle, GardenSize, Climate } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function generateGardenDesign(prefs: UserPreferences): Promise<GardenLayout> {
  const prompt = `
    Design a dream garden based on these preferences:
    Style: ${prefs.style}
    Size: ${prefs.size}
    Climate: ${prefs.climate}
    Additional Notes: ${prefs.additionalNotes}

    Provide a detailed layout title, a general description, a list of functional zones, and a list of 5 specific plants that fit this design.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3.1-pro-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING },
          zones: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                description: { type: Type.STRING }
              },
              required: ["name", "description"]
            }
          },
          plants: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                description: { type: Type.STRING },
                careTips: { type: Type.STRING }
              },
              required: ["name", "description", "careTips"]
            }
          }
        },
        required: ["title", "description", "zones", "plants"]
      }
    }
  });

  return JSON.parse(response.text);
}

export async function generateGardenImage(layout: GardenLayout, prefs: UserPreferences): Promise<string> {
  const prompt = `A high-quality, professional landscape design visualization of a ${prefs.style} garden. 
    Size: ${prefs.size}. Climate: ${prefs.climate}. 
    Features: ${layout.zones.map(z => z.name).join(", ")}. 
    Vibe: ${layout.description}. 
    Photorealistic, architectural render, lush greenery, beautiful lighting.`;

  const response = await ai.models.generateContent({
    model: "gemini-3.1-flash-image-preview",
    contents: [{ text: prompt }],
    config: {
      imageConfig: {
        aspectRatio: "16:9",
        imageSize: "1K"
      }
    }
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  throw new Error("No image generated");
}

export async function generatePlantImage(plantName: string, gardenStyle: string): Promise<string> {
  const prompt = `A professional botanical close-up photo of a ${plantName} in a ${gardenStyle} garden setting. 
    Natural lighting, high detail, vibrant colors, shallow depth of field.`;

  const response = await ai.models.generateContent({
    model: "gemini-3.1-flash-image-preview",
    contents: [{ text: prompt }],
    config: {
      imageConfig: {
        aspectRatio: "1:1",
        imageSize: "1K"
      }
    }
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  throw new Error("No image generated");
}
