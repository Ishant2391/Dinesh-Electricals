'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { products } from '@/lib/data';
import { useWishlistStore, useCartStore } from '@/lib/store';
import { formatPrice, cn } from '@/lib/utils';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartSidebar from '@/components/CartSidebar';
import ProductCard from '@/components/ProductCard';
import { Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

export default function WishlistPage() {
  const [isMounted, setIsMounted] = useState(false);
  const { items, removeItem } = useWishlistStore();
  const { addItem } = useCartStore();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const wishlistProducts = products.filter((p) => items.includes(p.id));

  if (items.length === 0) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <div className="container-main py-12">
            <div className="card p-12 text-center">
              <div className="w-24 h-24 mx-auto bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                <Heart className="w-12 h-12 text-gray-400" />
              </div>
              <h1 className="text-2xl font-bold mb-2">Your wishlist is empty</h1>
              <p className="text-gray-500 mb-6">Save your favorite products for later</p>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-white font-medium rounded-lg hover:bg-primary-600"
              >
                Browse Products
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const handleAddToCart = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      addItem(product, 1);
      removeItem(productId);
      toast.success('Moved to cart');
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container-main py-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl md:text-3xl font-bold">My Wishlist</h1>
            <p className="text-gray-500">{items.length} {items.length === 1 ? 'item' : 'items'}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {wishlistProducts.map((product) => (
              <div key={product.id} className="card group relative">
                {/* Remove Button */}
                <button
                  onClick={() => {
                    removeItem(product.id);
                    toast.success('Removed from wishlist');
                  }}
                  className="absolute top-3 right-3 z-10 p-2 bg-white dark:bg-gray-800 shadow-card rounded-full hover:bg-red-50 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                {/* Image */}
                <Link href={`/product/${product.slug}`} className="block relative aspect-square">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </Link>

                {/* Content */}
                <div className="p-4">
                  <Link href={`/product/${product.slug}`}>
                    <h3 className="font-medium text-sm line-clamp-2 hover:text-primary-600">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-xs text-gray-500 mt-1">{product.brand}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-lg font-semibold">{formatPrice(product.price)}</span>
                    {product.originalPrice > product.price && (
                      <span className="text-sm text-gray-500 line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => handleAddToCart(product.id)}
                    className="w-full mt-3 flex items-center justify-center gap-2 px-3 py-2 bg-primary-500 text-white text-sm rounded-lg hover:bg-primary-600"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}