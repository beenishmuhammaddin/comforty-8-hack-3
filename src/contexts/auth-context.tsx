"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
// import { verifyPassword, verifyCredentials } from "@/lib/auth"

interface User {
  id: string
  username: string
  role: "admin"
}

interface AuthContextType {
  user: User | null
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check for user in localStorage on page load
    const savedUser = localStorage.getItem("admin-user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (username: string, password: string) => {
    if (username === "admin" && password === "admin123") {
      const adminUser = { id: "1", username: "admin", role: "admin" as const }
      localStorage.setItem("admin-user", JSON.stringify(adminUser))
      setUser(adminUser)
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("admin-user")
    router.push("/admin/login")
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
