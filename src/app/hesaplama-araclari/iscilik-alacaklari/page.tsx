'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Calculator, 
  Briefcase,
  Calendar,
  Clock,
  DollarSign,
  AlertTriangle, 
  RefreshCw,
  Phone,
  ClipboardList,
  Wallet,
  Coffee,
  Plane
} from 'lucide-react'
import Link from 'next/link'

// 2025 yılı asgari ücret
const ASGARI_UCRET_BRUT = 26005
const ASGARI_UCRET_NET = 22104

// Kıdem Tazminatı Tavanı (2025 - 1. Dönem)
const KIDEM_TAVANI = 47608.51

type TabType = 'kidem' | 'ihbar' | 'izin' | 'mesai'

export default function IscilikAlacaklariPage() {
  const [activeTab, setActiveTab] = useState<TabType>('kidem')
  
  // Kıdem Tazminatı State
  const [kidemFormData, setKidemFormData] = useState({
    startDate: '',
    endDate: '',
    brutSalary: '',
    aylikYardim: '',
    yillikYardim: ''
  })
  const [kidemResult, setKidemResult] = useState<any>(null)

  // İhbar Tazminatı State
  const [ihbarFormData, setIhbarFormData] = useState({
    calismaYili: '',
    brutSalary: ''
  })
  const [ihbarResult, setIhbarResult] = useState<any>(null)

  // Yıllık İzin State
  const [izinFormData, setIzinFormData] = useState({
    calismaYili: '',
    kullanilanIzin: '',
    brutSalary: ''
  })
  const [izinResult, setIzinResult] = useState<any>(null)

  // Mesai Ücreti State
  const [mesaiFormData, setMesaiFormData] = useState({
    saatlikUcret: '',
    haftalikSaat: '',
    haftalikMesai: '',
    haftalikTatil: '',
    ulusalBayram: ''
  })
  const [mesaiResult, setMesaiResult] = useState<any>(null)

  // Kıdem Tazminatı Hesaplama
  const calculateKidem = () => {
    const startDate = new Date(kidemFormData.startDate)
    const endDate = new Date(kidemFormData.endDate)
    const brutSalary = parseFloat(kidemFormData.brutSalary) || 0
    const aylikYardim = parseFloat(kidemFormData.aylikYardim) || 0
    const yillikYardim = parseFloat(kidemFormData.yillikYardim) || 0

    // Çalışma süresi (yıl, ay, gün)
    const diffMs = endDate.getTime() - startDate.getTime()
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    const years = Math.floor(diffDays / 365)
    const months = Math.floor((diffDays % 365) / 30)
    const days = diffDays % 30

    // Toplam çalışma süresi (yıl olarak)
    const totalYears = diffDays / 365

    // Giydirilmiş brüt ücret
    const giydirilmisBrut = brutSalary + aylikYardim + (yillikYardim / 12)

    // Kıdem tazminatı tavanı kontrolü
    const tabanUcret = Math.min(giydirilmisBrut, KIDEM_TAVANI)

    // Kıdem tazminatı (her tam yıl için 1 aylık brüt ücret)
    const kidemTazminati = tabanUcret * totalYears

    setKidemResult({
      calismaYil: years,
      calismaAy: months,
      calismaGun: days,
      toplamYil: totalYears.toFixed(2),
      giydirilmisBrut: giydirilmisBrut.toLocaleString('tr-TR'),
      tavanUygulandiMi: giydirilmisBrut > KIDEM_TAVANI,
      kidemTavani: KIDEM_TAVANI.toLocaleString('tr-TR'),
      kidemTazminati: kidemTazminati.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    })
  }

  // İhbar Tazminatı Hesaplama
  const calculateIhbar = () => {
    const calismaYili = parseFloat(ihbarFormData.calismaYili) || 0
    const brutSalary = parseFloat(ihbarFormData.brutSalary) || 0

    // İhbar süresi belirleme (İş Kanunu m.17)
    let ihbarHaftasi = 2
    if (calismaYili < 0.5) ihbarHaftasi = 2
    else if (calismaYili < 1.5) ihbarHaftasi = 4
    else if (calismaYili < 3) ihbarHaftasi = 6
    else ihbarHaftasi = 8

    // Günlük ücret
    const gunlukUcret = brutSalary / 30

    // İhbar tazminatı (hafta * 7 gün * günlük ücret)
    const ihbarTazminati = ihbarHaftasi * 7 * gunlukUcret

    setIhbarResult({
      calismaYili,
      ihbarSuresi: ihbarHaftasi,
      gunlukUcret: gunlukUcret.toLocaleString('tr-TR', { minimumFractionDigits: 2 }),
      ihbarGunu: ihbarHaftasi * 7,
      ihbarTazminati: ihbarTazminati.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    })
  }

  // Yıllık İzin Ücreti Hesaplama
  const calculateIzin = () => {
    const calismaYili = parseFloat(izinFormData.calismaYili) || 0
    const kullanilanIzin = parseFloat(izinFormData.kullanilanIzin) || 0
    const brutSalary = parseFloat(izinFormData.brutSalary) || 0

    // Yıllık izin hakkı (İş Kanunu m.53)
    let izinHakki = 14
    if (calismaYili >= 1 && calismaYili < 5) izinHakki = 14
    else if (calismaYili >= 5 && calismaYili < 15) izinHakki = 20
    else if (calismaYili >= 15) izinHakki = 26

    // Kullanılmayan izin
    const kullanilamayanIzin = Math.max(0, izinHakki - kullanilanIzin)

    // Günlük ücret
    const gunlukUcret = brutSalary / 30

    // İzin ücreti
    const izinUcreti = kullanilamayanIzin * gunlukUcret

    setIzinResult({
      izinHakki,
      kullanilanIzin,
      kullanilamayanIzin,
      gunlukUcret: gunlukUcret.toLocaleString('tr-TR', { minimumFractionDigits: 2 }),
      izinUcreti: izinUcreti.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    })
  }

  // Mesai Ücreti Hesaplama
  const calculateMesai = () => {
    const saatlikUcret = parseFloat(mesaiFormData.saatlikUcret) || 0
    const haftalikMesai = parseFloat(mesaiFormData.haftalikMesai) || 0
    const haftalikTatil = parseFloat(mesaiFormData.haftalikTatil) || 0
    const ulusalBayram = parseFloat(mesaiFormData.ulusalBayram) || 0

    // Fazla mesai ücreti (%50 zamlı)
    const fazlaMesaiUcreti = haftalikMesai * saatlikUcret * 1.5

    // Hafta tatili ücreti (%100 zamlı)
    const haftaTatiliUcreti = haftalikTatil * saatlikUcret * 2

    // Ulusal bayram ücreti (%100 zamlı)
    const bayramUcreti = ulusalBayram * saatlikUcret * 2

    const toplamMesai = fazlaMesaiUcreti + haftaTatiliUcreti + bayramUcreti

    setMesaiResult({
      saatlikUcret: saatlikUcret.toLocaleString('tr-TR', { minimumFractionDigits: 2 }),
      fazlaMesaiSaat: haftalikMesai,
      fazlaMesaiUcreti: fazlaMesaiUcreti.toLocaleString('tr-TR', { minimumFractionDigits: 2 }),
      haftaTatiliSaat: haftalikTatil,
      haftaTatiliUcreti: haftaTatiliUcreti.toLocaleString('tr-TR', { minimumFractionDigits: 2 }),
      bayramSaat: ulusalBayram,
      bayramUcreti: bayramUcreti.toLocaleString('tr-TR', { minimumFractionDigits: 2 }),
      toplamMesai: toplamMesai.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    })
  }

  const clearKidemForm = () => {
    setKidemFormData({ startDate: '', endDate: '', brutSalary: '', aylikYardim: '', yillikYardim: '' })
    setKidemResult(null)
  }

  const clearIhbarForm = () => {
    setIhbarFormData({ calismaYili: '', brutSalary: '' })
    setIhbarResult(null)
  }

  const clearIzinForm = () => {
    setIzinFormData({ calismaYili: '', kullanilanIzin: '', brutSalary: '' })
    setIzinResult(null)
  }

  const clearMesaiForm = () => {
    setMesaiFormData({ saatlikUcret: '', haftalikSaat: '', haftalikMesai: '', haftalikTatil: '', ulusalBayram: '' })
    setMesaiResult(null)
  }

  const tabs = [
    { id: 'kidem' as TabType, label: 'Kıdem Tazminatı', icon: Wallet },
    { id: 'ihbar' as TabType, label: 'İhbar Tazminatı', icon: Clock },
    { id: 'izin' as TabType, label: 'Yıllık İzin', icon: Plane },
    { id: 'mesai' as TabType, label: 'Mesai Ücreti', icon: Coffee }
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0a1628] via-[#1a2d4a] to-[#0a1628] pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#d4af37]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#d4af37] to-[#b8962e] rounded-full mb-6 shadow-2xl"
            >
              <Briefcase className="w-10 h-10 text-white" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-5xl font-light text-white mb-4"
            >
              İşçilik <span className="text-[#d4af37]">Alacakları</span> Hesaplama
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-gray-300 max-w-2xl mx-auto"
            >
              4857 sayılı İş Kanunu kapsamında kıdem, ihbar, yıllık izin ve mesai alacaklarınızı hesaplayın
            </motion.p>
          </div>
        </div>
      </section>

      {/* Tab Seçimi */}
      <section className="bg-[#faf8f5] border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 min-w-max py-4 px-6 flex items-center justify-center gap-2 text-sm md:text-base font-medium transition-all border-b-4 ${
                    activeTab === tab.id
                      ? 'bg-white text-[#0a1628] border-[#d4af37]'
                      : 'text-gray-500 border-transparent hover:text-gray-700'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="hidden md:inline">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Form ve Sonuç Bölümü */}
      <section className="py-12 bg-[#faf8f5]">
        <div className="container mx-auto px-4">
          <AnimatePresence mode="wait">
            {/* KIDEM TAZMİNATI */}
            {activeTab === 'kidem' && (
              <motion.div
                key="kidem"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto"
              >
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <h2 className="text-2xl font-semibold text-[#0a1628] mb-6 flex items-center gap-3">
                    <Wallet className="w-6 h-6 text-[#d4af37]" />
                    Kıdem Tazminatı
                  </h2>

                  <div className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">İşe Giriş Tarihi *</label>
                        <input
                          type="date"
                          value={kidemFormData.startDate}
                          onChange={(e) => setKidemFormData(prev => ({ ...prev, startDate: e.target.value }))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">İşten Çıkış Tarihi *</label>
                        <input
                          type="date"
                          value={kidemFormData.endDate}
                          onChange={(e) => setKidemFormData(prev => ({ ...prev, endDate: e.target.value }))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Brüt Ücret (₺) *</label>
                      <input
                        type="number"
                        value={kidemFormData.brutSalary}
                        onChange={(e) => setKidemFormData(prev => ({ ...prev, brutSalary: e.target.value }))}
                        placeholder={`Varsayılan: ${ASGARI_UCRET_BRUT.toLocaleString('tr-TR')}`}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Aylık Yemek/Yol Yardımı (₺)</label>
                      <input
                        type="number"
                        value={kidemFormData.aylikYardim}
                        onChange={(e) => setKidemFormData(prev => ({ ...prev, aylikYardim: e.target.value }))}
                        placeholder="Varsa"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Yıllık Prim/İkramiye (₺)</label>
                      <input
                        type="number"
                        value={kidemFormData.yillikYardim}
                        onChange={(e) => setKidemFormData(prev => ({ ...prev, yillikYardim: e.target.value }))}
                        placeholder="Varsa"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition"
                      />
                    </div>

                    <div className="flex gap-4 pt-4">
                      <button
                        onClick={calculateKidem}
                        disabled={!kidemFormData.startDate || !kidemFormData.endDate || !kidemFormData.brutSalary}
                        className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#d4af37] to-[#b8962e] text-[#0a1628] px-6 py-4 rounded-xl font-semibold hover:from-[#e5c04a] hover:to-[#d4af37] transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Calculator className="w-5 h-5" />
                        Hesapla
                      </button>
                      <button
                        onClick={clearKidemForm}
                        className="flex items-center justify-center gap-2 bg-gray-200 text-gray-700 px-6 py-4 rounded-xl font-medium hover:bg-gray-300 transition-all"
                      >
                        <RefreshCw className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <h2 className="text-2xl font-semibold text-[#0a1628] mb-6 flex items-center gap-3">
                    <DollarSign className="w-6 h-6 text-[#d4af37]" />
                    Hesaplama Sonucu
                  </h2>

                  {!kidemResult ? (
                    <div className="text-center py-16">
                      <ClipboardList className="w-20 h-20 mx-auto text-gray-300 mb-4" />
                      <p className="text-gray-500 text-lg">Hesaplama yapmak için formu doldurun</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="bg-blue-50 rounded-xl p-5">
                        <h3 className="font-semibold text-blue-800 mb-3">Çalışma Süresi</h3>
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div>
                            <div className="text-3xl font-bold text-blue-900">{kidemResult.calismaYil}</div>
                            <div className="text-sm text-blue-700">Yıl</div>
                          </div>
                          <div>
                            <div className="text-3xl font-bold text-blue-900">{kidemResult.calismaAy}</div>
                            <div className="text-sm text-blue-700">Ay</div>
                          </div>
                          <div>
                            <div className="text-3xl font-bold text-blue-900">{kidemResult.calismaGun}</div>
                            <div className="text-sm text-blue-700">Gün</div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span className="text-gray-700">Giydirilmiş Brüt:</span>
                          <span className="font-semibold">₺{kidemResult.giydirilmisBrut}</span>
                        </div>
                        {kidemResult.tavanUygulandiMi && (
                          <div className="flex justify-between items-center p-3 bg-amber-50 rounded-lg">
                            <span className="text-amber-700">Kıdem Tavanı Uygulandı:</span>
                            <span className="font-semibold text-amber-700">₺{kidemResult.kidemTavani}</span>
                          </div>
                        )}
                      </div>

                      <div className="bg-gradient-to-r from-[#0a1628] to-[#1a2d4a] text-white rounded-xl p-5">
                        <div className="flex justify-between items-center">
                          <span className="text-lg">Kıdem Tazminatı:</span>
                          <span className="text-2xl font-bold text-[#d4af37]">₺{kidemResult.kidemTazminati}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* İHBAR TAZMİNATI */}
            {activeTab === 'ihbar' && (
              <motion.div
                key="ihbar"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto"
              >
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <h2 className="text-2xl font-semibold text-[#0a1628] mb-6 flex items-center gap-3">
                    <Clock className="w-6 h-6 text-[#d4af37]" />
                    İhbar Tazminatı
                  </h2>

                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Çalışma Süresi (Yıl) *</label>
                      <input
                        type="number"
                        step="0.1"
                        value={ihbarFormData.calismaYili}
                        onChange={(e) => setIhbarFormData(prev => ({ ...prev, calismaYili: e.target.value }))}
                        placeholder="Örn: 2.5"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Brüt Ücret (₺) *</label>
                      <input
                        type="number"
                        value={ihbarFormData.brutSalary}
                        onChange={(e) => setIhbarFormData(prev => ({ ...prev, brutSalary: e.target.value }))}
                        placeholder={`Varsayılan: ${ASGARI_UCRET_BRUT.toLocaleString('tr-TR')}`}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition"
                      />
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                      <h4 className="font-semibold text-blue-800 mb-2">İhbar Süreleri (İş Kanunu m.17)</h4>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• 0-6 ay arası: <strong>2 hafta</strong></li>
                        <li>• 6-18 ay arası: <strong>4 hafta</strong></li>
                        <li>• 18-36 ay arası: <strong>6 hafta</strong></li>
                        <li>• 3 yıl ve üzeri: <strong>8 hafta</strong></li>
                      </ul>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <button
                        onClick={calculateIhbar}
                        disabled={!ihbarFormData.calismaYili || !ihbarFormData.brutSalary}
                        className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#d4af37] to-[#b8962e] text-[#0a1628] px-6 py-4 rounded-xl font-semibold hover:from-[#e5c04a] hover:to-[#d4af37] transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Calculator className="w-5 h-5" />
                        Hesapla
                      </button>
                      <button
                        onClick={clearIhbarForm}
                        className="flex items-center justify-center gap-2 bg-gray-200 text-gray-700 px-6 py-4 rounded-xl font-medium hover:bg-gray-300 transition-all"
                      >
                        <RefreshCw className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <h2 className="text-2xl font-semibold text-[#0a1628] mb-6 flex items-center gap-3">
                    <DollarSign className="w-6 h-6 text-[#d4af37]" />
                    Hesaplama Sonucu
                  </h2>

                  {!ihbarResult ? (
                    <div className="text-center py-16">
                      <ClipboardList className="w-20 h-20 mx-auto text-gray-300 mb-4" />
                      <p className="text-gray-500 text-lg">Hesaplama yapmak için formu doldurun</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span className="text-gray-700">Çalışma Süresi:</span>
                          <span className="font-semibold">{ihbarResult.calismaYili} yıl</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                          <span className="text-blue-700">İhbar Süresi:</span>
                          <span className="font-semibold text-blue-900">{ihbarResult.ihbarSuresi} hafta ({ihbarResult.ihbarGunu} gün)</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span className="text-gray-700">Günlük Ücret:</span>
                          <span className="font-semibold">₺{ihbarResult.gunlukUcret}</span>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-[#0a1628] to-[#1a2d4a] text-white rounded-xl p-5">
                        <div className="flex justify-between items-center">
                          <span className="text-lg">İhbar Tazminatı:</span>
                          <span className="text-2xl font-bold text-[#d4af37]">₺{ihbarResult.ihbarTazminati}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* YILLIK İZİN */}
            {activeTab === 'izin' && (
              <motion.div
                key="izin"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto"
              >
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <h2 className="text-2xl font-semibold text-[#0a1628] mb-6 flex items-center gap-3">
                    <Plane className="w-6 h-6 text-[#d4af37]" />
                    Yıllık İzin Ücreti
                  </h2>

                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Çalışma Süresi (Yıl) *</label>
                      <input
                        type="number"
                        step="0.1"
                        value={izinFormData.calismaYili}
                        onChange={(e) => setIzinFormData(prev => ({ ...prev, calismaYili: e.target.value }))}
                        placeholder="Örn: 3"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Kullanılan İzin (Gün)</label>
                      <input
                        type="number"
                        value={izinFormData.kullanilanIzin}
                        onChange={(e) => setIzinFormData(prev => ({ ...prev, kullanilanIzin: e.target.value }))}
                        placeholder="0"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Brüt Ücret (₺) *</label>
                      <input
                        type="number"
                        value={izinFormData.brutSalary}
                        onChange={(e) => setIzinFormData(prev => ({ ...prev, brutSalary: e.target.value }))}
                        placeholder={`Varsayılan: ${ASGARI_UCRET_BRUT.toLocaleString('tr-TR')}`}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition"
                      />
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                      <h4 className="font-semibold text-green-800 mb-2">Yıllık İzin Hakları (İş Kanunu m.53)</h4>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• 1-5 yıl arası: <strong>14 gün</strong></li>
                        <li>• 5-15 yıl arası: <strong>20 gün</strong></li>
                        <li>• 15 yıl ve üzeri: <strong>26 gün</strong></li>
                      </ul>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <button
                        onClick={calculateIzin}
                        disabled={!izinFormData.calismaYili || !izinFormData.brutSalary}
                        className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#d4af37] to-[#b8962e] text-[#0a1628] px-6 py-4 rounded-xl font-semibold hover:from-[#e5c04a] hover:to-[#d4af37] transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Calculator className="w-5 h-5" />
                        Hesapla
                      </button>
                      <button
                        onClick={clearIzinForm}
                        className="flex items-center justify-center gap-2 bg-gray-200 text-gray-700 px-6 py-4 rounded-xl font-medium hover:bg-gray-300 transition-all"
                      >
                        <RefreshCw className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <h2 className="text-2xl font-semibold text-[#0a1628] mb-6 flex items-center gap-3">
                    <DollarSign className="w-6 h-6 text-[#d4af37]" />
                    Hesaplama Sonucu
                  </h2>

                  {!izinResult ? (
                    <div className="text-center py-16">
                      <ClipboardList className="w-20 h-20 mx-auto text-gray-300 mb-4" />
                      <p className="text-gray-500 text-lg">Hesaplama yapmak için formu doldurun</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span className="text-gray-700">Yıllık İzin Hakkı:</span>
                          <span className="font-semibold">{izinResult.izinHakki} gün</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span className="text-gray-700">Kullanılan İzin:</span>
                          <span className="font-semibold">{izinResult.kullanilanIzin} gün</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                          <span className="text-red-700">Kullanılmayan İzin:</span>
                          <span className="font-bold text-red-700">{izinResult.kullanilamayanIzin} gün</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span className="text-gray-700">Günlük Ücret:</span>
                          <span className="font-semibold">₺{izinResult.gunlukUcret}</span>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-[#0a1628] to-[#1a2d4a] text-white rounded-xl p-5">
                        <div className="flex justify-between items-center">
                          <span className="text-lg">Yıllık İzin Ücreti:</span>
                          <span className="text-2xl font-bold text-[#d4af37]">₺{izinResult.izinUcreti}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* MESAİ ÜCRETİ */}
            {activeTab === 'mesai' && (
              <motion.div
                key="mesai"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto"
              >
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <h2 className="text-2xl font-semibold text-[#0a1628] mb-6 flex items-center gap-3">
                    <Coffee className="w-6 h-6 text-[#d4af37]" />
                    Mesai Ücreti
                  </h2>

                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Saatlik Ücret (₺) *</label>
                      <input
                        type="number"
                        step="0.01"
                        value={mesaiFormData.saatlikUcret}
                        onChange={(e) => setMesaiFormData(prev => ({ ...prev, saatlikUcret: e.target.value }))}
                        placeholder="Brüt ücret / 225"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Haftalık Fazla Mesai (Saat)</label>
                      <input
                        type="number"
                        value={mesaiFormData.haftalikMesai}
                        onChange={(e) => setMesaiFormData(prev => ({ ...prev, haftalikMesai: e.target.value }))}
                        placeholder="45 saati aşan çalışma"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition"
                      />
                      <p className="text-xs text-gray-500 mt-1">Normal çalışma: Haftalık 45 saat</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Hafta Tatili Çalışma (Saat)</label>
                      <input
                        type="number"
                        value={mesaiFormData.haftalikTatil}
                        onChange={(e) => setMesaiFormData(prev => ({ ...prev, haftalikTatil: e.target.value }))}
                        placeholder="Pazar günü çalışma"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Ulusal Bayram/UBGT Çalışma (Saat)</label>
                      <input
                        type="number"
                        value={mesaiFormData.ulusalBayram}
                        onChange={(e) => setMesaiFormData(prev => ({ ...prev, ulusalBayram: e.target.value }))}
                        placeholder="Resmi tatil çalışma"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition"
                      />
                    </div>

                    <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                      <h4 className="font-semibold text-purple-800 mb-2">Mesai Zam Oranları</h4>
                      <ul className="text-sm text-purple-700 space-y-1">
                        <li>• Fazla Mesai: <strong>%50 zamlı</strong></li>
                        <li>• Hafta Tatili: <strong>%100 zamlı</strong></li>
                        <li>• Ulusal Bayram: <strong>%100 zamlı</strong></li>
                      </ul>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <button
                        onClick={calculateMesai}
                        disabled={!mesaiFormData.saatlikUcret}
                        className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#d4af37] to-[#b8962e] text-[#0a1628] px-6 py-4 rounded-xl font-semibold hover:from-[#e5c04a] hover:to-[#d4af37] transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Calculator className="w-5 h-5" />
                        Hesapla
                      </button>
                      <button
                        onClick={clearMesaiForm}
                        className="flex items-center justify-center gap-2 bg-gray-200 text-gray-700 px-6 py-4 rounded-xl font-medium hover:bg-gray-300 transition-all"
                      >
                        <RefreshCw className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <h2 className="text-2xl font-semibold text-[#0a1628] mb-6 flex items-center gap-3">
                    <DollarSign className="w-6 h-6 text-[#d4af37]" />
                    Hesaplama Sonucu
                  </h2>

                  {!mesaiResult ? (
                    <div className="text-center py-16">
                      <ClipboardList className="w-20 h-20 mx-auto text-gray-300 mb-4" />
                      <p className="text-gray-500 text-lg">Hesaplama yapmak için formu doldurun</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span className="text-gray-700">Saatlik Ücret:</span>
                          <span className="font-semibold">₺{mesaiResult.saatlikUcret}</span>
                        </div>
                        {parseFloat(mesaiResult.fazlaMesaiUcreti.replace(/\./g, '').replace(',', '.')) > 0 && (
                          <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                            <span className="text-blue-700">Fazla Mesai ({mesaiResult.fazlaMesaiSaat} saat):</span>
                            <span className="font-semibold text-blue-900">₺{mesaiResult.fazlaMesaiUcreti}</span>
                          </div>
                        )}
                        {parseFloat(mesaiResult.haftaTatiliUcreti.replace(/\./g, '').replace(',', '.')) > 0 && (
                          <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                            <span className="text-green-700">Hafta Tatili ({mesaiResult.haftaTatiliSaat} saat):</span>
                            <span className="font-semibold text-green-900">₺{mesaiResult.haftaTatiliUcreti}</span>
                          </div>
                        )}
                        {parseFloat(mesaiResult.bayramUcreti.replace(/\./g, '').replace(',', '.')) > 0 && (
                          <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                            <span className="text-red-700">UBGT ({mesaiResult.bayramSaat} saat):</span>
                            <span className="font-semibold text-red-900">₺{mesaiResult.bayramUcreti}</span>
                          </div>
                        )}
                      </div>

                      <div className="bg-gradient-to-r from-[#0a1628] to-[#1a2d4a] text-white rounded-xl p-5">
                        <div className="flex justify-between items-center">
                          <span className="text-lg">Toplam Mesai:</span>
                          <span className="text-2xl font-bold text-[#d4af37]">₺{mesaiResult.toplamMesai}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Uyarı Bölümü */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-6 h-6 text-amber-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-amber-800 mb-2">Önemli Bilgilendirme</h3>
                  <p className="text-amber-700">
                    Bu hesaplamalar bilgilendirme amaçlıdır ve kesin sonuç niteliği taşımaz. Gerçek alacak tutarları;
                    iş akdinin fesih şekli, kıdem tavanı uygulaması, vergi kesintileri ve diğer faktörlere göre
                    değişebilir. Kesin hesaplama için bir iş hukuku avukatına danışmanızı öneririz.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Bölümü */}
      <section className="py-16 bg-gradient-to-br from-[#0a1628] via-[#1a2d4a] to-[#0a1628] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-light mb-6">
            İşçilik <span className="text-[#d4af37]">Alacaklarınız</span> İçin Hukuki Destek
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Haklarınızı korumak için deneyimli iş hukuku ekibimizden ücretsiz ön görüşme alın.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/iletisim"
              className="bg-gradient-to-r from-[#d4af37] to-[#b8962e] text-[#0a1628] px-8 py-4 rounded-xl font-semibold inline-flex items-center justify-center gap-2 hover:from-[#e5c04a] hover:to-[#d4af37] transition-all shadow-lg"
            >
              <Phone className="w-5 h-5" />
              Ücretsiz Ön Görüşme
            </Link>
            <Link
              href="/hesaplama-araclari"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold inline-flex items-center justify-center gap-2 hover:bg-white hover:text-[#0a1628] transition-all"
            >
              Diğer Araçlar
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
