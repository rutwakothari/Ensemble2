import React, { useState, useRef } from 'react';
import { Upload, X, Camera, Loader2 } from 'lucide-react';
import { Clothing, ClothingCategory } from '../types';

interface UploadFormProps {
  onAddItem: (newItem: Clothing) => void;
}

const UploadForm: React.FC<UploadFormProps> = ({ onAddItem }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [category, setCategory] = useState<ClothingCategory | ''>('');
  const [colors, setColors] = useState<string[]>(['#000000']);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleColorChange = (index: number, value: string) => {
    const updatedColors = [...colors];
    updatedColors[index] = value;
    setColors(updatedColors);
  };

  const addColorField = () => {
    setColors([...colors, '#000000']);
  };

  const removeColorField = (index: number) => {
    if (colors.length > 1) {
      const updatedColors = colors.filter((_, i) => i !== index);
      setColors(updatedColors);
    }
  };

  const resetForm = () => {
    setPreviewUrl(null);
    setName('');
    setCategory('');
    setColors(['#000000']);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!previewUrl || !category) return;
    
    setIsUploading(true);
    
    // Simulate upload delay
    setTimeout(() => {
      const newItem: Clothing = {
        id: Date.now().toString(),
        name,
        category: category as ClothingCategory,
        colors,
        imageUrl: previewUrl
      };
      
      onAddItem(newItem);
      resetForm();
      setIsUploading(false);
    }, 1500);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Add to Your Closet</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          {previewUrl ? (
            <div className="relative h-64 rounded-lg overflow-hidden bg-gray-100">
              <img 
                src={previewUrl} 
                alt="Preview" 
                className="w-full h-full object-cover object-center"
              />
              <button
                type="button"
                onClick={() => setPreviewUrl(null)}
                className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
                aria-label="Remove image"
              >
                <X className="h-4 w-4 text-gray-600" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors duration-300"
              onClick={() => fileInputRef.current?.click()}>
              <Camera className="h-8 w-8 text-gray-400 mb-2" />
              <p className="text-gray-600 text-center">
                <span className="font-medium text-pink-500">Upload an image</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500 mt-1">PNG, JPG or WEBP (max. 5MB)</p>
            </div>
          )}
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Item Name (Optional)
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="E.g., Blue Jeans, White T-shirt"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300"
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category*
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value as ClothingCategory)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300"
            >
              <option value="">Select category</option>
              <option value="tops">Tops</option>
              <option value="bottoms">Bottoms</option>
              <option value="dresses">Dresses</option>
              <option value="outerwear">Outerwear</option>
              <option value="shoes">Shoes</option>
              <option value="accessories">Accessories</option>
            </select>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Colors
          </label>
          <div className="space-y-2">
            {colors.map((color, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => handleColorChange(index, e.target.value)}
                  className="h-8 w-8 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={color}
                  onChange={(e) => handleColorChange(index, e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded-md flex-1 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300"
                />
                {colors.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeColorField(index)}
                    className="p-1 text-red-500 hover:bg-red-50 rounded-full"
                    aria-label="Remove color"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addColorField}
              className="text-sm flex items-center gap-1 text-pink-500 hover:text-pink-600 font-medium"
            >
              <span>+ Add another color</span>
            </button>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!previewUrl || !category || isUploading}
            className="flex items-center gap-2 px-4 py-2 bg-pink-400 text-white rounded-md hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-300 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-300"
          >
            {isUploading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Uploading...</span>
              </>
            ) : (
              <>
                <Upload className="h-4 w-4" />
                <span>Add to Closet</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadForm;