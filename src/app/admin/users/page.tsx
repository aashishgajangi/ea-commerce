"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, XCircle, Search, Plus, Edit, Trash2, ArrowLeft } from "lucide-react"

interface User {
  id: string
  email: string
  name: string | null
  role: string
  emailVerified: Date | null
  createdAt: Date
  _count: {
    reviews: number
  }
}

interface Pagination {
  page: number
  limit: number
  total: number
  pages: number
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [pagination, setPagination] = useState<Pagination | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [search, setSearch] = useState("")
  const [roleFilter, setRoleFilter] = useState("")
  const [verifiedFilter, setVerifiedFilter] = useState("")

  const fetchUsers = useCallback(async (page = 1) => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "20",
      })

      if (search) params.set("search", search)
      if (roleFilter) params.set("role", roleFilter)
      if (verifiedFilter) params.set("verified", verifiedFilter)

      const response = await fetch(`/api/admin/users?${params}`)
      if (!response.ok) {
        throw new Error("Failed to fetch users")
      }

      const data = await response.json()
      setUsers(data.users)
      setPagination(data.pagination)
    } catch (error) {
      setError("Failed to load users")
      console.error("Error fetching users:", error)
    } finally {
      setLoading(false)
    }
  }, [search, roleFilter, verifiedFilter])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  const handleDelete = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return

    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete user")
      }

      // Refresh the list
      fetchUsers(pagination?.page || 1)
    } catch (error) {
      setError("Failed to delete user")
      console.error("Error deleting user:", error)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link href="/admin" className="inline-flex items-center text-sm text-slate-600 hover:text-slate-900 mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              User Management
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              Manage customer accounts and admin users
            </p>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                    <Input
                      placeholder="Search by email or name..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="px-3 py-2 border rounded-md text-sm w-full md:w-48"
                >
                  <option value="">All Roles</option>
                  <option value="admin">Admin</option>
                  <option value="customer">Customer</option>
                </select>
                <select
                  value={verifiedFilter}
                  onChange={(e) => setVerifiedFilter(e.target.value)}
                  className="px-3 py-2 border rounded-md text-sm w-full md:w-48"
                >
                  <option value="">All Users</option>
                  <option value="true">Verified</option>
                  <option value="false">Unverified</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Error */}
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Users Table */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Users</CardTitle>
                  <CardDescription>
                    {pagination ? `${pagination.total} total users` : "Loading..."}
                  </CardDescription>
                </div>
                <Button asChild>
                  <Link href="/admin/users/new">
                    <Plus className="h-4 w-4 mr-2" />
                    Add User
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">Loading users...</div>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-4 font-medium">Email</th>
                          <th className="text-left p-4 font-medium">Name</th>
                          <th className="text-left p-4 font-medium">Role</th>
                          <th className="text-left p-4 font-medium">Verified</th>
                          <th className="text-left p-4 font-medium">Reviews</th>
                          <th className="text-left p-4 font-medium">Created</th>
                          <th className="text-left p-4 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user) => (
                          <tr key={user.id} className="border-b hover:bg-gray-50">
                            <td className="p-4 font-medium">{user.email}</td>
                            <td className="p-4">{user.name || "-"}</td>
                            <td className="p-4">
                              <span className={`px-2 py-1 rounded text-xs ${
                                user.role === "admin"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}>
                                {user.role}
                              </span>
                            </td>
                            <td className="p-4">
                              {user.emailVerified ? (
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              ) : (
                                <XCircle className="h-4 w-4 text-red-500" />
                              )}
                            </td>
                            <td className="p-4">{user._count.reviews}</td>
                            <td className="p-4">
                              {new Date(user.createdAt).toLocaleDateString()}
                            </td>
                            <td className="p-4">
                              <div className="flex gap-2">
                                <Button variant="ghost" size="sm" asChild>
                                  <Link href={`/admin/users/${user.id}`}>
                                    <Edit className="h-4 w-4" />
                                  </Link>
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDelete(user.id)}
                                  className="text-red-600 hover:text-red-700"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  {pagination && pagination.pages > 1 && (
                    <div className="flex justify-center mt-6 gap-2">
                      <Button
                        variant="outline"
                        disabled={pagination.page <= 1}
                        onClick={() => fetchUsers(pagination.page - 1)}
                      >
                        Previous
                      </Button>
                      <span className="px-4 py-2 text-sm text-slate-600">
                        Page {pagination.page} of {pagination.pages}
                      </span>
                      <Button
                        variant="outline"
                        disabled={pagination.page >= pagination.pages}
                        onClick={() => fetchUsers(pagination.page + 1)}
                      >
                        Next
                      </Button>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}