import React, { useState } from 'react';
import { Sparkles, ChevronRight } from 'lucide-react';
import { OutfitPreferences } from '../types';

interface PreferenceFormProps {
  onSubmit: (preferences: OutfitPreferences) => void;
}

const PreferenceForm: React.FC<PreferenceFormProps> = ({ onSubmit }) => {
  const [mood, setMood] = useState<string>('');
  const [occasion, setOccasion] = useState<string>('');
  const [theme, setTheme] = useState<string>('');
  const [colors, setColors] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const colorOptions = [
    { name: 'Black', value: '#000000' },
    { name: 'White', value: '#FFFFFF' },
    { name: 'Gray', value: '#808080' },
    { name: 'Red', value: '#FF0000' },
    { name: 'Pink', value: '#FFC0CB' },
    { name: 'Blue', value: '#0000FF' },
    { name: 'Navy', value: '#000080' },
    { name: 'Green', value: '#008000' },
    { name: 'Yellow', value: '#FFFF00' },
    { name: 'Purple', value: '#800080' },
    { name: 'Orange', value: '#FFA500' },
    { name: 'Brown', value: '#A52A2A' },
  ];

  const handleColorToggle = (colorValue: string) => {
    setColors(prevColors => 
      prevColors.includes(colorValue)
        ? prevColors.filter(c => c !== colorValue)
        : [...prevColors, colorValue]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    
    const preferences: OutfitPreferences = {
      mood,
      occasion,
      theme,
      colors
    };
    
    // Simulate processing delay
    setTimeout(() => {
      onSubmit(preferences);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Generate Outfit</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div>
            <label htmlFor="mood" className="block text-sm font-medium text-gray-700 mb-1">
              Mood
            </label>
            <select
              id="mood"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300"
            >
              <option value="">Select mood</option>
              <option value="casual">Casual</option>
              <option value="playful">Playful</option>
              <option value="elegant">Elegant</option>
              <option value="bold">Bold</option>
              <option value="minimalist">Minimalist</option>
              <option value="romantic">Romantic</option>
              <option value="confident">Confident</option>
              <option value="relaxed">Relaxed</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="occasion" className="block text-sm font-medium text-gray-700 mb-1">
              Occasion
            </label>
            <select
              id="occasion"
              value={occasion}
              onChange={(e) => setOccasion(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300"
            >
              <option value="">Select occasion</option>
              <option value="workday">Workday</option>
              <option value="date">Date</option>
              <option value="weekend">Weekend</option>
              <option value="party">Party</option>
              <option value="formal">Formal Event</option>
              <option value="outdoor">Outdoor Activity</option>
              <option value="workout">Workout</option>
              <option value="travel">Travel</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="theme" className="block text-sm font-medium text-gray-700 mb-1">
              Theme
            </label>
            <select
              id="theme"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300"
            >
              <option value="">Select theme</option>
              <option value="streetwear">Streetwear</option>
              <option value="bohemian">Bohemian</option>
              <option value="vintage">Vintage</option>
              <option value="athleisure">Athleisure</option>
              <option value="business">Business</option>
              <option value="preppy">Preppy</option>
              <option value="grunge">Grunge</option>
              <option value="minimalist">Minimalist</option>
            </select>
          </div>
          
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-2">
              Color Preferences
            </span>
            <div className="flex flex-wrap gap-2">
              {colorOptions.map((color) => (
                <button
                  key={color.value}
                  type="button"
                  onClick={() => handleColorToggle(color.value)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-colors ${
                    colors.includes(color.value)
                      ? 'bg-pink-100 border-2 border-pink-300'
                      : 'bg-gray-100 border-2 border-transparent hover:bg-gray-200'
                  }`}
                >
                  <span 
                    className="inline-block h-3 w-3 rounded-full border border-gray-300"
                    style={{ backgroundColor: color.value }}
                  />
                  <span>{color.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <button
            type="submit"
            disabled={!mood || !occasion || !theme || isGenerating}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-pink-400 to-purple-500 text-white font-medium rounded-md hover:from-pink-500 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-pink-300 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-300"
          >
            {isGenerating ? (
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full border-t-2 border-r-2 border-white animate-spin" />
                <span>Generating your outfit...</span>
              </div>
            ) : (
              <>
                <Sparkles className="h-5 w-5" />
                <span>Generate Outfit</span>
                <ChevronRight className="h-5 w-5" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PreferenceForm;