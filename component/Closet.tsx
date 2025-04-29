import React, { useState } from 'react';
import ClothingGrid from './ClothingGrid';
import { Clothing, ClothingCategory } from '../types';

interface ClosetProps {
  items: Clothing[];
  onDelete: (id: string) => void;
}

const Closet: React.FC<ClosetProps> = ({ items, onDelete }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const categories: {value: string, label: string}[] = [
    { value: 'all', label: 'All Items' },
    { value: 'tops', label: 'Tops' },
    { value: 'bottoms', label: 'Bottoms' },
    { value: 'dresses', label: 'Dresses' },
    { value: 'outerwear', label: 'Outerwear' },
    { value: 'shoes', label: 'Shoes' },
    { value: 'accessories', label: 'Accessories' },
  ];

  return (
    <div>
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">My Closet</h2>
        
        <div className="flex overflow-x-auto py-2 gap-2 no-scrollbar">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors duration-300 ${
                selectedCategory === category.value
                  ? 'bg-pink-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>
      
      <ClothingGrid 
        items={items} 
        onDelete={onDelete}
        category={selectedCategory !== 'all' ? selectedCategory : undefined}
      />
    </div>
  );
};

export default Closet;