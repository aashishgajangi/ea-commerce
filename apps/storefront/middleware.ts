import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// Middleware to protect routes that require authentication
export default withAuth(
  function middleware(req) {
    // You can add additional logic here if needed
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Protected routes that require authentication
        const protectedPaths = ["/checkout", "/orders", "/cart"];
        const path = req.nextUrl.pathname;

        // Check if current path requires authentication
        const isProtectedPath = protectedPaths.some((protectedPath) =>
          path.startsWith(protectedPath),
        );

        // If it's a protected path, require authentication
        if (isProtectedPath) {
          return !!token;
        }

        // Allow access to all other routes
        return true;
      },
    },
    pages: {
      signIn: "/auth/signin",
    },
  },
);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     * - auth pages (to avoid redirect loops)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public|auth).*)",
  ],
};
