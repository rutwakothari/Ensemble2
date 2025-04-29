import React, { useState } from 'react';
import { Heart, Share2, RefreshCw, Download } from 'lucide-react';
import { Outfit, Clothing } from '../types';

interface OutfitDisplayProps {
  outfit: Outfit;
  onRegenerateOutfit: () => void;
}

const OutfitDisplay: React.FC<OutfitDisplayProps> = ({ outfit, onRegenerateOutfit }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  
  const handleToggleFavorite = () => {
    setIsFavorited(!isFavorited);
  };
  
  const handleShare = () => {
    // In a real app, this would open a share dialog
    alert('Sharing functionality would be implemented here!');
  };
  
  const handleDownload = () => {
    // In a real app, this would generate a downloadable image
    alert('Download functionality would be implemented here!');
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Your Generated Outfit</h2>
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm">
            {outfit.preferences.mood}
          </span>
          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
            {outfit.preferences.occasion}
          </span>
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
            {outfit.preferences.theme}
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-8 rounded-lg flex items-center justify-center">
            <div className="relative flex flex-col items-center space-y-4">
              {outfit.items.map((item) => (
                <ItemImage key={item.id} item={item} />
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-700 mb-3">Outfit Items</h3>
            <ul className="space-y-4">
              {outfit.items.map((item) => (
                <li key={item.id} className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded overflow-hidden bg-gray-100 flex-shrink-0">
                    <img 
                      src={item.imageUrl} 
                      alt={item.name || item.category} 
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{item.name || `${item.category} item`}</p>
                    <p className="text-sm text-gray-500 capitalize">{item.category}</p>
                  </div>
                </li>
              ))}
            </ul>
            
            <div className="mt-8 space-y-4">
              <button
                onClick={onRegenerateOutfit}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 border-2 border-pink-400 text-pink-600 font-medium rounded-md hover:bg-pink-50 focus:outline-none focus:ring-2 focus:ring-pink-300 transition-colors duration-300"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Regenerate Outfit</span>
              </button>
              
              <div className="flex gap-3">
                <button
                  onClick={handleToggleFavorite}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md font-medium transition-colors duration-300 ${
                    isFavorited
                      ? 'bg-pink-500 text-white hover:bg-pink-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Heart className={`h-4 w-4 ${isFavorited ? 'fill-white' : ''}`} />
                  <span>{isFavorited ? 'Saved' : 'Save'}</span>
                </button>
                
                <button
                  onClick={handleShare}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors duration-300"
                >
                  <Share2 className="h-4 w-4" />
                  <span>Share</span>
                </button>
                
                <button
                  onClick={handleDownload}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors duration-300"
                >
                  <Download className="h-4 w-4" />
                  <span>Save Image</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ItemImage: React.FC<{item: Clothing}> = ({ item }) => {
  const getPositionStyles = () => {
    switch (item.category) {
      case 'tops':
        return 'top-0 z-20';
      case 'bottoms':
        return 'top-32 z-10';
      case 'shoes':
        return 'top-64 z-0';
      case 'outerwear':
        return 'top-0 z-30';
      case 'accessories':
        return 'absolute top-0 right-0 z-40 h-12 w-12';
      default:
        return '';
    }
  };

  const getSizeStyles = () => {
    switch (item.category) {
      case 'tops':
        return 'h-40 w-40';
      case 'bottoms':
        return 'h-40 w-32';
      case 'shoes':
        return 'h-20 w-32';
      case 'outerwear':
        return 'h-48 w-48';
      case 'accessories':
        return 'h-12 w-12';
      default:
        return 'h-32 w-32';
    }
  };

  return (
    <div className={`relative ${getPositionStyles()}`}>
      <img 
        src={item.imageUrl} 
        alt={item.name || item.category} 
        className={`${getSizeStyles()} object-contain`}
      />
    </div>
  );
};

export default OutfitDisplay;