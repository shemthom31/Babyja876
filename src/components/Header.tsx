import React, { useState } from 'react';
import { ShoppingCart, Search, Menu, X } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';
import AuthModal from './AuthModal';

const Header: React.FC = () => {
  const { cartItemCount, setIsCartOpen, user, logout } = useAppContext();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-100">
      {/* Main header row */}
      <div className="px-4 sm:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4 sm:gap-8">
          <button
            className="p-2 -ml-2 md:hidden text-gray-500 hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold tracking-tight text-primary">
              Babyja<span className="text-secondary">876</span>
            </span>
          </Link>
          <nav className="hidden md:flex gap-6 text-sm font-medium">
            <Link to="/" className="text-primary">Home</Link>
            <a href="/#shop" className="hover:text-primary text-neutral-text">Products</a>
          </nav>
        </div>

        <div className="hidden md:flex flex-1 max-w-md px-4 sm:px-12">
          <div className="relative flex items-center w-full h-10 rounded-full bg-gray-50 px-4 border border-gray-100">
            <Search size={16} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search essentials..."
              className="bg-transparent border-none text-sm focus:ring-0 w-full ml-2 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          {user ? (
            <div className="relative group">
              <button className="flex items-center gap-2 focus:outline-none">
                <div className="w-8 h-8 rounded-full bg-primary text-white text-xs font-bold uppercase flex items-center justify-center shadow-sm">
                  {user.email.substring(0, 2)}
                </div>
                <span className="hidden sm:inline-block text-sm font-medium text-neutral-text group-hover:text-primary transition-colors">
                  {user.email.split('@')[0]}
                </span>
              </button>
              <div className="absolute right-0 top-full pt-2 w-48 hidden group-hover:block z-50">
                <div className="bg-white rounded-xl shadow-lg py-2 border border-gray-100">
                  {user.isAdmin && (
                    <Link
                      to="/admin"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 font-medium hover:bg-red-50 transition-colors"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setIsAuthOpen(true)}
              className="text-sm font-medium text-gray-600 hover:text-primary transition-colors px-3 py-2"
            >
              Sign In
            </button>
          )}

          <div className="relative cursor-pointer" onClick={() => setIsCartOpen(true)}>
            <ShoppingCart className="w-6 h-6 text-neutral-text hover:text-primary transition-colors" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                {cartItemCount}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu — rendered outside the flex row */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pb-4 pt-2">
          <div className="relative w-full mb-3">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search essentials..."
              className="block w-full pl-9 pr-3 py-2 border border-gray-200 rounded-full bg-gray-50 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <nav className="flex flex-col gap-1">
            <Link
              to="/"
              className="text-gray-700 font-medium py-2 px-2 rounded-lg hover:bg-gray-50 hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <a
              href="/#shop"
              className="text-gray-700 font-medium py-2 px-2 rounded-lg hover:bg-gray-50 hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Products
            </a>
            {user?.isAdmin && (
              <Link
                to="/admin"
                className="text-gray-700 font-medium py-2 px-2 rounded-lg hover:bg-gray-50 hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Admin Dashboard
              </Link>
            )}
          </nav>
        </div>
      )}

      {isAuthOpen && <AuthModal onClose={() => setIsAuthOpen(false)} />}
    </header>
  );
};

export default Header;
