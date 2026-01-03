'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Calculator, 
  Car,
  AlertTriangle, 
  RefreshCw,
  Phone,
  ClipboardList,
  DollarSign,
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  Info,
  Calendar
} from 'lucide-react'
import Link from 'next/link'

// Hasar kodları ve açıklamaları
const HASAR_KODLARI = {
  'A1': { oran: 0.02, aciklama: 'Hafif çizik/ezik (boyasız düzeltme)' },
  'A2': { oran: 0.04, aciklama: 'Boyalı onarım' },
  'A3': { oran: 0.06, aciklama: 'Parça değişimi (orijinal)' },
  'A4': { oran: 0.08, aciklama: 'Yapısal hasar onarımı' }
}

// Araç parçaları
const ARAC_PARCALARI = [
  { id: 'on_tampon', label: 'Ön Tampon', x: 50, y: 5 },
  { id: 'on_kaput', label: 'Ön Kaput', x: 50, y: 15 },
  { id: 'on_camurluk_sol', label: 'Sol Ön Çamurluk', x: 15, y: 20 },
  { id: 'on_camurluk_sag', label: 'Sağ Ön Çamurluk', x: 85, y: 20 },
  { id: 'on_kapi_sol', label: 'Sol Ön Kapı', x: 15, y: 40 },
  { id: 'on_kapi_sag', label: 'Sağ Ön Kapı', x: 85, y: 40 },
  { id: 'arka_kapi_sol', label: 'Sol Arka Kapı', x: 15, y: 55 },
  { id: 'arka_kapi_sag', label: 'Sağ Arka Kapı', x: 85, y: 55 },
  { id: 'arka_camurluk_sol', label: 'Sol Arka Çamurluk', x: 15, y: 70 },
  { id: 'arka_camurluk_sag', label: 'Sağ Arka Çamurluk', x: 85, y: 70 },
  { id: 'bagaj', label: 'Bagaj Kapağı', x: 50, y: 80 },
  { id: 'arka_tampon', label: 'Arka Tampon', x: 50, y: 92 },
  { id: 'tavan', label: 'Tavan', x: 50, y: 45 },
  { id: 'on_far_sol', label: 'Sol Far', x: 25, y: 8 },
  { id: 'on_far_sag', label: 'Sağ Far', x: 75, y: 8 },
  { id: 'arka_stop_sol', label: 'Sol Stop', x: 25, y: 88 },
  { id: 'arka_stop_sag', label: 'Sağ Stop', x: 75, y: 88 }
]

// Kilometre katsayıları
const KM_KATSAYILARI = [
  { min: 0, max: 10000, katsayi: 1.10 },
  { min: 10001, max: 30000, katsayi: 1.05 },
  { min: 30001, max: 50000, katsayi: 1.02 },
  { min: 50001, max: 75000, katsayi: 1.00 },
  { min: 75001, max: 100000, katsayi: 0.98 },
  { min: 100001, max: 150000, katsayi: 0.95 },
  { min: 150001, max: 200000, katsayi: 0.92 },
  { min: 200001, max: Infinity, katsayi: 0.88 }
]

export default function AracDegerKaybiPage() {
  const [step, setStep] = useState(1)
  
  const [formData, setFormData] = useState({
    // Araç Bilgileri
    marketValue: '',
    mileage: '',
    kazaTarihi: '',
    oncekiHasar: 'hayir',
    
    // Hasar Bilgileri
    hasarlar: {} as { [key: string]: string }
  })

  const [result, setResult] = useState<any>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleHasarChange = (parcaId: string, hasarKodu: string) => {
    setFormData(prev => ({
      ...prev,
      hasarlar: {
        ...prev.hasarlar,
        [parcaId]: hasarKodu
      }
    }))
  }

  const clearHasar = (parcaId: string) => {
    setFormData(prev => {
      const yeniHasarlar = { ...prev.hasarlar }
      delete yeniHasarlar[parcaId]
      return { ...prev, hasarlar: yeniHasarlar }
    })
  }

  const calculateDegerKaybi = () => {
    const marketValue = parseFloat(formData.marketValue) || 0
    const mileage = parseFloat(formData.mileage) || 0

    // Kilometre katsayısını bul
    let kmKatsayi = 1
    for (const k of KM_KATSAYILARI) {
      if (mileage >= k.min && mileage <= k.max) {
        kmKatsayi = k.katsayi
        break
      }
    }

    // Düzeltilmiş piyasa değeri
    const duzeltilmisDeger = marketValue * kmKatsayi

    // Hasar oranlarını topla
    let toplamHasarOrani = 0
    const hasarDetaylari: Array<{ parca: string; kod: string; oran: number }> = []
    
    for (const [parcaId, hasarKodu] of Object.entries(formData.hasarlar)) {
      if (hasarKodu && HASAR_KODLARI[hasarKodu as keyof typeof HASAR_KODLARI]) {
        const parca = ARAC_PARCALARI.find(p => p.id === parcaId)
        const hasarOrani = HASAR_KODLARI[hasarKodu as keyof typeof HASAR_KODLARI].oran
        toplamHasarOrani += hasarOrani
        hasarDetaylari.push({
          parca: parca?.label || parcaId,
          kod: hasarKodu,
          oran: hasarOrani * 100
        })
      }
    }

    // Önceki hasar varsa %20 indirim
    const oncekiHasarKatsayi = formData.oncekiHasar === 'evet' ? 0.8 : 1

    // Toplam değer kaybı
    const degerKaybi = duzeltilmisDeger * toplamHasarOrani * oncekiHasarKatsayi

    setResult({
      piyasaDegeri: marketValue.toLocaleString('tr-TR'),
      kilometre: mileage.toLocaleString('tr-TR'),
      kmKatsayi: kmKatsayi.toFixed(2),
      duzeltilmisDeger: duzeltilmisDeger.toLocaleString('tr-TR'),
      hasarDetaylari,
      toplamHasarOrani: (toplamHasarOrani * 100).toFixed(1),
      oncekiHasarIndirimi: formData.oncekiHasar === 'evet',
      degerKaybi: degerKaybi.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    })

    setStep(3)
  }

  const resetForm = () => {
    setFormData({
      marketValue: '',
      mileage: '',
      kazaTarihi: '',
      oncekiHasar: 'hayir',
      hasarlar: {}
    })
    setResult(null)
    setStep(1)
  }

  const hasarliParcaSayisi = Object.keys(formData.hasarlar).length

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
              <Car className="w-10 h-10 text-white" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-5xl font-light text-white mb-4"
            >
              Araç <span className="text-[#d4af37]">Değer Kaybı</span> Hesaplama
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-gray-300 max-w-2xl mx-auto"
            >
              Kaza sonrası aracınızın değer kaybını profesyonel yöntemlerle hesaplayın
            </motion.p>
          </div>
        </div>
      </section>

      {/* Progress Bar */}
      <section className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
              {[
                { num: 1, label: 'Araç Bilgileri' },
                { num: 2, label: 'Hasar Seçimi' },
                { num: 3, label: 'Sonuç' }
              ].map((item, index) => (
                <div key={item.num} className="flex items-center flex-1">
                  <div className="flex items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                        step >= item.num
                          ? 'bg-[#d4af37] text-white'
                          : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {step > item.num ? <CheckCircle className="w-5 h-5" /> : item.num}
                    </div>
                    <span className={`ml-3 hidden md:inline font-medium ${
                      step >= item.num ? 'text-[#0a1628]' : 'text-gray-400'
                    }`}>
                      {item.label}
                    </span>
                  </div>
                  {index < 2 && (
                    <div className={`flex-1 h-1 mx-4 rounded ${
                      step > item.num ? 'bg-[#d4af37]' : 'bg-gray-200'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Form Bölümü */}
      <section className="py-12 bg-[#faf8f5]">
        <div className="container mx-auto px-4">
          <AnimatePresence mode="wait">
            {/* ADIM 1: ARAÇ BİLGİLERİ */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="max-w-2xl mx-auto"
              >
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <h2 className="text-2xl font-semibold text-[#0a1628] mb-6 flex items-center gap-3">
                    <Car className="w-6 h-6 text-[#d4af37]" />
                    Araç Bilgileri
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Aracın Piyasa Değeri (₺) *
                      </label>
                      <input
                        type="number"
                        name="marketValue"
                        value={formData.marketValue}
                        onChange={handleInputChange}
                        placeholder="Örn: 750000"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Kaza tarihindeki piyasa değerini giriniz (2. el ilanlarından kontrol edebilirsiniz)
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Kilometre *
                      </label>
                      <input
                        type="number"
                        name="mileage"
                        value={formData.mileage}
                        onChange={handleInputChange}
                        placeholder="Örn: 85000"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Kaza Tarihi
                      </label>
                      <input
                        type="date"
                        name="kazaTarihi"
                        value={formData.kazaTarihi}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Araç Daha Önce Hasar Kaydı Var mı?
                      </label>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="oncekiHasar"
                            value="hayir"
                            checked={formData.oncekiHasar === 'hayir'}
                            onChange={handleInputChange}
                            className="w-5 h-5 text-[#d4af37] focus:ring-[#d4af37]"
                          />
                          <span>Hayır</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="oncekiHasar"
                            value="evet"
                            checked={formData.oncekiHasar === 'evet'}
                            onChange={handleInputChange}
                            className="w-5 h-5 text-[#d4af37] focus:ring-[#d4af37]"
                          />
                          <span>Evet</span>
                        </label>
                      </div>
                      {formData.oncekiHasar === 'evet' && (
                        <p className="text-xs text-amber-600 mt-2">
                          ⚠️ Önceki hasar kaydı, değer kaybı hesaplamasında %20 indirim uygulanmasına neden olur.
                        </p>
                      )}
                    </div>

                    <button
                      onClick={() => setStep(2)}
                      disabled={!formData.marketValue || !formData.mileage}
                      className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#d4af37] to-[#b8962e] text-[#0a1628] px-6 py-4 rounded-xl font-semibold hover:from-[#e5c04a] hover:to-[#d4af37] transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Devam Et
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ADIM 2: HASAR SEÇİMİ */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="max-w-6xl mx-auto"
              >
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Araç Şeması */}
                  <div className="bg-white rounded-2xl shadow-xl p-8">
                    <h2 className="text-2xl font-semibold text-[#0a1628] mb-6">
                      Hasarlı Bölgeleri Seçin
                    </h2>

                    <div className="relative bg-gray-100 rounded-xl p-4" style={{ minHeight: '500px' }}>
                      {/* Basit araç görseli */}
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        {/* Araç gövdesi */}
                        <rect x="20" y="10" width="60" height="80" rx="10" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="1" />
                        
                        {/* Ön cam */}
                        <polygon points="25,20 75,20 70,35 30,35" fill="#bfdbfe" stroke="#60a5fa" strokeWidth="0.5" />
                        
                        {/* Arka cam */}
                        <polygon points="30,65 70,65 75,80 25,80" fill="#bfdbfe" stroke="#60a5fa" strokeWidth="0.5" />
                        
                        {/* Tekerlekler */}
                        <circle cx="25" cy="28" r="5" fill="#374151" />
                        <circle cx="75" cy="28" r="5" fill="#374151" />
                        <circle cx="25" cy="72" r="5" fill="#374151" />
                        <circle cx="75" cy="72" r="5" fill="#374151" />
                      </svg>

                      {/* Tıklanabilir alanlar */}
                      {ARAC_PARCALARI.map(parca => (
                        <div
                          key={parca.id}
                          className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                          style={{ left: `${parca.x}%`, top: `${parca.y}%` }}
                        >
                          <button
                            onClick={() => {
                              if (formData.hasarlar[parca.id]) {
                                clearHasar(parca.id)
                              } else {
                                handleHasarChange(parca.id, 'A2')
                              }
                            }}
                            className={`w-6 h-6 rounded-full border-2 transition-all ${
                              formData.hasarlar[parca.id]
                                ? 'bg-red-500 border-red-600 scale-110'
                                : 'bg-white border-gray-400 hover:border-[#d4af37] hover:scale-110'
                            }`}
                          >
                            {formData.hasarlar[parca.id] && (
                              <span className="text-white text-xs font-bold">✓</span>
                            )}
                          </button>
                          <span className="absolute left-1/2 -translate-x-1/2 top-8 bg-[#0a1628] text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-10">
                            {parca.label}
                          </span>
                        </div>
                      ))}
                    </div>

                    <p className="text-sm text-gray-500 mt-4 text-center">
                      Hasarlı bölgelere tıklayarak seçin, tekrar tıklayarak kaldırın
                    </p>
                  </div>

                  {/* Hasar Detayları */}
                  <div className="bg-white rounded-2xl shadow-xl p-8">
                    <h2 className="text-2xl font-semibold text-[#0a1628] mb-6">
                      Hasar Detayları ({hasarliParcaSayisi} parça)
                    </h2>

                    {hasarliParcaSayisi === 0 ? (
                      <div className="text-center py-12">
                        <Info className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                        <p className="text-gray-500">
                          Araç üzerinden hasarlı bölgeleri seçin
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4 max-h-96 overflow-y-auto">
                        {Object.entries(formData.hasarlar).map(([parcaId, hasarKodu]) => {
                          const parca = ARAC_PARCALARI.find(p => p.id === parcaId)
                          return (
                            <div key={parcaId} className="bg-gray-50 rounded-xl p-4">
                              <div className="flex justify-between items-start mb-3">
                                <h4 className="font-semibold text-[#0a1628]">{parca?.label}</h4>
                                <button
                                  onClick={() => clearHasar(parcaId)}
                                  className="text-red-500 hover:text-red-700 text-sm"
                                >
                                  Kaldır
                                </button>
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                {Object.entries(HASAR_KODLARI).map(([kod, detay]) => (
                                  <button
                                    key={kod}
                                    onClick={() => handleHasarChange(parcaId, kod)}
                                    className={`p-2 rounded-lg text-left text-sm transition-all ${
                                      hasarKodu === kod
                                        ? 'bg-[#d4af37] text-[#0a1628] font-medium'
                                        : 'bg-white border border-gray-200 hover:border-[#d4af37]'
                                    }`}
                                  >
                                    <span className="font-semibold">{kod}</span>
                                    <span className="block text-xs opacity-80">{detay.aciklama}</span>
                                  </button>
                                ))}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    )}

                    {/* Hasar Kodu Açıklaması */}
                    <div className="mt-6 bg-blue-50 rounded-xl p-4">
                      <h4 className="font-semibold text-blue-800 mb-2">Hasar Kodları</h4>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li><strong>A1:</strong> %2 - Hafif çizik/ezik</li>
                        <li><strong>A2:</strong> %4 - Boyalı onarım</li>
                        <li><strong>A3:</strong> %6 - Parça değişimi</li>
                        <li><strong>A4:</strong> %8 - Yapısal hasar</li>
                      </ul>
                    </div>

                    <div className="flex gap-4 mt-6">
                      <button
                        onClick={() => setStep(1)}
                        className="flex items-center justify-center gap-2 bg-gray-200 text-gray-700 px-6 py-4 rounded-xl font-medium hover:bg-gray-300 transition-all"
                      >
                        <ChevronLeft className="w-5 h-5" />
                        Geri
                      </button>
                      <button
                        onClick={calculateDegerKaybi}
                        disabled={hasarliParcaSayisi === 0}
                        className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#d4af37] to-[#b8962e] text-[#0a1628] px-6 py-4 rounded-xl font-semibold hover:from-[#e5c04a] hover:to-[#d4af37] transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Calculator className="w-5 h-5" />
                        Hesapla
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ADIM 3: SONUÇ */}
            {step === 3 && result && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="max-w-3xl mx-auto"
              >
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <h2 className="text-2xl font-semibold text-[#0a1628] mb-6 flex items-center gap-3">
                    <DollarSign className="w-6 h-6 text-[#d4af37]" />
                    Değer Kaybı Hesaplama Sonucu
                  </h2>

                  <div className="space-y-6">
                    {/* Araç Bilgileri */}
                    <div className="bg-blue-50 rounded-xl p-5">
                      <h3 className="font-semibold text-blue-800 mb-4">Araç Bilgileri</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex justify-between">
                          <span className="text-blue-700">Piyasa Değeri:</span>
                          <span className="font-semibold text-blue-900">₺{result.piyasaDegeri}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-blue-700">Kilometre:</span>
                          <span className="font-semibold text-blue-900">{result.kilometre} km</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-blue-700">Km Katsayısı:</span>
                          <span className="font-semibold text-blue-900">{result.kmKatsayi}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-blue-700">Düzeltilmiş Değer:</span>
                          <span className="font-semibold text-blue-900">₺{result.duzeltilmisDeger}</span>
                        </div>
                      </div>
                    </div>

                    {/* Hasar Detayları */}
                    <div className="bg-red-50 rounded-xl p-5">
                      <h3 className="font-semibold text-red-800 mb-4">Hasar Detayları</h3>
                      <div className="space-y-2">
                        {result.hasarDetaylari.map((hasar: any, index: number) => (
                          <div key={index} className="flex justify-between items-center p-2 bg-white rounded-lg">
                            <span className="text-gray-700">{hasar.parca} ({hasar.kod})</span>
                            <span className="font-semibold text-red-600">%{hasar.oran}</span>
                          </div>
                        ))}
                        <div className="flex justify-between items-center pt-3 border-t border-red-200">
                          <span className="font-semibold text-red-800">Toplam Hasar Oranı:</span>
                          <span className="font-bold text-red-800">%{result.toplamHasarOrani}</span>
                        </div>
                      </div>
                    </div>

                    {/* Önceki Hasar İndirimi */}
                    {result.oncekiHasarIndirimi && (
                      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-5 h-5 text-amber-600" />
                          <span className="text-amber-700">
                            Önceki hasar kaydı nedeniyle %20 indirim uygulandı
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Sonuç */}
                    <div className="bg-gradient-to-r from-[#0a1628] to-[#1a2d4a] text-white rounded-xl p-6">
                      <div className="text-center">
                        <span className="text-lg text-gray-300">Tahmini Değer Kaybı</span>
                        <div className="text-4xl font-bold text-[#d4af37] mt-2">₺{result.degerKaybi}</div>
                      </div>
                    </div>

                    {/* Uyarı */}
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <Info className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                        <div className="text-sm text-gray-600">
                          <p className="mb-2">
                            Bu hesaplama tahmini bir değerdir. Gerçek değer kaybı tutarı, mahkemece atanan
                            bilirkişi tarafından belirlenir.
                          </p>
                          <p>
                            Değer kaybı davası açmak için 2 yıllık zamanaşımı süresi bulunmaktadır.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Butonlar */}
                    <div className="flex gap-4">
                      <button
                        onClick={resetForm}
                        className="flex items-center justify-center gap-2 bg-gray-200 text-gray-700 px-6 py-4 rounded-xl font-medium hover:bg-gray-300 transition-all"
                      >
                        <RefreshCw className="w-5 h-5" />
                        Yeniden Hesapla
                      </button>
                      <Link
                        href="/iletisim"
                        className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#d4af37] to-[#b8962e] text-[#0a1628] px-6 py-4 rounded-xl font-semibold hover:from-[#e5c04a] hover:to-[#d4af37] transition-all shadow-lg"
                      >
                        <Phone className="w-5 h-5" />
                        Avukata Danış
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* CTA Bölümü */}
      <section className="py-16 bg-gradient-to-br from-[#0a1628] via-[#1a2d4a] to-[#0a1628] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-light mb-6">
            Araç Değer Kaybı <span className="text-[#d4af37]">Tazminatınızı</span> Alın
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Sigorta şirketleri değer kaybı taleplerini genellikle reddeder. Hakkınızı almak için profesyonel destek alın.
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
