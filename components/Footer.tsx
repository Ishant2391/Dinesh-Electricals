'use client';

import Link from 'next/link';
import { shopInfo, categories, brands } from '@/lib/data';
import { cn } from '@/lib/utils';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Send,
  Shield,
  Truck,
  RefreshCw,
  HeadphonesIcon,
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Newsletter Section */}
      <div className="border-b border-gray-800">
        <div className="container-main py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Subscribe to our Newsletter
              </h3>
              <p className="text-gray-400">
                Get latest updates on new products and upcoming sales
              </p>
            </div>
            <form className="flex w-full md:w-auto max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-l-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-white"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-primary-500 text-white font-medium rounded-r-lg hover:bg-primary-600 transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container-main py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">DE</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">{shopInfo.name}</h2>
                <p className="text-sm text-gray-400">{shopInfo.tagline}</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6">{shopInfo.description}</p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <a href={`tel:${shopInfo.phone}`} className="flex items-center gap-3 hover:text-primary-500 transition-colors">
                <Phone className="w-5 h-5" />
                <span>{shopInfo.phone}</span>
              </a>
              <a href={`mailto:${shopInfo.email}`} className="flex items-center gap-3 hover:text-primary-500 transition-colors">
                <Mail className="w-5 h-5" />
                <span>{shopInfo.email}</span>
              </a>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5" />
                <span>{shopInfo.address}, {shopInfo.city}, {shopInfo.state} - {shopInfo.pincode}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5" />
                <span>{shopInfo.workingHours}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="hover:text-primary-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-primary-500 transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/products?new=true" className="hover:text-primary-500 transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/products?sale=true" className="hover:text-primary-500 transition-colors">
                  Sale
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary-500 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Categories</h3>
            <ul className="space-y-3">
              {categories.slice(0, 8).map((category) => (
                <li key={category.id}>
                  <Link 
                    href={`/products?category=${category.slug}`} 
                    className="hover:text-primary-500 transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Customer Service</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/shipping" className="hover:text-primary-500 transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-primary-500 transition-colors">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-primary-500 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary-500 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-primary-500 transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="border-t border-gray-800">
        <div className="container-main py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
                <Truck className="w-6 h-6 text-primary-500" />
              </div>
              <div>
                <h4 className="font-medium text-white">Free Shipping</h4>
                <p className="text-sm text-gray-400">On orders above ₹500</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary-500" />
              </div>
              <div>
                <h4 className="font-medium text-white">Secure Payment</h4>
                <p className="text-sm text-gray-400">100% secure transactions</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
                <RefreshCw className="w-6 h-6 text-primary-500" />
              </div>
              <div>
                <h4 className="font-medium text-white">Easy Returns</h4>
                <p className="text-sm text-gray-400">30-day return policy</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
                <HeadphonesIcon className="w-6 h-6 text-primary-500" />
              </div>
              <div>
                <h4 className="font-medium text-white">24/7 Support</h4>
                <p className="text-sm text-gray-400">Dedicated support</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Links & Copyright */}
      <div className="border-t border-gray-800">
        <div className="container-main py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href={shopInfo.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-500 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href={shopInfo.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-500 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={shopInfo.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-500 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href={shopInfo.socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-500 transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>

            {/* Copyright */}
            <p className="text-sm text-gray-400">
              © {currentYear} {shopInfo.name}. All rights reserved.
            </p>

            {/* Payment Icons */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400 mr-2">We Accept:</span>
              <div className="flex gap-2">
                <div className="px-2 py-1 bg-gray-800 rounded text-xs">Visa</div>
                <div className="px-2 py-1 bg-gray-800 rounded text-xs">Mastercard</div>
                <div className="px-2 py-1 bg-gray-800 rounded text-xs">UPI</div>
                <div className="px-2 py-1 bg-gray-800 rounded text-xs">Paytm</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Float Button */}
      <a
        href={`https://wa.me/${shopInfo.whatsapp.replace(/\D/g, '')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors z-50"
      >
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </footer>
  );
}