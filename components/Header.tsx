'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCartStore, useUIStore, useWishlistStore, useUserStore } from '@/lib/store';
import { categories } from '@/lib/data';
import { cn } from '@/lib/utils';
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Menu,
  X,
  ChevronDown,
  Phone,
  MapPin,
  Clock,
  Moon,
  Sun,
} from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  
  const cartItemCount = useCartStore((state) => state.getItemCount());
  const wishlistCount = useWishlistStore((state) => state.items.length);
  const { user, isAuthenticated } = useUserStore();
  const { toggleCart, toggleLoginModal } = useUIStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="sticky top-0 z-50">
      {/* Top Bar */}
      <div className="hidden md:block bg-primary-600 text-white py-2">
        <div className="container-main flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <a href="tel:+919876543210" className="flex items-center gap-2 hover:text-primary-100">
              <Phone className="w-4 h-4" />
              <span>+91 98765 43210</span>
            </a>
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>Shop No. 12, Main Market, City Center</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Mon-Sat: 9:00 AM - 8:00 PM</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className={cn(
        'bg-white dark:bg-gray-900 transition-shadow duration-300',
        isScrolled ? 'shadow-soft' : 'shadow-none'
      )}>
        <div className="container-main">
          <div className="flex items-center justify-between h-16 md:h-20 gap-4">
            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 flex-shrink-0">
              <img src="/dineshelectrical.png" alt="Dinesh Electricals Logo" className="w-10 h-10 md:w-12 md:h-12 object-contain" />
              <div className="hidden sm:block">
                <h1 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                  Dinesh Electrical
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Your Trusted Partner</p>
              </div>
            </Link>

            {/* Search Bar - Desktop */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl mx-4">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-12 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-800 dark:text-white"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
                >
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Search Button - Mobile */}
              <button
                className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg hidden sm:flex"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary-500 text-white text-xs rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <button
                onClick={toggleCart}
                className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary-500 text-white text-xs rounded-full flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>

              {/* User */}
              {isAuthenticated ? (
                <Link
                  href="/account"
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                >
                  <User className="w-5 h-5" />
                </Link>
              ) : (
                <button
                  onClick={toggleLoginModal}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                >
                  <User className="w-5 h-5" />
                </button>
              )}

              {/* Theme Toggle */}
              <button
                onClick={() => document.documentElement.classList.toggle('dark')}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
              >
                <Sun className="w-5 h-5 dark:hidden" />
                <Moon className="w-5 h-5 hidden dark:block" />
              </button>
            </div>
          </div>
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden md:block border-t border-gray-200 dark:border-gray-700">
          <div className="container-main">
            <div className="flex items-center gap-1">
              {/* All Categories */}
              <div className="relative group">
                <button className="flex items-center gap-2 px-4 py-3 text-sm font-medium hover:text-primary-600">
                  <Menu className="w-4 h-4" />
                  All Categories
                  <ChevronDown className="w-4 h-4" />
                </button>
                <div className="absolute left-0 top-full w-64 bg-white dark:bg-gray-800 shadow-lg rounded-b-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                  <div className="py-2">
                    {categories.map((category) => (
                      <Link
                        key={category.id}
                        href={`/products?category=${category.slug}`}
                        className="flex items-center justify-between px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <span className="text-sm">{category.name}</span>
                        <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Category Links - All visible */}
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/products?category=${category.slug}`}
                  className="px-4 py-3 text-sm font-medium hover:text-primary-600"
                >
                  {category.name}
                </Link>
              ))}

              {/* Extra Links */}
              <Link href="/products?new=true" className="px-4 py-3 text-sm font-medium text-primary-600">
                New Arrivals
              </Link>
              <Link href="/products?sale=true" className="px-4 py-3 text-sm font-medium text-red-600">
                Sale
              </Link>
              <Link href="/contact" className="px-4 py-3 text-sm font-medium hover:text-primary-600">
                Contact
              </Link>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile Search Bar */}
      {isSearchOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-4">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-12 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-800 dark:text-white"
                autoFocus
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <nav className="container-main py-4">
            <div className="space-y-2">
              <Link
                href="/"
                className="block px-4 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/products"
                className="block px-4 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                All Products
              </Link>
              {categories.map((category) => (
                <div key={category.id} className="relative">
                  <button
                    className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => setActiveDropdown(activeDropdown === category.id ? null : category.id)}
                  >
                    <span>{category.name}</span>
                    <ChevronDown className={cn(
                      "w-4 h-4 transition-transform",
                      activeDropdown === category.id && "rotate-180"
                    )} />
                  </button>
                  {activeDropdown === category.id && (
                    <div className="pl-4 mt-1 space-y-1">
                      {category.subCategories.map((sub) => (
                        <Link
                          key={sub}
                          href={`/products?category=${category.slug}&sub=${encodeURIComponent(sub)}`}
                          className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {sub}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link
                href="/wishlist"
                className="block px-4 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Wishlist ({wishlistCount})
              </Link>
              <Link
                href="/contact"
                className="block px-4 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact Us
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}