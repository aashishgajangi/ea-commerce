import { auth } from "@/auth"
import { NextResponse } from "next/server"
import { config as configService } from "@/lib/config"

export const runtime = "nodejs"

export default auth(async (req) => {
  const { pathname } = req.nextUrl
  const session = req.auth

  // Allow access to setup and setup-related routes
  if (
    pathname.startsWith("/setup") ||
    pathname.startsWith("/api/setup")
  ) {
    return NextResponse.next()
  }

  // Check if setup is complete
  const isSetupComplete = await configService.isSetupComplete()
  if (!isSetupComplete) {
    return NextResponse.redirect(new URL("/setup", req.url))
  }

  // Allow access to auth-related pages
  if (
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/forgot-password") ||
    pathname.startsWith("/reset-password") ||
    pathname.startsWith("/verify-email") ||
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/api/user")
  ) {
    return NextResponse.next()
  }

  // Allow access to public pages (homepage, products, etc.)
  if (
    pathname === "/" ||
    pathname.startsWith("/products") ||
    pathname.startsWith("/[slug]")
  ) {
    return NextResponse.next()
  }

  // Allow access to admin routes only for admin users
  if (pathname.startsWith("/admin")) {
    console.log("Admin route access attempt:", {
      pathname,
      hasSession: !!session,
      userRole: session?.user?.role,
      userId: session?.user?.id
    })
    if (!session || session.user.role !== "admin") {
      return NextResponse.redirect(new URL("/login", req.url))
    }
    return NextResponse.next()
  }

  // For customer routes, check if user is verified
  if (session && !session.user.emailVerified) {
    // Redirect to verification page or show message
    return NextResponse.redirect(new URL("/verify-email?pending=true", req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - uploads (uploaded media files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|uploads).*)",
  ],
}
