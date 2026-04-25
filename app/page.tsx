'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { banners, categories, products, testimonials } from '@/lib/data';
import { formatPrice } from '@/lib/utils';
import { cn } from '@/lib/utils';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartSidebar from '@/components/CartSidebar';
import ProductCard from '@/components/ProductCard';
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Zap,
  Shield,
  Truck,
  Clock,
  Star,
  Quote,
} from 'lucide-react';

export default function HomePage() {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  if (!isMounted) return null;

  const featuredProducts = products.filter((p) => p.isFeatured);
  const trendingProducts = products.filter((p) => p.isTrending);
  const newProducts = products.filter((p) => p.isNew);
  const saleProducts = products.filter((p) => p.isSale);

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Banner */}
        <section className="relative bg-gradient-to-r from-gray-900 to-gray-800 overflow-hidden">
          <div className="container-main py-12 md:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Banner Content */}
              <div className="text-white">
                <span className="inline-block px-3 py-1 bg-primary-500 text-white text-sm font-medium rounded-full mb-4">
                  {banners[currentBanner].subtitle}
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                  {banners[currentBanner].title}
                </h1>
                <p className="text-lg text-gray-300 mb-6">
                  {banners[currentBanner].description}
                </p>
                <Link
                  href={banners[currentBanner].link}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-white font-medium rounded-lg hover:bg-primary-600 transition-colors"
                >
                  {banners[currentBanner].cta}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>

              {/* Banner Image */}
              <div className="relative h-64 md:h-96 lg:h-[400px]">
                <Image
                  src={banners[currentBanner].image}
                  alt={banners[currentBanner].title}
                  fill
                  className="object-cover rounded-2xl"
                  priority
                />
              </div>
            </div>

            {/* Banner Navigation */}
            <div className="flex items-center justify-center gap-2 mt-8">
              {banners.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentBanner(index)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all",
                    currentBanner === index
                      ? "w-8 bg-primary-500"
                      : "bg-white/50 hover:bg-white/80"
                  )}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Trust Badges */}
        <section className="py-8 bg-gray-50 dark:bg-gray-800">
          <div className="container-main">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                  <Truck className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Free Shipping</h4>
                  <p className="text-xs text-gray-500">On orders above ₹500</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Genuine Products</h4>
                  <p className="text-xs text-gray-500">100% authentic</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                  <Zap className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Fast Delivery</h4>
                  <p className="text-xs text-gray-500">Quick dispatch</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm">24/7 Support</h4>
                  <p className="text-xs text-gray-500">Always available</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-12">
          <div className="container-main">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold">Shop by Category</h2>
                <p className="text-gray-500 mt-1">Browse our wide range of electrical products</p>
              </div>
              <Link
                href="/products"
                className="hidden md:flex items-center gap-2 text-primary-600 hover:text-primary-700"
              >
                View All
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
              {categories.map((category, index) => (
                <Link
                  key={category.id}
                  href={`/products?category=${category.slug}`}
                  className="group card p-0 text-center hover:border-primary-500 border-2 border-transparent transition-all overflow-hidden"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative h-32 bg-gray-100 dark:bg-gray-800">
                    <img 
                      src={`https://placehold.co/400x300/2563eb/white?text=${encodeURIComponent(category.name)}`}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-2 left-2 right-2 text-left">
                      <h3 className="font-medium text-sm text-white group-hover:text-primary-200 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-xs text-gray-300">
                        {category.subCategories.length} subcategories
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <Link
              href="/products"
              className="md:hidden flex items-center justify-center gap-2 mt-6 text-primary-600"
            >
              View All Categories
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Flash Sale */}
        <section className="py-12 bg-gradient-to-r from-red-600 to-orange-600">
          <div className="container-main">
            <div className="flex items-center justify-between mb-8">
              <div className="text-white">
                <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
                  <Zap className="w-8 h-8" />
                  Flash Sale
                </h2>
                <p className="text-red-100 mt-1">Limited time offers - Grab them before they're gone!</p>
              </div>
              <Link
                href="/products?sale=true"
                className="hidden md:flex items-center gap-2 px-4 py-2 bg-white text-red-600 font-medium rounded-lg hover:bg-gray-100"
              >
                View All
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {saleProducts.slice(0, 5).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-12">
          <div className="container-main">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold">Featured Products</h2>
                <p className="text-gray-500 mt-1">Handpicked products just for you</p>
              </div>
              <Link
                href="/products?featured=true"
                className="hidden md:flex items-center gap-2 text-primary-600 hover:text-primary-700"
              >
                View All
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {featuredProducts.slice(0, 5).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Trending Products */}
        <section className="py-12 bg-gray-50 dark:bg-gray-800">
          <div className="container-main">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold">Trending Now</h2>
                <p className="text-gray-500 mt-1">Most popular products among customers</p>
              </div>
              <Link
                href="/products?trending=true"
                className="hidden md:flex items-center gap-2 text-primary-600 hover:text-primary-700"
              >
                View All
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {trendingProducts.slice(0, 5).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* New Arrivals */}
        <section className="py-12">
          <div className="container-main">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold">New Arrivals</h2>
                <p className="text-gray-500 mt-1">Check out the latest additions to our store</p>
              </div>
              <Link
                href="/products?new=true"
                className="hidden md:flex items-center gap-2 text-primary-600 hover:text-primary-700"
              >
                View All
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {newProducts.slice(0, 5).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-12 bg-gray-50 dark:bg-gray-800">
          <div className="container-main">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold">What Our Customers Say</h2>
              <p className="text-gray-500 mt-1">Don't just take our word for it</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="card p-6">
                  <Quote className="w-8 h-8 text-primary-200 mb-4" />
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    "{testimonial.comment}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 relative rounded-full overflow-hidden">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">{testimonial.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mt-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "w-4 h-4",
                          i < testimonial.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-gray-300 text-gray-300"
                        )}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12">
          <div className="container-main">
            <div className="card bg-gradient-to-r from-primary-600 to-primary-700 text-white p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    Need Help Choosing the Right Product?
                  </h2>
                  <p className="text-primary-100 mb-6">
                    Our expert team is here to assist you. Contact us for personalized recommendations and technical support.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link
                      href="/contact"
                      className="px-6 py-3 bg-white text-primary-600 font-medium rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      Contact Us
                    </Link>
                    <a
                      href="tel:+919876543210"
                      className="px-6 py-3 border-2 border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors"
                    >
                      Call Now
                    </a>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/10 rounded-lg p-4 text-center">
                      <h3 className="text-3xl font-bold">10+</h3>
                      <p className="text-primary-100">Years Experience</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4 text-center">
                      <h3 className="text-3xl font-bold">50K+</h3>
                      <p className="text-primary-100">Happy Customers</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4 text-center">
                      <h3 className="text-3xl font-bold">500+</h3>
                      <p className="text-primary-100">Products</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4 text-center">
                      <h3 className="text-3xl font-bold">24/7</h3>
                      <p className="text-primary-100">Support</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <CartSidebar />
    </>
  );
}