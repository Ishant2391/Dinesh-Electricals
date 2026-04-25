'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { products as initialProducts, categories, shopInfo } from '@/lib/data';
import { formatPrice, cn, generateOrderId } from '@/lib/utils';
import { useAdminProductStore, Product } from '@/lib/store';
import Header from '@/components/Header';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Eye,
  Plus,
  Search,
  MoreVertical,
  Edit,
  Trash2,
  ChevronDown,
  LogOut,
  Menu,
  X,
  Save,
  XCircle,
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  
  // Use admin store
  const { products: adminProducts, addProduct, updateProduct, deleteProduct } = useAdminProductStore();
  
  // Combine initial products with admin products
  const allProducts = [...initialProducts, ...adminProducts];

  useEffect(() => {
    // Ensure hooks are not conditionally rendered
  }, []);

  const stats = {
    totalSales: 1250000,
    totalOrders: 456,
    totalCustomers: 1234,
    totalProducts: allProducts.length,
    salesGrowth: 12.5,
    ordersGrowth: 8.2,
    customersGrowth: 15.3,
  };

  const recentOrders = [
    { id: 'DE001', customer: 'John Doe', amount: 2500, status: 'confirmed', date: '2026-04-24' },
    { id: 'DE002', customer: 'Jane Smith', amount: 1800, status: 'shipped', date: '2026-04-23' },
    { id: 'DE003', customer: 'Mike Johnson', amount: 3200, status: 'pending', date: '2026-04-23' },
    { id: 'DE004', customer: 'Sarah Williams', amount: 950, status: 'delivered', date: '2026-04-22' },
    { id: 'DE005', customer: 'David Brown', amount: 4100, status: 'confirmed', date: '2026-04-22' },
  ];

  const lowStockProducts = allProducts.filter((p) => p.stock <= 10);

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // Product form state
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: '',
    originalPrice: '',
    category: '',
    brand: '',
    stock: '',
    images: [''],
    features: [''],
  });

  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setProductForm({
      name: '',
      description: '',
      price: '',
      originalPrice: '',
      category: '',
      brand: '',
      stock: '',
      images: [''],
      features: [''],
    });
    setShowProductModal(true);
  };

  const handleOpenEditProduct = (product: Product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      originalPrice: product.originalPrice.toString(),
      category: product.category,
      brand: product.brand || '',
      stock: product.stock.toString(),
      images: product.images.length > 0 ? product.images : [''],
      features: product.features.length > 0 ? product.features : [''],
    });
    setShowProductModal(true);
  };

  const handleSaveProduct = () => {
    const newProduct: Product = {
      id: editingProduct?.id || `prod-${Date.now()}`,
      name: productForm.name,
      slug: productForm.name.toLowerCase().replace(/\s+/g, '-'),
      description: productForm.description,
      price: parseFloat(productForm.price) || 0,
      originalPrice: parseFloat(productForm.originalPrice) || parseFloat(productForm.price) || 0,
      category: productForm.category,
      brand: productForm.brand,
      stock: parseInt(productForm.stock) || 0,
      images: productForm.images.filter(img => img.trim() !== ''),
      features: productForm.features.filter(f => f.trim() !== ''),
      rating: editingProduct?.rating || 4.0,
      reviews: editingProduct?.reviews || 0,
      tags: [productForm.category],
      isFeatured: false,
      isTrending: false,
      isNew: true,
      isSale: false,
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, newProduct);
      toast.success('Product updated successfully');
    } else {
      addProduct(newProduct);
      toast.success('Product added successfully');
    }
    
    setShowProductModal(false);
  };

  const handleDeleteProduct = (id: string) => {
    deleteProduct(id);
    setShowDeleteConfirm(null);
    toast.success('Product deleted successfully');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Total Sales</p>
                    <p className="text-2xl font-bold mt-1">{formatPrice(stats.totalSales)}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
                  <TrendingUp className="w-4 h-4" />
                  <span>+{stats.salesGrowth}% from last month</span>
                </div>
              </div>

              <div className="card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Total Orders</p>
                    <p className="text-2xl font-bold mt-1">{stats.totalOrders}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <ShoppingCart className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
                  <TrendingUp className="w-4 h-4" />
                  <span>+{stats.ordersGrowth}% from last month</span>
                </div>
              </div>

              <div className="card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Customers</p>
                    <p className="text-2xl font-bold mt-1">{stats.totalCustomers}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
                  <TrendingUp className="w-4 h-4" />
                  <span>+{stats.customersGrowth}% from last month</span>
                </div>
              </div>

              <div className="card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Products</p>
                    <p className="text-2xl font-bold mt-1">{stats.totalProducts}</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <Package className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  {lowStockProducts.length} low stock
                </div>
              </div>
            </div>

            {/* Recent Orders & Low Stock */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Recent Orders</h3>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-sm text-primary-600 hover:text-primary-700"
                  >
                    View All
                  </button>
                </div>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
                      <div>
                        <p className="font-medium">{order.id}</p>
                        <p className="text-sm text-gray-500">{order.customer}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{formatPrice(order.amount)}</p>
                        <span className={cn(
                          "text-xs px-2 py-0.5 rounded-full",
                          order.status === 'confirmed' && "bg-blue-100 text-blue-600",
                          order.status === 'shipped' && "bg-purple-100 text-purple-600",
                          order.status === 'pending' && "bg-yellow-100 text-yellow-600",
                          order.status === 'delivered' && "bg-green-100 text-green-600"
                        )}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Low Stock Alerts</h3>
                  <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
                    {lowStockProducts.length} items
                  </span>
                </div>
                <div className="space-y-4">
                  {lowStockProducts.slice(0, 5).map((product) => (
                    <div key={product.id} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                          <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="font-medium text-sm line-clamp-1">{product.name}</p>
                          <p className="text-xs text-gray-500">SKU: {product.id}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-red-600">{product.stock} left</p>
                        <button className="text-xs text-primary-600 hover:text-primary-700">
                          Restock
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'orders':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Orders Management</h2>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Search orders..."
                  className="input py-2"
                />
                <select className="input py-2">
                  <option value="">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                </select>
              </div>
            </div>

            <div className="card overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium">Order ID</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Customer</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Date</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Amount</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="px-4 py-3 font-medium">{order.id}</td>
                      <td className="px-4 py-3">{order.customer}</td>
                      <td className="px-4 py-3 text-gray-500">{order.date}</td>
                      <td className="px-4 py-3 font-medium">{formatPrice(order.amount)}</td>
                      <td className="px-4 py-3">
                        <span className={cn(
                          "text-xs px-2 py-1 rounded-full",
                          order.status === 'confirmed' && "bg-blue-100 text-blue-600",
                          order.status === 'shipped' && "bg-purple-100 text-purple-600",
                          order.status === 'pending' && "bg-yellow-100 text-yellow-600",
                          order.status === 'delivered' && "bg-green-100 text-green-600"
                        )}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button className="text-primary-600 hover:text-primary-700 text-sm">
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'products':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Products Management</h2>
              <button 
                onClick={handleOpenAddProduct}
                className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
              >
                <Plus className="w-4 h-4" />
                Add Product
              </button>
            </div>

            <div className="card overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium">Product</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Category</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Price</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Stock</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {allProducts.slice(0, 10).map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <p className="font-medium text-sm line-clamp-1">{product.name}</p>
                            <p className="text-xs text-gray-500">{product.brand}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm capitalize">{product.category.replace(/-/g, ' ')}</td>
                      <td className="px-4 py-3 font-medium">{formatPrice(product.price)}</td>
                      <td className="px-4 py-3">
                        <span className={product.stock <= 10 ? "text-red-600" : ""}>
                          {product.stock}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={cn(
                          "text-xs px-2 py-1 rounded-full",
                          product.stock > 0 ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                        )}>
                          {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => handleOpenEditProduct(product)}
                            className="text-primary-600 hover:text-primary-700"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => setShowDeleteConfirm(product.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Store Settings</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="card p-6">
                <h3 className="font-semibold mb-4">Business Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Store Name</label>
                    <input type="text" defaultValue={shopInfo.name} className="input" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Phone</label>
                    <input type="text" defaultValue={shopInfo.phone} className="input" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Email</label>
                    <input type="email" defaultValue={shopInfo.email} className="input" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Address</label>
                    <textarea defaultValue={shopInfo.address} className="input" rows={3} />
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <h3 className="font-semibold mb-4">Order Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Free Shipping Above (₹)</label>
                    <input type="number" defaultValue={500} className="input" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Default Shipping Charge (₹)</label>
                    <input type="number" defaultValue={50} className="input" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Tax Rate (%)</label>
                    <input type="number" defaultValue={18} className="input" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Low Stock Alert</label>
                    <input type="number" defaultValue={10} className="input" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600">
                Save Changes
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform lg:relative",
        sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-xl font-bold">Admin Panel</h1>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="p-4 space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setSidebarOpen(false);
              }}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                activeTab === item.id
                  ? "bg-primary-50 dark:bg-primary-900/30 text-primary-600"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">Admin Dashboard</span>
              <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-white font-medium">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Add/Edit Product Modal */}
      {showProductModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button onClick={() => setShowProductModal(false)} className="text-gray-500 hover:text-gray-700">
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Product Name *</label>
                  <input
                    type="text"
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    className="input"
                    placeholder="Enter product name"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Category *</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="input"
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.slug}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Price (₹) *</label>
                  <input
                    type="number"
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                    className="input"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Original Price (₹)</label>
                  <input
                    type="number"
                    value={productForm.originalPrice}
                    onChange={(e) => setProductForm({ ...productForm, originalPrice: e.target.value })}
                    className="input"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Brand</label>
                  <input
                    type="text"
                    value={productForm.brand}
                    onChange={(e) => setProductForm({ ...productForm, brand: e.target.value })}
                    className="input"
                    placeholder="Enter brand name"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Stock *</label>
                  <input
                    type="number"
                    value={productForm.stock}
                    onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                    className="input"
                    placeholder="0"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Description *</label>
                <textarea
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  className="input"
                  rows={4}
                  placeholder="Enter product description"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Image URL</label>
                <input
                  type="text"
                  value={productForm.images[0]}
                  onChange={(e) => setProductForm({ ...productForm, images: [e.target.value] })}
                  className="input"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Features (comma separated)</label>
                <input
                  type="text"
                  value={productForm.features.join(', ')}
                  onChange={(e) => setProductForm({ ...productForm, features: e.target.value.split(', ') })}
                  className="input"
                  placeholder="Feature 1, Feature 2, Feature 3"
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setShowProductModal(false)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProduct}
                disabled={!productForm.name || !productForm.category || !productForm.price}
                className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {editingProduct ? 'Update Product' : 'Add Product'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-6">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                <Trash2 className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Delete Product?</h3>
              <p className="text-gray-500 mb-6">
                Are you sure you want to delete this product? This action cannot be undone.
              </p>
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteProduct(showDeleteConfirm)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}