'use client'

import { useAdminData } from '@/context/AdminDataContext'
import { motion } from 'framer-motion'
import { 
  BarChart3, 
  TrendingUp, 
  Eye, 
  FileText, 
  Users, 
  Calendar,
  ArrowUp,
  ArrowDown
} from 'lucide-react'

export default function StatisticsPage() {
  const { articles } = useAdminData()

  // İstatistikler
  const totalViews = articles.reduce((sum, a) => sum + a.views, 0)
  const publishedCount = articles.filter(a => a.status === 'published').length
  const draftCount = articles.filter(a => a.status === 'draft').length

  // Kategori bazlı istatistikler
  const categoryStats = articles.reduce((acc, article) => {
    if (!acc[article.category]) {
      acc[article.category] = { count: 0, views: 0 }
    }
    acc[article.category].count++
    acc[article.category].views += article.views
    return acc
  }, {} as Record<string, { count: number; views: number }>)

  const sortedCategories = Object.entries(categoryStats)
    .map(([name, stats]) => ({ name, ...stats }))
    .sort((a, b) => b.views - a.views)

  // En çok okunan makaleler
  const topArticles = [...articles]
    .sort((a, b) => b.views - a.views)
    .slice(0, 10)

  // Aylık görüntülenme simülasyonu
  const monthlyData = [
    { month: 'Oca', views: 850 },
    { month: 'Şub', views: 1200 },
    { month: 'Mar', views: 980 },
    { month: 'Nis', views: 1450 },
    { month: 'May', views: 1680 },
    { month: 'Haz', views: 1320 },
    { month: 'Tem', views: 1890 },
    { month: 'Ağu', views: 1560 },
    { month: 'Eyl', views: 2100 },
    { month: 'Eki', views: 1980 },
    { month: 'Kas', views: 2340 },
    { month: 'Ara', views: 2560 }
  ]

  const maxViews = Math.max(...monthlyData.map(d => d.views))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">İstatistikler</h1>
        <p className="text-gray-500">Site performansı ve makale istatistikleri</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { 
            label: 'Toplam Görüntülenme', 
            value: totalViews.toLocaleString('tr-TR'), 
            icon: Eye, 
            color: 'bg-blue-500',
            change: '+25%',
            changeType: 'up'
          },
          { 
            label: 'Toplam Makale', 
            value: articles.length, 
            icon: FileText, 
            color: 'bg-purple-500',
            change: '+3',
            changeType: 'up'
          },
          { 
            label: 'Yayında', 
            value: publishedCount, 
            icon: TrendingUp, 
            color: 'bg-green-500',
            change: '+2',
            changeType: 'up'
          },
          { 
            label: 'Taslak', 
            value: draftCount, 
            icon: Calendar, 
            color: 'bg-yellow-500',
            change: '1',
            changeType: 'neutral'
          },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                <stat.icon className="text-white" size={24} />
              </div>
              {stat.changeType !== 'neutral' && (
                <div className={`flex items-center gap-1 text-sm font-medium ${
                  stat.changeType === 'up' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {stat.changeType === 'up' ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                  {stat.change}
                </div>
              )}
            </div>
            <h3 className="text-3xl font-bold text-gray-800">{stat.value}</h3>
            <p className="text-gray-500 text-sm">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Views Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <h2 className="text-lg font-semibold text-gray-800 mb-6">Aylık Görüntülenme</h2>
          <div className="flex items-end justify-between gap-2 h-48">
            {monthlyData.map((data, index) => (
              <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(data.views / maxViews) * 100}%` }}
                  transition={{ delay: 0.5 + index * 0.05, duration: 0.5 }}
                  className="w-full bg-gradient-to-t from-[#d4af37] to-[#f0d77a] rounded-t-lg min-h-[8px]"
                  title={`${data.views.toLocaleString('tr-TR')} görüntülenme`}
                />
                <span className="text-xs text-gray-500">{data.month}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Category Distribution */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <h2 className="text-lg font-semibold text-gray-800 mb-6">Kategori Dağılımı</h2>
          <div className="space-y-4">
            {sortedCategories.slice(0, 6).map((category, index) => {
              const percentage = totalViews > 0 ? Math.round((category.views / totalViews) * 100) : 0
              return (
                <div key={category.name}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="font-medium text-gray-700">{category.name}</span>
                    <span className="text-gray-500">{category.views.toLocaleString('tr-TR')} görüntülenme</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                      className="h-full bg-[#d4af37] rounded-full"
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>
      </div>

      {/* Top Articles Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-xl shadow-sm overflow-hidden"
      >
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">En Çok Okunan Makaleler</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sıra
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Makale
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kategori
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Durum
                </th>
                <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Görüntülenme
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {topArticles.map((article, index) => (
                <tr key={article.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm
                      ${index === 0 ? 'bg-[#d4af37] text-[#0a1628]' : 
                        index === 1 ? 'bg-gray-400 text-white' : 
                        index === 2 ? 'bg-amber-600 text-white' : 'bg-gray-200 text-gray-600'}
                    `}>
                      {index + 1}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-800 truncate max-w-xs">{article.title}</p>
                    <p className="text-sm text-gray-500">{article.author}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
                      {article.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {article.status === 'published' ? (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        Yayında
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                        Taslak
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="font-semibold text-gray-800">
                      {article.views.toLocaleString('tr-TR')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {topArticles.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            <BarChart3 size={48} className="mx-auto mb-3 text-gray-300" />
            <p>Henüz makale bulunmuyor</p>
          </div>
        )}
      </motion.div>
    </div>
  )
}
