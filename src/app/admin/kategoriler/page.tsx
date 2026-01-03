'use client'

import { useState } from 'react'
import { useAdminData } from '@/context/AdminDataContext'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Folder,
  FileText,
  X,
  AlertCircle
} from 'lucide-react'

export default function CategoriesPage() {
  const { categories, createCategory, updateCategory, deleteCategory, articles } = useAdminData()
  const [showModal, setShowModal] = useState(false)
  const [editingCategory, setEditingCategory] = useState<{ id: string; name: string; slug: string; description: string } | null>(null)
  const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const openNewModal = () => {
    setFormData({ name: '', slug: '', description: '' })
    setEditingCategory(null)
    setErrors({})
    setShowModal(true)
  }

  const openEditModal = (category: typeof editingCategory) => {
    if (category) {
      setFormData({
        name: category.name,
        slug: category.slug,
        description: category.description
      })
      setEditingCategory(category)
      setErrors({})
      setShowModal(true)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Auto-generate slug
    if (name === 'name') {
      const slug = value
        .toLowerCase()
        .replace(/ğ/g, 'g')
        .replace(/ü/g, 'u')
        .replace(/ş/g, 's')
        .replace(/ı/g, 'i')
        .replace(/ö/g, 'o')
        .replace(/ç/g, 'c')
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim()
      setFormData(prev => ({ ...prev, slug }))
    }
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) {
      newErrors.name = 'Kategori adı zorunludur'
    }
    if (!formData.slug.trim()) {
      newErrors.slug = 'URL slug zorunludur'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (!validate()) return

    if (editingCategory) {
      updateCategory(editingCategory.id, formData)
    } else {
      createCategory(formData)
    }
    
    setShowModal(false)
  }

  const handleDelete = (id: string) => {
    deleteCategory(id)
    setShowDeleteModal(null)
  }

  // Kategori başına makale sayısı
  const getArticleCount = (categoryName: string) => {
    return articles.filter(a => a.category === categoryName).length
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Kategoriler</h1>
          <p className="text-gray-500">Toplam {categories.length} kategori</p>
        </div>
        <button
          onClick={openNewModal}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#d4af37] text-[#0a1628] font-semibold rounded-lg hover:bg-[#b8962e] transition-colors"
        >
          <Plus size={20} />
          Yeni Kategori
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-[#d4af37]/10 rounded-xl flex items-center justify-center">
                <Folder className="text-[#d4af37]" size={24} />
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => openEditModal({
                    id: category.id,
                    name: category.name,
                    slug: category.slug,
                    description: category.description
                  })}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600"
                  title="Düzenle"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => setShowDeleteModal(category.id)}
                  className="p-2 hover:bg-red-100 rounded-lg transition-colors text-gray-600 hover:text-red-600"
                  title="Sil"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-800 mb-1">{category.name}</h3>
            <p className="text-sm text-gray-500 mb-4 line-clamp-2">{category.description || 'Açıklama yok'}</p>
            
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2 text-gray-600">
                <FileText size={16} />
                <span className="text-sm font-medium">{getArticleCount(category.name)} makale</span>
              </div>
              <span className="text-xs text-gray-400 font-mono">/{category.slug}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {categories.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Folder className="text-gray-400" size={24} />
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">Kategori Bulunamadı</h3>
          <p className="text-gray-500 mb-4">Henüz hiç kategori oluşturulmamış.</p>
          <button
            onClick={openNewModal}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#d4af37] text-[#0a1628] font-semibold rounded-lg hover:bg-[#b8962e] transition-colors"
          >
            <Plus size={20} />
            İlk Kategorinizi Oluşturun
          </button>
        </div>
      )}

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
                  {editingCategory ? 'Kategoriyi Düzenle' : 'Yeni Kategori'}
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
                    Kategori Adı *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Örn: Ceza Hukuku"
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
                
                {/* Slug */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL Slug *
                  </label>
                  <div className="flex items-center">
                    <span className="px-3 py-2 bg-gray-100 border border-r-0 border-gray-200 rounded-l-lg text-gray-500 text-sm">
                      /kategori/
                    </span>
                    <input
                      type="text"
                      name="slug"
                      value={formData.slug}
                      onChange={handleChange}
                      className={`flex-1 px-4 py-2 border rounded-r-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] transition-colors ${
                        errors.slug ? 'border-red-500' : 'border-gray-200'
                      }`}
                    />
                  </div>
                  {errors.slug && (
                    <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.slug}
                    </p>
                  )}
                </div>
                
                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Açıklama
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Kategori açıklaması"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] transition-colors resize-none"
                  />
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
                  {editingCategory ? 'Güncelle' : 'Oluştur'}
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
              <h3 className="text-xl font-bold text-gray-800 text-center mb-2">Kategoriyi Sil</h3>
              <p className="text-gray-500 text-center mb-6">
                Bu kategoriyi silmek istediğinizden emin misiniz? Kategoriye ait makaleler kategorisiz kalacaktır.
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
