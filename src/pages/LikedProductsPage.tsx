import React, { useState, useEffect, useMemo } from 'react';
import { Heart, ShoppingBag } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import { Product } from '../utils/types';
import { useAuth } from '../contexts/AuthContext';
import LocalStorageService from '../utils/localStorage';

// Page to display liked/favorited products
const LikedProductsPage: React.FC = () => {
  const { user } = useAuth();
  const [likedProducts, setLikedProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Load liked products from storage
  useEffect(() => {
    if (!user) return;

    const loadLikedProducts = () => {
      try {
        const likedIds = LocalStorageService.getLikedProducts(user.id);
        const allProducts = LocalStorageService.getProducts();
        const filtered = allProducts.filter(product => likedIds.includes(product.id));
        setLikedProducts(filtered);
      } catch (error) {
        console.error('Error loading liked products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadLikedProducts();
  }, [user]);

  // Filter products based on search and category
  const filteredProducts = useMemo(() => {
    return likedProducts.filter(product => {
      const matchesSearch =
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === '' || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [likedProducts, searchTerm, selectedCategory]);

  // Refresh liked products after toggling like
  const handleLikeToggle = () => {
    if (!user) return;
    const likedIds = LocalStorageService.getLikedProducts(user.id);
    const allProducts = LocalStorageService.getProducts();
    const updated = allProducts.filter(product => likedIds.includes(product.id));
    setLikedProducts(updated);
  };

  // Show loading spinner
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500 mx-auto" />
          <p className="mt-4 text-gray-600">Loading your liked products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="flex items-center justify-center mb-4">
            <Heart className="h-12 w-12 mr-3 fill-current" />
            <h1 className="text-4xl md:text-6xl font-bold">Liked Products</h1>
          </div>
          <p className="text-xl md:text-2xl text-pink-100 mb-8 max-w-3xl mx-auto">
            Your favorite products from the marketplace. Keep track of items you love!
          </p>
          {likedProducts.length > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto">
              <SearchBar
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder="Search your liked products..."
              />
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {likedProducts.length > 0 && (
          <>
            <div className="mb-8">
              <CategoryFilter
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
            </div>
            <div className="mb-6 text-gray-600">
              {filteredProducts.length === likedProducts.length
                ? `Showing all ${likedProducts.length} liked products`
                : `Showing ${filteredProducts.length} of ${likedProducts.length} liked products`}
              {searchTerm && ` matching "${searchTerm}"`}
              {selectedCategory && ` in ${selectedCategory}`}
            </div>
          </>
        )}

        {/* Product Grid or Empty State */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onLikeToggle={handleLikeToggle}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              {likedProducts.length === 0 ? (
                <>
                  <Heart className="h-24 w-24 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No Liked Products Yet
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Start exploring the marketplace and like products you're interested in!
                  </p>
                </>
              ) : (
                <>
                  <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No Products Found
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Try adjusting your search or filter criteria to find what you're looking for.
                  </p>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('');
                    }}
                    className="text-pink-600 hover:text-pink-700 font-medium"
                  >
                    Clear all filters
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LikedProductsPage;
