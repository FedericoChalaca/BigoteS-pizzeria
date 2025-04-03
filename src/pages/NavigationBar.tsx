// Archivo: NavigationBar.tsx
import React from 'react';

interface NavigationBarProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({
  categories,
  activeCategory,
  onCategoryChange,
 
}) => {
  return (
    <nav className="bg-amber-800 text-white py-4 px-6 flex justify-between items-center">
      {/* Categorías */}
      <div className="flex space-x-6">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`text-sm font-semibold uppercase tracking-wider ${
              activeCategory === category ? 'text-withe-400 border-b-2 border-white-400' : 'text-gray-300 hover:text-white'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

    </nav>
  );
};

export default NavigationBar;