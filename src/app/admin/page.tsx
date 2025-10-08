'use client';

import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Image, FileText, Menu, Settings, ArrowRight, Package, FolderTree, Warehouse, Star, Users, LogOut, ExternalLink } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                Admin Dashboard
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-2">
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
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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
              <CardTitle>Phase 5: Product Management System</CardTitle>
              <CardDescription>
                Building complete e-commerce product management
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  Category Management - Hierarchical categories
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  Product Management - Full CRUD with variants
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  Inventory Tracking - Stock management and logs
                </li>
                <li className="flex items-center gap-2 opacity-50">
                  <div className="h-4 w-4 rounded-full border-2 border-slate-300"></div>
                  CSV Import/Export - Bulk operations
                </li>
                <li className="flex items-center gap-2 opacity-50">
                  <div className="h-4 w-4 rounded-full border-2 border-slate-300"></div>
                  Frontend Product Pages - Customer-facing views
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}