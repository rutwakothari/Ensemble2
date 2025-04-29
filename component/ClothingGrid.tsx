import React from 'react';
import ClothingItem from './ClothingItem';
import { Clothing } from '../types';

interface ClothingGridProps {
  items: Clothing[];
  onDelete: (id: string) => void;
  category?: string;
}

const ClothingGrid: React.FC<ClothingGridProps> = ({ items, onDelete, category }) => {
  const filteredItems = category ? items.filter(item => item.category === category) : items;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {filteredItems.length > 0 ? (
        filteredItems.map(item => (
          <ClothingItem key={item.id} item={item} onDelete={onDelete} />
        ))
      ) : (
        <div className="col-span-full py-12 text-center text-gray-500">
          <p>No items found. Add some clothes to your closet!</p>
        </div>
      )}
    </div>
  );
};

export default ClothingGrid;