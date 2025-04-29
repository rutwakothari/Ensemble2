import React from 'react';
import { Tag, Trash2 } from 'lucide-react';
import { Clothing } from '../types';

interface ClothingItemProps {
  item: Clothing;
  onDelete: (id: string) => void;
}

const ClothingItem: React.FC<ClothingItemProps> = ({ item, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
      <div className="relative h-64 w-full overflow-hidden bg-gray-100">
        <img 
          src={item.imageUrl} 
          alt={item.name || item.category} 
          className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button 
            onClick={() => onDelete(item.id)}
            className="p-2 bg-white rounded-full shadow-md hover:bg-red-50"
            aria-label="Delete item"
          >
            <Trash2 className="h-4 w-4 text-red-500" />
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-3">
          <div className="flex items-center gap-2">
            <Tag className="h-4 w-4 text-white" />
            <span className="text-white text-sm font-medium">{item.category}</span>
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-medium text-gray-800">{item.name || 'Unnamed Item'}</h3>
        <div className="flex flex-wrap mt-2 gap-2">
          {item.colors.map((color, index) => (
            <span 
              key={index}
              className="inline-block h-4 w-4 rounded-full border border-gray-200"
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClothingItem;