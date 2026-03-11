import React from 'react';
import { UserPreferences, GardenStyle, GardenSize, Climate } from '../types';
import { Leaf, Ruler, Sun, MessageSquare } from 'lucide-react';

interface GardenFormProps {
  onSubmit: (prefs: UserPreferences) => void;
  isLoading: boolean;
}

export default function GardenForm({ onSubmit, isLoading }: GardenFormProps) {
  const [prefs, setPrefs] = React.useState<UserPreferences>({
    style: GardenStyle.ENGLISH_COTTAGE,
    size: GardenSize.MEDIUM,
    climate: Climate.SUNNY,
    additionalNotes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(prefs);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-[32px] shadow-sm border border-stone-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Style Selection */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-stone-500 text-sm font-medium uppercase tracking-wider">
            <Leaf size={16} /> Garden Style
          </label>
          <select
            value={prefs.style}
            onChange={(e) => setPrefs({ ...prefs, style: e.target.value as GardenStyle })}
            className="w-full p-4 bg-stone-50 border-none rounded-2xl focus:ring-2 focus:ring-olive-600 transition-all appearance-none cursor-pointer"
          >
            {Object.values(GardenStyle).map((style) => (
              <option key={style} value={style}>{style}</option>
            ))}
          </select>
        </div>

        {/* Size Selection */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-stone-500 text-sm font-medium uppercase tracking-wider">
            <Ruler size={16} /> Garden Size
          </label>
          <select
            value={prefs.size}
            onChange={(e) => setPrefs({ ...prefs, size: e.target.value as GardenSize })}
            className="w-full p-4 bg-stone-50 border-none rounded-2xl focus:ring-2 focus:ring-olive-600 transition-all appearance-none cursor-pointer"
          >
            {Object.values(GardenSize).map((size) => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>

        {/* Climate Selection */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-stone-500 text-sm font-medium uppercase tracking-wider">
            <Sun size={16} /> Climate
          </label>
          <select
            value={prefs.climate}
            onChange={(e) => setPrefs({ ...prefs, climate: e.target.value as Climate })}
            className="w-full p-4 bg-stone-50 border-none rounded-2xl focus:ring-2 focus:ring-olive-600 transition-all appearance-none cursor-pointer"
          >
            {Object.values(Climate).map((climate) => (
              <option key={climate} value={climate}>{climate}</option>
            ))}
          </select>
        </div>

        {/* Additional Notes */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-stone-500 text-sm font-medium uppercase tracking-wider">
            <MessageSquare size={16} /> Special Requests
          </label>
          <input
            type="text"
            placeholder="e.g. 'I love lavender', 'Needs a water feature'"
            value={prefs.additionalNotes}
            onChange={(e) => setPrefs({ ...prefs, additionalNotes: e.target.value })}
            className="w-full p-4 bg-stone-50 border-none rounded-2xl focus:ring-2 focus:ring-olive-600 transition-all"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-4 bg-[#5A5A40] text-white rounded-full font-medium tracking-wide hover:bg-[#4A4A30] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-olive-900/10"
      >
        {isLoading ? 'Cultivating your design...' : 'Generate Dream Garden'}
      </button>
    </form>
  );
}
