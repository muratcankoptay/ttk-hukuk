'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

// Kullanıcı tipi
interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'editor'
  avatar?: string
}

// Demo kullanıcılar
const DEMO_USERS = [
  {
    id: '1',
    name: 'Admin Kullanıcı',
    email: 'admin@ttkhukuk.com',
    password: 'admin123',
    role: 'admin' as const,
    avatar: '/team/admin.jpg'
  },
  {
    id: '2',
    name: 'Editör Kullanıcı',
    email: 'editor@ttkhukuk.com',
    password: 'editor123',
    role: 'editor' as const,
    avatar: '/team/editor.jpg'
  }
]

// Context tipi
interface AdminAuthContextType {
  user: User | null
  users: User[]
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  addUser: (user: Omit<User, 'id'> & { password: string }) => void
  updateUser: (id: string, user: Partial<User>) => void
  deleteUser: (id: string) => boolean
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined)

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // localStorage'dan kullanıcı bilgilerini yükle
  useEffect(() => {
    const loadAuth = () => {
      try {
        // Kullanıcı oturumunu kontrol et
        const savedUser = localStorage.getItem('admin_user')
        if (savedUser) {
          setUser(JSON.parse(savedUser))
        }

        // Kullanıcı listesini yükle
        const savedUsers = localStorage.getItem('admin_users')
        if (savedUsers) {
          setUsers(JSON.parse(savedUsers))
        } else {
          // Demo kullanıcıları yükle (şifreler hariç)
          const usersWithoutPasswords = DEMO_USERS.map(({ password, ...rest }) => rest)
          setUsers(usersWithoutPasswords)
          localStorage.setItem('admin_users', JSON.stringify(usersWithoutPasswords))
        }
      } catch (error) {
        console.error('Auth yükleme hatası:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadAuth()
  }, [])

  // Giriş fonksiyonu
  const login = async (email: string, password: string): Promise<boolean> => {
    // Simüle edilmiş gecikme
    await new Promise(resolve => setTimeout(resolve, 500))

    // Demo kullanıcılardan kontrol et
    const foundUser = DEMO_USERS.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    )

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)
      localStorage.setItem('admin_user', JSON.stringify(userWithoutPassword))
      return true
    }

    return false
  }

  // Çıkış fonksiyonu
  const logout = () => {
    setUser(null)
    localStorage.removeItem('admin_user')
  }

  // Kullanıcı ekleme
  const addUser = (newUser: Omit<User, 'id'> & { password: string }) => {
    const { password, ...userWithoutPassword } = newUser
    const user: User = {
      ...userWithoutPassword,
      id: Date.now().toString()
    }
    
    const updatedUsers = [...users, user]
    setUsers(updatedUsers)
    localStorage.setItem('admin_users', JSON.stringify(updatedUsers))
  }

  // Kullanıcı güncelleme
  const updateUser = (id: string, updates: Partial<User>) => {
    const updatedUsers = users.map(u => 
      u.id === id ? { ...u, ...updates } : u
    )
    setUsers(updatedUsers)
    localStorage.setItem('admin_users', JSON.stringify(updatedUsers))

    // Eğer güncellenen kullanıcı aktif kullanıcı ise, onu da güncelle
    if (user?.id === id) {
      const updatedUser = { ...user, ...updates }
      setUser(updatedUser)
      localStorage.setItem('admin_user', JSON.stringify(updatedUser))
    }
  }

  // Kullanıcı silme
  const deleteUser = (id: string): boolean => {
    // Kendini silemez
    if (user?.id === id) {
      return false
    }

    const updatedUsers = users.filter(u => u.id !== id)
    setUsers(updatedUsers)
    localStorage.setItem('admin_users', JSON.stringify(updatedUsers))
    return true
  }

  return (
    <AdminAuthContext.Provider
      value={{
        user,
        users,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        addUser,
        updateUser,
        deleteUser
      }}
    >
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
