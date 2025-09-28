import { NextRequest, NextResponse } from "next/server";
import { registerUser } from "../../../../lib/auth";
import { z } from "zod";

const registerSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    name: z.string().min(2, "Name must be at least 2 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validatedFields = registerSchema.safeParse(body);

    if (!validatedFields.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validatedFields.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const { email, password, name } = validatedFields.data;

    const result = await registerUser(email, password, name);

    return NextResponse.json({
      success: true,
      message: "User registered successfully",
      userId: result.userId,
    });
  } catch (error) {
    console.error("Registration API error:", error);

    if (error instanceof Error) {
      if (error.message === "User already exists") {
        return NextResponse.json(
          { error: "An account with this email already exists" },
          { status: 409 },
        );
      }
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
