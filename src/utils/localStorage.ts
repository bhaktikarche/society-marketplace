import { User, Product } from './types';

// Local Storage utility functions with error handling
class LocalStorageService {
  // User management
  static saveUser(user: User): void {
    try {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } catch (error) {
      console.error('Failed to save user to localStorage:', error);
    }
  }

  static getCurrentUser(): User | null {
    try {
      const user = localStorage.getItem('currentUser');
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Failed to get current user from localStorage:', error);
      return null;
    }
  }

  static removeCurrentUser(): void {
    try {
      localStorage.removeItem('currentUser');
    } catch (error) {
      console.error('Failed to remove current user from localStorage:', error);
    }
  }

  // Users database
  static saveUsers(users: User[]): void {
    try {
      localStorage.setItem('users', JSON.stringify(users));
    } catch (error) {
      console.error('Failed to save users to localStorage:', error);
    }
  }

  static getUsers(): User[] {
    try {
      const users = localStorage.getItem('users');
      return users ? JSON.parse(users) : [];
    } catch (error) {
      console.error('Failed to get users from localStorage:', error);
      return [];
    }
  }

  // Products management
  static saveProducts(products: Product[]): void {
    try {
      localStorage.setItem('products', JSON.stringify(products));
    } catch (error) {
      console.error('Failed to save products to localStorage:', error);
    }
  }

  static getProducts(): Product[] {
    try {
      const products = localStorage.getItem('products');
      return products ? JSON.parse(products) : [];
    } catch (error) {
      console.error('Failed to get products from localStorage:', error);
      return [];
    }
  }

  // Liked products management
  static saveLikedProducts(userId: string, productIds: string[]): void {
    try {
      const likedProducts = this.getAllLikedProducts();
      likedProducts[userId] = productIds;
      localStorage.setItem('likedProducts', JSON.stringify(likedProducts));
    } catch (error) {
      console.error('Failed to save liked products to localStorage:', error);
    }
  }

  static getLikedProducts(userId: string): string[] {
    try {
      const likedProducts = this.getAllLikedProducts();
      return likedProducts[userId] || [];
    } catch (error) {
      console.error('Failed to get liked products from localStorage:', error);
      return [];
    }
  }

  private static getAllLikedProducts(): Record<string, string[]> {
    try {
      const likedProducts = localStorage.getItem('likedProducts');
      return likedProducts ? JSON.parse(likedProducts) : {};
    } catch (error) {
      console.error('Failed to get all liked products from localStorage:', error);
      return {};
    }
  }

  // Clear all data (useful for development/testing)
  static clearAll(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Failed to clear localStorage:', error);
    }
  }
}

export default LocalStorageService;