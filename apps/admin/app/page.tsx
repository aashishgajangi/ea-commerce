import styles from "./page.module.css";

export default function AdminHome() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🏪 EA Commerce Admin Panel
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Enterprise E-Commerce Administration Dashboard
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Phase 1.2 - Database & Authentication Status
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-700">
                  ✅ Completed Features
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm text-green-700">
                    <svg
                      className="h-4 w-4 text-green-500 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    PostgreSQL + Prisma + Redis Setup
                  </li>
                  <li className="flex items-center text-sm text-green-700">
                    <svg
                      className="h-4 w-4 text-green-500 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Auth.js with Google OAuth + Email/Password
                  </li>
                  <li className="flex items-center text-sm text-green-700">
                    <svg
                      className="h-4 w-4 text-green-500 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Session Management with Error Handling
                  </li>
                  <li className="flex items-center text-sm text-green-700">
                    <svg
                      className="h-4 w-4 text-green-500 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Protected Routes Middleware
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-700">
                  🚀 Ready for Phase 2
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Product Management System</li>
                  <li>• Shopping Cart & Checkout</li>
                  <li>• Payment Integration</li>
                  <li>• Order Management</li>
                  <li>• Admin CRUD Operations</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium text-gray-800">
                    Admin Panel Status
                  </h4>
                  <p className="text-sm text-gray-600">
                    Ready for Phase 2 implementation
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-indigo-600">
                    Port: 3001
                  </p>
                  <p className="text-xs text-gray-500">Admin Interface</p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-blue-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800">
                      Next Steps
                    </h3>
                    <div className="mt-2 text-sm text-blue-700">
                      <p>
                        Visit the <strong>Storefront</strong> at{" "}
                        <a
                          href="http://localhost:3000"
                          className="underline hover:text-blue-900"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          http://localhost:3000
                        </a>{" "}
                        to test the authentication system.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
