import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const encodedToken = searchParams.get("token")

    if (!encodedToken) {
      return NextResponse.json(
        { error: "Verification token is required" },
        { status: 400 }
      )
    }

    // Decode the token in case it was URL-encoded
    const token = decodeURIComponent(encodedToken)

    // Find user with this verification token
    const user = await db.user.findFirst({
      where: { emailVerificationToken: token }
    })

    if (!user) {
      return NextResponse.json(
        { error: "Invalid or expired verification token" },
        { status: 400 }
      )
    }

    // Update user as verified
    await db.user.update({
      where: { id: user.id },
      data: {
        emailVerified: new Date(),
        emailVerificationToken: null,
      },
    })

    // Redirect to login page with success message
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("verified", "true")

    return NextResponse.redirect(loginUrl)
  } catch (error) {
    console.error("Email verification error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}