'use client'

import { useAdminData } from '@/context/AdminDataContext'
import { motion } from 'framer-motion'
import { 
  FileText, 
  Eye, 
  TrendingUp, 
  Clock, 
  Plus, 
  ArrowUpRight,
  Calendar,
  Edit,
  CheckCircle,
  FileEdit,
  Settings,
  FolderPlus
} from 'lucide-react'
import Link from 'next/link'
import { format, formatDistanceToNow } from 'date-fns'
import { tr } from 'date-fns/locale'

export default function AdminDashboard() {
  const { articles, activities, settings } = useAdminData()

  // İstatistikler
  const publishedArticles = articles.filter(a => a.status === 'published')
  const draftArticles = articles.filter(a => a.status === 'draft')
  const totalViews = articles.reduce((sum, a) => sum + a.views, 0)
  const topArticles = [...articles]
    .sort((a, b) => b.views - a.views)
    .slice(0, 5)

  const stats = [
    {
      label: 'Toplam Makale',
      value: articles.length,
      icon: FileText,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      label: 'Yayınlanan',
      value: publishedArticles.length,
      icon: CheckCircle,
      color: 'bg-green-500',
      change: '+8%'
    },
    {
      label: 'Taslak',
      value: draftArticles.length,
      icon: FileEdit,
      color: 'bg-yellow-500',
      change: '-'
    },
    {
      label: 'Toplam Görüntülenme',
      value: totalViews.toLocaleString('tr-TR'),
      icon: Eye,
      color: 'bg-purple-500',
      change: '+25%'
    },
  ]

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'article_created': return <Plus className="text-green-500" size={16} />
      case 'article_updated': return <Edit className="text-blue-500" size={16} />
      case 'article_published': return <CheckCircle className="text-emerald-500" size={16} />
      case 'article_deleted': return <FileText className="text-red-500" size={16} />
      case 'settings_updated': return <Settings className="text-purple-500" size={16} />
      case 'category_created': return <FolderPlus className="text-yellow-500" size={16} />
      default: return <Clock className="text-gray-500" size={16} />
    }
  }

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-[#0a1628] to-[#1a2d4a] rounded-2xl p-6 text-white"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Hoş Geldiniz! 👋</h1>
            <p className="text-gray-300">
              {settings.siteName} yönetim paneline hoş geldiniz. İşte bugünkü özet.
            </p>
          </div>
          <Link
            href="/admin/makaleler/yeni"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 px-4 py-2 bg-[#d4af37] text-[#0a1628] font-semibold rounded-lg hover:bg-[#b8962e] transition-colors"
          >
            <Plus size={20} />
            Yeni Makale
          </Link>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                <stat.icon className="text-white" size={24} />
              </div>
              {stat.change !== '-' && (
                <span className="flex items-center gap-1 text-green-500 text-sm font-medium">
                  <TrendingUp size={16} />
                  {stat.change}
                </span>
              )}
            </div>
            <h3 className="text-3xl font-bold text-gray-800">{stat.value}</h3>
            <p className="text-gray-500 text-sm">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Articles */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-white rounded-xl shadow-sm"
        >
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">En Çok Okunan Makaleler</h2>
              <Link
                href="/admin/makaleler"
                className="text-[#d4af37] hover:underline text-sm flex items-center gap-1"
              >
                Tümünü Gör
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
          <div className="p-6">
            {topArticles.length > 0 ? (
              <div className="space-y-4">
                {topArticles.map((article, index) => (
                  <div
                    key={article.id}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm
                      ${index === 0 ? 'bg-[#d4af37] text-[#0a1628]' : 
                        index === 1 ? 'bg-gray-400 text-white' : 
                        index === 2 ? 'bg-amber-600 text-white' : 'bg-gray-200 text-gray-600'}
                    `}>
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-800 truncate">{article.title}</h3>
                      <p className="text-sm text-gray-500">{article.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-800">{article.views.toLocaleString('tr-TR')}</p>
                      <p className="text-xs text-gray-500">görüntülenme</p>
                    </div>
                    <Link
                      href={`/admin/makaleler/${article.id}`}
                      className="p-2 hover:bg-[#d4af37]/20 rounded-lg transition-colors"
                    >
                      <Edit size={18} className="text-gray-600" />
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <FileText size={48} className="mx-auto mb-3 text-gray-300" />
                <p>Henüz makale bulunmuyor</p>
                <Link
                  href="/admin/makaleler/yeni"
                  className="inline-block mt-3 text-[#d4af37] hover:underline"
                >
                  İlk makalenizi oluşturun
                </Link>
              </div>
            )}
          </div>
        </motion.div>

        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl shadow-sm"
        >
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800">Son Aktiviteler</h2>
          </div>
          <div className="p-6">
            {activities.length > 0 ? (
              <div className="space-y-4">
                {activities.slice(0, 8).map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-800 line-clamp-2">{activity.description}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatDistanceToNow(new Date(activity.timestamp), { 
                          addSuffix: true, 
                          locale: tr 
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Clock size={48} className="mx-auto mb-3 text-gray-300" />
                <p>Henüz aktivite bulunmuyor</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-xl shadow-sm p-6"
      >
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Hızlı İşlemler</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            href="/admin/makaleler/yeni"
            className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-xl hover:bg-[#d4af37]/10 hover:border-[#d4af37] border-2 border-transparent transition-all group"
          >
            <div className="w-12 h-12 bg-[#d4af37]/20 rounded-xl flex items-center justify-center group-hover:bg-[#d4af37]/30 transition-colors">
              <Plus className="text-[#d4af37]" size={24} />
            </div>
            <span className="text-sm font-medium text-gray-700">Yeni Makale</span>
          </Link>
          
          <Link
            href="/admin/kategoriler"
            className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-xl hover:bg-blue-50 hover:border-blue-400 border-2 border-transparent transition-all group"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors">
              <FolderPlus className="text-blue-500" size={24} />
            </div>
            <span className="text-sm font-medium text-gray-700">Kategori Ekle</span>
          </Link>
          
          <Link
            href="/admin/ayarlar"
            className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-xl hover:bg-purple-50 hover:border-purple-400 border-2 border-transparent transition-all group"
          >
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center group-hover:bg-purple-200 transition-colors">
              <Settings className="text-purple-500" size={24} />
            </div>
            <span className="text-sm font-medium text-gray-700">Ayarlar</span>
          </Link>
          
          <Link
            href="/"
            target="_blank"
            className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-xl hover:bg-green-50 hover:border-green-400 border-2 border-transparent transition-all group"
          >
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-200 transition-colors">
              <ArrowUpRight className="text-green-500" size={24} />
            </div>
            <span className="text-sm font-medium text-gray-700">Siteyi Gör</span>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
