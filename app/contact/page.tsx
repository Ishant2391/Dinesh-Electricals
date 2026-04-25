'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartSidebar from '@/components/CartSidebar';
import { shopInfo } from '@/lib/data';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  MessageSquare,
  AlertCircle,
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.message) {
      toast.error('Please fill in required fields');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    toast.success('Message sent successfully! We will get back to you soon.');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Hero */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-12">
          <div className="container-main">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Contact Us</h1>
            <p className="text-primary-100">We'd love to hear from you</p>
          </div>
        </div>

        <div className="container-main py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="card p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <p className="text-sm text-gray-500">Mon-Sat 9AM-8PM</p>
                  </div>
                </div>
                <a href={`tel:${shopInfo.phone}`} className="text-primary-600 hover:text-primary-700">
                  {shopInfo.phone}
                </a>
              </div>

              <div className="card p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-sm text-gray-500">We reply within 24hrs</p>
                  </div>
                </div>
                <a href={`mailto:${shopInfo.email}`} className="text-primary-600 hover:text-primary-700">
                  {shopInfo.email}
                </a>
              </div>

              <div className="card p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Address</h3>
                    <p className="text-sm text-gray-500">Visit our store</p>
                  </div>
                </div>
                <p>{shopInfo.address}, {shopInfo.city}, {shopInfo.state} - {shopInfo.pincode}</p>
              </div>

              <div className="card p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Business Hours</h3>
                    <p className="text-sm text-gray-500">When we're open</p>
                  </div>
                </div>
                <p>{shopInfo.workingHours}</p>
              </div>

              {/* WhatsApp */}
              <a
                href={`https://wa.me/${shopInfo.whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="card p-6 flex items-center gap-4 hover:border-green-500 border-2 border-transparent transition-colors"
              >
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold">WhatsApp</h3>
                  <p className="text-sm text-gray-500">Chat with us</p>
                </div>
              </a>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="card p-6">
                <h2 className="text-xl font-semibold mb-6">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="input"
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="input"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="input"
                        placeholder="Your phone number"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Subject</label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="input"
                      >
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="order">Order Related</option>
                        <option value="product">Product Inquiry</option>
                        <option value="support">Technical Support</option>
                        <option value="feedback">Feedback</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="input"
                      rows={5}
                      placeholder="How can we help you?"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary-500 text-white font-medium rounded-lg hover:bg-primary-600 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Map */}
              <div className="card p-6 mt-6">
                <h2 className="text-xl font-semibold mb-4">Find Us</h2>
                <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                  <iframe
                    src={shopInfo.googleMapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                  />
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