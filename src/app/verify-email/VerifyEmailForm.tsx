"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function VerifyEmailForm() {
  const [status, setStatus] = useState<"loading" | "success" | "error" | "pending">("loading")
  const [message, setMessage] = useState("")
  const [resendLoading, setResendLoading] = useState(false)
  const [resendEmail, setResendEmail] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const pending = searchParams.get("pending")

  const resendVerificationEmail = async () => {
    if (!resendEmail) {
      setMessage("Please enter your email address")
      return
    }

    setResendLoading(true)
    try {
      const response = await fetch("/api/user/resend-verification-by-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: resendEmail }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage("Verification email sent! Please check your email.")
      } else {
        setMessage(data.error || "Failed to send verification email")
      }
    } catch {
      setMessage("An error occurred while sending the email")
    } finally {
      setResendLoading(false)
    }
  }

  useEffect(() => {
    if (pending === "true") {
      setStatus("pending")
      setMessage("Please check your email for the verification link. If you haven't received it, you can request a new one.")
      return
    }

    if (!token) {
      setStatus("error")
      setMessage("Invalid verification link")
      return
    }

    // Call the verification API
    fetch(`/api/user/verify-email?token=${token}`)
      .then((response) => {
        if (response.redirected) {
          // API redirected to login
          router.push(response.url)
        } else {
          return response.json()
        }
      })
      .then((data) => {
        if (data?.error) {
          setStatus("error")
          setMessage(data.error)
        } else {
          setStatus("success")
          setMessage("Your email has been verified successfully!")
          setTimeout(() => {
            router.push("/login")
          }, 2000)
        }
      })
      .catch(() => {
        setStatus("error")
        setMessage("An error occurred while verifying your email")
      })
  }, [token, router, pending])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Email Verification</CardTitle>
          <CardDescription className="text-center">
            Verifying your email address...
          </CardDescription>
        </CardHeader>
        <CardContent>
          {status === "pending" && (
            <div className="space-y-4">
              <Alert>
                <AlertDescription>{message}</AlertDescription>
              </Alert>
              <div className="space-y-2">
                <Label htmlFor="resendEmail">Email Address</Label>
                <Input
                  id="resendEmail"
                  type="email"
                  placeholder="Enter your email address"
                  value={resendEmail}
                  onChange={(e) => setResendEmail(e.target.value)}
                  required
                />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={resendVerificationEmail}
                  disabled={resendLoading}
                  className="flex-1"
                >
                  {resendLoading ? "Sending..." : "Resend Verification Email"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => router.push("/login")}
                  className="flex-1"
                >
                  Go to Login
                </Button>
              </div>
            </div>
          )}

          {status === "loading" && (
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Please wait...</p>
            </div>
          )}

          {status === "success" && (
            <Alert>
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}

          {status === "error" && (
            <div className="space-y-4">
              <Alert variant="destructive">
                <AlertDescription>{message}</AlertDescription>
              </Alert>
              <Button
                onClick={() => router.push("/login")}
                className="w-full"
              >
                Go to Login
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}