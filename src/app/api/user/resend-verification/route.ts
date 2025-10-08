import { NextResponse } from "next/server"
import { randomBytes } from "crypto"
import { auth } from "@/auth"
import { db } from "@/lib/db"
import { sendVerificationEmail } from "@/lib/email"

export async function POST() {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Find the user
    const user = await db.user.findUnique({
      where: { id: session.user.id }
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Check if already verified
    if (user.emailVerified) {
      return NextResponse.json({ error: "Email already verified" }, { status: 400 })
    }

    // Generate new verification token
    const verificationToken = randomBytes(32).toString("hex")

    // Update user with new token
    await db.user.update({
      where: { id: user.id },
      data: {
        emailVerificationToken: verificationToken,
      },
    })

    // Send verification email
    const emailResult = await sendVerificationEmail(user.email, verificationToken)

    if (!emailResult.success) {
      console.error("Failed to send verification email:", emailResult.error)
      return NextResponse.json(
        { error: "Failed to send verification email" },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: "Verification email sent successfully"
    })
  } catch (error) {
    console.error("Resend verification error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}