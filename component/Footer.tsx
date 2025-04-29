import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 py-8 px-6 mt-auto">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-pink-400" />
            <p className="text-gray-600">Made for fashion lovers</p>
          </div>
          <div className="flex gap-8">
            <a href="#" className="text-gray-600 hover:text-pink-500 transition-colors">About</a>
            <a href="#" className="text-gray-600 hover:text-pink-500 transition-colors">Privacy</a>
            <a href="#" className="text-gray-600 hover:text-pink-500 transition-colors">Terms</a>
            <a href="#" className="text-gray-600 hover:text-pink-500 transition-colors">Contact</a>
          </div>
        </div>
        <div className="text-center mt-6 text-gray-500 text-sm">
          © {new Date().getFullYear()} Ensemble. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;