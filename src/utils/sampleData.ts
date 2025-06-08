import { Product, User } from './types';

// Sample users for the marketplace
export const SAMPLE_USERS: User[] = [
  {
    id: '1',
    email: 'john.doe@example.com',
    name: 'John Doe',
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    email: 'sarah.wilson@example.com',
    name: 'Sarah Wilson',
    createdAt: '2024-01-20T14:15:00Z'
  },
  {
    id: '3',
    email: 'mike.chen@example.com',
    name: 'Mike Chen',
    createdAt: '2024-01-25T09:45:00Z'
  },
  {
    id: '4',
    email: 'emma.garcia@example.com',
    name: 'Emma Garcia',
    createdAt: '2024-02-01T16:20:00Z'
  }
];

// Sample products for the marketplace
export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'MacBook Pro 14" M3 Chip',
    description: 'Barely used MacBook Pro with M3 chip, 16GB RAM, 512GB SSD. Perfect for developers and creative professionals. Includes original charger and box.',
    price: 1899.99,
    category: 'Electronics',
    imageUrl: 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=800',
    sellerId: '1',
    sellerName: 'John Doe',
    createdAt: '2024-02-15T10:30:00Z',
    updatedAt: '2024-02-15T10:30:00Z'
  },
  {
    id: '2',
    title: 'Vintage Leather Sofa',
    description: 'Beautiful vintage brown leather sofa in excellent condition. 3-seater, very comfortable. Perfect for living room or office space.',
    price: 650.00,
    category: 'Furniture',
    imageUrl: 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=800',
    sellerId: '2',
    sellerName: 'Sarah Wilson',
    createdAt: '2024-02-14T14:15:00Z',
    updatedAt: '2024-02-14T14:15:00Z'
  },
  {
    id: '3',
    title: 'iPhone 15 Pro Max',
    description: 'Brand new iPhone 15 Pro Max, 256GB, Natural Titanium. Still in original packaging, never used. Selling due to upgrade.',
    price: 1099.99,
    category: 'Electronics',
    imageUrl: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=800',
    sellerId: '3',
    sellerName: 'Mike Chen',
    createdAt: '2024-02-13T09:45:00Z',
    updatedAt: '2024-02-13T09:45:00Z'
  },
  {
    id: '4',
    title: 'Designer Winter Coat',
    description: 'Elegant black wool winter coat from premium brand. Size M, worn only a few times. Perfect for professional settings.',
    price: 180.00,
    category: 'Clothing',
    imageUrl: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800',
    sellerId: '4',
    sellerName: 'Emma Garcia',
    createdAt: '2024-02-12T16:20:00Z',
    updatedAt: '2024-02-12T16:20:00Z'
  },
  {
    id: '5',
    title: 'Professional Camera Kit',
    description: 'Canon EOS R6 Mark II with 24-70mm lens, extra batteries, memory cards, and carrying case. Perfect for photography enthusiasts.',
    price: 2299.99,
    category: 'Electronics',
    imageUrl: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=800',
    sellerId: '1',
    sellerName: 'John Doe',
    createdAt: '2024-02-11T11:00:00Z',
    updatedAt: '2024-02-11T11:00:00Z'
  },
  {
    id: '6',
    title: 'Modern Coffee Table',
    description: 'Sleek glass-top coffee table with wooden legs. Minimalist design, perfect for modern living spaces. Excellent condition.',
    price: 220.00,
    category: 'Furniture',
    imageUrl: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
    sellerId: '2',
    sellerName: 'Sarah Wilson',
    createdAt: '2024-02-10T13:30:00Z',
    updatedAt: '2024-02-10T13:30:00Z'
  },
  {
    id: '7',
    title: 'Programming Books Collection',
    description: 'Collection of 15 programming books including Clean Code, Design Patterns, and JavaScript guides. Great for developers.',
    price: 120.00,
    category: 'Books',
    imageUrl: 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=800',
    sellerId: '3',
    sellerName: 'Mike Chen',
    createdAt: '2024-02-09T15:45:00Z',
    updatedAt: '2024-02-09T15:45:00Z'
  },
  {
    id: '8',
    title: 'Mountain Bike',
    description: 'Trek mountain bike, 21-speed, aluminum frame. Great for trails and city riding. Recently serviced with new tires.',
    price: 450.00,
    category: 'Sports',
    imageUrl: 'https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&w=800',
    sellerId: '4',
    sellerName: 'Emma Garcia',
    createdAt: '2024-02-08T12:15:00Z',
    updatedAt: '2024-02-08T12:15:00Z'
  },
  {
    id: '9',
    title: 'Garden Tool Set',
    description: 'Complete garden tool set with shovel, rake, pruning shears, and more. Perfect for gardening enthusiasts. Barely used.',
    price: 85.00,
    category: 'Home & Garden',
    imageUrl: 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=800',
    sellerId: '1',
    sellerName: 'John Doe',
    createdAt: '2024-02-07T10:00:00Z',
    updatedAt: '2024-02-07T10:00:00Z'
  },
  {
    id: '10',
    title: 'Wireless Headphones',
    description: 'Sony WH-1000XM5 noise-canceling headphones. Excellent sound quality, comfortable for long use. Includes case and cables.',
    price: 280.00,
    category: 'Electronics',
    imageUrl: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800',
    sellerId: '2',
    sellerName: 'Sarah Wilson',
    createdAt: '2024-02-06T14:30:00Z',
    updatedAt: '2024-02-06T14:30:00Z'
  },
  {
    id: '11',
    title: 'Dining Table Set',
    description: 'Solid wood dining table with 4 chairs. Perfect for small families. Well-maintained and sturdy construction.',
    price: 380.00,
    category: 'Furniture',
    imageUrl: 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=800',
    sellerId: '3',
    sellerName: 'Mike Chen',
    createdAt: '2024-02-05T16:45:00Z',
    updatedAt: '2024-02-05T16:45:00Z'
  },
  {
    id: '12',
    title: 'Yoga Mat & Accessories',
    description: 'Premium yoga mat with blocks, strap, and carrying bag. Perfect for home workouts or studio classes. Like new condition.',
    price: 65.00,
    category: 'Sports',
    imageUrl: 'https://images.pexels.com/photos/3822906/pexels-photo-3822906.jpeg?auto=compress&cs=tinysrgb&w=800',
    sellerId: '4',
    sellerName: 'Emma Garcia',
    createdAt: '2024-02-04T11:20:00Z',
    updatedAt: '2024-02-04T11:20:00Z'
  }
];

// Function to initialize sample data in localStorage
export const initializeSampleData = () => {
  // Check if data already exists
  const existingProducts = localStorage.getItem('products');
  const existingUsers = localStorage.getItem('users');
  
  // Only initialize if no data exists
  if (!existingProducts) {
    localStorage.setItem('products', JSON.stringify(SAMPLE_PRODUCTS));
  }
  
  if (!existingUsers) {
    localStorage.setItem('users', JSON.stringify(SAMPLE_USERS));
  }
  
  // Add some sample liked products for demonstration
  const existingLikedProducts = localStorage.getItem('likedProducts');
  if (!existingLikedProducts) {
    const sampleLikedProducts = {
      '1': ['3', '5', '10'], // John likes iPhone, Camera, and Headphones
      '2': ['1', '7', '8'],  // Sarah likes MacBook, Books, and Bike
      '3': ['2', '4', '12'], // Mike likes Sofa, Coat, and Yoga Mat
      '4': ['1', '6', '9']   // Emma likes MacBook, Coffee Table, and Garden Tools
    };
    localStorage.setItem('likedProducts', JSON.stringify(sampleLikedProducts));
  }
};