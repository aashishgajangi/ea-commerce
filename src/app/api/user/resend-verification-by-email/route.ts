import { NextRequest, NextResponse } from "next/server"
import { randomBytes } from "crypto"
import { z } from "zod"
import { db } from "@/lib/db"
import { sendVerificationEmail } from "@/lib/email"

const resendSchema = z.object({
  email: z.string().email("Invalid email address"),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = resendSchema.parse(body)

    // Find user by email
    const user = await db.user.findUnique({
      where: { email }
    })

    if (!user) {
      // Don't reveal if email exists for security
      return NextResponse.json({
        message: "If an account with that email exists, a verification email has been sent."
      })
    }

    // Check if already verified
    if (user.emailVerified) {
      return NextResponse.json({
        message: "Email is already verified."
      })
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
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      )
    }

    console.error("Resend verification by email error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}