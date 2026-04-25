'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { products, categories, brands } from '@/lib/data';
import { formatPrice, cn } from '@/lib/utils';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartSidebar from '@/components/CartSidebar';
import ProductCard from '@/components/ProductCard';
import {
  Search,
  SlidersHorizontal,
  Grid3X3,
  List,
  ChevronDown,
  X,
  Star,
} from 'lucide-react';

function ProductsContent() {
  const searchParams = useSearchParams();
  const [isMounted, setIsMounted] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('popularity');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 20000]);
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setIsMounted(true);
    // Parse URL params
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const newArrivals = searchParams.get('new');
    const sale = searchParams.get('sale');
    const featured = searchParams.get('featured');
    const trending = searchParams.get('trending');

    if (category) setSelectedCategory(category);
    if (search) setSearchQuery(search);
  }, [searchParams]);

  if (!isMounted) return null;

  // Filter products
  let filteredProducts = [...products];

  // Search filter
  if (searchQuery) {
    filteredProducts = filteredProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }

  // Category filter
  if (selectedCategory) {
    filteredProducts = filteredProducts.filter(
      (p) => p.category === selectedCategory
    );
  }

  // Brand filter
  if (selectedBrand) {
    filteredProducts = filteredProducts.filter((p) => p.brand === selectedBrand);
  }

  // Price filter
  filteredProducts = filteredProducts.filter(
    (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
  );

  // Rating filter
  if (selectedRating > 0) {
    filteredProducts = filteredProducts.filter((p) => p.rating >= selectedRating);
  }

  // Stock filter
  if (inStockOnly) {
    filteredProducts = filteredProducts.filter((p) => p.stock > 0);
  }

  // Sort
  switch (sortBy) {
    case 'price-low':
      filteredProducts.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      filteredProducts.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      filteredProducts.sort((a, b) => b.rating - a.rating);
      break;
    case 'new':
      filteredProducts.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      break;
    default:
      filteredProducts.sort((a, b) => b.reviews - a.reviews);
  }

  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedBrand('');
    setPriceRange([0, 20000]);
    setSelectedRating(0);
    setInStockOnly(false);
    setSearchQuery('');
  };

  const activeFiltersCount = [
    selectedCategory,
    selectedBrand,
    selectedRating > 0 ? 'rating' : '',
    inStockOnly ? 'stock' : '',
    priceRange[0] > 0 || priceRange[1] < 20000 ? 'price' : '',
  ].filter(Boolean).length;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Breadcrumb */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="container-main py-4">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Link href="/" className="hover:text-primary-600">
                Home
              </Link>
              <span>/</span>
              <span className="text-gray-900 dark:text-white">Products</span>
              {selectedCategory && (
                <>
                  <span>/</span>
                  <span className="text-gray-900 dark:text-white capitalize">
                    {selectedCategory.replace(/-/g, ' ')}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="container-main py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar - Desktop */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="card p-6 sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold">Filters</h3>
                  {activeFiltersCount > 0 && (
                    <button
                      onClick={clearFilters}
                      className="text-sm text-primary-600 hover:text-primary-700"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                {/* Search */}
                <div className="mb-6">
                  <label className="text-sm font-medium mb-2 block">Search</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="input pl-10"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </div>

                {/* Categories */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium mb-3">Category</h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <label key={category.id} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="category"
                          checked={selectedCategory === category.slug}
                          onChange={() => setSelectedCategory(category.slug)}
                          className="w-4 h-4 text-primary-500"
                        />
                        <span className="text-sm">{category.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium mb-3">Price Range</h4>
                  <div className="space-y-3">
                    <input
                      type="range"
                      min="0"
                      max="20000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full"
                    />
                    <div className="flex items-center justify-between text-sm">
                      <span>{formatPrice(priceRange[0])}</span>
                      <span>{formatPrice(priceRange[1])}</span>
                    </div>
                  </div>
                </div>

                {/* Brands */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium mb-3">Brand</h4>
                  <div className="space-y-2">
                    {brands.slice(0, 6).map((brand) => (
                      <label key={brand} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="brand"
                          checked={selectedBrand === brand}
                          onChange={() => setSelectedBrand(brand)}
                          className="w-4 h-4 text-primary-500"
                        />
                        <span className="text-sm">{brand}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Rating */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium mb-3">Rating</h4>
                  <div className="space-y-2">
                    {[4, 3, 2, 1].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setSelectedRating(selectedRating === rating ? 0 : rating)}
                        className={cn(
                          "flex items-center gap-2 w-full",
                          selectedRating === rating && "text-primary-600"
                        )}
                      >
                        <div className="flex items-center">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                "w-4 h-4",
                                i < rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "fill-gray-300 text-gray-300"
                              )}
                            />
                          ))}
                        </div>
                        <span className="text-sm">& above</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Availability */}
                <div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={inStockOnly}
                      onChange={(e) => setInStockOnly(e.target.checked)}
                      className="w-4 h-4 text-primary-500 rounded"
                    />
                    <span className="text-sm">In Stock Only</span>
                  </label>
                </div>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="card p-4 mb-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setShowFilters(!showFilters)}
                      className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                    >
                      <SlidersHorizontal className="w-4 h-4" />
                      Filters
                      {activeFiltersCount > 0 && (
                        <span className="w-5 h-5 bg-primary-500 text-white text-xs rounded-full flex items-center justify-center">
                          {activeFiltersCount}
                        </span>
                      )}
                    </button>
                    <p className="text-sm text-gray-500">
                      Showing <span className="font-medium">{filteredProducts.length}</span> products
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    {/* Sort */}
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">Sort by:</span>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="input py-2"
                      >
                        <option value="popularity">Most Popular</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="rating">Highest Rated</option>
                        <option value="new">Newest First</option>
                      </select>
                    </div>

                    {/* View Mode */}
                    <div className="hidden sm:flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                      <button
                        onClick={() => setViewMode('grid')}
                        className={cn(
                          "p-2",
                          viewMode === 'grid' && "bg-primary-500 text-white"
                        )}
                      >
                        <Grid3X3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setViewMode('list')}
                        className={cn(
                          "p-2",
                          viewMode === 'list' && "bg-primary-500 text-white"
                        )}
                      >
                        <List className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Mobile Filters */}
                {showFilters && (
                  <div className="lg:hidden mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="space-y-4">
                      {/* Search */}
                      <div>
                        <label className="text-sm font-medium mb-2 block">Search</label>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="input pl-10"
                          />
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        </div>
                      </div>

                      {/* Category */}
                      <div>
                        <label className="text-sm font-medium mb-2 block">Category</label>
                        <select
                          value={selectedCategory}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="input"
                        >
                          <option value="">All Categories</option>
                          {categories.map((c) => (
                            <option key={c.id} value={c.slug}>
                              {c.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Price */}
                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Max Price: {formatPrice(priceRange[1])}
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="20000"
                          value={priceRange[1]}
                          onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                          className="w-full"
                        />
                      </div>

                      {/* Clear */}
                      {activeFiltersCount > 0 && (
                        <button
                          onClick={clearFilters}
                          className="text-sm text-primary-600 hover:text-primary-700"
                        >
                          Clear All Filters
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Active Filters */}
              {activeFiltersCount > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedCategory && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 text-primary-600 text-sm rounded-full">
                      {selectedCategory.replace(/-/g, ' ')}
                      <button onClick={() => setSelectedCategory('')}>
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {selectedBrand && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 text-primary-600 text-sm rounded-full">
                      {selectedBrand}
                      <button onClick={() => setSelectedBrand('')}>
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {selectedRating > 0 && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 text-primary-600 text-sm rounded-full">
                      {selectedRating}+ Star
                      <button onClick={() => setSelectedRating(0)}>
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {inStockOnly && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 text-primary-600 text-sm rounded-full">
                      In Stock
                      <button onClick={() => setInStockOnly(false)}>
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                </div>
              )}

              {/* Products */}
              {filteredProducts.length === 0 ? (
                <div className="card p-12 text-center">
                  <div className="w-24 h-24 mx-auto bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                    <Search className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">No products found</h3>
                  <p className="text-gray-500 mb-6">
                    Try adjusting your filters or search query
                  </p>
                  <button
                    onClick={clearFilters}
                    className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div
                  className={cn(
                    viewMode === 'grid'
                      ? 'grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4'
                      : 'space-y-4'
                  )}
                >
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      view={viewMode}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <CartSidebar />
    </>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}