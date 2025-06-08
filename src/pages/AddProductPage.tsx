import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import ProductForm from '../components/ProductForm';
import { Product } from '../utils/types';
import LocalStorageService from '../utils/localStorage';

// Page for adding new products with form handling
const AddProductPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSave = async (productData: Omit<Product, 'id' | 'sellerId' | 'sellerName' | 'createdAt' | 'updatedAt'>) => {
    if (!user) return;

    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newProduct: Product = {
        ...productData,
        id: Date.now().toString(),
        sellerId: user.id,
        sellerName: user.name,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const products = LocalStorageService.getProducts();
      products.push(newProduct);
      LocalStorageService.saveProducts(products);

      navigate('/my-listings');
    } catch (error) {
      console.error('Failed to save product:', error);
      // In a real app, show error notification
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
          <p className="mt-2 text-gray-600">
            Fill in the details below to list your product in the marketplace.
          </p>
        </div>

        <ProductForm
          onSave={handleSave}
          onCancel={handleCancel}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default AddProductPage;