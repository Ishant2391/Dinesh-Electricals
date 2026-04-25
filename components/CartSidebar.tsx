'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore, useUIStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';
import { X, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';

export default function CartSidebar() {
  const [isMounted, setIsMounted] = useState(false);
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCartStore();
  const { isCartOpen, toggleCart } = useUIStore();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  if (!isCartOpen) return null;

  const subtotal = getTotal();
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + shipping;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={toggleCart}
      />

      {/* Cart Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-900 shadow-modal z-50 flex flex-col animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-6 h-6 text-primary-500" />
            <h2 className="text-lg font-semibold">Shopping Cart</h2>
            <span className="px-2 py-0.5 bg-primary-100 text-primary-600 text-sm rounded-full">
              {items.length} {items.length === 1 ? 'item' : 'items'}
            </span>
          </div>
          <button
            onClick={toggleCart}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
              <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                <ShoppingBag className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
              <p className="text-gray-500 mb-6">Looks like you haven't added any items yet.</p>
              <Link
                href="/products"
                onClick={toggleCart}
                className="px-6 py-3 bg-primary-500 text-white font-medium rounded-lg hover:bg-primary-600 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="p-4 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  {/* Product Image */}
                  <div className="w-20 h-20 relative flex-shrink-0 bg-white dark:bg-gray-700 rounded-lg overflow-hidden">
                    <Image
                      src={item.images[0]}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/product/${item.slug}`}
                      onClick={toggleCart}
                      className="text-sm font-medium line-clamp-2 hover:text-primary-600"
                    >
                      {item.name}
                    </Link>
                    {item.selectedVariant && (
                      <p className="text-xs text-gray-500 mt-1">
                        {Object.entries(item.selectedVariant)
                          .filter(([, v]) => v)
                          .map(([k, v]) => `${k}: ${v}`)
                          .join(', ')}
                      </p>
                    )}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold">{formatPrice(item.price * item.quantity)}</p>
                        {item.originalPrice > item.price && (
                          <p className="text-xs text-gray-500 line-through">
                            {formatPrice(item.originalPrice * item.quantity)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-1 text-gray-400 hover:text-red-500"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 dark:border-gray-700 p-4 space-y-4">
            {/* Summary */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Shipping</span>
                <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold pt-2 border-t">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            {subtotal < 500 && (
              <p className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-800 p-2 rounded">
                Add {formatPrice(500 - subtotal)} more for free shipping!
              </p>
            )}

            {/* Actions */}
            <div className="space-y-2">
              <Link
                href="/checkout"
                onClick={toggleCart}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary-500 text-white font-medium rounded-lg hover:bg-primary-600 transition-colors"
              >
                Checkout
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/cart"
                onClick={toggleCart}
                className="w-full flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                View Cart
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}