import { User, Product } from './types';

// Utility class to interact with localStorage
class LocalStorageService {
  // Save current user
  static saveUser(user: User): void {
    try {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } catch (error) {
      console.error('Failed to save user:', error);
    }
  }

  // Get currently logged-in user
  static getCurrentUser(): User | null {
    try {
      const data = localStorage.getItem('currentUser');
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Failed to get current user:', error);
      return null;
    }
  }

  // Remove current user
  static removeCurrentUser(): void {
    try {
      localStorage.removeItem('currentUser');
    } catch (error) {
      console.error('Failed to remove user:', error);
    }
  }

  // Save all users
  static saveUsers(users: User[]): void {
    try {
      localStorage.setItem('users', JSON.stringify(users));
    } catch (error) {
      console.error('Failed to save users:', error);
    }
  }

  // Get all users
  static getUsers(): User[] {
    try {
      const data = localStorage.getItem('users');
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Failed to load users:', error);
      return [];
    }
  }

  // Save all products
  static saveProducts(products: Product[]): void {
    try {
      localStorage.setItem('products', JSON.stringify(products));
    } catch (error) {
      console.error('Failed to save products:', error);
    }
  }

  // Get all products
  static getProducts(): Product[] {
    try {
      const data = localStorage.getItem('products');
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Failed to load products:', error);
      return [];
    }
  }

  // Save liked products for a user
  static saveLikedProducts(userId: string, productIds: string[]): void {
    try {
      const liked = this.getAllLikedProducts();
      liked[userId] = productIds;
      localStorage.setItem('likedProducts', JSON.stringify(liked));
    } catch (error) {
      console.error('Failed to save liked products:', error);
    }
  }

  // Get liked products for a user
  static getLikedProducts(userId: string): string[] {
    try {
      const liked = this.getAllLikedProducts();
      return liked[userId] || [];
    } catch (error) {
      console.error('Failed to get liked products:', error);
      return [];
    }
  }

  // Get all liked products
  private static getAllLikedProducts(): Record<string, string[]> {
    try {
      const data = localStorage.getItem('likedProducts');
      return data ? JSON.parse(data) : {};
    } catch (error) {
      console.error('Failed to load liked products:', error);
      return {};
    }
  }

  // Clear all localStorage (use with caution)
  static clearAll(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Failed to clear localStorage:', error);
    }
  }
}

export default LocalStorageService;
