'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { AdminAuthProvider, useAdminAuth } from '@/context/AdminAuthContext'
import { AdminDataProvider } from '@/context/AdminDataContext'
import Link from 'next/link'
import { 
  LayoutDashboard, 
  FileText, 
  Settings, 
  Users, 
  FolderOpen,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Home,
  BarChart3,
  MessageSquare,
  Bell
} from 'lucide-react'
import { useState } from 'react'

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const { user, logout, isAuthenticated, isLoading } = useAdminAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    // Login sayfası değilse ve authenticate değilse ve yükleme tamamlandıysa, login'e yönlendir
    if (!isLoading && !isAuthenticated && pathname !== '/admin/login') {
      router.push('/admin/login')
    }
  }, [isAuthenticated, isLoading, pathname, router])

  // Login sayfasıysa layout olmadan render et
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  // Yükleniyorsa veya authenticate değilse loading göster
  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#d4af37]"></div>
      </div>
    )
  }

  const menuItems = [
    { 
      icon: LayoutDashboard, 
      label: 'Dashboard', 
      href: '/admin',
      active: pathname === '/admin'
    },
    { 
      icon: FileText, 
      label: 'Makaleler', 
      href: '/admin/makaleler',
      active: pathname.startsWith('/admin/makaleler')
    },
    { 
      icon: FolderOpen, 
      label: 'Kategoriler', 
      href: '/admin/kategoriler',
      active: pathname === '/admin/kategoriler'
    },
    { 
      icon: MessageSquare, 
      label: 'Mesajlar', 
      href: '/admin/mesajlar',
      active: pathname === '/admin/mesajlar'
    },
    { 
      icon: BarChart3, 
      label: 'İstatistikler', 
      href: '/admin/istatistikler',
      active: pathname === '/admin/istatistikler'
    },
    { 
      icon: Settings, 
      label: 'Ayarlar', 
      href: '/admin/ayarlar',
      active: pathname === '/admin/ayarlar'
    },
  ]

  // Sadece admin rolü için kullanıcı yönetimi
  if (user?.role === 'admin') {
    menuItems.push({ 
      icon: Users, 
      label: 'Kullanıcılar', 
      href: '/admin/kullanicilar',
      active: pathname === '/admin/kullanicilar'
    })
  }

  const handleLogout = () => {
    logout()
    router.push('/admin/login')
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[#0a1628] text-white h-16 flex items-center justify-between px-4">
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <span className="font-bold text-lg">TTK Admin</span>
        <div className="w-6" />
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full bg-[#0a1628] text-white z-50
        transition-all duration-300 ease-in-out
        ${sidebarOpen ? 'w-64' : 'w-20'}
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-white/10">
          {sidebarOpen && (
            <Link href="/admin" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[#d4af37] rounded-lg flex items-center justify-center">
                <span className="text-[#0a1628] font-bold text-sm">TTK</span>
              </div>
              <span className="font-bold text-lg">Admin Panel</span>
            </Link>
          )}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hidden lg:block p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <ChevronDown className={`transform transition-transform ${sidebarOpen ? 'rotate-90' : '-rotate-90'}`} size={20} />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`
                flex items-center space-x-3 px-4 py-3 rounded-lg transition-all
                ${item.active 
                  ? 'bg-[#d4af37] text-[#0a1628]' 
                  : 'hover:bg-white/10 text-gray-300 hover:text-white'
                }
              `}
            >
              <item.icon size={20} />
              {sidebarOpen && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          {/* Siteye Git */}
          <Link
            href="/"
            target="_blank"
            className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-white/10 text-gray-300 hover:text-white transition-all mb-2"
          >
            <Home size={20} />
            {sidebarOpen && <span>Siteye Git</span>}
          </Link>
          
          {/* User Info */}
          {sidebarOpen && user && (
            <div className="px-4 py-3 bg-white/5 rounded-lg mb-2">
              <p className="font-medium text-sm">{user.name}</p>
              <p className="text-xs text-gray-400">{user.email}</p>
              <p className="text-xs text-[#d4af37] capitalize mt-1">{user.role}</p>
            </div>
          )}
          
          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-red-500/20 text-gray-300 hover:text-red-400 transition-all w-full"
          >
            <LogOut size={20} />
            {sidebarOpen && <span>Çıkış Yap</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`
        transition-all duration-300
        ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}
        pt-16 lg:pt-0
      `}>
        {/* Top Bar */}
        <header className="hidden lg:flex h-16 bg-white shadow-sm items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold text-gray-800">
              {menuItems.find(item => item.active)?.label || 'Admin Panel'}
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell size={20} className="text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            {/* User Dropdown */}
            <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
              <div className="w-8 h-8 bg-[#0a1628] rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {user?.name.charAt(0)}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">{user?.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 lg:p-6">
          {children}
        </div>
      </main>
    </div>
  )
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthProvider>
      <AdminDataProvider>
        <AdminLayoutContent>{children}</AdminLayoutContent>
      </AdminDataProvider>
    </AdminAuthProvider>
  )
}
