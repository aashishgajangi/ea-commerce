"use client"

import { useState } from "react"
import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { User, ChevronDown, UserCheck, Settings, UserCircle, UserRound } from "lucide-react"

interface AuthLinksProps {
  accountIconName?: 'user' | 'person' | 'profile' | 'account' | 'avatar';
}

export default function AuthLinks({ accountIconName = 'user' }: AuthLinksProps) {
  // Icon mapping
  const accountIcons = {
    user: User,
    person: UserCheck,
    profile: UserCircle,
    account: Settings,
    avatar: UserRound
  };

  const AccountIcon = accountIcons[accountIconName] || User;
  const { data: session, status } = useSession()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  // Show loading state
  if (status === "loading") {
    return (
      <div className="flex items-center gap-2">
        <div className="md:hidden">
          <button className="flex items-center gap-1 p-2 text-gray-700">
            <AccountIcon className="w-5 h-5" />
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>
    )
  }

  if (session) {
    return (
      <div className="flex items-center gap-4">
        {/* Desktop */}
        <div className="hidden md:flex items-center gap-4">
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

        {/* Mobile */}
        <div className="md:hidden relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-1 p-2 text-gray-700 hover:text-gray-900"
          >
            <AccountIcon className="w-5 h-5" />
            <ChevronDown className="w-4 h-4" />
          </button>

          {isDropdownOpen && (
            <>
              <div className="absolute right-0 top-full mt-1 bg-white border rounded-md shadow-lg z-50 min-w-48">
                <div className="p-3 border-b">
                  <p className="text-sm text-gray-700">
                    Welcome, {session.user.name || session.user.email}
                  </p>
                </div>
                <Link
                  href="/account"
                  className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  My Account
                </Link>
                <button
                  onClick={() => {
                    signOut()
                    setIsDropdownOpen(false)
                  }}
                  className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  Sign out
                </button>
              </div>

              {/* Backdrop */}
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsDropdownOpen(false)}
              />
            </>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      {/* Desktop */}
      <div className="hidden md:flex items-center gap-2">
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

      {/* Mobile */}
      <div className="md:hidden relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-1 p-2 text-gray-700 hover:text-gray-900"
        >
          <AccountIcon className="w-5 h-5" />
          <ChevronDown className="w-4 h-4" />
        </button>

        {isDropdownOpen && (
          <>
            <div className="absolute right-0 top-full mt-1 bg-white border rounded-md shadow-lg z-50 min-w-32">
              <Link
                href="/login"
                className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                onClick={() => setIsDropdownOpen(false)}
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                onClick={() => setIsDropdownOpen(false)}
              >
                Sign up
              </Link>
            </div>

            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsDropdownOpen(false)}
            />
          </>
        )}
      </div>
    </div>
  )
}