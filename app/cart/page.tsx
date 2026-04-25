'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCartStore, useUserStore } from '@/lib/store';
import { formatPrice, cn } from '@/lib/utils';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartSidebar from '@/components/CartSidebar';
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Check,
  CreditCard,
  Wallet,
  Banknote,
  Truck,
  Shield,
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function CartPage() {
  const [isMounted, setIsMounted] = useState(false);
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCartStore();
  const { user, isAuthenticated } = useUserStore();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const subtotal = getTotal();
  const shipping = subtotal > 500 ? 0 : 50;
  const tax = Math.round(subtotal * 0.18); // 18% GST
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <div className="container-main py-12">
            <div className="card p-12 text-center">
              <div className="w-24 h-24 mx-auto bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                <ShoppingCart className="w-12 h-12 text-gray-400" />
              </div>
              <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
              <p className="text-gray-500 mb-6">Looks like you haven't added any items yet.</p>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-white font-medium rounded-lg hover:bg-primary-600"
              >
                Continue Shopping
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container-main py-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-8">Shopping Cart</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="card p-4 flex gap-4">
                  <Link href={`/product/${item.slug}`} className="w-24 h-24 relative flex-shrink-0">
                    <Image
                      src={item.images[0]}
                      alt={item.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link href={`/product/${item.slug}`} className="font-medium hover:text-primary-600">
                      {item.name}
                    </Link>
                    {item.brand && <p className="text-sm text-gray-500 mt-1">{item.brand}</p>}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{formatPrice(item.price * item.quantity)}</p>
                        {item.originalPrice > item.price && (
                          <p className="text-xs text-gray-500 line-through">
                            {formatPrice(item.originalPrice * item.quantity)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-gray-400 hover:text-red-500 self-start"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}

              <div className="flex justify-between items-center pt-4">
                <Link href="/products" className="text-primary-600 hover:text-primary-700">
                  Continue Shopping
                </Link>
                <button
                  onClick={() => {
                    clearCart();
                    toast.success('Cart cleared');
                  }}
                  className="text-sm text-gray-500 hover:text-red-500"
                >
                  Clear Cart
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="card p-6 sticky top-24">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Subtotal ({items.length} items)</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Shipping</span>
                    <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Tax (GST 18%)</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold pt-3 border-t">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                {subtotal < 500 && (
                  <p className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-800 p-2 rounded mt-3">
                    Add {formatPrice(500 - subtotal)} more for free shipping!
                  </p>
                )}

                {/* Payment Methods */}
                <div className="mt-6">
                  <p className="text-sm font-medium mb-3">Payment Methods</p>
                  <div className="flex flex-wrap gap-2">
                    <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                      <Wallet className="w-4 h-4" />
                      <span className="text-xs">UPI</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                      <CreditCard className="w-4 h-4" />
                      <span className="text-xs">Card</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                      <Banknote className="w-4 h-4" />
                      <span className="text-xs">COD</span>
                    </div>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="w-full flex items-center justify-center gap-2 mt-6 px-6 py-3 bg-primary-500 text-white font-medium rounded-lg hover:bg-primary-600"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-5 h-5" />
                </Link>

                {/* Trust Badges */}
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <Truck className="w-5 h-5 text-primary-500" />
                    <span>Free shipping above ₹500</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <Shield className="w-5 h-5 text-primary-500" />
                    <span>Secure checkout</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}