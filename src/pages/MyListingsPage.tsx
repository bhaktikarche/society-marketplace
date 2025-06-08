import React, { useState, useEffect } from 'react';
import { Edit, Trash2, Plus, Package } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import ProductCard from '../components/ProductCard';
import ProductForm from '../components/ProductForm';
import { Product } from '../utils/types';
import LocalStorageService from '../utils/localStorage';

// Page for managing user's product listings
const MyListingsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { user } = useAuth();

  // Load user's products
  useEffect(() => {
    if (!user) return;

    const loadProducts = () => {
      try {
        const allProducts = LocalStorageService.getProducts();
        const userProducts = allProducts.filter(product => product.sellerId === user.id);
        setProducts(userProducts);
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, [user]);

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
  };

  const handleDelete = async (productId: string) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      const allProducts = LocalStorageService.getProducts();
      const updatedProducts = allProducts.filter(product => product.id !== productId);
      LocalStorageService.saveProducts(updatedProducts);
      
      setProducts(prev => prev.filter(product => product.id !== productId));
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  const handleSave = async (productData: Omit<Product, 'id' | 'sellerId' | 'sellerName' | 'createdAt' | 'updatedAt'>) => {
    if (!user || !editingProduct) return;

    setIsSaving(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedProduct: Product = {
        ...editingProduct,
        ...productData,
        updatedAt: new Date().toISOString()
      };

      const allProducts = LocalStorageService.getProducts();
      const productIndex = allProducts.findIndex(p => p.id === editingProduct.id);
      
      if (productIndex !== -1) {
        allProducts[productIndex] = updatedProduct;
        LocalStorageService.saveProducts(allProducts);
        
        setProducts(prev => prev.map(p => p.id === editingProduct.id ? updatedProduct : p));
        setEditingProduct(null);
      }
    } catch (error) {
      console.error('Failed to update product:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setEditingProduct(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your listings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Listings</h1>
            <p className="mt-2 text-gray-600">
              Manage your products and track your sales
            </p>
          </div>
          <Link
            to="/add"
            className="mt-4 sm:mt-0 inline-flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-200 shadow-sm"
          >
            <Plus className="h-4 w-4" />
            <span>Add Product</span>
          </Link>
        </div>

        {/* Edit Form */}
        {editingProduct && (
          <div className="mb-8">
            <ProductForm
              product={editingProduct}
              onSave={handleSave}
              onCancel={handleCancel}
              isLoading={isSaving}
            />
          </div>
        )}

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="relative group">
                <ProductCard
                  product={product}
                  showSellerInfo={false}
                />
                
                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button
                    onClick={() => handleEdit(product)}
                    className="p-2 bg-white rounded-full shadow-lg hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                    title="Edit product"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="p-2 bg-white rounded-full shadow-lg hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
                    title="Delete product"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Package className="h-24 w-24 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Products Listed</h3>
            <p className="text-gray-500 mb-6">
              Start by adding your first product to the marketplace!
            </p>
            <Link
              to="/add"
              className="inline-flex items-center space-x-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-200 shadow-sm"
            >
              <Plus className="h-5 w-5" />
              <span>Add Your First Product</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyListingsPage;