import React, { useState } from 'react';
import { Heart, User, Calendar, DollarSign, ShoppingBag } from 'lucide-react';
import { Product } from '../utils/types';
import { useAuth } from '../contexts/AuthContext';
import LocalStorageService from '../utils/localStorage';

interface ProductCardProps {
  product: Product;
  onLikeToggle?: () => void;
  showSellerInfo?: boolean;
}

// Beautiful product card component with hover effects and like functionality
const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onLikeToggle, 
  showSellerInfo = true 
}) => {
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(() => {
    if (!user) return false;
    const likedProducts = LocalStorageService.getLikedProducts(user.id);
    return likedProducts.includes(product.id);
  });
  const [imageError, setImageError] = useState(false);

  const handleLikeToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) return;
    
    const likedProducts = LocalStorageService.getLikedProducts(user.id);
    const newLikedProducts = isLiked 
      ? likedProducts.filter(id => id !== product.id)
      : [...likedProducts, product.id];
    
    LocalStorageService.saveLikedProducts(user.id, newLikedProducts);
    setIsLiked(!isLiked);
    onLikeToggle?.();
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group border border-gray-100">
      {/* Product Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        {!imageError ? (
          <img
            src={product.imageUrl}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center mx-auto mb-2">
                <ShoppingBag className="h-8 w-8" />
              </div>
              <p className="text-sm">Image not available</p>
            </div>
          </div>
        )}
        
        {/* Like Button */}
        {user && (
          <button
            onClick={handleLikeToggle}
            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all duration-200 ${
              isLiked 
                ? 'bg-red-500 text-white shadow-lg scale-110' 
                : 'bg-white/80 text-gray-600 hover:bg-white hover:scale-110'
            }`}
          >
            <Heart 
              className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} 
            />
          </button>
        )}

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-indigo-600 text-white text-xs font-medium px-2 py-1 rounded-full">
            {product.category}
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg text-gray-900 group-hover:text-indigo-700 transition-colors duration-200 line-clamp-2">
            {product.title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-2">
            {product.description}
          </p>
        </div>

        {/* Price */}
        <div className="flex items-center space-x-1 text-2xl font-bold text-indigo-600">
          <DollarSign className="h-5 w-5" />
          <span>{formatPrice(product.price)}</span>
        </div>

        {/* Seller Info and Date */}
        {showSellerInfo && (
          <div className="flex items-center justify-between text-sm text-gray-500 pt-2 border-t border-gray-100">
            <div className="flex items-center space-x-1">
              <User className="h-4 w-4" />
              <span>{product.sellerName}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(product.createdAt)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;