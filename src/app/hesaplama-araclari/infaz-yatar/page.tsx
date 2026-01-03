'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Calculator, 
  Calendar, 
  Clock, 
  AlertTriangle, 
  Info, 
  CheckCircle,
  RefreshCw,
  Phone,
  Scale,
  User,
  FileText
} from 'lucide-react'
import Link from 'next/link'

// Suç türleri ve infaz oranları
const SUC_TURLERI = [
  { value: 'genel', label: 'Genel Suçlar', oran: 0.5, aciklama: '1/2 oranında infaz' },
  { value: 'kasten_adam_oldurme', label: 'Kasten Adam Öldürme', oran: 0.75, aciklama: '3/4 oranında infaz' },
  { value: 'uyusturucu', label: 'Uyuşturucu Suçları', oran: 0.75, aciklama: '3/4 oranında infaz' },
  { value: 'cinsel_suc', label: 'Cinsel Suçlar', oran: 0.75, aciklama: '3/4 oranında infaz' },
  { value: 'teror', label: 'Terör Suçları', oran: 0.75, aciklama: '3/4 oranında infaz' },
  { value: 'organize_suc', label: 'Organize Suçlar', oran: 0.75, aciklama: '3/4 oranında infaz' },
  { value: 'muebbet', label: 'Müebbet Hapis', oran: 0, aciklama: '24 yıl sonra koşullu salıverilme' },
  { value: 'agir_muebbet', label: 'Ağırlaştırılmış Müebbet', oran: 0, aciklama: '30 yıl sonra koşullu salıverilme' }
]

export default function InfazYatarPage() {
  const [formData, setFormData] = useState({
    sucTuru: 'genel',
    years: '',
    months: '',
    days: '',
    convictionDate: '',
    crimeDate: '',
    preTrialDays: '',
    birthDate: '',
    gender: 'erkek',
    isRecidivist: false,
    isJuvenile: false,
    goodBehavior: 'evet'
  })

  const [result, setResult] = useState<any>(null)
  const [calculatedAge, setCalculatedAge] = useState<number | null>(null)

  // Yaş hesaplama
  useEffect(() => {
    if (formData.birthDate && formData.crimeDate) {
      const birth = new Date(formData.birthDate)
      const crime = new Date(formData.crimeDate)
      const age = Math.floor((crime.getTime() - birth.getTime()) / (365.25 * 24 * 60 * 60 * 1000))
      setCalculatedAge(age)
    }
  }, [formData.birthDate, formData.crimeDate])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData(prev => ({ ...prev, [name]: checked }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const calculateInfaz = () => {
    const years = parseInt(formData.years) || 0
    const months = parseInt(formData.months) || 0
    const days = parseInt(formData.days) || 0
    const preTrialDays = parseInt(formData.preTrialDays) || 0

    // Toplam ceza süresi (gün olarak)
    const toplamCezaGun = (years * 365) + (months * 30) + days

    // İnfaz oranını belirle
    let infazOrani = 0.5 // Varsayılan
    let sucTuruAciklama = ''
    
    const seciliSuc = SUC_TURLERI.find(s => s.value === formData.sucTuru)
    if (seciliSuc) {
      infazOrani = seciliSuc.oran
      sucTuruAciklama = seciliSuc.aciklama
    }

    // Mükerrir ise 3/4 oranı
    if (formData.isRecidivist) {
      infazOrani = 0.75
      sucTuruAciklama = 'Mükerrir - 3/4 oranında infaz'
    }

    // Çocuk hükümlü ise özel oranlar
    if (formData.isJuvenile || (calculatedAge !== null && calculatedAge < 18)) {
      infazOrani = infazOrani * 0.5 // Çocuklar için yarı oran
      sucTuruAciklama += ' (Çocuk hükümlü indirimi uygulandı)'
    }

    // Müebbet ve ağırlaştırılmış müebbet için özel hesaplama
    let kosulluSalivermeGun = 0
    let denetimliSerbestlikYil = 3 // Varsayılan 3 yıl

    if (formData.sucTuru === 'muebbet') {
      kosulluSalivermeGun = 24 * 365 // 24 yıl
    } else if (formData.sucTuru === 'agir_muebbet') {
      kosulluSalivermeGun = 30 * 365 // 30 yıl
    } else {
      kosulluSalivermeGun = Math.ceil(toplamCezaGun * infazOrani)
    }

    // 30 Mart 2020 öncesi suçlar için denetimli serbestlik
    const crimeDate = new Date(formData.crimeDate)
    const march2020 = new Date('2020-03-31')
    
    if (crimeDate < march2020) {
      denetimliSerbestlikYil = 3
    } else {
      denetimliSerbestlikYil = 1
    }

    // Mahsup edilen günleri düş
    const netKosulluSaliverme = kosulluSalivermeGun - preTrialDays
    
    // Denetimli serbestlik başlangıcı
    const denetimliSerbestlikGun = denetimliSerbestlikYil * 365
    const cezaevindeGecenGun = Math.max(0, netKosulluSaliverme - denetimliSerbestlikGun)

    // Tarihleri hesapla
    const convictionDate = new Date(formData.convictionDate)
    
    const tamTahliyeTarihi = new Date(convictionDate)
    tamTahliyeTarihi.setDate(tamTahliyeTarihi.getDate() + toplamCezaGun - preTrialDays)

    const kosulluSalivermeTarihi = new Date(convictionDate)
    kosulluSalivermeTarihi.setDate(kosulluSalivermeTarihi.getDate() + netKosulluSaliverme)

    const denetimliSerbestlikTarihi = new Date(convictionDate)
    denetimliSerbestlikTarihi.setDate(denetimliSerbestlikTarihi.getDate() + cezaevindeGecenGun)

    // Açık cezaevi geçiş tarihi (cezanın 1/10'u)
    const acikCezaeviGun = Math.ceil(netKosulluSaliverme * 0.1)
    const acikCezaeviTarihi = new Date(convictionDate)
    acikCezaeviTarihi.setDate(acikCezaeviTarihi.getDate() + acikCezaeviGun)

    setResult({
      toplamCezaGun,
      infazOrani: (infazOrani * 100).toFixed(0),
      sucTuruAciklama,
      infazSuresi: netKosulluSaliverme,
      denetimliSerbestlikYil,
      mahsupGun: preTrialDays,
      cezaevindeGecen: cezaevindeGecenGun,
      tamTahliyeTarihi: tamTahliyeTarihi.toLocaleDateString('tr-TR'),
      kosulluSaliverme: kosulluSalivermeTarihi.toLocaleDateString('tr-TR'),
      denetimliSerbestlik: denetimliSerbestlikTarihi.toLocaleDateString('tr-TR'),
      acikCezaeviTarihi: acikCezaeviTarihi.toLocaleDateString('tr-TR'),
      acikGecisGunu: acikCezaeviGun
    })
  }

  const clearForm = () => {
    setFormData({
      sucTuru: 'genel',
      years: '',
      months: '',
      days: '',
      convictionDate: '',
      crimeDate: '',
      preTrialDays: '',
      birthDate: '',
      gender: 'erkek',
      isRecidivist: false,
      isJuvenile: false,
      goodBehavior: 'evet'
    })
    setResult(null)
    setCalculatedAge(null)
  }

  const canCalculate = (formData.years || formData.months || formData.days) && formData.convictionDate

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
              <Scale className="w-10 h-10 text-white" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-5xl font-light text-white mb-4"
            >
              İnfaz <span className="text-[#d4af37]">Yatar</span> Hesaplama
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-gray-300 max-w-2xl mx-auto"
            >
              CGTİK m.107 ve m.105/A hükümlerine göre ceza infaz süreleri hesaplama aracı
            </motion.p>
          </div>
        </div>
      </section>

      {/* Form ve Sonuç Bölümü */}
      <section className="py-12 bg-[#faf8f5]">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            
            {/* Form Bölümü */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <h2 className="text-2xl font-semibold text-[#0a1628] mb-6 flex items-center gap-3">
                <FileText className="w-6 h-6 text-[#d4af37]" />
                Ceza Bilgileri
              </h2>

              <div className="space-y-6">
                {/* Suç Türü */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Suç Türü *
                  </label>
                  <select
                    name="sucTuru"
                    value={formData.sucTuru}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition"
                  >
                    {SUC_TURLERI.map(suc => (
                      <option key={suc.value} value={suc.value}>
                        {suc.label} - {suc.aciklama}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Ceza Süresi */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hapis Cezası Süresi *
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <input
                        type="number"
                        name="years"
                        value={formData.years}
                        onChange={handleInputChange}
                        placeholder="Yıl"
                        min="0"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition"
                      />
                      <span className="text-xs text-gray-500 mt-1 block">Yıl</span>
                    </div>
                    <div>
                      <input
                        type="number"
                        name="months"
                        value={formData.months}
                        onChange={handleInputChange}
                        placeholder="Ay"
                        min="0"
                        max="11"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition"
                      />
                      <span className="text-xs text-gray-500 mt-1 block">Ay</span>
                    </div>
                    <div>
                      <input
                        type="number"
                        name="days"
                        value={formData.days}
                        onChange={handleInputChange}
                        placeholder="Gün"
                        min="0"
                        max="30"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition"
                      />
                      <span className="text-xs text-gray-500 mt-1 block">Gün</span>
                    </div>
                  </div>
                </div>

                {/* Mahkumiyet Tarihi */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mahkumiyet Tarihi *
                  </label>
                  <input
                    type="date"
                    name="convictionDate"
                    value={formData.convictionDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Kararın kesinleşme tarihini giriniz
                  </p>
                </div>

                {/* Suç Tarihi */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Suç Tarihi
                  </label>
                  <input
                    type="date"
                    name="crimeDate"
                    value={formData.crimeDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition"
                  />
                  {formData.crimeDate && new Date(formData.crimeDate) < new Date('2020-03-31') && (
                    <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-800 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        <strong>30 Mart 2020 öncesi suç:</strong> 3 yıl denetimli serbestlik
                      </p>
                    </div>
                  )}
                </div>

                {/* Gözaltı/Tutukluluk Süresi */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gözaltı/Tutukluluk Süresi (Gün)
                  </label>
                  <input
                    type="number"
                    name="preTrialDays"
                    value={formData.preTrialDays}
                    onChange={handleInputChange}
                    min="0"
                    placeholder="Varsa gözaltı ve tutukluluk günlerini giriniz"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Gözaltı ve tutukluluk süreleri cezadan düşülür
                  </p>
                </div>

                {/* Özel Durumlar */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-[#0a1628] mb-4 flex items-center gap-2">
                    <User className="w-5 h-5 text-[#d4af37]" />
                    Özel Durumlar
                  </h3>

                  <div className="space-y-4">
                    {/* Mükerrir */}
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          name="isRecidivist"
                          checked={formData.isRecidivist}
                          onChange={handleInputChange}
                          className="w-5 h-5 text-red-600 rounded focus:ring-red-500"
                        />
                        <div>
                          <span className="font-medium text-red-800">Mükerrir (Tekrar Suç)</span>
                          <p className="text-xs text-red-600 mt-0.5">
                            Mükerrir hükümlüler için 3/4 oranında infaz uygulanır
                          </p>
                        </div>
                      </label>
                    </div>

                    {/* Çocuk Hükümlü */}
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          name="isJuvenile"
                          checked={formData.isJuvenile}
                          onChange={handleInputChange}
                          className="w-5 h-5 text-green-600 rounded focus:ring-green-500"
                        />
                        <div>
                          <span className="font-medium text-green-800">Çocuk Hükümlü</span>
                          <p className="text-xs text-green-600 mt-0.5">
                            Suç işlendiğinde 18 yaşından küçük olanlar için özel oranlar
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Butonlar */}
                <div className="flex gap-4 pt-4">
                  <button
                    onClick={calculateInfaz}
                    disabled={!canCalculate}
                    className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#d4af37] to-[#b8962e] text-[#0a1628] px-6 py-4 rounded-xl font-semibold hover:from-[#e5c04a] hover:to-[#d4af37] transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Calculator className="w-5 h-5" />
                    Hesapla
                  </button>
                  <button
                    onClick={clearForm}
                    className="flex items-center justify-center gap-2 bg-gray-200 text-gray-700 px-6 py-4 rounded-xl font-medium hover:bg-gray-300 transition-all"
                  >
                    <RefreshCw className="w-5 h-5" />
                    Temizle
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Sonuç Bölümü */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <h2 className="text-2xl font-semibold text-[#0a1628] mb-6 flex items-center gap-3">
                <Calendar className="w-6 h-6 text-[#d4af37]" />
                Hesaplama Sonucu
              </h2>

              {!result ? (
                <div className="text-center py-16">
                  <Clock className="w-20 h-20 mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500 text-lg">
                    Hesaplama yapmak için formu doldurun ve "Hesapla" butonuna tıklayın.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Ceza Süresi Özeti */}
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-blue-800 mb-4">Ceza Süresi Özeti</h3>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-3xl font-bold text-blue-900">{formData.years || 0}</div>
                        <div className="text-sm text-blue-700">Yıl</div>
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-blue-900">{formData.months || 0}</div>
                        <div className="text-sm text-blue-700">Ay</div>
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-blue-900">{formData.days || 0}</div>
                        <div className="text-sm text-blue-700">Gün</div>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-blue-200 flex justify-between items-center">
                      <span className="text-blue-700 font-medium">Toplam Ceza Süresi:</span>
                      <span className="text-xl font-bold text-blue-900">{result.toplamCezaGun} gün</span>
                    </div>
                  </div>

                  {/* Hesaplama Detayları */}
                  <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-green-800 mb-4">Hesaplama Detayları</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">İnfaz Oranı:</span>
                        <span className="font-semibold text-green-800">%{result.infazOrani}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Denetimli Serbestlik:</span>
                        <span className="font-semibold text-green-800">{result.denetimliSerbestlikYil} yıl</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Mahsup Edilen:</span>
                        <span className="font-semibold text-green-800">{result.mahsupGun} gün</span>
                      </div>
                    </div>
                  </div>

                  {/* İnfaz Takvimi */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-[#0a1628]">İnfaz Takvimi</h3>

                    {/* Denetimli Serbestlik */}
                    <div className="bg-white border-l-4 border-green-500 rounded-lg p-4 shadow-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700 font-medium">Denetimli Serbestlik Tarihi:</span>
                        <span className="text-xl font-bold text-green-700">{result.denetimliSerbestlik}</span>
                      </div>
                      <span className="text-sm text-gray-500">({result.cezaevindeGecen} gün - Fiilen cezaevinde)</span>
                    </div>

                    {/* Açık Cezaevi */}
                    <div className="bg-white border-l-4 border-yellow-500 rounded-lg p-4 shadow-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700 font-medium">Açık Cezaevi Geçiş:</span>
                        <span className="text-xl font-bold text-yellow-700">{result.acikCezaeviTarihi}</span>
                      </div>
                      <span className="text-sm text-gray-500">({result.acikGecisGunu} gün sonra)</span>
                    </div>

                    {/* Koşullu Salıverilme */}
                    <div className="bg-white border-l-4 border-blue-500 rounded-lg p-4 shadow-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700 font-medium">Koşullu Salıverilme:</span>
                        <span className="text-xl font-bold text-blue-700">{result.kosulluSaliverme}</span>
                      </div>
                      <span className="text-sm text-gray-500">({result.infazSuresi} gün - %{result.infazOrani} oranında)</span>
                    </div>

                    {/* Hakederek Tahliye */}
                    <div className="bg-white border-l-4 border-red-500 rounded-lg p-4 shadow-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700 font-medium">Hakederek Tahliye:</span>
                        <span className="text-xl font-bold text-red-700">{result.tamTahliyeTarihi}</span>
                      </div>
                      <span className="text-sm text-gray-500">({result.toplamCezaGun} gün - Ceza süresinin tamamı)</span>
                    </div>
                  </div>

                  {/* Uyarı */}
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-amber-800 mb-1">Önemli Uyarı</h4>
                        <p className="text-sm text-amber-700">
                          Bu hesaplama genel esaslara göre yapılmıştır. Suç türüne, mükerrirlik,
                          disiplin cezası, infaz hakimliği kararları gibi faktörlere göre değişebilir.
                          Kesin bilgi için avukatınıza danışın.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Bölümü */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-light text-center text-[#0a1628] mb-12">
              Sıkça Sorulan <span className="text-[#d4af37]">Sorular</span>
            </h2>
            
            <div className="space-y-6">
              <div className="bg-[#faf8f5] rounded-xl p-6">
                <h3 className="text-lg font-semibold text-[#0a1628] mb-3">Koşullu salıverme nedir?</h3>
                <p className="text-gray-700">
                  Koşullu salıverme, hükümlünün cezasının belirli bir kısmını çektikten sonra,
                  iyi halini göstermesi halinde geri kalan cezasını cezaevi dışında geçirmesine
                  imkan veren bir infaz kurumudur.
                </p>
              </div>

              <div className="bg-[#faf8f5] rounded-xl p-6">
                <h3 className="text-lg font-semibold text-[#0a1628] mb-3">Denetimli serbestlik nedir?</h3>
                <p className="text-gray-700">
                  Denetimli serbestlik, hükümlünün toplumsal yaşama uyumunu sağlamak amacıyla,
                  cezasının son kısmını belirli denetim ve yükümlülükler altında geçirmesini sağlar.
                </p>
              </div>

              <div className="bg-[#faf8f5] rounded-xl p-6">
                <h3 className="text-lg font-semibold text-[#0a1628] mb-3">30 Mart 2020 tarihi neden önemli?</h3>
                <p className="text-gray-700">
                  Bu tarihte yapılan yasal düzenleme ile denetimli serbestlik süreleri değişmiştir.
                  Bu tarih öncesi suçlarda 3 yıl, sonrasında ise 1 yıl denetimli serbestlik uygulanır.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Bölümü */}
      <section className="py-16 bg-gradient-to-br from-[#0a1628] via-[#1a2d4a] to-[#0a1628] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-light mb-6">
            Ceza Davası İçin <span className="text-[#d4af37]">Profesyonel Destek</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            İnfaz süreci karmaşık olabilir. Uzman ceza avukatlarımızdan ücretsiz ön görüşme alın.
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
