'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAdminData } from '@/context/AdminDataContext'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { 
  ArrowLeft, 
  Save, 
  Eye, 
  Image as ImageIcon,
  Tag,
  Folder,
  Globe,
  Clock,
  CheckCircle,
  X,
  Plus,
  AlertCircle
} from 'lucide-react'
import Link from 'next/link'

// Rich text editor için basit bir textarea kullanacağız
// Gerçek projede react-quill veya tiptap kullanılabilir

interface ArticleFormData {
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage: string
  category: string
  tags: string[]
  author: string
  status: 'draft' | 'published'
  seo: {
    metaTitle: string
    metaDescription: string
    keywords: string[]
  }
}

export default function NewArticlePage() {
  const router = useRouter()
  const { createArticle, categories } = useAdminData()
  const [activeTab, setActiveTab] = useState<'content' | 'seo' | 'settings'>('content')
  const [newTag, setNewTag] = useState('')
  const [newKeyword, setNewKeyword] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [formData, setFormData] = useState<ArticleFormData>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    coverImage: '',
    category: categories[0]?.name || '',
    tags: [],
    author: 'Av. Tarih Talha Kahraman',
    status: 'draft',
    seo: {
      metaTitle: '',
      metaDescription: '',
      keywords: []
    }
  })

  // Başlıktan otomatik slug oluştur
  useEffect(() => {
    if (formData.title) {
      const slug = formData.title
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
  }, [formData.title])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    
    if (name.startsWith('seo.')) {
      const seoField = name.split('.')[1]
      setFormData(prev => ({
        ...prev,
        seo: { ...prev.seo, [seoField]: value }
      }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }))
      setNewTag('')
    }
  }

  const removeTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }))
  }

  const addKeyword = () => {
    if (newKeyword.trim() && !formData.seo.keywords.includes(newKeyword.trim())) {
      setFormData(prev => ({
        ...prev,
        seo: {
          ...prev.seo,
          keywords: [...prev.seo.keywords, newKeyword.trim()]
        }
      }))
      setNewKeyword('')
    }
  }

  const removeKeyword = (keyword: string) => {
    setFormData(prev => ({
      ...prev,
      seo: {
        ...prev.seo,
        keywords: prev.seo.keywords.filter(k => k !== keyword)
      }
    }))
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.title.trim()) {
      newErrors.title = 'Başlık zorunludur'
    }
    if (!formData.excerpt.trim()) {
      newErrors.excerpt = 'Özet zorunludur'
    }
    if (!formData.content.trim()) {
      newErrors.content = 'İçerik zorunludur'
    }
    if (!formData.category) {
      newErrors.category = 'Kategori seçiniz'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (status: 'draft' | 'published') => {
    if (!validate()) return

    setIsSaving(true)

    // Simüle edilmiş gecikme
    await new Promise(resolve => setTimeout(resolve, 500))

    createArticle({
      ...formData,
      status,
      publishedAt: status === 'published' ? new Date().toISOString() : null
    })

    setIsSaving(false)
    router.push('/admin/makaleler')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/makaleler"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Yeni Makale</h1>
            <p className="text-gray-500">Yeni bir makale oluşturun</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleSubmit('draft')}
            disabled={isSaving}
            className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center gap-2 disabled:opacity-50"
          >
            <Clock size={18} />
            Taslak Kaydet
          </button>
          <button
            onClick={() => handleSubmit('published')}
            disabled={isSaving}
            className="px-4 py-2 bg-[#d4af37] text-[#0a1628] rounded-lg hover:bg-[#b8962e] transition-colors font-semibold flex items-center gap-2 disabled:opacity-50"
          >
            {isSaving ? (
              <div className="w-4 h-4 border-2 border-[#0a1628]/30 border-t-[#0a1628] rounded-full animate-spin" />
            ) : (
              <CheckCircle size={18} />
            )}
            Yayınla
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="border-b border-gray-100">
          <div className="flex gap-1 p-1">
            {[
              { id: 'content', label: 'İçerik', icon: Folder },
              { id: 'seo', label: 'SEO', icon: Globe },
              { id: 'settings', label: 'Ayarlar', icon: Tag }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-[#d4af37]/10 text-[#d4af37]'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {/* Content Tab */}
          {activeTab === 'content' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Başlık *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Makale başlığını girin"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] transition-colors text-lg ${
                    errors.title ? 'border-red-500' : 'border-gray-200'
                  }`}
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.title}
                  </p>
                )}
              </div>

              {/* Slug */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL Slug
                </label>
                <div className="flex items-center">
                  <span className="px-3 py-2 bg-gray-100 border border-r-0 border-gray-200 rounded-l-lg text-gray-500 text-sm">
                    /blog/
                  </span>
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] transition-colors"
                  />
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Özet *
                </label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Makale özeti (arama sonuçlarında ve listelemelerde görünecek)"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] transition-colors resize-none ${
                    errors.excerpt ? 'border-red-500' : 'border-gray-200'
                  }`}
                />
                {errors.excerpt && (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.excerpt}
                  </p>
                )}
              </div>

              {/* Cover Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kapak Görseli URL
                </label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    name="coverImage"
                    value={formData.coverImage}
                    onChange={handleChange}
                    placeholder="/images/articles/ornek.jpg"
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] transition-colors"
                  />
                  <button
                    type="button"
                    className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                  >
                    <ImageIcon size={18} />
                    Seç
                  </button>
                </div>
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  İçerik *
                </label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  rows={15}
                  placeholder="Makale içeriğini buraya yazın... (HTML desteklenir)"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] transition-colors resize-y font-mono text-sm ${
                    errors.content ? 'border-red-500' : 'border-gray-200'
                  }`}
                />
                {errors.content && (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.content}
                  </p>
                )}
                <p className="mt-2 text-sm text-gray-500">
                  İpucu: &lt;h2&gt;, &lt;h3&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;strong&gt;, &lt;em&gt; gibi HTML etiketlerini kullanabilirsiniz.
                </p>
              </div>
            </motion.div>
          )}

          {/* SEO Tab */}
          {activeTab === 'seo' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h3 className="font-medium text-blue-800 mb-1">SEO Önizleme</h3>
                <div className="bg-white rounded p-3 mt-2">
                  <p className="text-blue-600 text-lg truncate">
                    {formData.seo.metaTitle || formData.title || 'Sayfa Başlığı'}
                  </p>
                  <p className="text-green-700 text-sm">
                    ttkhukuk.com/blog/{formData.slug || 'sayfa-url'}
                  </p>
                  <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                    {formData.seo.metaDescription || formData.excerpt || 'Sayfa açıklaması burada görünecek...'}
                  </p>
                </div>
              </div>

              {/* Meta Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meta Başlık
                </label>
                <input
                  type="text"
                  name="seo.metaTitle"
                  value={formData.seo.metaTitle}
                  onChange={handleChange}
                  placeholder={formData.title || 'Boş bırakılırsa makale başlığı kullanılır'}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] transition-colors"
                />
                <p className="mt-1 text-sm text-gray-500">
                  {(formData.seo.metaTitle || formData.title).length}/60 karakter
                </p>
              </div>

              {/* Meta Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meta Açıklama
                </label>
                <textarea
                  name="seo.metaDescription"
                  value={formData.seo.metaDescription}
                  onChange={handleChange}
                  rows={3}
                  placeholder={formData.excerpt || 'Boş bırakılırsa makale özeti kullanılır'}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] transition-colors resize-none"
                />
                <p className="mt-1 text-sm text-gray-500">
                  {(formData.seo.metaDescription || formData.excerpt).length}/160 karakter
                </p>
              </div>

              {/* Keywords */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Anahtar Kelimeler
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newKeyword}
                    onChange={(e) => setNewKeyword(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addKeyword())}
                    placeholder="Anahtar kelime ekle"
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] transition-colors"
                  />
                  <button
                    type="button"
                    onClick={addKeyword}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <Plus size={18} />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.seo.keywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-sm"
                    >
                      {keyword}
                      <button
                        type="button"
                        onClick={() => removeKeyword(keyword)}
                        className="hover:text-red-500"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kategori *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] transition-colors ${
                    errors.category ? 'border-red-500' : 'border-gray-200'
                  }`}
                >
                  <option value="">Kategori seçin</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.category}
                  </p>
                )}
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Etiketler
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    placeholder="Etiket ekle"
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] transition-colors"
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <Plus size={18} />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-[#d4af37]/10 text-[#d4af37] rounded-full text-sm"
                    >
                      <Tag size={12} />
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="hover:text-red-500"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Author */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Yazar
                </label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] transition-colors"
                />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
