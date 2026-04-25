'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product, useCartStore, useWishlistStore } from '@/lib/store';
import { formatPrice, formatDiscount, getStarRating } from '@/lib/utils';
import { cn } from '@/lib/utils';
import {
  Heart,
  ShoppingCart,
  Eye,
  Star,
  Flame,
  Zap,
  Package,
} from 'lucide-react';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
  view?: 'grid' | 'list';
}

export default function ProductCard({ product, view = 'grid' }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { addItem } = useCartStore();
  const { isInWishlist, toggleItem } = useWishlistStore();
  
  const inWishlist = isInWishlist(product.id);
  const { full, half, empty } = getStarRating(product.rating);
  const discount = formatDiscount(product.originalPrice, product.price);
  const isLowStock = product.stock > 0 && product.stock <= 10;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    toast.success(`${product.name} added to cart`);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(product.id);
    toast(inWishlist ? 'Removed from wishlist' : 'Added to wishlist');
  };

  if (view === 'list') {
    return (
      <div className="card p-4 flex gap-4">
        {/* Image */}
        <Link href={`/product/${product.slug}`} className="w-40 h-40 relative flex-shrink-0">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover rounded-lg"
            onLoad={() => setImageLoaded(true)}
          />
          {!imageLoaded && <div className="absolute inset-0 shimmer rounded-lg" />}
          {product.isSale && (
            <span className="absolute top-2 left-2 px-2 py-1 bg-red-500 text-white text-xs font-medium rounded">
              -{discount}%
            </span>
          )}
        </Link>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <Link href={`/product/${product.slug}`}>
                <h3 className="font-medium hover:text-primary-600 line-clamp-2">
                  {product.name}
                </h3>
              </Link>
              {product.brand && (
                <p className="text-sm text-gray-500 mt-1">{product.brand}</p>
              )}
              
              {/* Rating */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "w-4 h-4",
                        i < full
                          ? "fill-yellow-400 text-yellow-400"
                          : i < full + half
                          ? "fill-yellow-400/50 text-yellow-400"
                          : "fill-gray-300 text-gray-300"
                      )}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">({product.reviews})</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-2 mt-2">
                <span className="text-lg font-semibold">{formatPrice(product.price)}</span>
                {product.originalPrice > product.price && (
                  <>
                    <span className="text-sm text-gray-500 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                    <span className="text-sm text-green-600">-{discount}%</span>
                  </>
                )}
              </div>

              {/* Features */}
              <div className="flex flex-wrap gap-2 mt-3">
                {product.features.slice(0, 3).map((feature, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-xs rounded"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2">
              <button
                onClick={handleWishlist}
                className={cn(
                  "p-2 rounded-lg border transition-colors",
                  inWishlist
                    ? "bg-red-50 border-red-200 text-red-500"
                    : "border-gray-200 hover:border-primary-500 hover:text-primary-500"
                )}
              >
                <Heart className={cn("w-5 h-5", inWishlist && "fill-current")} />
              </button>
              <button
                onClick={handleAddToCart}
                className="p-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Stock Status */}
          {product.stock === 0 ? (
            <span className="inline-block mt-3 px-2 py-1 bg-red-100 text-red-600 text-xs rounded">
              Out of Stock
            </span>
          ) : isLowStock ? (
            <span className="inline-block mt-3 px-2 py-1 bg-orange-100 text-orange-600 text-xs rounded">
              Only {product.stock} left
            </span>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div
      className="card group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
        {product.isNew && (
          <span className="px-2 py-1 bg-blue-500 text-white text-xs font-medium rounded">
            New
          </span>
        )}
        {product.isSale && (
          <span className="px-2 py-1 bg-red-500 text-white text-xs font-medium rounded">
            -{discount}%
          </span>
        )}
        {product.isTrending && (
          <span className="px-2 py-1 bg-orange-500 text-white text-xs font-medium rounded flex items-center gap-1">
            <Flame className="w-3 h-3" />
            Hot
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={handleWishlist}
        className={cn(
          "absolute top-3 right-3 z-10 p-2 rounded-full transition-all",
          inWishlist
            ? "bg-red-500 text-white"
            : "bg-white dark:bg-gray-800 shadow-card hover:bg-primary-500 hover:text-white"
        )}
      >
        <Heart className={cn("w-4 h-4", inWishlist && "fill-current")} />
      </button>

      {/* Image */}
      <Link href={`/product/${product.slug}`} className="block relative aspect-square">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className={cn(
            "object-cover transition-transform duration-300",
            isHovered && "scale-105"
          )}
          onLoad={() => setImageLoaded(true)}
        />
        {!imageLoaded && (
          <div className="absolute inset-0 shimmer" />
        )}
        
        {/* Hover Actions */}
        <div
          className={cn(
            "absolute bottom-3 left-3 right-3 flex gap-2 transition-all duration-300",
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
        >
          <button
            onClick={handleAddToCart}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-primary-500 text-white text-sm font-medium rounded-lg hover:bg-primary-600 transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
          <Link
            href={`/product/${product.slug}`}
            className="p-2 bg-white dark:bg-gray-800 shadow-card rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Eye className="w-4 h-4" />
          </Link>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        {/* Category */}
        <p className="text-xs text-gray-500 uppercase tracking-wide">
          {product.category.replace(/-/g, ' ')}
        </p>

        {/* Title */}
        <Link href={`/product/${product.slug}`}>
          <h3 className="mt-1 font-medium text-sm line-clamp-2 hover:text-primary-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Brand */}
        {product.brand && (
          <p className="text-xs text-gray-500 mt-1">{product.brand}</p>
        )}

        {/* Rating */}
        <div className="flex items-center gap-2 mt-2">
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "w-3 h-3",
                  i < full
                    ? "fill-yellow-400 text-yellow-400"
                    : i < full + half
                    ? "fill-yellow-400/50 text-yellow-400"
                    : "fill-gray-300 text-gray-300"
                )}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mt-2">
          <span className="text-lg font-semibold">{formatPrice(product.price)}</span>
          {product.originalPrice > product.price && (
            <span className="text-sm text-gray-500 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Stock Status */}
        {product.stock === 0 ? (
          <span className="inline-block mt-2 px-2 py-1 bg-red-100 text-red-600 text-xs rounded">
            Out of Stock
          </span>
        ) : isLowStock ? (
          <span className="inline-block mt-2 px-2 py-1 bg-orange-100 text-orange-600 text-xs rounded flex items-center gap-1">
            <Package className="w-3 h-3" />
            Only {product.stock} left
          </span>
        ) : null}
      </div>
    </div>
  );
}