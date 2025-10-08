"use client"

import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AuthLinks() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <div className="w-20 h-8 bg-gray-200 animate-pulse rounded"></div>
  }

  if (session) {
    return (
      <div className="flex items-center gap-4">
        <Link href="/account" className="text-sm text-gray-700 hover:text-gray-900">
          Welcome, {session.user.name || session.user.email}
        </Link>
        <Button
          variant="outline"
          size="sm"
          onClick={() => signOut()}
        >
          Sign out
        </Button>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <Link href="/login">
        <Button variant="ghost" size="sm">
          Sign in
        </Button>
      </Link>
      <Link href="/register">
        <Button size="sm">
          Sign up
        </Button>
      </Link>
    </div>
  )
}