'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { products } from '@/lib/data';
import { useCartStore, useWishlistStore } from '@/lib/store';
import { formatPrice, formatDiscount, getStarRating, getDeliveryDate, cn } from '@/lib/utils';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartSidebar from '@/components/CartSidebar';
import ProductCard from '@/components/ProductCard';
import {
  Heart,
  ShoppingCart,
  Truck,
  Shield,
  RotateCcw,
  Star,
  Minus,
  Plus,
  ChevronRight,
  Share2,
  Check,
  X,
  MessageCircle,
  AlertCircle,
} from 'lucide-react';
import toast from 'react-hot-toast';

// For static export, we'll handle routing client-side
export const dynamic = 'force-static';

export default function ProductPage() {
  const params = useParams();
  const [isMounted, setIsMounted] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [activeTab, setActiveTab] = useState('description');

  const { addItem } = useCartStore();
  const { isInWishlist, toggleItem } = useWishlistStore();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const product = products.find((p) => p.slug === params.slug);

  if (!product) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <Link href="/products" className="text-primary-600 hover:text-primary-700">
              Back to Products
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const inWishlist = isInWishlist(product.id);
  const { full, half, empty } = getStarRating(product.rating);
  const discount = formatDiscount(product.originalPrice, product.price);
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 5);

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast.success(`${product.name} added to cart`);
  };

  const handleBuyNow = () => {
    addItem(product, quantity);
    window.location.href = '/checkout';
  };

  const handleWishlist = () => {
    toggleItem(product.id);
    toast(inWishlist ? 'Removed from wishlist' : 'Added to wishlist');
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Breadcrumb */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="container-main py-4">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Link href="/" className="hover:text-primary-600">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/products" className="hover:text-primary-600">Products</Link>
              <ChevronRight className="w-4 h-4" />
              <Link
                href={`/products?category=${product.category}`}
                className="hover:text-primary-600 capitalize"
              >
                {product.category.replace(/-/g, ' ')}
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-gray-900 dark:text-white truncate max-w-[200px]">
                {product.name}
              </span>
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="container-main py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square bg-white dark:bg-gray-800 rounded-xl overflow-hidden">
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.isNew && (
                    <span className="px-3 py-1 bg-blue-500 text-white text-sm font-medium rounded">
                      New
                    </span>
                  )}
                  {product.isSale && (
                    <span className="px-3 py-1 bg-red-500 text-white text-sm font-medium rounded">
                      {discount}% OFF
                    </span>
                  )}
                </div>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={cn(
                      "w-20 h-20 relative flex-shrink-0 rounded-lg overflow-hidden border-2",
                      selectedImage === index
                        ? "border-primary-500"
                        : "border-transparent hover:border-gray-300"
                    )}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="space-y-6">
              {/* Title & Brand */}
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-wide">
                  {product.brand}
                </p>
                <h1 className="text-2xl md:text-3xl font-bold mt-1">{product.name}</h1>
                
                {/* Rating */}
                <div className="flex items-center gap-3 mt-3">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "w-5 h-5",
                          i < full
                            ? "fill-yellow-400 text-yellow-400"
                            : i < full + half
                            ? "fill-yellow-400/50 text-yellow-400"
                            : "fill-gray-300 text-gray-300"
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold">{formatPrice(product.price)}</span>
                {product.originalPrice > product.price && (
                  <>
                    <span className="text-lg text-gray-500 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                    <span className="text-green-600 font-medium">
                      Save {formatPrice(product.originalPrice - product.price)}
                    </span>
                  </>
                )}
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2">
                {product.stock === 0 ? (
                  <span className="flex items-center gap-2 px-3 py-1 bg-red-100 text-red-600 rounded-lg">
                    <X className="w-4 h-4" />
                    Out of Stock
                  </span>
                ) : product.stock <= 10 ? (
                  <span className="flex items-center gap-2 px-3 py-1 bg-orange-100 text-orange-600 rounded-lg">
                    <AlertCircle className="w-4 h-4" />
                    Only {product.stock} left
                  </span>
                ) : (
                  <span className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-600 rounded-lg">
                    <Check className="w-4 h-4" />
                    In Stock
                  </span>
                )}
              </div>

              {/* Delivery Info */}
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-primary-500" />
                  <div>
                    <p className="text-sm font-medium">Free Delivery</p>
                    <p className="text-xs text-gray-500">On orders above ₹500</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-primary-500" />
                  <div>
                    <p className="text-sm font-medium">Genuine Product</p>
                    <p className="text-xs text-gray-500">100% authentic with warranty</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <RotateCcw className="w-5 h-5 text-primary-500" />
                  <div>
                    <p className="text-sm font-medium">Easy Returns</p>
                    <p className="text-xs text-gray-500">30-day return policy</p>
                  </div>
                </div>
              </div>

              {/* Quantity */}
              <div>
                <label className="text-sm font-medium mb-2 block">Quantity</label>
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-sm text-gray-500">
                    Delivery by {getDeliveryDate(3)}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary-500 text-white font-medium rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  disabled={product.stock === 0}
                  className="flex-1 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Buy Now
                </button>
                <button
                  onClick={handleWishlist}
                  className={cn(
                    "p-3 border-2 rounded-lg transition-colors",
                    inWishlist
                      ? "border-red-500 bg-red-50 text-red-500"
                      : "border-gray-300 dark:border-gray-600 hover:border-primary-500"
                  )}
                >
                  <Heart className={cn("w-5 h-5", inWishlist && "fill-current")} />
                </button>
                <button className="p-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg hover:border-primary-500">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              {/* Features */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h3 className="font-medium mb-3">Key Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-12">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <div className="flex gap-8">
                {['description', 'specifications', 'reviews'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={cn(
                      "pb-4 text-sm font-medium capitalize border-b-2 -mb-px transition-colors",
                      activeTab === tab
                        ? "border-primary-500 text-primary-600"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    )}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="py-6">
              {activeTab === 'description' && (
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-gray-600 dark:text-gray-300">{product.description}</p>
                </div>
              )}

              {activeTab === 'specifications' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(product.specifications || {}).map(([key, value]) => (
                    <div key={key} className="flex justify-between p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                      <span className="text-gray-500">{key}</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <p className="text-4xl font-bold">{product.rating}</p>
                      <div className="flex items-center mt-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              "w-4 h-4",
                              i < full
                                ? "fill-yellow-400 text-yellow-400"
                                : "fill-gray-300 text-gray-300"
                            )}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{product.reviews} reviews</p>
                    </div>
                  </div>
                  <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
                </div>
              )}
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Related Products</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {relatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
      <CartSidebar />
    </>
  );
}