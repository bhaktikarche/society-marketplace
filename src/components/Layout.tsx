import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Plus, List, LogOut, User, Heart } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

// Main layout component with responsive navigation
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { path: '/', icon: ShoppingBag, label: 'Marketplace', show: true },
    { path: '/liked', icon: Heart, label: 'Liked', show: !!user },
    { path: '/add', icon: Plus, label: 'Add Product', show: !!user },
    { path: '/my-listings', icon: List, label: 'My Listings', show: !!user },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Navigation */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-2 rounded-lg group-hover:scale-105 transition-transform duration-200">
                <ShoppingBag className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Society Marketplace
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map(({ path, icon: Icon, label, show }) => 
                show && (
                  <Link
                    key={path}
                    to={path}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive(path)
                        ? 'bg-indigo-100 text-indigo-700 shadow-sm'
                        : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{label}</span>
                  </Link>
                )
              )}
            </nav>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-3">
                  <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-600">
                    <User className="h-4 w-4" />
                    <span className="font-medium">{user.name}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                  >
                    <LogOut className="h-4 w-4" />
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors duration-200 shadow-sm"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      {user && (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
          <div className="flex justify-around items-center py-2">
            {navItems.map(({ path, icon: Icon, label, show }) => 
              show && (
                <Link
                  key={path}
                  to={path}
                  className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors duration-200 ${
                    isActive(path)
                      ? 'text-indigo-600'
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-xs font-medium">{label}</span>
                </Link>
              )
            )}
          </div>
        </nav>
      )}

      {/* Add bottom padding for mobile navigation */}
      {user && <div className="h-16 md:hidden" />}
    </div>
  );
};

export default Layout;