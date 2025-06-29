import React from 'react';
import { CATEGORIES } from '../utils/types';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onCategoryChange,
}) => {
  const isSelected = (category: string): boolean => selectedCategory === category;

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-gray-700">Filter by Category</h3>

      <div className="flex flex-wrap gap-2">
        {/* All Categories button */}
        <button
          type="button"
          onClick={() => onCategoryChange('')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            isSelected('')
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          All Categories
        </button>

        {/* Category buttons */}
        {CATEGORIES.map((category) => (
          <button
            type="button"
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              isSelected(category)
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
