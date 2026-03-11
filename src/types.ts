export enum GardenStyle {
  ZEN = "Zen",
  ENGLISH_COTTAGE = "English Cottage",
  MODERN = "Modern",
  TROPICAL = "Tropical",
  MEDITERRANEAN = "Mediterranean",
  WILDLIFE_FRIENDLY = "Wildlife Friendly"
}

export enum GardenSize {
  SMALL = "Small (Balcony/Patio)",
  MEDIUM = "Medium (Backyard)",
  LARGE = "Large (Estate)"
}

export enum Climate {
  SUNNY = "Full Sun",
  SHADY = "Full Shade",
  PARTIAL = "Partial Sun/Shade",
  DRY = "Arid/Dry",
  HUMID = "Humid/Tropical"
}

export interface Plant {
  name: string;
  description: string;
  careTips: string;
  imageUrl?: string;
}

export interface GardenLayout {
  title: string;
  description: string;
  zones: {
    name: string;
    description: string;
  }[];
  plants: Plant[];
  overallImageUrl?: string;
}

export interface UserPreferences {
  style: GardenStyle;
  size: GardenSize;
  climate: Climate;
  additionalNotes: string;
}
