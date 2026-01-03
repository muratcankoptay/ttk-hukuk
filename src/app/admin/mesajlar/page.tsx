'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MessageSquare, 
  Mail, 
  Phone, 
  Calendar, 
  CheckCircle, 
  Clock, 
  Trash2, 
  Eye,
  X,
  Send,
  User,
  Filter,
  Search
} from 'lucide-react'
import { format, formatDistanceToNow } from 'date-fns'
import { tr } from 'date-fns/locale'

// Demo mesajlar
const DEMO_MESSAGES = [
  {
    id: '1',
    name: 'Mehmet Yılmaz',
    email: 'mehmet.yilmaz@email.com',
    phone: '+90 532 123 4567',
    subject: 'Boşanma Davası Hakkında',
    message: 'Merhaba, boşanma davası açmak istiyorum. Evliliğimiz 5 yıldır devam ediyor ancak son 2 yıldır ciddi problemler yaşıyoruz. Çocuğumuzun velayeti konusunda da bilgi almak istiyorum. Size uygun bir zamanda görüşme yapmak mümkün müdür?',
    status: 'unread' as const,
    createdAt: '2025-01-14T10:30:00Z'
  },
  {
    id: '2',
    name: 'Ayşe Kara',
    email: 'ayse.kara@email.com',
    phone: '+90 533 234 5678',
    subject: 'İş Kazası Tazminatı',
    message: 'İş yerinde geçirdiğim kaza sonucu 3 ay rapor aldım. İşverenim tazminat konusunda uzlaşmak istemiyor. Haklarım nelerdir ve dava açarsam başarı şansım nedir?',
    status: 'read' as const,
    createdAt: '2025-01-13T14:15:00Z'
  },
  {
    id: '3',
    name: 'Ali Demir',
    email: 'ali.demir@email.com',
    phone: '+90 534 345 6789',
    subject: 'Kira Sözleşmesi Uyuşmazlığı',
    message: 'Kiracım 6 aydır kira ödemiyor ve evi boşaltmıyor. Tahliye davası açmak istiyorum. Süreç ne kadar sürer ve masraflar nelerdir?',
    status: 'replied' as const,
    createdAt: '2025-01-12T09:00:00Z'
  },
  {
    id: '4',
    name: 'Fatma Öz',
    email: 'fatma.oz@email.com',
    phone: '+90 535 456 7890',
    subject: 'Miras Hukuku Danışmanlık',
    message: 'Babam vefat etti ve miras paylaşımı konusunda kardeşlerimle anlaşmazlık yaşıyoruz. Hukuki haklarım konusunda danışmanlık almak istiyorum.',
    status: 'unread' as const,
    createdAt: '2025-01-14T08:45:00Z'
  }
]

type MessageStatus = 'all' | 'unread' | 'read' | 'replied'

export default function MessagesPage() {
  const [messages, setMessages] = useState(DEMO_MESSAGES)
  const [selectedMessage, setSelectedMessage] = useState<typeof DEMO_MESSAGES[0] | null>(null)
  const [statusFilter, setStatusFilter] = useState<MessageStatus>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null)

  const filteredMessages = messages
    .filter(msg => {
      const matchesSearch = msg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           msg.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           msg.email.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = statusFilter === 'all' || msg.status === statusFilter
      return matchesSearch && matchesStatus
    })
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  const unreadCount = messages.filter(m => m.status === 'unread').length

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'unread':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
            <Clock size={12} />
            Okunmadı
          </span>
        )
      case 'read':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
            <Eye size={12} />
            Okundu
          </span>
        )
      case 'replied':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
            <CheckCircle size={12} />
            Yanıtlandı
          </span>
        )
      default:
        return null
    }
  }

  const handleSelectMessage = (message: typeof DEMO_MESSAGES[0]) => {
    setSelectedMessage(message)
    // Okunmamışsa okundu olarak işaretle
    if (message.status === 'unread') {
      setMessages(prev => prev.map(m => 
        m.id === message.id ? { ...m, status: 'read' as const } : m
      ))
    }
  }

  const handleDelete = (id: string) => {
    setMessages(prev => prev.filter(m => m.id !== id))
    if (selectedMessage?.id === id) {
      setSelectedMessage(null)
    }
    setShowDeleteModal(null)
  }

  const handleMarkAsReplied = (id: string) => {
    setMessages(prev => prev.map(m =>
      m.id === id ? { ...m, status: 'replied' as const } : m
    ))
    if (selectedMessage?.id === id) {
      setSelectedMessage(prev => prev ? { ...prev, status: 'replied' } : null)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Mesajlar</h1>
          <p className="text-gray-500">
            {unreadCount > 0 ? `${unreadCount} okunmamış mesaj` : 'Tüm mesajlar okundu'}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Mesaj ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-colors"
            />
          </div>

          {/* Status Filter */}
          <div className="flex gap-2">
            {[
              { value: 'all', label: 'Tümü' },
              { value: 'unread', label: 'Okunmamış' },
              { value: 'read', label: 'Okunmuş' },
              { value: 'replied', label: 'Yanıtlanmış' }
            ].map(filter => (
              <button
                key={filter.value}
                onClick={() => setStatusFilter(filter.value as MessageStatus)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  statusFilter === filter.value
                    ? 'bg-[#d4af37] text-[#0a1628]'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Messages Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-1 bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="max-h-[600px] overflow-y-auto">
            {filteredMessages.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {filteredMessages.map((message) => (
                  <button
                    key={message.id}
                    onClick={() => handleSelectMessage(message)}
                    className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
                      selectedMessage?.id === message.id ? 'bg-[#d4af37]/5 border-l-4 border-[#d4af37]' : ''
                    } ${message.status === 'unread' ? 'bg-blue-50/50' : ''}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-medium text-sm ${
                          message.status === 'unread' ? 'bg-red-500' : 'bg-gray-400'
                        }`}>
                          {message.name.charAt(0)}
                        </div>
                        <span className={`font-medium ${message.status === 'unread' ? 'text-gray-900' : 'text-gray-700'}`}>
                          {message.name}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true, locale: tr })}
                      </span>
                    </div>
                    <p className={`text-sm mb-1 truncate ${message.status === 'unread' ? 'font-semibold text-gray-800' : 'text-gray-600'}`}>
                      {message.subject}
                    </p>
                    <p className="text-xs text-gray-500 line-clamp-2">{message.message}</p>
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-gray-500">
                <MessageSquare size={48} className="mx-auto mb-3 text-gray-300" />
                <p>Mesaj bulunamadı</p>
              </div>
            )}
          </div>
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm">
          {selectedMessage ? (
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 mb-1">{selectedMessage.subject}</h2>
                    <div className="flex items-center gap-3">
                      {getStatusBadge(selectedMessage.status)}
                      <span className="text-sm text-gray-500">
                        {format(new Date(selectedMessage.createdAt), 'd MMMM yyyy HH:mm', { locale: tr })}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowDeleteModal(selectedMessage.id)}
                    className="p-2 hover:bg-red-100 rounded-lg transition-colors text-gray-600 hover:text-red-600"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>

              {/* Sender Info */}
              <div className="p-6 bg-gray-50 border-b border-gray-100">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#d4af37]/10 rounded-full flex items-center justify-center">
                      <User className="text-[#d4af37]" size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Gönderen</p>
                      <p className="font-medium text-gray-800">{selectedMessage.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Mail className="text-blue-600" size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">E-posta</p>
                      <a href={`mailto:${selectedMessage.email}`} className="font-medium text-blue-600 hover:underline">
                        {selectedMessage.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Phone className="text-green-600" size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Telefon</p>
                      <a href={`tel:${selectedMessage.phone}`} className="font-medium text-green-600 hover:underline">
                        {selectedMessage.phone}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Message Content */}
              <div className="flex-1 p-6">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {selectedMessage.message}
                </p>
              </div>

              {/* Actions */}
              <div className="p-6 border-t border-gray-100 flex gap-3">
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#d4af37] text-[#0a1628] font-semibold rounded-lg hover:bg-[#b8962e] transition-colors"
                >
                  <Mail size={18} />
                  E-posta ile Yanıtla
                </a>
                <a
                  href={`https://wa.me/${selectedMessage.phone.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
                >
                  <Send size={18} />
                  WhatsApp ile Yanıtla
                </a>
                {selectedMessage.status !== 'replied' && (
                  <button
                    onClick={() => handleMarkAsReplied(selectedMessage.id)}
                    className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center gap-2"
                  >
                    <CheckCircle size={18} />
                    Yanıtlandı İşaretle
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500 py-20">
              <div className="text-center">
                <MessageSquare size={64} className="mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium">Mesaj Seçin</p>
                <p className="text-sm">Detayları görmek için bir mesaj seçin</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Modal */}
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
              <h3 className="text-xl font-bold text-gray-800 text-center mb-2">Mesajı Sil</h3>
              <p className="text-gray-500 text-center mb-6">
                Bu mesajı silmek istediğinizden emin misiniz?
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
