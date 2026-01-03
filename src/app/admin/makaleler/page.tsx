'use client'

import { useState } from 'react'
import { useAdminData } from '@/context/AdminDataContext'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { 
  Plus, 
  Search, 
  Filter, 
  Eye,
  Edit,
  Trash2,
  MoreVertical,
  CheckCircle,
  Clock,
  Archive,
  Calendar,
  ChevronDown
} from 'lucide-react'
import { format } from 'date-fns'
import { tr } from 'date-fns/locale'

type StatusFilter = 'all' | 'published' | 'draft' | 'archived'

export default function ArticlesPage() {
  const { articles, deleteArticle, publishArticle, unpublishArticle, categories } = useAdminData()
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'views'>('newest')
  const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)

  // Filtreleme ve sıralama
  const filteredArticles = articles
    .filter(article => {
      const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = statusFilter === 'all' || article.status === statusFilter
      const matchesCategory = categoryFilter === 'all' || article.category === categoryFilter
      return matchesSearch && matchesStatus && matchesCategory
    })
    .sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      if (sortBy === 'oldest') return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      return b.views - a.views
    })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
            <CheckCircle size={12} />
            Yayında
          </span>
        )
      case 'draft':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
            <Clock size={12} />
            Taslak
          </span>
        )
      case 'archived':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
            <Archive size={12} />
            Arşiv
          </span>
        )
      default:
        return null
    }
  }

  const handleDelete = (id: string) => {
    deleteArticle(id)
    setShowDeleteModal(null)
  }

  const handleStatusToggle = (id: string, currentStatus: string) => {
    if (currentStatus === 'published') {
      unpublishArticle(id)
    } else {
      publishArticle(id)
    }
    setActiveMenu(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Makaleler</h1>
          <p className="text-gray-500">Toplam {articles.length} makale</p>
        </div>
        <Link
          href="/admin/makaleler/yeni"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#d4af37] text-[#0a1628] font-semibold rounded-lg hover:bg-[#b8962e] transition-colors"
        >
          <Plus size={20} />
          Yeni Makale
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Makale ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-colors"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
              className="appearance-none pl-4 pr-10 py-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-colors cursor-pointer"
            >
              <option value="all">Tüm Durumlar</option>
              <option value="published">Yayında</option>
              <option value="draft">Taslak</option>
              <option value="archived">Arşiv</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="appearance-none pl-4 pr-10 py-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-colors cursor-pointer"
            >
              <option value="all">Tüm Kategoriler</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.name}>{cat.name}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest' | 'views')}
              className="appearance-none pl-4 pr-10 py-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-colors cursor-pointer"
            >
              <option value="newest">En Yeni</option>
              <option value="oldest">En Eski</option>
              <option value="views">En Çok Okunan</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
          </div>
        </div>
      </div>

      {/* Articles List */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {filteredArticles.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {filteredArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  {/* Article Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-3">
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/admin/makaleler/${article.id}`}
                          className="text-lg font-semibold text-gray-800 hover:text-[#d4af37] transition-colors line-clamp-1"
                        >
                          {article.title}
                        </Link>
                        <p className="text-gray-500 text-sm mt-1 line-clamp-2">{article.excerpt}</p>
                        <div className="flex flex-wrap items-center gap-3 mt-2">
                          {getStatusBadge(article.status)}
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <Calendar size={12} />
                            {format(new Date(article.createdAt), 'd MMM yyyy', { locale: tr })}
                          </span>
                          <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full text-gray-600">
                            {article.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-6 lg:gap-8">
                    <div className="text-center">
                      <div className="flex items-center gap-1 text-gray-600">
                        <Eye size={16} />
                        <span className="font-semibold">{article.views.toLocaleString('tr-TR')}</span>
                      </div>
                      <p className="text-xs text-gray-500">görüntülenme</p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/makaleler/${article.id}`}
                        className="p-2 hover:bg-blue-100 rounded-lg transition-colors text-blue-600"
                        title="Düzenle"
                      >
                        <Edit size={18} />
                      </Link>
                      
                      <div className="relative">
                        <button
                          onClick={() => setActiveMenu(activeMenu === article.id ? null : article.id)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600"
                        >
                          <MoreVertical size={18} />
                        </button>
                        
                        {/* Dropdown Menu */}
                        <AnimatePresence>
                          {activeMenu === article.id && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-10"
                            >
                              <button
                                onClick={() => handleStatusToggle(article.id, article.status)}
                                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                              >
                                {article.status === 'published' ? (
                                  <>
                                    <Clock size={16} />
                                    Taslağa Al
                                  </>
                                ) : (
                                  <>
                                    <CheckCircle size={16} />
                                    Yayınla
                                  </>
                                )}
                              </button>
                              <Link
                                href={`/blog/${article.slug}`}
                                target="_blank"
                                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                              >
                                <Eye size={16} />
                                Önizleme
                              </Link>
                              <hr className="my-1" />
                              <button
                                onClick={() => {
                                  setShowDeleteModal(article.id)
                                  setActiveMenu(null)
                                }}
                                className="w-full px-4 py-2 text-left text-sm hover:bg-red-50 text-red-600 flex items-center gap-2"
                              >
                                <Trash2 size={16} />
                                Sil
                              </button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="text-gray-400" size={24} />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Makale Bulunamadı</h3>
            <p className="text-gray-500 mb-4">Arama kriterlerinize uygun makale bulunamadı.</p>
            <Link
              href="/admin/makaleler/yeni"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#d4af37] text-[#0a1628] font-semibold rounded-lg hover:bg-[#b8962e] transition-colors"
            >
              <Plus size={20} />
              Yeni Makale Oluştur
            </Link>
          </div>
        )}
      </div>

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
              <h3 className="text-xl font-bold text-gray-800 text-center mb-2">Makaleyi Sil</h3>
              <p className="text-gray-500 text-center mb-6">
                Bu makaleyi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
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
