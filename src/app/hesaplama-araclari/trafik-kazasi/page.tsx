'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Calculator, 
  Car,
  User,
  AlertTriangle, 
  Info, 
  RefreshCw,
  Phone,
  Calendar,
  DollarSign,
  Percent,
  ClipboardList,
  Heart
} from 'lucide-react'
import Link from 'next/link'

// 2025 yılı asgari ücret değerleri
const MIN_WAGE_NET_2025 = 22104
const MIN_WAGE_GROSS_2025 = 26005

// TRH 2010 yaşam tablosu (erkek ve kadın için beklenen ömür)
const TRH_2010: { [key: number]: { male: number; female: number } } = {
  0: { male: 74.48, female: 79.67 },
  1: { male: 73.96, female: 79.11 },
  2: { male: 72.99, female: 78.14 },
  3: { male: 72.01, female: 77.16 },
  4: { male: 71.03, female: 76.18 },
  5: { male: 70.05, female: 75.20 },
  10: { male: 65.14, female: 70.28 },
  15: { male: 60.22, female: 65.35 },
  18: { male: 57.33, female: 62.43 },
  20: { male: 55.38, female: 60.49 },
  25: { male: 50.62, female: 55.63 },
  30: { male: 45.89, female: 50.78 },
  35: { male: 41.20, female: 45.97 },
  40: { male: 36.57, female: 41.19 },
  45: { male: 32.02, female: 36.48 },
  50: { male: 27.60, female: 31.86 },
  55: { male: 23.36, female: 27.37 },
  60: { male: 19.35, female: 23.04 },
  65: { male: 15.61, female: 18.92 },
  70: { male: 12.19, female: 15.06 },
  75: { male: 9.17, female: 11.55 },
  80: { male: 6.61, female: 8.49 },
  85: { male: 4.60, female: 5.98 },
  90: { male: 3.16, female: 4.07 }
}

// Yaşa göre beklenen ömrü hesapla
const getLifeExpectancy = (age: number, gender: 'male' | 'female'): number => {
  const ages = Object.keys(TRH_2010).map(Number).sort((a, b) => a - b)
  
  // Tam eşleşme
  if (TRH_2010[age]) {
    return TRH_2010[age][gender]
  }
  
  // İnterpolasyon
  let lowerAge = 0
  let upperAge = 90
  
  for (const a of ages) {
    if (a < age) lowerAge = a
    if (a > age) {
      upperAge = a
      break
    }
  }
  
  const lowerVal = TRH_2010[lowerAge][gender]
  const upperVal = TRH_2010[upperAge][gender]
  const ratio = (age - lowerAge) / (upperAge - lowerAge)
  
  return lowerVal - (lowerVal - upperVal) * ratio
}

type TabType = 'arac' | 'beden'

export default function TrafikKazasiPage() {
  const [activeTab, setActiveTab] = useState<TabType>('arac')
  
  // Araç Hasarı State
  const [aracFormData, setAracFormData] = useState({
    marketValue: '',
    mileage: '',
    repairCost: '',
    rentalCost: '',
    rentalDays: ''
  })
  const [aracResult, setAracResult] = useState<any>(null)

  // Bedensel Zarar State
  const [bedenFormData, setBedenFormData] = useState({
    birthDate: '',
    gender: 'male',
    accidentDate: '',
    monthlyIncome: '',
    permanentDisability: '',
    tempDisabilityDays: '',
    caregiverDays: '',
    faultPercentage: ''
  })
  const [bedenResult, setBedenResult] = useState<any>(null)

  // Araç hasarı hesaplama
  const calculateVehicleDamage = () => {
    const marketValue = parseFloat(aracFormData.marketValue) || 0
    const mileage = parseFloat(aracFormData.mileage) || 0
    const repairCost = parseFloat(aracFormData.repairCost) || 0
    const rentalCost = parseFloat(aracFormData.rentalCost) || 0
    const rentalDays = parseInt(aracFormData.rentalDays) || 0

    // Kilometre katsayısı
    let kmKatsayisi = 1
    if (mileage <= 30000) kmKatsayisi = 1.05
    else if (mileage <= 50000) kmKatsayisi = 1.03
    else if (mileage <= 100000) kmKatsayisi = 1.00
    else if (mileage <= 150000) kmKatsayisi = 0.95
    else if (mileage <= 200000) kmKatsayisi = 0.90
    else kmKatsayisi = 0.85

    // Piyasa değeri düzeltmesi
    const adjustedValue = marketValue * kmKatsayisi

    // Değer kaybı oranı (%15-30 arası tahmini)
    const repairRatio = repairCost / marketValue
    let degerKaybiOrani = 0
    
    if (repairRatio <= 0.1) degerKaybiOrani = 0.05
    else if (repairRatio <= 0.2) degerKaybiOrani = 0.10
    else if (repairRatio <= 0.3) degerKaybiOrani = 0.15
    else if (repairRatio <= 0.5) degerKaybiOrani = 0.20
    else degerKaybiOrani = 0.25

    const degerKaybi = adjustedValue * degerKaybiOrani
    const kiraBedeli = rentalCost * rentalDays
    const toplamZarar = repairCost + degerKaybi + kiraBedeli

    setAracResult({
      piyasaDegeri: marketValue.toLocaleString('tr-TR'),
      kmKatsayisi: kmKatsayisi.toFixed(2),
      duzeltilmisDeger: adjustedValue.toLocaleString('tr-TR'),
      tamirMasrafi: repairCost.toLocaleString('tr-TR'),
      degerKaybiOrani: (degerKaybiOrani * 100).toFixed(0),
      degerKaybi: degerKaybi.toLocaleString('tr-TR'),
      kiraBedeli: kiraBedeli.toLocaleString('tr-TR'),
      toplamZarar: toplamZarar.toLocaleString('tr-TR')
    })
  }

  // Bedensel zarar hesaplama
  const calculateBodyDamage = () => {
    const birthDate = new Date(bedenFormData.birthDate)
    const accidentDate = new Date(bedenFormData.accidentDate)
    const age = Math.floor((accidentDate.getTime() - birthDate.getTime()) / (365.25 * 24 * 60 * 60 * 1000))
    
    const monthlyIncome = parseFloat(bedenFormData.monthlyIncome) || MIN_WAGE_NET_2025
    const permanentDisability = parseFloat(bedenFormData.permanentDisability) || 0
    const tempDisabilityDays = parseInt(bedenFormData.tempDisabilityDays) || 0
    const caregiverDays = parseInt(bedenFormData.caregiverDays) || 0
    const faultPercentage = parseFloat(bedenFormData.faultPercentage) || 100

    // Beklenen ömür
    const lifeExpectancy = getLifeExpectancy(age, bedenFormData.gender as 'male' | 'female')
    const remainingYears = lifeExpectancy

    // Aktif dönem (18-60 yaş arası) ve pasif dönem hesabı
    const retirementAge = 60
    const activeYears = Math.min(Math.max(0, retirementAge - age), remainingYears)
    const passiveYears = Math.max(0, remainingYears - activeYears)

    // Yıllık gelir
    const yearlyIncome = monthlyIncome * 12

    // Sürekli iş göremezlik tazminatı
    // Aktif dönem: Net ücret üzerinden
    // Pasif dönem: Asgari ücret üzerinden
    const activePeriodLoss = yearlyIncome * activeYears * (permanentDisability / 100)
    const passivePeriodLoss = MIN_WAGE_NET_2025 * 12 * passiveYears * (permanentDisability / 100)
    const permanentLoss = activePeriodLoss + passivePeriodLoss

    // Geçici iş göremezlik
    const dailyIncome = monthlyIncome / 30
    const tempDisabilityLoss = dailyIncome * tempDisabilityDays

    // Bakıcı gideri
    const dailyCaregiverCost = MIN_WAGE_NET_2025 / 30
    const caregiverCost = dailyCaregiverCost * caregiverDays

    // Kusur oranı uygulaması
    const kusurOrani = faultPercentage / 100
    const totalLoss = (permanentLoss + tempDisabilityLoss + caregiverCost) * kusurOrani

    setBedenResult({
      yas: age,
      beklenenOmur: lifeExpectancy.toFixed(1),
      kalanYil: remainingYears.toFixed(1),
      aktifDonem: activeYears.toFixed(1),
      pasifDonem: passiveYears.toFixed(1),
      aylikGelir: monthlyIncome.toLocaleString('tr-TR'),
      maluliyet: permanentDisability,
      surekliIsGoremezlik: permanentLoss.toLocaleString('tr-TR'),
      geciciIsGoremezlik: tempDisabilityLoss.toLocaleString('tr-TR'),
      bakiciGideri: caregiverCost.toLocaleString('tr-TR'),
      kusurOrani: faultPercentage,
      toplamTazminat: totalLoss.toLocaleString('tr-TR')
    })
  }

  const clearAracForm = () => {
    setAracFormData({ marketValue: '', mileage: '', repairCost: '', rentalCost: '', rentalDays: '' })
    setAracResult(null)
  }

  const clearBedenForm = () => {
    setBedenFormData({
      birthDate: '',
      gender: 'male',
      accidentDate: '',
      monthlyIncome: '',
      permanentDisability: '',
      tempDisabilityDays: '',
      caregiverDays: '',
      faultPercentage: ''
    })
    setBedenResult(null)
  }

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
              Trafik Kazası <span className="text-[#d4af37]">Tazminat</span> Hesaplama
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-gray-300 max-w-2xl mx-auto"
            >
              Araç hasarı ve bedensel zarar tazminatlarını hesaplayın
            </motion.p>
          </div>
        </div>
      </section>

      {/* Tab Seçimi */}
      <section className="bg-[#faf8f5] border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex">
              <button
                onClick={() => setActiveTab('arac')}
                className={`flex-1 py-4 px-6 flex items-center justify-center gap-3 text-lg font-medium transition-all border-b-4 ${
                  activeTab === 'arac'
                    ? 'bg-white text-[#0a1628] border-[#d4af37]'
                    : 'text-gray-500 border-transparent hover:text-gray-700'
                }`}
              >
                <Car className="w-5 h-5" />
                Araç Hasarı
              </button>
              <button
                onClick={() => setActiveTab('beden')}
                className={`flex-1 py-4 px-6 flex items-center justify-center gap-3 text-lg font-medium transition-all border-b-4 ${
                  activeTab === 'beden'
                    ? 'bg-white text-[#0a1628] border-[#d4af37]'
                    : 'text-gray-500 border-transparent hover:text-gray-700'
                }`}
              >
                <Heart className="w-5 h-5" />
                Bedensel Zarar
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Form ve Sonuç Bölümü */}
      <section className="py-12 bg-[#faf8f5]">
        <div className="container mx-auto px-4">
          <AnimatePresence mode="wait">
            {activeTab === 'arac' ? (
              <motion.div
                key="arac"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto"
              >
                {/* Araç Form */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <h2 className="text-2xl font-semibold text-[#0a1628] mb-6 flex items-center gap-3">
                    <Car className="w-6 h-6 text-[#d4af37]" />
                    Araç Bilgileri
                  </h2>

                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Aracın Piyasa Değeri (₺) *
                      </label>
                      <input
                        type="number"
                        value={aracFormData.marketValue}
                        onChange={(e) => setAracFormData(prev => ({ ...prev, marketValue: e.target.value }))}
                        placeholder="Örn: 500000"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition"
                      />
                      <p className="text-xs text-gray-500 mt-1">Kaza tarihindeki ikinci el değeri</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Kilometre
                      </label>
                      <input
                        type="number"
                        value={aracFormData.mileage}
                        onChange={(e) => setAracFormData(prev => ({ ...prev, mileage: e.target.value }))}
                        placeholder="Örn: 75000"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tamir Masrafı (₺) *
                      </label>
                      <input
                        type="number"
                        value={aracFormData.repairCost}
                        onChange={(e) => setAracFormData(prev => ({ ...prev, repairCost: e.target.value }))}
                        placeholder="Örn: 45000"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Günlük Kira Bedeli (₺)
                        </label>
                        <input
                          type="number"
                          value={aracFormData.rentalCost}
                          onChange={(e) => setAracFormData(prev => ({ ...prev, rentalCost: e.target.value }))}
                          placeholder="Örn: 800"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Kiralama Süresi (Gün)
                        </label>
                        <input
                          type="number"
                          value={aracFormData.rentalDays}
                          onChange={(e) => setAracFormData(prev => ({ ...prev, rentalDays: e.target.value }))}
                          placeholder="Örn: 15"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition"
                        />
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <button
                        onClick={calculateVehicleDamage}
                        disabled={!aracFormData.marketValue || !aracFormData.repairCost}
                        className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#d4af37] to-[#b8962e] text-[#0a1628] px-6 py-4 rounded-xl font-semibold hover:from-[#e5c04a] hover:to-[#d4af37] transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Calculator className="w-5 h-5" />
                        Hesapla
                      </button>
                      <button
                        onClick={clearAracForm}
                        className="flex items-center justify-center gap-2 bg-gray-200 text-gray-700 px-6 py-4 rounded-xl font-medium hover:bg-gray-300 transition-all"
                      >
                        <RefreshCw className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Araç Sonuç */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <h2 className="text-2xl font-semibold text-[#0a1628] mb-6 flex items-center gap-3">
                    <DollarSign className="w-6 h-6 text-[#d4af37]" />
                    Zarar Hesabı
                  </h2>

                  {!aracResult ? (
                    <div className="text-center py-16">
                      <ClipboardList className="w-20 h-20 mx-auto text-gray-300 mb-4" />
                      <p className="text-gray-500 text-lg">
                        Hesaplama sonuçları burada görüntülenecek
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="bg-blue-50 rounded-xl p-5">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-blue-700">Piyasa Değeri:</span>
                          <span className="font-bold text-blue-900">₺{aracResult.piyasaDegeri}</span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-blue-700">Km Katsayısı:</span>
                          <span className="font-semibold text-blue-900">{aracResult.kmKatsayisi}</span>
                        </div>
                        <div className="flex justify-between items-center border-t border-blue-200 pt-2">
                          <span className="text-blue-700">Düzeltilmiş Değer:</span>
                          <span className="font-bold text-blue-900">₺{aracResult.duzeltilmisDeger}</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span className="text-gray-700">Tamir Masrafı:</span>
                          <span className="font-semibold">₺{aracResult.tamirMasrafi}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span className="text-gray-700">Değer Kaybı (%{aracResult.degerKaybiOrani}):</span>
                          <span className="font-semibold text-red-600">₺{aracResult.degerKaybi}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span className="text-gray-700">Kira Bedeli:</span>
                          <span className="font-semibold">₺{aracResult.kiraBedeli}</span>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-[#0a1628] to-[#1a2d4a] text-white rounded-xl p-5">
                        <div className="flex justify-between items-center">
                          <span className="text-lg">Toplam Zarar:</span>
                          <span className="text-2xl font-bold text-[#d4af37]">₺{aracResult.toplamZarar}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="beden"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto"
              >
                {/* Beden Form */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <h2 className="text-2xl font-semibold text-[#0a1628] mb-6 flex items-center gap-3">
                    <User className="w-6 h-6 text-[#d4af37]" />
                    Kişi Bilgileri
                  </h2>

                  <div className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Doğum Tarihi *
                        </label>
                        <input
                          type="date"
                          value={bedenFormData.birthDate}
                          onChange={(e) => setBedenFormData(prev => ({ ...prev, birthDate: e.target.value }))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Cinsiyet *
                        </label>
                        <select
                          value={bedenFormData.gender}
                          onChange={(e) => setBedenFormData(prev => ({ ...prev, gender: e.target.value }))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition"
                        >
                          <option value="male">Erkek</option>
                          <option value="female">Kadın</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Kaza Tarihi *
                      </label>
                      <input
                        type="date"
                        value={bedenFormData.accidentDate}
                        onChange={(e) => setBedenFormData(prev => ({ ...prev, accidentDate: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Aylık Net Gelir (₺)
                      </label>
                      <input
                        type="number"
                        value={bedenFormData.monthlyIncome}
                        onChange={(e) => setBedenFormData(prev => ({ ...prev, monthlyIncome: e.target.value }))}
                        placeholder={`Varsayılan: ${MIN_WAGE_NET_2025.toLocaleString('tr-TR')} (Asgari ücret)`}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Sürekli Maluliyet Oranı (%)
                      </label>
                      <input
                        type="number"
                        value={bedenFormData.permanentDisability}
                        onChange={(e) => setBedenFormData(prev => ({ ...prev, permanentDisability: e.target.value }))}
                        placeholder="Örn: 25"
                        min="0"
                        max="100"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition"
                      />
                      <p className="text-xs text-gray-500 mt-1">Sağlık kurulu raporu ile belirlenir</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Geçici İş Göremezlik (Gün)
                        </label>
                        <input
                          type="number"
                          value={bedenFormData.tempDisabilityDays}
                          onChange={(e) => setBedenFormData(prev => ({ ...prev, tempDisabilityDays: e.target.value }))}
                          placeholder="Örn: 45"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Bakıcı Gideri (Gün)
                        </label>
                        <input
                          type="number"
                          value={bedenFormData.caregiverDays}
                          onChange={(e) => setBedenFormData(prev => ({ ...prev, caregiverDays: e.target.value }))}
                          placeholder="Örn: 30"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Karşı Tarafın Kusur Oranı (%)
                      </label>
                      <input
                        type="number"
                        value={bedenFormData.faultPercentage}
                        onChange={(e) => setBedenFormData(prev => ({ ...prev, faultPercentage: e.target.value }))}
                        placeholder="Varsayılan: 100"
                        min="0"
                        max="100"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition"
                      />
                    </div>

                    <div className="flex gap-4 pt-4">
                      <button
                        onClick={calculateBodyDamage}
                        disabled={!bedenFormData.birthDate || !bedenFormData.accidentDate}
                        className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#d4af37] to-[#b8962e] text-[#0a1628] px-6 py-4 rounded-xl font-semibold hover:from-[#e5c04a] hover:to-[#d4af37] transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Calculator className="w-5 h-5" />
                        Hesapla
                      </button>
                      <button
                        onClick={clearBedenForm}
                        className="flex items-center justify-center gap-2 bg-gray-200 text-gray-700 px-6 py-4 rounded-xl font-medium hover:bg-gray-300 transition-all"
                      >
                        <RefreshCw className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Beden Sonuç */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <h2 className="text-2xl font-semibold text-[#0a1628] mb-6 flex items-center gap-3">
                    <DollarSign className="w-6 h-6 text-[#d4af37]" />
                    Tazminat Hesabı
                  </h2>

                  {!bedenResult ? (
                    <div className="text-center py-16">
                      <ClipboardList className="w-20 h-20 mx-auto text-gray-300 mb-4" />
                      <p className="text-gray-500 text-lg">
                        Hesaplama sonuçları burada görüntülenecek
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* Kişi Bilgileri */}
                      <div className="bg-blue-50 rounded-xl p-5">
                        <h3 className="font-semibold text-blue-800 mb-3">TRH 2010 Hesap Verileri</h3>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div className="flex justify-between">
                            <span className="text-blue-700">Yaş:</span>
                            <span className="font-semibold text-blue-900">{bedenResult.yas}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-blue-700">Beklenen Ömür:</span>
                            <span className="font-semibold text-blue-900">{bedenResult.beklenenOmur} yıl</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-blue-700">Aktif Dönem:</span>
                            <span className="font-semibold text-blue-900">{bedenResult.aktifDonem} yıl</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-blue-700">Pasif Dönem:</span>
                            <span className="font-semibold text-blue-900">{bedenResult.pasifDonem} yıl</span>
                          </div>
                        </div>
                      </div>

                      {/* Tazminat Kalemleri */}
                      <div className="space-y-3">
                        {bedenResult.maluliyet > 0 && (
                          <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                            <span className="text-gray-700">Sürekli İş Göremezlik (%{bedenResult.maluliyet}):</span>
                            <span className="font-bold text-red-600">₺{bedenResult.surekliIsGoremezlik}</span>
                          </div>
                        )}
                        
                        {parseFloat(bedenResult.geciciIsGoremezlik.replace(/\./g, '')) > 0 && (
                          <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                            <span className="text-gray-700">Geçici İş Göremezlik:</span>
                            <span className="font-semibold text-orange-600">₺{bedenResult.geciciIsGoremezlik}</span>
                          </div>
                        )}
                        
                        {parseFloat(bedenResult.bakiciGideri.replace(/\./g, '')) > 0 && (
                          <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                            <span className="text-gray-700">Bakıcı Gideri:</span>
                            <span className="font-semibold text-purple-600">₺{bedenResult.bakiciGideri}</span>
                          </div>
                        )}
                        
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span className="text-gray-700">Uygulanan Kusur Oranı:</span>
                          <span className="font-semibold">%{bedenResult.kusurOrani}</span>
                        </div>
                      </div>

                      {/* Toplam */}
                      <div className="bg-gradient-to-r from-[#0a1628] to-[#1a2d4a] text-white rounded-xl p-5">
                        <div className="flex justify-between items-center">
                          <span className="text-lg">Toplam Tazminat:</span>
                          <span className="text-2xl font-bold text-[#d4af37]">₺{bedenResult.toplamTazminat}</span>
                        </div>
                      </div>

                      {/* Uyarı */}
                      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                        <div className="flex items-start gap-3">
                          <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm text-amber-700">
                              Bu hesaplama tahmini değerdir. Kesin tazminat tutarı mahkemece atanan bilirkişi
                              tarafından belirlenir. Tedavi giderleri ve manevi tazminat ayrıca hesaplanır.
                            </p>
                          </div>
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

      {/* Bilgi Bölümü */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-light text-center text-[#0a1628] mb-12">
              Trafik Kazası <span className="text-[#d4af37]">Tazminatları</span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-[#faf8f5] rounded-xl p-6">
                <h3 className="text-lg font-semibold text-[#0a1628] mb-4 flex items-center gap-2">
                  <Car className="w-5 h-5 text-[#d4af37]" />
                  Araç Zararları
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Araç tamir masrafları</li>
                  <li>• Araç değer kaybı</li>
                  <li>• Araç kiralama bedeli</li>
                  <li>• Çekici ve kurtarma masrafı</li>
                </ul>
              </div>

              <div className="bg-[#faf8f5] rounded-xl p-6">
                <h3 className="text-lg font-semibold text-[#0a1628] mb-4 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-[#d4af37]" />
                  Bedensel Zararlar
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Sürekli iş göremezlik tazminatı</li>
                  <li>• Geçici iş göremezlik tazminatı</li>
                  <li>• Tedavi masrafları</li>
                  <li>• Bakıcı gideri</li>
                  <li>• Manevi tazminat</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Bölümü */}
      <section className="py-16 bg-gradient-to-br from-[#0a1628] via-[#1a2d4a] to-[#0a1628] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-light mb-6">
            Trafik Kazası <span className="text-[#d4af37]">Tazminatı</span> Hakkınızı Koruyun
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Sigorta şirketleri ile müzakere ve dava sürecinde deneyimli ekibimizden destek alın.
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
