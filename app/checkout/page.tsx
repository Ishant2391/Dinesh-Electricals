'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCartStore, useUserStore } from '@/lib/store';
import { formatPrice, cn, generateOrderId } from '@/lib/utils';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  ShoppingCart,
  CreditCard,
  Wallet,
  Banknote,
  Truck,
  Shield,
  Check,
  MapPin,
  Phone,
  Mail,
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function CheckoutPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const { items, getTotal, clearCart } = useCartStore();
  const { user, isAuthenticated } = useUserStore();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    notes: '',
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  if (items.length === 0) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
            <Link href="/products" className="text-primary-600 hover:text-primary-700">
              Continue Shopping
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const subtotal = getTotal();
  const shipping = subtotal > 500 ? 0 : 50;
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + shipping + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    if (!formData.name || !formData.phone || !formData.address || !formData.city || !formData.pincode) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsProcessing(true);

    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const orderId = generateOrderId();
    
    // In a real app, this would create an order in the database
    console.log('Order placed:', {
      orderId,
      items: items.map((item) => ({ id: item.id, quantity: item.quantity })),
      total,
      paymentMethod,
      shippingAddress: formData,
    });

    clearCart();
    setIsProcessing(false);
    
    // Redirect to success page (in real app, use router.push)
    alert(`Order placed successfully! Order ID: ${orderId}`);
    window.location.href = '/';
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container-main py-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-8">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Step 1: Shipping Address */}
              <div className="card p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center",
                    step >= 1 ? "bg-primary-500 text-white" : "bg-gray-200"
                  )}>
                    {step > 1 ? <Check className="w-4 h-4" /> : '1'}
                  </div>
                  <h2 className="text-lg font-semibold">Shipping Address</h2>
                </div>

                {step >= 1 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-1 block">Full Name *</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="input"
                          placeholder="Enter your name"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">Phone Number *</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="input"
                          placeholder="Enter phone number"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="input"
                        placeholder="Enter email (optional)"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Address *</label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="input"
                        placeholder="Enter full address"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-1 block">City *</label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="input"
                          placeholder="City"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">State</label>
                        <input
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          className="input"
                          placeholder="State"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">PIN Code *</label>
                        <input
                          type="text"
                          name="pincode"
                          value={formData.pincode}
                          onChange={handleInputChange}
                          className="input"
                          placeholder="PIN Code"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Order Notes (Optional)</label>
                      <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleInputChange}
                        className="input"
                        rows={3}
                        placeholder="Any special instructions for delivery"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Step 2: Payment Method */}
              <div className="card p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center",
                    step >= 2 ? "bg-primary-500 text-white" : "bg-gray-200"
                  )}>
                    {step > 2 ? <Check className="w-4 h-4" /> : '2'}
                  </div>
                  <h2 className="text-lg font-semibold">Payment Method</h2>
                </div>

                <div className="space-y-3">
                  {[
                    { id: 'upi', label: 'UPI', icon: Wallet, desc: 'Pay using GPay, PhonePe, Paytm' },
                    { id: 'card', label: 'Debit/Credit Card', icon: CreditCard, desc: 'Visa, Mastercard, RuPay' },
                    { id: 'cod', label: 'Cash on Delivery', icon: Banknote, desc: 'Pay when you receive' },
                  ].map((method) => (
                    <label
                      key={method.id}
                      className={cn(
                        "flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-colors",
                        paymentMethod === method.id
                          ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20"
                          : "border-gray-200 dark:border-gray-700 hover:border-gray-300"
                      )}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={method.id}
                        checked={paymentMethod === method.id}
                        onChange={() => setPaymentMethod(method.id)}
                        className="sr-only"
                      />
                      <div className={cn(
                        "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                        paymentMethod === method.id
                          ? "border-primary-500"
                          : "border-gray-300"
                      )}>
                        {paymentMethod === method.id && (
                          <div className="w-2.5 h-2.5 rounded-full bg-primary-500" />
                        )}
                      </div>
                      <method.icon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                      <div>
                        <p className="font-medium">{method.label}</p>
                        <p className="text-sm text-gray-500">{method.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="card p-6 sticky top-24">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                
                {/* Items */}
                <div className="space-y-3 max-h-64 overflow-y-auto mb-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="w-16 h-16 relative flex-shrink-0">
                        <Image
                          src={item.images[0]}
                          alt={item.name}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-medium">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 text-sm border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Subtotal</span>
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
                  <div className="flex justify-between text-lg font-semibold pt-2 border-t">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                  className="w-full mt-6 px-6 py-3 bg-primary-500 text-white font-medium rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Place Order
                      <Shield className="w-4 h-4" />
                    </>
                  )}
                </button>

                {/* Trust */}
                <div className="mt-4 text-center text-xs text-gray-500">
                  <p>🔒 Secure checkout with SSL encryption</p>
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