'use client'

import { useState } from 'react'
import { useAdminData } from '@/context/AdminDataContext'
import { motion } from 'framer-motion'
import { 
  Save, 
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Globe, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube,
  CheckCircle,
  Search
} from 'lucide-react'

type SettingsTab = 'general' | 'contact' | 'social' | 'seo'

export default function SettingsPage() {
  const { settings, updateSettings } = useAdminData()
  const [activeTab, setActiveTab] = useState<SettingsTab>('general')
  const [isSaving, setIsSaving] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const [formData, setFormData] = useState(settings)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    
    if (name.startsWith('socialMedia.')) {
      const field = name.split('.')[1]
      setFormData(prev => ({
        ...prev,
        socialMedia: { ...prev.socialMedia, [field]: value }
      }))
    } else if (name.startsWith('seo.')) {
      const field = name.split('.')[1]
      setFormData(prev => ({
        ...prev,
        seo: { ...prev.seo, [field]: value }
      }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise(resolve => setTimeout(resolve, 500))
    updateSettings(formData)
    setIsSaving(false)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const tabs = [
    { id: 'general', label: 'Genel', icon: Building2 },
    { id: 'contact', label: 'İletişim', icon: Phone },
    { id: 'social', label: 'Sosyal Medya', icon: Globe },
    { id: 'seo', label: 'SEO', icon: Search }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Site Ayarları</h1>
          <p className="text-gray-500">Site genelindeki ayarları yönetin</p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#d4af37] text-[#0a1628] font-semibold rounded-lg hover:bg-[#b8962e] transition-colors disabled:opacity-50"
        >
          {isSaving ? (
            <div className="w-5 h-5 border-2 border-[#0a1628]/30 border-t-[#0a1628] rounded-full animate-spin" />
          ) : (
            <Save size={20} />
          )}
          Kaydet
        </button>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="flex items-center gap-2 p-4 bg-green-100 border border-green-200 rounded-lg text-green-700"
        >
          <CheckCircle size={20} />
          Ayarlar başarıyla kaydedildi!
        </motion.div>
      )}

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="border-b border-gray-100">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as SettingsTab)}
                className={`flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? 'border-[#d4af37] text-[#d4af37]'
                    : 'border-transparent text-gray-600 hover:text-gray-800'
                }`}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {/* General Tab */}
          {activeTab === 'general' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6 max-w-2xl"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Site Adı
                </label>
                <input
                  type="text"
                  name="siteName"
                  value={formData.siteName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Site Açıklaması
                </label>
                <textarea
                  name="siteDescription"
                  value={formData.siteDescription}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] transition-colors resize-none"
                />
              </div>
            </motion.div>
          )}

          {/* Contact Tab */}
          {activeTab === 'contact' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6 max-w-2xl"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="inline mr-2" size={16} />
                  E-posta Adresi
                </label>
                <input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone className="inline mr-2" size={16} />
                  Telefon Numarası
                </label>
                <input
                  type="tel"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="inline mr-2" size={16} />
                  Adres
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Clock className="inline mr-2" size={16} />
                  Çalışma Saatleri
                </label>
                <input
                  type="text"
                  name="workingHours"
                  value={formData.workingHours}
                  onChange={handleChange}
                  placeholder="Örn: Pazartesi - Cuma: 09:00 - 18:00"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] transition-colors"
                />
              </div>
            </motion.div>
          )}

          {/* Social Media Tab */}
          {activeTab === 'social' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6 max-w-2xl"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Facebook className="inline mr-2 text-blue-600" size={16} />
                  Facebook
                </label>
                <input
                  type="url"
                  name="socialMedia.facebook"
                  value={formData.socialMedia.facebook}
                  onChange={handleChange}
                  placeholder="https://facebook.com/..."
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Twitter className="inline mr-2 text-sky-500" size={16} />
                  Twitter (X)
                </label>
                <input
                  type="url"
                  name="socialMedia.twitter"
                  value={formData.socialMedia.twitter}
                  onChange={handleChange}
                  placeholder="https://twitter.com/..."
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Instagram className="inline mr-2 text-pink-500" size={16} />
                  Instagram
                </label>
                <input
                  type="url"
                  name="socialMedia.instagram"
                  value={formData.socialMedia.instagram}
                  onChange={handleChange}
                  placeholder="https://instagram.com/..."
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Linkedin className="inline mr-2 text-blue-700" size={16} />
                  LinkedIn
                </label>
                <input
                  type="url"
                  name="socialMedia.linkedin"
                  value={formData.socialMedia.linkedin}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/company/..."
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Youtube className="inline mr-2 text-red-600" size={16} />
                  YouTube
                </label>
                <input
                  type="url"
                  name="socialMedia.youtube"
                  value={formData.socialMedia.youtube}
                  onChange={handleChange}
                  placeholder="https://youtube.com/..."
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] transition-colors"
                />
              </div>
            </motion.div>
          )}

          {/* SEO Tab */}
          {activeTab === 'seo' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6 max-w-2xl"
            >
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h3 className="font-medium text-blue-800 mb-1">SEO Önizleme (Ana Sayfa)</h3>
                <div className="bg-white rounded p-3 mt-2">
                  <p className="text-blue-600 text-lg truncate">
                    {formData.seo.defaultMetaTitle || formData.siteName}
                  </p>
                  <p className="text-green-700 text-sm">ttkhukuk.com</p>
                  <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                    {formData.seo.defaultMetaDescription || formData.siteDescription}
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Varsayılan Meta Başlık
                </label>
                <input
                  type="text"
                  name="seo.defaultMetaTitle"
                  value={formData.seo.defaultMetaTitle}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] transition-colors"
                />
                <p className="mt-1 text-sm text-gray-500">
                  {formData.seo.defaultMetaTitle.length}/60 karakter
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Varsayılan Meta Açıklama
                </label>
                <textarea
                  name="seo.defaultMetaDescription"
                  value={formData.seo.defaultMetaDescription}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] transition-colors resize-none"
                />
                <p className="mt-1 text-sm text-gray-500">
                  {formData.seo.defaultMetaDescription.length}/160 karakter
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Google Analytics ID
                </label>
                <input
                  type="text"
                  name="seo.googleAnalyticsId"
                  value={formData.seo.googleAnalyticsId}
                  onChange={handleChange}
                  placeholder="G-XXXXXXXXXX"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] transition-colors font-mono"
                />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
