"use client"

import { useState, useEffect, ReactNode } from "react"
import { auth } from "@/lib/firebase"
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const ADMIN_EMAIL = "real-beauty-2025@gmail.com"

export default function AdminWrapper({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u)
      setLoading(false)
    })
    return () => unsub()
  }, [])

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (e: any) {
      alert("❌ Login failed: " + e.message)
    }
  }

  const logout = async () => {
    await signOut(auth)
  }

  if (loading) return <div className="p-6 text-center">Loading...</div>

  if (!user || user.email !== ADMIN_EMAIL) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="p-6 border rounded-lg space-y-4 w-80 shadow-md bg-white">
          <h1 className="text-xl font-bold text-center text-gray-800">Admin Login</h1>
          <Input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={login} className="w-full">
            Login
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-end p-4 border-b">
        <Button variant="outline" onClick={logout}>
          Logout
        </Button>
      </div>
      {children}
    </div>
  )
}
