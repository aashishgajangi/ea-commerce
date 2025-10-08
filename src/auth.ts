import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { compare } from "bcryptjs"
import { db } from "@/lib/db"
import { z } from "zod"

declare module "next-auth" {
  interface User {
    role: string
    emailVerified?: Date | null
  }
  interface Session {
    user: {
      id: string
      email: string
      name?: string
      role: string
      emailVerified?: Date | null
    }
  }
}

declare module "@auth/core/adapters" {
  interface AdapterUser {
    role: string
  }
}

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  trustHost: true,
  pages: {
    signIn: "/login",
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          const { email, password } = loginSchema.parse(credentials)

          const user = await db.user.findUnique({
            where: { email }
          })

          if (!user || !user.password) {
            return null
          }

          // Check if email is verified
           if (!user.emailVerified) {
             throw new Error("EMAIL_NOT_VERIFIED")
           }

          const isValid = await compare(password, user.password)
          if (!isValid) {
            return null
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            emailVerified: user.emailVerified,
          }
        } catch (error) {
          if (error instanceof z.ZodError) {
            return null
          }
          throw error
        }
      }
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Handle OAuth sign in
      if (account?.provider === "google") {
        try {
          // Check if user exists
          const existingUser = await db.user.findUnique({
            where: { email: user.email! }
          })

          if (!existingUser) {
            // Create new user for OAuth
            await db.user.create({
              data: {
                email: user.email!,
                name: user.name,
                image: user.image,
                role: "customer",
                emailVerified: new Date(), // OAuth emails are pre-verified
              }
            })
          }
          return true
        } catch (error) {
          console.error("OAuth sign in error:", error)
          return false
        }
      }
      return true
    },
    async session({ session, token }) {
      console.log("Session callback:", { token, session })
      if (token) {
        session.user.id = token.sub!
        session.user.role = token.role as string
        session.user.emailVerified = token.emailVerified as Date | null
      }
      return session
    },
    async jwt({ token, user, account }) {
      console.log("JWT callback:", { token, user, account })
      if (user) {
        token.role = user.role
        token.emailVerified = user.emailVerified
      }
      // For OAuth users, ensure emailVerified is set
      if (account?.provider === "google" && !token.emailVerified) {
        token.emailVerified = new Date()
      }
      return token
    }
  }
})