'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Shield, 
  ExternalLink, 
  FileText, 
  Bell, 
  CreditCard, 
  Lock,
  Phone,
  Mail,
  Clock,
  CheckCircle
} from 'lucide-react'
import Link from 'next/link'

export default function MuvekkilPaneliPage() {
  const PANEL_URL = 'https://muvekkil.ttkhukuk.com/login'
  const [countdown, setCountdown] = useState(5)
  const [autoRedirect, setAutoRedirect] = useState(true)

  useEffect(() => {
    if (!autoRedirect) return

    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      window.open(PANEL_URL, '_blank')
    }
  }, [countdown, autoRedirect])

  const handlePanelAccess = () => {
    setAutoRedirect(false)
    window.open(PANEL_URL, '_blank')
  }

  const features = [
    {
      icon: FileText,
      title: 'Dosya Takibi',
      description: 'Davalarınızın güncel durumunu anlık olarak takip edin'
    },
    {
      icon: Bell,
      title: 'Bildirimler',
      description: 'Önemli gelişmelerden anında haberdar olun'
    },
    {
      icon: CreditCard,
      title: 'Ödeme Yönetimi',
      description: 'Ödeme planlarınızı görüntüleyin ve yönetin'
    },
    {
      icon: Lock,
      title: 'Güvenli Erişim',
      description: 'Verileriniz şifreli ve güvenli ortamda saklanır'
    }
  ]

  const steps = [
    {
      step: 1,
      title: 'Giriş Yapın',
      description: 'Müvekkil kimlik numaranız ve şifreniz ile giriş yapın'
    },
    {
      step: 2,
      title: 'Dosyalarınızı Görüntüleyin',
      description: 'Aktif davalarınız ve dosyalarınızı listeleyin'
    },
    {
      step: 3,
      title: 'Takip Edin',
      description: 'Duruşma tarihleri ve gelişmeleri takip edin'
    }
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] bg-gradient-to-br from-[#0a1628] via-[#1a2d4a] to-[#0a1628] pt-32 pb-20 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#d4af37]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-[#d4af37] to-[#b8962e] rounded-full mb-8 shadow-2xl"
            >
              <Shield className="w-12 h-12 text-white" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl font-light text-white mb-6"
            >
              Müvekkil <span className="text-[#d4af37]">Paneli</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-300 max-w-2xl mx-auto mb-10"
            >
              Davalarınızı takip edin, belgelerinizi görüntüleyin ve hukuki süreçlerinizi yönetin
            </motion.p>

            {/* Ana Giriş Butonu */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col items-center gap-4"
            >
              <button
                onClick={handlePanelAccess}
                className="group bg-gradient-to-r from-[#d4af37] to-[#b8962e] text-[#0a1628] px-10 py-4 rounded-xl font-semibold text-lg hover:from-[#e5c04a] hover:to-[#d4af37] transition-all duration-300 shadow-2xl hover:shadow-[#d4af37]/20 transform hover:scale-105 flex items-center gap-3"
              >
                <Shield className="w-6 h-6" />
                Müvekkil Paneline Git
                <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <p className="text-gray-400 text-sm flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Güvenli bağlantı ile yeni sekmede açılacaktır
              </p>

              {autoRedirect && countdown > 0 && (
                <p className="text-[#d4af37] text-sm animate-pulse">
                  ({countdown} saniye sonra otomatik olarak yönlendirileceksiniz)
                </p>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Özellikler Bölümü */}
      <section className="py-20 bg-[#faf8f5]">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-light text-center mb-12 text-[#0a1628]"
          >
            Panel <span className="text-[#d4af37]">Özellikleri</span>
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              >
                <div className="bg-gradient-to-br from-[#0a1628] to-[#1a2d4a] w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-[#d4af37]" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-[#0a1628]">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Nasıl Kullanılır */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-light text-center mb-12 text-[#0a1628]"
          >
            Nasıl <span className="text-[#d4af37]">Kullanılır?</span>
          </motion.h2>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {steps.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="relative inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#d4af37] to-[#b8962e] rounded-full mb-6 text-white text-2xl font-bold shadow-lg">
                    {item.step}
                    {index < steps.length - 1 && (
                      <div className="hidden md:block absolute left-full top-1/2 w-full h-0.5 bg-gradient-to-r from-[#d4af37] to-transparent transform -translate-y-1/2"></div>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-[#0a1628]">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bilgilendirme Bölümü */}
      <section className="py-16 bg-[#faf8f5]">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-[#0a1628] p-8 rounded-r-2xl shadow-md"
          >
            <h3 className="text-xl font-semibold mb-4 text-[#0a1628] flex items-center gap-3">
              <Shield className="w-6 h-6 text-[#d4af37]" />
              Giriş Bilgileriniz
            </h3>
            <p className="text-gray-700 mb-6">
              Müvekkil paneline ilk kez giriş yapacaksanız, giriş bilgileriniz büromuz tarafından tarafınıza iletilmiştir.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Müvekkil kimlik numaranız ve şifreniz ile giriş yapabilirsiniz</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Şifrenizi unuttuysanız, "Şifremi Unuttum" bağlantısını kullanabilirsiniz</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Giriş sorunu yaşıyorsanız, lütfen büromuz ile iletişime geçin</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-8 text-center"
          >
            <button
              onClick={handlePanelAccess}
              className="bg-[#0a1628] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#1a2d4a] transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center gap-3"
            >
              <ExternalLink className="w-5 h-5" />
              Panele Git
            </button>
          </motion.div>
        </div>
      </section>

      {/* İletişim Bilgileri */}
      <section className="py-16 bg-gradient-to-br from-[#0a1628] via-[#1a2d4a] to-[#0a1628] text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-light mb-6">
            Destek mi <span className="text-[#d4af37]">Gerekiyor?</span>
          </h3>
          <p className="text-gray-300 mb-8">
            Müvekkil paneline erişimde sorun yaşıyorsanız, bizimle iletişime geçin
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <a
              href="tel:+905557269903"
              className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-medium hover:bg-white hover:text-[#0a1628] transition-all duration-300 flex items-center justify-center gap-3 border border-white/20"
            >
              <Phone className="w-5 h-5" />
              +90 555 726 99 03
            </a>
            <a
              href="mailto:info@ttkhukuk.com"
              className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-medium hover:bg-white hover:text-[#0a1628] transition-all duration-300 flex items-center justify-center gap-3 border border-white/20"
            >
              <Mail className="w-5 h-5" />
              info@ttkhukuk.com
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#faf8f5]">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h3 className="text-2xl font-light mb-4 text-[#0a1628]">
              Henüz Müvekkilimiz Değil misiniz?
            </h3>
            <p className="text-gray-600 mb-8">
              Hukuki sorunlarınız için ücretsiz ön görüşme randevusu alın
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/iletisim"
                className="bg-gradient-to-r from-[#d4af37] to-[#b8962e] text-[#0a1628] px-8 py-4 rounded-xl font-semibold hover:from-[#e5c04a] hover:to-[#d4af37] transition-all shadow-lg"
              >
                Ücretsiz Ön Görüşme
              </Link>
              <Link
                href="/hizmetlerimiz"
                className="border-2 border-[#0a1628] text-[#0a1628] px-8 py-4 rounded-xl font-semibold hover:bg-[#0a1628] hover:text-white transition-all"
              >
                Hizmetlerimiz
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
