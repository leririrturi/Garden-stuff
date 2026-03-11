import React from 'react';
import { GardenLayout, Plant } from '../types';
import { motion } from 'motion/react';
import { Droplets, Info, Map as MapIcon } from 'lucide-react';

interface GardenDisplayProps {
  layout: GardenLayout;
}

export default function GardenDisplay({ layout }: GardenDisplayProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-12 pb-20"
    >
      {/* Hero Section */}
      <section className="relative h-[60vh] rounded-[40px] overflow-hidden shadow-2xl">
        {layout.overallImageUrl ? (
          <img
            src={layout.overallImageUrl}
            alt={layout.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full bg-stone-200 animate-pulse" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-12">
          <div className="max-w-3xl">
            <h2 className="text-5xl md:text-7xl font-serif text-white mb-4 leading-tight">
              {layout.title}
            </h2>
            <p className="text-stone-200 text-lg md:text-xl font-light leading-relaxed">
              {layout.description}
            </p>
          </div>
        </div>
      </section>

      {/* Zones Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {layout.zones.map((zone, idx) => (
          <div key={idx} className="bg-white p-8 rounded-[32px] border border-stone-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-olive-50 rounded-2xl flex items-center justify-center text-[#5A5A40] mb-6">
              <MapIcon size={24} />
            </div>
            <h3 className="text-xl font-serif mb-3 text-stone-800">{zone.name}</h3>
            <p className="text-stone-500 leading-relaxed text-sm">{zone.description}</p>
          </div>
        ))}
      </section>

      {/* Plant Recommendations */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <h3 className="text-3xl font-serif text-stone-800">Curated Flora</h3>
          <div className="h-px flex-1 bg-stone-200 mx-8" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {layout.plants.map((plant, idx) => (
            <PlantCard key={idx} plant={plant} />
          ))}
        </div>
      </section>
    </motion.div>
  );
}

function PlantCard({ plant }: { plant: Plant }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-[32px] overflow-hidden border border-stone-100 shadow-sm group"
    >
      <div className="aspect-square relative overflow-hidden">
        {plant.imageUrl ? (
          <img
            src={plant.imageUrl}
            alt={plant.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full bg-stone-100 animate-pulse" />
        )}
      </div>
      <div className="p-8 space-y-4">
        <h4 className="text-2xl font-serif text-stone-800">{plant.name}</h4>
        <p className="text-stone-500 text-sm leading-relaxed line-clamp-3">
          {plant.description}
        </p>
        <div className="pt-4 border-t border-stone-50 space-y-3">
          <div className="flex items-start gap-3 text-xs text-stone-400">
            <Droplets size={14} className="mt-0.5 text-blue-400" />
            <span>{plant.careTips}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
