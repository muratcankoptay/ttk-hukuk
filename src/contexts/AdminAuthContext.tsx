'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface AdminUser {
  email: string
  name: string
  role: 'admin' | 'editor'
}

interface AdminAuthContextType {
  user: AdminUser | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined)

// Demo kullanıcılar (gerçek uygulamada backend'den gelir)
const DEMO_USERS = [
  { email: 'admin@ttkhukuk.com', password: 'admin123', name: 'Admin', role: 'admin' as const },
  { email: 'editor@ttkhukuk.com', password: 'editor123', name: 'Editör', role: 'editor' as const }
]

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // LocalStorage'dan kullanıcı bilgisini kontrol et
    const storedUser = localStorage.getItem('adminUser')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch {
        localStorage.removeItem('adminUser')
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Demo authentication
    const foundUser = DEMO_USERS.find(
      u => u.email === email && u.password === password
    )

    if (foundUser) {
      const userData: AdminUser = {
        email: foundUser.email,
        name: foundUser.name,
        role: foundUser.role
      }
      setUser(userData)
      localStorage.setItem('adminUser', JSON.stringify(userData))
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('adminUser')
  }

  return (
    <AdminAuthContext.Provider value={{
      user,
      isLoading,
      login,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AdminAuthContext.Provider>
  )
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext)
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider')
  }
  return context
}
