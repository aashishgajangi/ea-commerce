import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import { db } from "@/lib/db"

// PUT /api/user/addresses/[id] - Update address
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
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

    // Verify address belongs to user
    const address = await db.address.findFirst({
      where: {
        id,
        customer: { userId: session.user.id },
      },
    })

    if (!address) {
      return NextResponse.json({ error: "Address not found" }, { status: 404 })
    }

    // If setting as default, unset other defaults
    if (isDefault) {
      await db.address.updateMany({
        where: {
          customerId: address.customerId,
          id: { not: id },
        },
        data: { isDefault: false },
      })
    }

    const updatedAddress = await db.address.update({
      where: { id },
      data: {
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
      },
    })

    return NextResponse.json(updatedAddress)
  } catch (error) {
    console.error("Error updating address:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

// DELETE /api/user/addresses/[id] - Delete address
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params

    // Verify address belongs to user
    const address = await db.address.findFirst({
      where: {
        id,
        customer: { userId: session.user.id },
      },
    })

    if (!address) {
      return NextResponse.json({ error: "Address not found" }, { status: 404 })
    }

    await db.address.delete({
      where: { id },
    })

    return NextResponse.json({ message: "Address deleted successfully" })
  } catch (error) {
    console.error("Error deleting address:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}