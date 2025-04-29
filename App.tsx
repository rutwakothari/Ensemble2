import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import UploadForm from './components/UploadForm';
import Closet from './components/Closet';
import PreferenceForm from './components/PreferenceForm';
import OutfitDisplay from './components/OutfitDisplay';
import { Clothing, Outfit, OutfitPreferences } from './types';
import { sampleClothingItems } from './data/sampleData';
import { generateOutfit, canGenerateOutfit } from './utils/outfitGenerator';
import { Sparkles, Upload, AlertTriangle } from 'lucide-react';

const STORAGE_KEY = 'ensemble_clothing_items';

function App() {
  const [activeTab, setActiveTab] = useState<'closet' | 'generate'>('closet');
  const [clothingItems, setClothingItems] = useState<Clothing[]>(() => {
    const savedItems = localStorage.getItem(STORAGE_KEY);
    return savedItems ? JSON.parse(savedItems) : sampleClothingItems;
  });
  const [generatedOutfit, setGeneratedOutfit] = useState<Outfit | null>(null);
  const [showEmptyState, setShowEmptyState] = useState(false);

  useEffect(() => {
    // Save to localStorage whenever clothingItems changes
    localStorage.setItem(STORAGE_KEY, JSON.stringify(clothingItems));
    // Check if we have enough items to generate an outfit
    setShowEmptyState(!canGenerateOutfit(clothingItems));
  }, [clothingItems]);

  const handleAddItem = (newItem: Clothing) => {
    setClothingItems([newItem, ...clothingItems]);
  };

  const handleDeleteItem = (id: string) => {
    setClothingItems(clothingItems.filter(item => item.id !== id));
  };

  const handleGenerateOutfit = (preferences: OutfitPreferences) => {
    const outfit = generateOutfit(clothingItems, preferences);
    setGeneratedOutfit(outfit);
  };

  const handleRegenerateOutfit = () => {
    if (generatedOutfit) {
      const newOutfit = generateOutfit(clothingItems, generatedOutfit.preferences);
      setGeneratedOutfit(newOutfit);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-center">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              onClick={() => setActiveTab('closet')}
              className={`px-6 py-2.5 rounded-l-lg text-sm font-medium transition-colors duration-300 ${
                activeTab === 'closet'
                  ? 'bg-pink-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                <span>My Closet</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('generate')}
              className={`px-6 py-2.5 rounded-r-lg text-sm font-medium transition-colors duration-300 ${
                activeTab === 'generate'
                  ? 'bg-pink-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              disabled={showEmptyState}
            >
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                <span>Generate Outfit</span>
              </div>
            </button>
          </div>
        </div>
        
        {activeTab === 'closet' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <UploadForm onAddItem={handleAddItem} />
            </div>
            <div className="lg:col-span-2">
              <Closet items={clothingItems} onDelete={handleDeleteItem} />
            </div>
          </div>
        )}

        {activeTab === 'generate' && (
          <>
            {showEmptyState ? (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <div className="flex justify-center mb-4">
                  <AlertTriangle className="h-12 w-12 text-amber-500" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Not Enough Items</h2>
                <p className="text-gray-600 mb-6">
                  You need at least one top and one bottom (or a dress) to generate an outfit.
                </p>
                <button
                  onClick={() => setActiveTab('closet')}
                  className="px-6 py-2.5 bg-pink-500 text-white rounded-md font-medium hover:bg-pink-600 transition-colors duration-300"
                >
                  Add Items to Your Closet
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                  <PreferenceForm onSubmit={handleGenerateOutfit} />
                </div>
                <div className="lg:col-span-2">
                  {generatedOutfit ? (
                    <OutfitDisplay 
                      outfit={generatedOutfit} 
                      onRegenerateOutfit={handleRegenerateOutfit} 
                    />
                  ) : (
                    <div className="bg-white rounded-lg shadow-md p-12 text-center h-full flex flex-col items-center justify-center">
                      <Sparkles className="h-12 w-12 text-pink-400 mb-4" />
                      <h2 className="text-xl font-semibold text-gray-800 mb-2">Ready to Create Your Outfit</h2>
                      <p className="text-gray-600 max-w-md mx-auto">
                        Set your preferences on the left to generate a personalized outfit from your closet items.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;