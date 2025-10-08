import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import { db } from "@/lib/db"

// GET /api/user/profile - Get current user's profile
export async function GET() {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const profile = await db.customerProfile.findUnique({
      where: { userId: session.user.id },
      include: {
        addresses: true,
      },
    })

    if (!profile) {
      // Return empty profile structure
      return NextResponse.json({
        firstName: null,
        lastName: null,
        dateOfBirth: null,
        gender: null,
        phone: null,
        newsletter: true,
        addresses: [],
      })
    }

    return NextResponse.json(profile)
  } catch (error) {
    console.error("Error fetching profile:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

// PUT /api/user/profile - Update current user's profile
export async function PUT(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { firstName, lastName, dateOfBirth, gender, phone, newsletter } = body

    const profile = await db.customerProfile.upsert({
      where: { userId: session.user.id },
      update: {
        firstName,
        lastName,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        gender,
        phone,
        newsletter,
      },
      create: {
        userId: session.user.id,
        firstName,
        lastName,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        gender,
        phone,
        newsletter,
      },
    })

    return NextResponse.json(profile)
  } catch (error) {
    console.error("Error updating profile:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}