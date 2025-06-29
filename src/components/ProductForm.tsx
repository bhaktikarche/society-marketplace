import React, { useState, useEffect } from 'react';
import { Save, X, ImageIcon } from 'lucide-react';
import { Product, CATEGORIES } from '../utils/types';
import { useAuth } from '../contexts/AuthContext';

interface ProductFormProps {
  product?: Product;
  onSave: (
    data: Omit<Product, 'id' | 'sellerId' | 'sellerName' | 'createdAt' | 'updatedAt'>
  ) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({
  product,
  onSave,
  onCancel,
  isLoading = false,
}) => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    title: product?.title ?? '',
    description: product?.description ?? '',
    price: product?.price?.toString() ?? '',
    category: product?.category ?? '',
    imageUrl: product?.imageUrl ?? '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (formData.imageUrl) {
      setImagePreview(formData.imageUrl);
    }
  }, [formData.imageUrl]);

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }

    if (!formData.price) {
      newErrors.price = 'Price is required';
    } else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = 'Price must be a positive number';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (!formData.imageUrl.trim()) {
      newErrors.imageUrl = 'Image URL is required';
    } else if (!isValidUrl(formData.imageUrl)) {
      newErrors.imageUrl = 'Please enter a valid URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string): void => {
    setFormData(prev => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();

    if (!validateForm()) return;

    onSave({
      title: formData.title.trim(),
      description: formData.description.trim(),
      price: Number(formData.price),
      category: formData.category,
      imageUrl: formData.imageUrl.trim(),
    });
  };

  const handleImageError = (): void => {
    setImagePreview(null);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">
          {product ? 'Edit Product' : 'Add New Product'}
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Fill in the details below to {product ? 'update' : 'list'} your product.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Product Title
          </label>
          <input
            id="title"
            type="text"
            className="mt-1 block w-full border rounded-md p-2 text-sm"
            value={formData.title}
            onChange={e => handleInputChange('title', e.target.value)}
          />
          {errors.title && <p className="text-sm text-red-600 mt-1">{errors.title}</p>}
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            rows={4}
            className="mt-1 block w-full border rounded-md p-2 text-sm"
            value={formData.description}
            onChange={e => handleInputChange('description', e.target.value)}
          />
          {errors.description && <p className="text-sm text-red-600 mt-1">{errors.description}</p>}
        </div>

        {/* Price */}
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price (₹)
          </label>
          <input
            id="price"
            type="number"
            className="mt-1 block w-full border rounded-md p-2 text-sm"
            value={formData.price}
            onChange={e => handleInputChange('price', e.target.value)}
          />
          {errors.price && <p className="text-sm text-red-600 mt-1">{errors.price}</p>}
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            id="category"
            className="mt-1 block w-full border rounded-md p-2 text-sm"
            value={formData.category}
            onChange={e => handleInputChange('category', e.target.value)}
          >
            <option value="">Select Category</option>
            {CATEGORIES.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && <p className="text-sm text-red-600 mt-1">{errors.category}</p>}
        </div>

        {/* Image URL */}
        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
            Image URL
          </label>
          <input
            id="imageUrl"
            type="text"
            className="mt-1 block w-full border rounded-md p-2 text-sm"
            value={formData.imageUrl}
            onChange={e => handleInputChange('imageUrl', e.target.value)}
          />
          {errors.imageUrl && <p className="text-sm text-red-600 mt-1">{errors.imageUrl}</p>}
        </div>

        {/* Image Preview */}
        <div className="flex items-center justify-center border border-dashed border-gray-300 rounded-md h-48">
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Preview"
              className="max-h-full object-contain"
              onError={handleImageError}
            />
          ) : (
            <div className="text-gray-400 flex flex-col items-center gap-2">
              <ImageIcon className="w-8 h-8" />
              <p className="text-sm">Image preview will appear here</p>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex items-center gap-1 border border-gray-300 rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <X className="w-4 h-4" />
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center gap-1 bg-indigo-600 text-white px-4 py-2 text-sm font-medium rounded-md hover:bg-indigo-700 transition"
          >
            <Save className="w-4 h-4" />
            {isLoading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
