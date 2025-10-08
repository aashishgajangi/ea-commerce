import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import { db } from "@/lib/db"

// GET /api/user/addresses - Get current user's addresses
export async function GET() {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const profile = await db.customerProfile.findUnique({
      where: { userId: session.user.id },
      include: { addresses: true },
    })

    if (!profile) {
      return NextResponse.json([])
    }

    return NextResponse.json(profile.addresses)
  } catch (error) {
    console.error("Error fetching addresses:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

// POST /api/user/addresses - Create new address
export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const {
      type,
      isDefault,
      firstName,
      lastName,
      company,
      streetAddress,
      apartment,
      city,
      state,
      postalCode,
      country,
      phone,
    } = body

    // Get or create customer profile
    let profile = await db.customerProfile.findUnique({
      where: { userId: session.user.id },
    })

    if (!profile) {
      profile = await db.customerProfile.create({
        data: { userId: session.user.id },
      })
    }

    // If setting as default, unset other defaults
    if (isDefault) {
      await db.address.updateMany({
        where: { customerId: profile.id },
        data: { isDefault: false },
      })
    }

    const address = await db.address.create({
      data: {
        customerId: profile.id,
        type: type || "shipping",
        isDefault: isDefault || false,
        firstName,
        lastName,
        company,
        streetAddress,
        apartment,
        city,
        state,
        postalCode,
        country: country || "US",
        phone,
      },
    })

    return NextResponse.json(address)
  } catch (error) {
    console.error("Error creating address:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}