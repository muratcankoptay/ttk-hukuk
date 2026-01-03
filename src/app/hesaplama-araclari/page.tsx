'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { 
  Calculator, 
  Briefcase, 
  Heart, 
  Home, 
  Car,
  ArrowRight,
  Info,
  RefreshCw,
  Download
} from 'lucide-react';

// Kıdem Tazminatı Hesaplama
function KidemTazminatiCalculator() {
  const [brutMaas, setBrutMaas] = useState<string>('');
  const [calismaYili, setCalismaYili] = useState<string>('');
  const [calismaAy, setCalismaAy] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const maas = parseFloat(brutMaas) || 0;
    const yil = parseInt(calismaYili) || 0;
    const ay = parseInt(calismaAy) || 0;
    
    // 2026 kıdem tazminatı tavanı (örnek değer)
    const tavan = 35000;
    const gunlukUcret = Math.min(maas, tavan) / 30;
    const toplamGun = (yil * 365) + (ay * 30);
    const tazminat = (toplamGun / 365) * 30 * gunlukUcret;
    
    setResult(tazminat);
  };

  const reset = () => {
    setBrutMaas('');
    setCalismaYili('');
    setCalismaAy('');
    setResult(null);
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-[#d4af37] to-[#f0d77a] rounded-xl flex items-center justify-center">
          <Briefcase className="w-6 h-6 text-[#0a1628]" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-[#0a1628]" style={{ fontFamily: 'Playfair Display, serif' }}>
            Kıdem Tazminatı Hesaplama
          </h3>
          <p className="text-sm text-[#0a1628]/60">İş Hukuku</p>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-[#0a1628] mb-2">
            Brüt Maaş (₺)
          </label>
          <input
            type="number"
            value={brutMaas}
            onChange={(e) => setBrutMaas(e.target.value)}
            className="form-input"
            placeholder="Örn: 25000"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#0a1628] mb-2">
              Çalışma Süresi (Yıl)
            </label>
            <input
              type="number"
              value={calismaYili}
              onChange={(e) => setCalismaYili(e.target.value)}
              className="form-input"
              placeholder="Örn: 5"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#0a1628] mb-2">
              Çalışma Süresi (Ay)
            </label>
            <input
              type="number"
              value={calismaAy}
              onChange={(e) => setCalismaAy(e.target.value)}
              className="form-input"
              placeholder="Örn: 6"
              max="11"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-3 mb-6">
        <button onClick={calculate} className="btn-gold flex-1 flex items-center justify-center gap-2">
          <Calculator size={18} />
          Hesapla
        </button>
        <button onClick={reset} className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <RefreshCw size={18} className="text-[#0a1628]/60" />
        </button>
      </div>

      {result !== null && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-[#d4af37]/10 rounded-xl"
        >
          <p className="text-sm text-[#0a1628]/60 mb-1">Tahmini Kıdem Tazminatı</p>
          <p className="text-3xl font-bold text-[#0a1628]" style={{ fontFamily: 'Playfair Display, serif' }}>
            {result.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺
          </p>
        </motion.div>
      )}

      <div className="mt-4 p-3 bg-blue-50 rounded-lg flex items-start gap-2">
        <Info size={16} className="text-blue-500 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-blue-700">
          Bu hesaplama tahmini bir değerdir. Kesin hesaplama için bir avukatla görüşmenizi öneririz.
        </p>
      </div>
    </div>
  );
}

// İhbar Tazminatı Hesaplama
function IhbarTazminatiCalculator() {
  const [brutMaas, setBrutMaas] = useState<string>('');
  const [calismaYili, setCalismaYili] = useState<string>('');
  const [result, setResult] = useState<{ gun: number; tutar: number } | null>(null);

  const calculate = () => {
    const maas = parseFloat(brutMaas) || 0;
    const yil = parseInt(calismaYili) || 0;
    
    let ihbarGun = 0;
    if (yil < 0.5) ihbarGun = 14;
    else if (yil < 1.5) ihbarGun = 28;
    else if (yil < 3) ihbarGun = 42;
    else ihbarGun = 56;
    
    const gunlukUcret = maas / 30;
    const tazminat = ihbarGun * gunlukUcret;
    
    setResult({ gun: ihbarGun, tutar: tazminat });
  };

  const reset = () => {
    setBrutMaas('');
    setCalismaYili('');
    setResult(null);
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-[#d4af37] to-[#f0d77a] rounded-xl flex items-center justify-center">
          <Briefcase className="w-6 h-6 text-[#0a1628]" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-[#0a1628]" style={{ fontFamily: 'Playfair Display, serif' }}>
            İhbar Tazminatı Hesaplama
          </h3>
          <p className="text-sm text-[#0a1628]/60">İş Hukuku</p>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-[#0a1628] mb-2">
            Brüt Maaş (₺)
          </label>
          <input
            type="number"
            value={brutMaas}
            onChange={(e) => setBrutMaas(e.target.value)}
            className="form-input"
            placeholder="Örn: 25000"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#0a1628] mb-2">
            Çalışma Süresi (Yıl)
          </label>
          <input
            type="number"
            value={calismaYili}
            onChange={(e) => setCalismaYili(e.target.value)}
            className="form-input"
            placeholder="Örn: 3"
            step="0.5"
          />
        </div>
      </div>

      <div className="flex gap-3 mb-6">
        <button onClick={calculate} className="btn-gold flex-1 flex items-center justify-center gap-2">
          <Calculator size={18} />
          Hesapla
        </button>
        <button onClick={reset} className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <RefreshCw size={18} className="text-[#0a1628]/60" />
        </button>
      </div>

      {result !== null && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-[#d4af37]/10 rounded-xl space-y-2"
        >
          <div className="flex justify-between">
            <span className="text-sm text-[#0a1628]/60">İhbar Süresi</span>
            <span className="font-semibold text-[#0a1628]">{result.gun} gün</span>
          </div>
          <div className="flex justify-between items-end">
            <span className="text-sm text-[#0a1628]/60">Tahmini Tazminat</span>
            <span className="text-2xl font-bold text-[#0a1628]" style={{ fontFamily: 'Playfair Display, serif' }}>
              {result.tutar.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺
            </span>
          </div>
        </motion.div>
      )}

      <div className="mt-4 p-3 bg-blue-50 rounded-lg flex items-start gap-2">
        <Info size={16} className="text-blue-500 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-blue-700">
          İhbar süresi: 0-6 ay: 2 hafta, 6-18 ay: 4 hafta, 18-36 ay: 6 hafta, 36+ ay: 8 hafta
        </p>
      </div>
    </div>
  );
}

// Nafaka Hesaplama
function NafakaCalculator() {
  const [gelir, setGelir] = useState<string>('');
  const [cocukSayisi, setCocukSayisi] = useState<string>('');
  const [nafakaTuru, setNafakaTuru] = useState<string>('istirak');
  const [result, setResult] = useState<{ min: number; max: number } | null>(null);

  const calculate = () => {
    const aylikGelir = parseFloat(gelir) || 0;
    const cocuk = parseInt(cocukSayisi) || 0;
    
    let minOran = 0;
    let maxOran = 0;
    
    if (nafakaTuru === 'istirak') {
      // İştirak nafakası (çocuk nafakası)
      minOran = 0.15 + (cocuk - 1) * 0.05;
      maxOran = 0.25 + (cocuk - 1) * 0.075;
    } else if (nafakaTuru === 'yoksulluk') {
      // Yoksulluk nafakası
      minOran = 0.20;
      maxOran = 0.35;
    } else {
      // Tedbir nafakası
      minOran = 0.25;
      maxOran = 0.40;
    }
    
    setResult({
      min: aylikGelir * minOran,
      max: aylikGelir * maxOran
    });
  };

  const reset = () => {
    setGelir('');
    setCocukSayisi('');
    setNafakaTuru('istirak');
    setResult(null);
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-[#d4af37] to-[#f0d77a] rounded-xl flex items-center justify-center">
          <Heart className="w-6 h-6 text-[#0a1628]" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-[#0a1628]" style={{ fontFamily: 'Playfair Display, serif' }}>
            Nafaka Hesaplama
          </h3>
          <p className="text-sm text-[#0a1628]/60">Aile Hukuku</p>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-[#0a1628] mb-2">
            Nafaka Türü
          </label>
          <select
            value={nafakaTuru}
            onChange={(e) => setNafakaTuru(e.target.value)}
            className="form-input"
          >
            <option value="istirak">İştirak Nafakası (Çocuk)</option>
            <option value="yoksulluk">Yoksulluk Nafakası</option>
            <option value="tedbir">Tedbir Nafakası</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-[#0a1628] mb-2">
            Yükümlü Tarafın Aylık Geliri (₺)
          </label>
          <input
            type="number"
            value={gelir}
            onChange={(e) => setGelir(e.target.value)}
            className="form-input"
            placeholder="Örn: 30000"
          />
        </div>
        {nafakaTuru === 'istirak' && (
          <div>
            <label className="block text-sm font-medium text-[#0a1628] mb-2">
              Çocuk Sayısı
            </label>
            <input
              type="number"
              value={cocukSayisi}
              onChange={(e) => setCocukSayisi(e.target.value)}
              className="form-input"
              placeholder="Örn: 2"
              min="1"
            />
          </div>
        )}
      </div>

      <div className="flex gap-3 mb-6">
        <button onClick={calculate} className="btn-gold flex-1 flex items-center justify-center gap-2">
          <Calculator size={18} />
          Hesapla
        </button>
        <button onClick={reset} className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <RefreshCw size={18} className="text-[#0a1628]/60" />
        </button>
      </div>

      {result !== null && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-[#d4af37]/10 rounded-xl"
        >
          <p className="text-sm text-[#0a1628]/60 mb-2">Tahmini Aylık Nafaka Aralığı</p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-[#0a1628]" style={{ fontFamily: 'Playfair Display, serif' }}>
              {result.min.toLocaleString('tr-TR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} ₺
            </span>
            <span className="text-[#0a1628]/40">—</span>
            <span className="text-2xl font-bold text-[#0a1628]" style={{ fontFamily: 'Playfair Display, serif' }}>
              {result.max.toLocaleString('tr-TR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} ₺
            </span>
          </div>
        </motion.div>
      )}

      <div className="mt-4 p-3 bg-blue-50 rounded-lg flex items-start gap-2">
        <Info size={16} className="text-blue-500 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-blue-700">
          Nafaka miktarı mahkeme tarafından tarafların ekonomik durumuna göre belirlenir. Bu hesaplama tahminidir.
        </p>
      </div>
    </div>
  );
}

// Kira Artış Hesaplama
function KiraArtisCalculator() {
  const [mevcutKira, setMevcutKira] = useState<string>('');
  const [tufeDegeri, setTufeDegeri] = useState<string>('58.51'); // Örnek TÜFE değeri
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const kira = parseFloat(mevcutKira) || 0;
    const tufe = parseFloat(tufeDegeri) || 0;
    
    // %25 sınırı (2024 sonuna kadar geçerli olan kural örneği)
    const maxArtisOrani = Math.min(tufe, 25);
    const yeniKira = kira * (1 + maxArtisOrani / 100);
    
    setResult(yeniKira);
  };

  const reset = () => {
    setMevcutKira('');
    setResult(null);
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-[#d4af37] to-[#f0d77a] rounded-xl flex items-center justify-center">
          <Home className="w-6 h-6 text-[#0a1628]" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-[#0a1628]" style={{ fontFamily: 'Playfair Display, serif' }}>
            Kira Artış Hesaplama
          </h3>
          <p className="text-sm text-[#0a1628]/60">Gayrimenkul Hukuku</p>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-[#0a1628] mb-2">
            Mevcut Kira Bedeli (₺)
          </label>
          <input
            type="number"
            value={mevcutKira}
            onChange={(e) => setMevcutKira(e.target.value)}
            className="form-input"
            placeholder="Örn: 15000"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#0a1628] mb-2">
            12 Aylık TÜFE Ortalaması (%)
          </label>
          <input
            type="number"
            value={tufeDegeri}
            onChange={(e) => setTufeDegeri(e.target.value)}
            className="form-input"
            placeholder="Örn: 58.51"
            step="0.01"
          />
        </div>
      </div>

      <div className="flex gap-3 mb-6">
        <button onClick={calculate} className="btn-gold flex-1 flex items-center justify-center gap-2">
          <Calculator size={18} />
          Hesapla
        </button>
        <button onClick={reset} className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <RefreshCw size={18} className="text-[#0a1628]/60" />
        </button>
      </div>

      {result !== null && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-[#d4af37]/10 rounded-xl space-y-2"
        >
          <div className="flex justify-between">
            <span className="text-sm text-[#0a1628]/60">Maksimum Artış Oranı</span>
            <span className="font-semibold text-[#0a1628]">%{Math.min(parseFloat(tufeDegeri), 25).toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-end">
            <span className="text-sm text-[#0a1628]/60">Yeni Kira Bedeli</span>
            <span className="text-2xl font-bold text-[#0a1628]" style={{ fontFamily: 'Playfair Display, serif' }}>
              {result.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺
            </span>
          </div>
        </motion.div>
      )}

      <div className="mt-4 p-3 bg-blue-50 rounded-lg flex items-start gap-2">
        <Info size={16} className="text-blue-500 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-blue-700">
          Konut kira artışları TÜFE oranı ile sınırlıdır. Güncel yasal düzenlemeleri kontrol ediniz.
        </p>
      </div>
    </div>
  );
}

// Trafik Kazası Tazminatı
function TrafikKazasiCalculator() {
  const [maluliyet, setMaluliyet] = useState<string>('');
  const [yas, setYas] = useState<string>('');
  const [gelir, setGelir] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const maluliyetOrani = parseFloat(maluliyet) || 0;
    const yasInt = parseInt(yas) || 30;
    const aylikGelir = parseFloat(gelir) || 0;
    
    // Basitleştirilmiş hesaplama (gerçek hesaplama çok daha karmaşıktır)
    const kalanCalismaYili = Math.max(65 - yasInt, 0);
    const yillikGelir = aylikGelir * 12;
    const kayipKazanc = yillikGelir * (maluliyetOrani / 100);
    const toplamTazminat = kayipKazanc * kalanCalismaYili * 0.7; // İskonto faktörü
    
    setResult(toplamTazminat);
  };

  const reset = () => {
    setMaluliyet('');
    setYas('');
    setGelir('');
    setResult(null);
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-[#d4af37] to-[#f0d77a] rounded-xl flex items-center justify-center">
          <Car className="w-6 h-6 text-[#0a1628]" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-[#0a1628]" style={{ fontFamily: 'Playfair Display, serif' }}>
            Trafik Kazası Tazminatı
          </h3>
          <p className="text-sm text-[#0a1628]/60">Tazminat Hukuku</p>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-[#0a1628] mb-2">
            Maluliyet Oranı (%)
          </label>
          <input
            type="number"
            value={maluliyet}
            onChange={(e) => setMaluliyet(e.target.value)}
            className="form-input"
            placeholder="Örn: 25"
            max="100"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#0a1628] mb-2">
              Yaş
            </label>
            <input
              type="number"
              value={yas}
              onChange={(e) => setYas(e.target.value)}
              className="form-input"
              placeholder="Örn: 35"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#0a1628] mb-2">
              Aylık Gelir (₺)
            </label>
            <input
              type="number"
              value={gelir}
              onChange={(e) => setGelir(e.target.value)}
              className="form-input"
              placeholder="Örn: 20000"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-3 mb-6">
        <button onClick={calculate} className="btn-gold flex-1 flex items-center justify-center gap-2">
          <Calculator size={18} />
          Hesapla
        </button>
        <button onClick={reset} className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <RefreshCw size={18} className="text-[#0a1628]/60" />
        </button>
      </div>

      {result !== null && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-[#d4af37]/10 rounded-xl"
        >
          <p className="text-sm text-[#0a1628]/60 mb-1">Tahmini Maddi Tazminat</p>
          <p className="text-3xl font-bold text-[#0a1628]" style={{ fontFamily: 'Playfair Display, serif' }}>
            {result.toLocaleString('tr-TR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} ₺
          </p>
          <p className="text-xs text-[#0a1628]/50 mt-2">
            * Manevi tazminat ayrıca hesaplanmalıdır
          </p>
        </motion.div>
      )}

      <div className="mt-4 p-3 bg-blue-50 rounded-lg flex items-start gap-2">
        <Info size={16} className="text-blue-500 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-blue-700">
          Trafik kazası tazminatları aktüerya hesaplaması ile belirlenir. Kesin miktar için uzman görüşü gereklidir.
        </p>
      </div>
    </div>
  );
}

// Faiz Hesaplama
function FaizCalculator() {
  const [anapara, setAnapara] = useState<string>('');
  const [faizOrani, setFaizOrani] = useState<string>('24'); // Yasal faiz oranı
  const [gun, setGun] = useState<string>('');
  const [result, setResult] = useState<{ faiz: number; toplam: number } | null>(null);

  const calculate = () => {
    const anaparaNum = parseFloat(anapara) || 0;
    const oran = parseFloat(faizOrani) || 0;
    const gunSayisi = parseInt(gun) || 0;
    
    const faiz = (anaparaNum * oran * gunSayisi) / (365 * 100);
    const toplam = anaparaNum + faiz;
    
    setResult({ faiz, toplam });
  };

  const reset = () => {
    setAnapara('');
    setGun('');
    setResult(null);
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-[#d4af37] to-[#f0d77a] rounded-xl flex items-center justify-center">
          <Calculator className="w-6 h-6 text-[#0a1628]" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-[#0a1628]" style={{ fontFamily: 'Playfair Display, serif' }}>
            Yasal Faiz Hesaplama
          </h3>
          <p className="text-sm text-[#0a1628]/60">İcra Hukuku</p>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-[#0a1628] mb-2">
            Anapara (₺)
          </label>
          <input
            type="number"
            value={anapara}
            onChange={(e) => setAnapara(e.target.value)}
            className="form-input"
            placeholder="Örn: 100000"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#0a1628] mb-2">
              Faiz Oranı (%)
            </label>
            <input
              type="number"
              value={faizOrani}
              onChange={(e) => setFaizOrani(e.target.value)}
              className="form-input"
              placeholder="Örn: 24"
              step="0.01"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#0a1628] mb-2">
              Gün Sayısı
            </label>
            <input
              type="number"
              value={gun}
              onChange={(e) => setGun(e.target.value)}
              className="form-input"
              placeholder="Örn: 365"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-3 mb-6">
        <button onClick={calculate} className="btn-gold flex-1 flex items-center justify-center gap-2">
          <Calculator size={18} />
          Hesapla
        </button>
        <button onClick={reset} className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <RefreshCw size={18} className="text-[#0a1628]/60" />
        </button>
      </div>

      {result !== null && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-[#d4af37]/10 rounded-xl space-y-2"
        >
          <div className="flex justify-between">
            <span className="text-sm text-[#0a1628]/60">Faiz Tutarı</span>
            <span className="font-semibold text-[#0a1628]">
              {result.faiz.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺
            </span>
          </div>
          <div className="flex justify-between items-end pt-2 border-t border-[#d4af37]/20">
            <span className="text-sm text-[#0a1628]/60">Toplam Alacak</span>
            <span className="text-2xl font-bold text-[#0a1628]" style={{ fontFamily: 'Playfair Display, serif' }}>
              {result.toplam.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺
            </span>
          </div>
        </motion.div>
      )}

      <div className="mt-4 p-3 bg-blue-50 rounded-lg flex items-start gap-2">
        <Info size={16} className="text-blue-500 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-blue-700">
          Yasal faiz oranı yılda iki kez güncellenir. Güncel oranı kontrol ediniz.
        </p>
      </div>
    </div>
  );
}

export default function HesaplamaAraclariPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-24 bg-[#0a1628] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-[#1a2744] rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[#d4af37] font-medium tracking-wider uppercase text-sm">
              Hesaplama Araçları
            </span>
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 mb-6"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Hukuki Hesaplama
              <span className="block text-gradient-gold">Araçları</span>
            </h1>
            <p className="text-white/70 max-w-2xl mx-auto text-lg">
              Tazminat, nafaka ve diğer hukuki hesaplamalarınız için ücretsiz 
              hesaplama araçlarımızı kullanın. Tahmini sonuçlar için avukatınıza danışın.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Warning Banner */}
      <section className="py-4 bg-amber-50 border-b border-amber-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-center gap-3 text-amber-800">
            <Info className="w-5 h-5" />
            <p className="text-sm">
              Bu hesaplamalar tahmini değerlerdir. Kesin hesaplama için mutlaka bir avukata danışınız.
            </p>
          </div>
        </div>
      </section>

      {/* Calculators Grid */}
      <section className="py-24 bg-[#faf8f5]">
        <div className="max-w-7xl mx-auto px-6">
          {/* Gelişmiş Araçlar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-[#0a1628] mb-4 text-center" style={{ fontFamily: 'Playfair Display, serif' }}>
              Gelişmiş Hesaplama <span className="text-[#d4af37]">Araçları</span>
            </h2>
            <p className="text-center text-[#0a1628]/60 mb-8 max-w-2xl mx-auto">
              Daha detaylı ve kapsamlı hesaplamalar için özel hazırlanmış araçlarımız
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link href="/hesaplama-araclari/infaz-yatar" className="group">
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#d4af37]/30 transition-all">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#d4af37] to-[#f0d77a] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Calculator className="w-6 h-6 text-[#0a1628]" />
                  </div>
                  <h3 className="font-bold text-[#0a1628] mb-2">İnfaz Yatar Hesaplama</h3>
                  <p className="text-sm text-[#0a1628]/60 mb-3">Ceza infaz süreleri, koşullu salıverilme ve denetimli serbestlik hesaplayın</p>
                  <span className="text-[#d4af37] text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                    Hesapla <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
              
              <Link href="/hesaplama-araclari/trafik-kazasi" className="group">
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#d4af37]/30 transition-all">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#d4af37] to-[#f0d77a] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Car className="w-6 h-6 text-[#0a1628]" />
                  </div>
                  <h3 className="font-bold text-[#0a1628] mb-2">Trafik Kazası Tazminat</h3>
                  <p className="text-sm text-[#0a1628]/60 mb-3">Araç hasarı ve bedensel zarar tazminatlarını TRH 2010 tablosuna göre hesaplayın</p>
                  <span className="text-[#d4af37] text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                    Hesapla <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
              
              <Link href="/hesaplama-araclari/iscilik-alacaklari" className="group">
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#d4af37]/30 transition-all">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#d4af37] to-[#f0d77a] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Briefcase className="w-6 h-6 text-[#0a1628]" />
                  </div>
                  <h3 className="font-bold text-[#0a1628] mb-2">İşçilik Alacakları</h3>
                  <p className="text-sm text-[#0a1628]/60 mb-3">Kıdem, ihbar, yıllık izin ve mesai alacaklarını tek sayfada hesaplayın</p>
                  <span className="text-[#d4af37] text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                    Hesapla <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
              
              <Link href="/hesaplama-araclari/arac-deger-kaybi" className="group">
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#d4af37]/30 transition-all">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#d4af37] to-[#f0d77a] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Car className="w-6 h-6 text-[#0a1628]" />
                  </div>
                  <h3 className="font-bold text-[#0a1628] mb-2">Araç Değer Kaybı</h3>
                  <p className="text-sm text-[#0a1628]/60 mb-3">Kaza sonrası aracınızın değer kaybını interaktif araç diyagramı ile hesaplayın</p>
                  <span className="text-[#d4af37] text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                    Hesapla <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            </div>
          </motion.div>

          {/* Hızlı Araçlar Başlığı */}
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[#0a1628] mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Hızlı Hesaplama <span className="text-[#d4af37]">Araçları</span>
            </h2>
            <p className="text-[#0a1628]/60 max-w-2xl mx-auto">
              Basit hesaplamalar için hızlı kullanım araçları
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <KidemTazminatiCalculator />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <IhbarTazminatiCalculator />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <NafakaCalculator />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <KiraArtisCalculator />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <TrafikKazasiCalculator />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <FaizCalculator />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#0a1628]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 
              className="text-3xl md:text-4xl font-bold text-white mb-6"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Profesyonel Hesaplama İçin
              <span className="text-gradient-gold block">Uzman Desteği Alın</span>
            </h2>
            <p className="text-white/70 mb-8 max-w-2xl mx-auto">
              Bu araçlar tahmini sonuçlar sunar. Davanıza özel kesin hesaplama için 
              avukatlarımızla ücretsiz görüşme randevusu alın.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/iletisim"
                className="btn-gold inline-flex items-center justify-center gap-2 group"
              >
                Ücretsiz Ön Görüşme
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="tel:+905557269903"
                className="btn-outline text-white border-white/30 hover:border-[#d4af37] hover:text-[#d4af37] hover:bg-transparent inline-flex items-center justify-center gap-2"
              >
                +90 555 726 99 03
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
