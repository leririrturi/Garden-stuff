import React from 'react';
import { UserPreferences, GardenLayout } from './types';
import { generateGardenDesign, generateGardenImage, generatePlantImage } from './services/geminiService';
import GardenForm from './components/GardenForm';
import GardenDisplay from './components/GardenDisplay';
import { motion, AnimatePresence } from 'motion/react';
import { Sprout } from 'lucide-react';

export default function App() {
  const [layout, setLayout] = React.useState<GardenLayout | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleGenerate = async (prefs: UserPreferences) => {
    setIsLoading(true);
    setError(null);
    try {
      // 1. Generate text layout
      const newLayout = await generateGardenDesign(prefs);
      setLayout(newLayout);

      // 2. Generate overall garden image
      const overallImage = await generateGardenImage(newLayout, prefs);
      setLayout(prev => prev ? { ...prev, overallImageUrl: overallImage } : null);

      // 3. Generate plant images (sequentially to avoid rate limits/concurrency issues if any)
      for (let i = 0; i < newLayout.plants.length; i++) {
        const plant = newLayout.plants[i];
        try {
          const plantImage = await generatePlantImage(plant.name, prefs.style);
          setLayout(prev => {
            if (!prev) return null;
            const updatedPlants = [...prev.plants];
            updatedPlants[i] = { ...updatedPlants[i], imageUrl: plantImage };
            return { ...prev, plants: updatedPlants };
          });
        } catch (err) {
          console.error(`Failed to generate image for ${plant.name}`, err);
        }
      }
    } catch (err) {
      console.error(err);
      setError('The soil seems a bit dry. Please try generating your garden again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F0] text-stone-900 font-sans selection:bg-olive-200">
      {/* Navigation */}
      <nav className="p-8 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#5A5A40] rounded-full flex items-center justify-center text-white">
            <Sprout size={20} />
          </div>
          <h1 className="text-2xl font-serif tracking-tight">Garden Dreamer</h1>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium uppercase tracking-widest text-stone-400">
          <a href="#" className="hover:text-stone-600 transition-colors">Inspiration</a>
          <a href="#" className="hover:text-stone-600 transition-colors">Journal</a>
          <a href="#" className="hover:text-stone-600 transition-colors">Community</a>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-8 py-12 space-y-20">
        {/* Header Section */}
        <section className="max-w-3xl space-y-6">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-6xl md:text-8xl font-serif leading-[0.9] tracking-tighter text-stone-800"
          >
            Cultivate your <br />
            <span className="italic text-[#5A5A40]">sanctuary.</span>
          </motion.h2>
          <p className="text-xl text-stone-500 font-light leading-relaxed">
            Describe your ideal landscape, and let our AI-driven design engine 
            bring your botanical vision to life with custom layouts and curated flora.
          </p>
        </section>

        {/* Input Section */}
        <section id="design-form">
          <GardenForm onSubmit={handleGenerate} isLoading={isLoading} />
        </section>

        {/* Results Section */}
        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-6 bg-red-50 text-red-600 rounded-3xl text-center font-medium"
            >
              {error}
            </motion.div>
          )}

          {layout && (
            <GardenDisplay layout={layout} />
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-8 py-12 border-t border-stone-200 flex flex-col md:flex-row justify-between items-center gap-8 text-stone-400 text-xs uppercase tracking-widest">
        <p>© 2026 Garden Dreamer Studio</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-stone-600 transition-colors">Privacy</a>
          <a href="#" className="hover:text-stone-600 transition-colors">Terms</a>
          <a href="#" className="hover:text-stone-600 transition-colors">Contact</a>
        </div>
      </footer>
    </div>
  );
}
