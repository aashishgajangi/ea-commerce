'use client';

import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Image, FileText, Menu, Settings, ArrowRight, Package, FolderTree, Warehouse, Star, Users, LogOut, ExternalLink, Palette, MessageCircle, TrendingUp, Smartphone, ShoppingCart, Database } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--theme-background, #f8fafc)' }}>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-bold" style={{ color: 'var(--theme-text, #0f172a)' }}>
                Admin Dashboard
              </h1>
              <p className="mt-2" style={{ color: 'var(--theme-text, #64748b)' }}>
                Welcome to your E-Commerce Platform
              </p>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => signOut()} variant="outline" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href="/" target="_blank">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Visit Site
                </Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  Setup Complete
                </CardTitle>
                <CardDescription>
                  Your store is ready to go!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  The setup wizard has been completed successfully. You can now start
                  building your content and managing your store.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Content Management
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Link href="/admin/media" aria-label="Media Library">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Image className="h-5 w-5 text-blue-500" role="img" aria-label="Media icon" />
                      Media Library
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                      Upload and manage images, files, and media assets
                    </p>
                    <Button variant="ghost" size="sm" className="w-full">
                      Open Library <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/admin/pages" aria-label="Pages">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-green-500" role="img" aria-label="Pages icon" />
                      Pages
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                      Create and manage static pages with SEO
                    </p>
                    <Button variant="ghost" size="sm" className="w-full">
                      Open Pages <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/admin/seo" aria-label="SEO Dashboard">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-emerald-500" role="img" aria-label="SEO icon" />
                      SEO Dashboard
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                      Monitor and optimize SEO across all pages
                    </p>
                    <Button variant="ghost" size="sm" className="w-full">
                      View Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/admin/menus" aria-label="Menus">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Menu className="h-5 w-5 text-purple-500" role="img" aria-label="Menus icon" />
                      Menus
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                      Build navigation menus for your site
                    </p>
                    <Button variant="ghost" size="sm" className="w-full">
                      Open Menus <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/admin/settings" aria-label="Settings">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5 text-orange-500" role="img" aria-label="Settings icon" />
                      Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                      Configure site settings and appearance
                    </p>
                    <Button variant="ghost" size="sm" className="w-full">
                      Open Settings <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/admin/theme" aria-label="Theme">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Palette className="h-5 w-5 text-violet-500" role="img" aria-label="Theme icon" />
                      Theme
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                      Customize colors and styling options
                    </p>
                    <Button variant="ghost" size="sm" className="w-full">
                      Open Theme <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/admin/settings/whatsapp" aria-label="WhatsApp Widget">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageCircle className="h-5 w-5 text-green-500" role="img" aria-label="WhatsApp icon" />
                      WhatsApp
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                      Configure WhatsApp chat widget
                    </p>
                    <Button variant="ghost" size="sm" className="w-full">
                      Configure Widget <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/admin/settings/pwa" aria-label="Progressive Web App">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full bg-gradient-to-br from-purple-50 to-blue-50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Smartphone className="h-5 w-5 text-purple-600" role="img" aria-label="PWA icon" />
                      Progressive Web App
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                      Configure PWA settings & install prompt
                    </p>
                    <Button variant="ghost" size="sm" className="w-full">
                      Configure PWA <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/admin/cache" aria-label="Cache Management">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full bg-gradient-to-br from-red-50 to-orange-50 border-red-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Database className="h-5 w-5 text-red-600" role="img" aria-label="Cache icon" />
                      Cache Management
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                      Manage Redis cache and performance
                    </p>
                    <Button variant="ghost" size="sm" className="w-full">
                      Manage Cache <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Product Management
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Link href="/admin/categories" aria-label="Categories">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FolderTree className="h-5 w-5 text-indigo-500" role="img" aria-label="Categories icon" />
                      Categories
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                      Manage product categories and hierarchy
                    </p>
                    <Button variant="ghost" size="sm" className="w-full">
                      Open Categories <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/admin/products" aria-label="Products">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="h-5 w-5 text-pink-500" role="img" aria-label="Products icon" />
                      Products
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                      Manage products, variants, and pricing
                    </p>
                    <Button variant="ghost" size="sm" className="w-full">
                      Open Products <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/admin/reviews" aria-label="Reviews">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-yellow-500" role="img" aria-label="Reviews icon" />
                      Reviews
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                      Manage customer reviews and ratings
                    </p>
                    <Button variant="ghost" size="sm" className="w-full">
                      Open Reviews <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/admin/inventory" aria-label="Inventory">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Warehouse className="h-5 w-5 text-teal-500" role="img" aria-label="Inventory icon" />
                      Inventory
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                      Track stock levels and manage inventory
                    </p>
                    <Button variant="ghost" size="sm" className="w-full">
                      Open Inventory <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Orders & Sales
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Link href="/admin/orders" aria-label="Orders">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ShoppingCart className="h-5 w-5 text-blue-600" role="img" aria-label="Orders icon" />
                      Orders
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                      Manage orders, payments, and fulfillment
                    </p>
                    <Button variant="ghost" size="sm" className="w-full">
                      View Orders <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              User Management
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Link href="/admin/users" aria-label="Users">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-cyan-500" role="img" aria-label="Users icon" />
                      Users
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                      Manage customer accounts and admin users
                    </p>
                    <Button variant="ghost" size="sm" className="w-full">
                      Open Users <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                Phase 8: Orders & Payments - Complete
              </CardTitle>
              <CardDescription>
                Order management system with Razorpay integration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  Multi-step checkout process
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  Razorpay payment gateway integration
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  Order management system with status tracking
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  Customer order history
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  Payment status sync with Razorpay
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}