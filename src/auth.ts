import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
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
  pages: {
    signIn: "/login",
  },
  providers: [
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
    async session({ session, token }) {
      console.log("Session callback:", { token, session })
      if (token) {
        session.user.id = token.sub!
        session.user.role = token.role as string
        session.user.emailVerified = token.emailVerified as Date | null
      }
      return session
    },
    async jwt({ token, user }) {
      console.log("JWT callback:", { token, user })
      if (user) {
        token.role = user.role
        token.emailVerified = user.emailVerified
      }
      return token
    }
  }
})