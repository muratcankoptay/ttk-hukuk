'use client'

import { useState } from 'react'
import { useAdminAuth } from '@/context/AdminAuthContext'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Users, 
  Plus, 
  Edit, 
  Trash2, 
  Shield, 
  User,
  Mail,
  Calendar,
  X,
  AlertCircle,
  CheckCircle
} from 'lucide-react'
import { format } from 'date-fns'
import { tr } from 'date-fns/locale'

// Demo kullanıcılar
const DEMO_USERS = [
  {
    id: '1',
    name: 'Admin Kullanıcı',
    email: 'admin@ttkhukuk.com',
    role: 'admin' as const,
    createdAt: '2024-01-01T00:00:00Z',
    lastLogin: '2025-01-14T10:30:00Z'
  },
  {
    id: '2',
    name: 'Editör Kullanıcı',
    email: 'editor@ttkhukuk.com',
    role: 'editor' as const,
    createdAt: '2024-06-15T00:00:00Z',
    lastLogin: '2025-01-13T14:20:00Z'
  }
]

export default function UsersPage() {
  const { user: currentUser } = useAdminAuth()
  const [users, setUsers] = useState(DEMO_USERS)
  const [showModal, setShowModal] = useState(false)
  const [editingUser, setEditingUser] = useState<typeof DEMO_USERS[0] | null>(null)
  const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'editor' as 'admin' | 'editor',
    password: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Sadece admin görebilir
  if (currentUser?.role !== 'admin') {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Shield size={64} className="mx-auto mb-4 text-gray-300" />
          <h2 className="text-xl font-bold text-gray-800 mb-2">Erişim Engellendi</h2>
          <p className="text-gray-500">Bu sayfayı görüntülemek için admin yetkisi gereklidir.</p>
        </div>
      </div>
    )
  }

  const openNewModal = () => {
    setFormData({ name: '', email: '', role: 'editor', password: '' })
    setEditingUser(null)
    setErrors({})
    setShowModal(true)
  }

  const openEditModal = (user: typeof DEMO_USERS[0]) => {
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      password: ''
    })
    setEditingUser(user)
    setErrors({})
    setShowModal(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) {
      newErrors.name = 'İsim zorunludur'
    }
    if (!formData.email.trim()) {
      newErrors.email = 'E-posta zorunludur'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Geçerli bir e-posta girin'
    }
    if (!editingUser && !formData.password) {
      newErrors.password = 'Şifre zorunludur'
    } else if (!editingUser && formData.password.length < 6) {
      newErrors.password = 'Şifre en az 6 karakter olmalıdır'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (!validate()) return

    if (editingUser) {
      setUsers(prev => prev.map(u =>
        u.id === editingUser.id
          ? { ...u, name: formData.name, email: formData.email, role: formData.role }
          : u
      ))
    } else {
      const newUser = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        role: formData.role,
        createdAt: new Date().toISOString(),
        lastLogin: null as string | null
      }
      setUsers(prev => [...prev, newUser as typeof DEMO_USERS[0]])
    }
    
    setShowModal(false)
  }

  const handleDelete = (id: string) => {
    setUsers(prev => prev.filter(u => u.id !== id))
    setShowDeleteModal(null)
  }

  const getRoleBadge = (role: string) => {
    return role === 'admin' ? (
      <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
        <Shield size={12} />
        Admin
      </span>
    ) : (
      <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
        <User size={12} />
        Editör
      </span>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Kullanıcılar</h1>
          <p className="text-gray-500">Admin panel kullanıcılarını yönetin</p>
        </div>
        <button
          onClick={openNewModal}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#d4af37] text-[#0a1628] font-semibold rounded-lg hover:bg-[#b8962e] transition-colors"
        >
          <Plus size={20} />
          Yeni Kullanıcı
        </button>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
        <AlertCircle className="text-blue-500 flex-shrink-0 mt-0.5" size={20} />
        <div>
          <p className="text-blue-800 font-medium">Demo Mod</p>
          <p className="text-blue-600 text-sm">
            Kullanıcı yönetimi demo modunda çalışmaktadır. Gerçek bir projede bu veriler veritabanından gelecektir.
          </p>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kullanıcı
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  E-posta
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rol
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Son Giriş
                </th>
                <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium ${
                        user.role === 'admin' ? 'bg-purple-500' : 'bg-blue-500'
                      }`}>
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{user.name}</p>
                        <p className="text-xs text-gray-500">
                          Üyelik: {format(new Date(user.createdAt), 'd MMM yyyy', { locale: tr })}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail size={16} />
                      {user.email}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {getRoleBadge(user.role)}
                  </td>
                  <td className="px-6 py-4">
                    {user.lastLogin ? (
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar size={16} />
                        {format(new Date(user.lastLogin), 'd MMM yyyy HH:mm', { locale: tr })}
                      </div>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditModal(user)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600"
                        title="Düzenle"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => setShowDeleteModal(user.id)}
                        disabled={user.id === currentUser?.id}
                        className="p-2 hover:bg-red-100 rounded-lg transition-colors text-gray-600 hover:text-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        title={user.id === currentUser?.id ? 'Kendinizi silemezsiniz' : 'Sil'}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl p-6 max-w-md w-full"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">
                  {editingUser ? 'Kullanıcıyı Düzenle' : 'Yeni Kullanıcı'}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>
              
              <div className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    İsim *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Ad Soyad"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] transition-colors ${
                      errors.name ? 'border-red-500' : 'border-gray-200'
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.name}
                    </p>
                  )}
                </div>
                
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    E-posta *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="ornek@ttkhukuk.com"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] transition-colors ${
                      errors.email ? 'border-red-500' : 'border-gray-200'
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.email}
                    </p>
                  )}
                </div>
                
                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Şifre {!editingUser && '*'}
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder={editingUser ? 'Değiştirmek için yeni şifre girin' : 'Şifre'}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] transition-colors ${
                      errors.password ? 'border-red-500' : 'border-gray-200'
                    }`}
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.password}
                    </p>
                  )}
                </div>
                
                {/* Role */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rol
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] transition-colors"
                  >
                    <option value="editor">Editör</option>
                    <option value="admin">Admin</option>
                  </select>
                  <p className="mt-1 text-xs text-gray-500">
                    Admin: Tüm yetkilere sahip | Editör: Makale yönetimi yetkisi
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  İptal
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 px-4 py-2 bg-[#d4af37] text-[#0a1628] rounded-lg hover:bg-[#b8962e] transition-colors font-semibold"
                >
                  {editingUser ? 'Güncelle' : 'Oluştur'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowDeleteModal(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl p-6 max-w-md w-full"
            >
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="text-red-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 text-center mb-2">Kullanıcıyı Sil</h3>
              <p className="text-gray-500 text-center mb-6">
                Bu kullanıcıyı silmek istediğinizden emin misiniz?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(null)}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  İptal
                </button>
                <button
                  onClick={() => handleDelete(showDeleteModal)}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  Sil
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
