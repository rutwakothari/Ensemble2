import React from 'react';
import { Scissors } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm py-4 px-6 sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Scissors className="h-6 w-6 text-pink-400" />
          <h1 className="text-2xl font-bold text-gray-800">Ensemble</h1>
        </div>
        <nav>
          <ul className="flex gap-6">
            <li><a href="#" className="text-gray-600 hover:text-pink-500 transition-colors">My Closet</a></li>
            <li><a href="#" className="text-gray-600 hover:text-pink-500 transition-colors">Outfits</a></li>
            <li><a href="#" className="text-gray-600 hover:text-pink-500 transition-colors">Inspiration</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;