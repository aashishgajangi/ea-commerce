export default function AdminDashboard() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">EA Commerce Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Phase 2.1 Status */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Phase 2.1 Progress</h2>
          <div className="space-y-3">
            <div className="flex items-center">
              <span className="text-green-600 mr-2">✓</span>
              <span>Database schema with Products & Categories</span>
            </div>
            <div className="flex items-center">
              <span className="text-green-600 mr-2">✓</span>
              <span>tRPC API routers implemented</span>
            </div>
            <div className="flex items-center">
              <span className="text-green-600 mr-2">✓</span>
              <span>CRUD operations for products & categories</span>
            </div>
            <div className="flex items-center">
              <span className="text-green-600 mr-2">✓</span>
              <span>API endpoints at /api/trpc</span>
            </div>
            <div className="flex items-center">
              <span className="text-yellow-600 mr-2">⚠</span>
              <span>Frontend client (version compatibility issues)</span>
            </div>
          </div>
        </div>

        {/* Database Schema Overview */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Database Schema</h2>
          <div className="space-y-2">
            <div className="border-l-4 border-blue-500 pl-3">
              <h3 className="font-medium">Products</h3>
              <p className="text-sm text-gray-600">
                Full product management with variants, images, and categories
              </p>
            </div>
            <div className="border-l-4 border-green-500 pl-3">
              <h3 className="font-medium">Categories</h3>
              <p className="text-sm text-gray-600">
                Hierarchical categories with SEO support
              </p>
            </div>
            <div className="border-l-4 border-purple-500 pl-3">
              <h3 className="font-medium">Images</h3>
              <p className="text-sm text-gray-600">
                Optimized image management system
              </p>
            </div>
            <div className="border-l-4 border-orange-500 pl-3">
              <h3 className="font-medium">Orders</h3>
              <p className="text-sm text-gray-600">
                Complete order management (Phase 2.2)
              </p>
            </div>
          </div>
        </div>

        {/* API Endpoints */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Available APIs</h2>
          <div className="space-y-2 text-sm">
            <div className="bg-gray-100 p-2 rounded">
              <span className="font-mono text-blue-600">GET</span>
              <span className="ml-2">/api/trpc/products.list</span>
            </div>
            <div className="bg-gray-100 p-2 rounded">
              <span className="font-mono text-green-600">POST</span>
              <span className="ml-2">/api/trpc/products.create</span>
            </div>
            <div className="bg-gray-100 p-2 rounded">
              <span className="font-mono text-yellow-600">PUT</span>
              <span className="ml-2">/api/trpc/products.update</span>
            </div>
            <div className="bg-gray-100 p-2 rounded">
              <span className="font-mono text-blue-600">GET</span>
              <span className="ml-2">/api/trpc/categories.tree</span>
            </div>
            <div className="bg-gray-100 p-2 rounded">
              <span className="font-mono text-green-600">POST</span>
              <span className="ml-2">/api/trpc/categories.create</span>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Next Steps</h2>
          <div className="space-y-2">
            <div className="flex items-center">
              <span className="text-gray-400 mr-2">○</span>
              <span>Fix tRPC client compatibility</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-400 mr-2">○</span>
              <span>Image upload & optimization</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-400 mr-2">○</span>
              <span>Admin UI components</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-400 mr-2">○</span>
              <span>Product management forms</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-400 mr-2">○</span>
              <span>Search & filtering</span>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Details */}
      <div className="mt-8 bg-gray-100 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">
          Phase 2.1 Technical Achievements
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-green-800 mb-2">✅ Completed</h4>
            <ul className="space-y-1 text-gray-700">
              <li>• Comprehensive Prisma schema</li>
              <li>• tRPC server-side APIs</li>
              <li>• Type-safe CRUD operations</li>
              <li>• Product variants & images</li>
              <li>• Hierarchical categories</li>
              <li>• Search & filtering logic</li>
              <li>• Error handling & validation</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-orange-800 mb-2">🔧 In Progress</h4>
            <ul className="space-y-1 text-gray-700">
              <li>• tRPC client setup (version issues)</li>
              <li>• Frontend integration</li>
              <li>• Admin UI components</li>
              <li>• Image upload system</li>
              <li>• Database migration</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
