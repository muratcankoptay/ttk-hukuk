'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Mail, Scale, ChevronDown, Calculator, Car, Briefcase, Gavel, TrendingDown, User } from 'lucide-react';

const hesaplamaLinks = [
  { href: '/hesaplama-araclari', label: 'Tüm Araçlar', icon: Calculator },
  { href: '/hesaplama-araclari/infaz-yatar', label: 'İnfaz Yatar Hesaplama', icon: Gavel },
  { href: '/hesaplama-araclari/trafik-kazasi', label: 'Trafik Kazası Tazminat', icon: Car },
  { href: '/hesaplama-araclari/iscilik-alacaklari', label: 'İşçilik Alacakları', icon: Briefcase },
  { href: '/hesaplama-araclari/arac-deger-kaybi', label: 'Araç Değer Kaybı', icon: TrendingDown },
  { href: '/muvekkil-paneli', label: 'Müvekkil Paneli', icon: User },
];

const navLinks = [
  { href: '/', label: 'Ana Sayfa' },
  { href: '/hakkimizda', label: 'Hakkımızda' },
  { href: '/hizmetlerimiz', label: 'Hizmetler' },
  { href: '/ekibimiz', label: 'Ekibimiz' },
  { href: '/makaleler', label: 'Makaleler' },
  { href: '/iletisim', label: 'İletişim' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHesaplamaOpen, setIsHesaplamaOpen] = useState(false);
  const [isMobileHesaplamaOpen, setIsMobileHesaplamaOpen] = useState(false);
  const hesaplamaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dropdown dışına tıklandığında kapat
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (hesaplamaRef.current && !hesaplamaRef.current.contains(event.target as Node)) {
        setIsHesaplamaOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      {/* Top Bar */}
      <div className="hidden lg:block bg-[#0a1628] text-white/80 text-sm py-2">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a href="tel:+905557269903" className="flex items-center gap-2 hover:text-[#d4af37] transition-colors">
              <Phone size={14} />
              <span>+90 555 726 99 03</span>
            </a>
            <a href="mailto:info@ttkhukuk.com" className="flex items-center gap-2 hover:text-[#d4af37] transition-colors">
              <Mail size={14} />
              <span>info@ttkhukuk.com</span>
            </a>
          </div>
          <div className="text-white/60">
            Pazartesi - Cuma: 09:00 - 18:00
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`sticky top-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-black/5'
            : 'bg-white'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-[#d4af37] to-[#f0d77a] rounded-lg flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300">
                  <Scale className="w-7 h-7 text-[#0a1628]" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#0a1628] rounded-full flex items-center justify-center">
                  <span className="text-[8px] font-bold text-[#d4af37]">TTK</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-[#0a1628] tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                  TTK HUKUK
                </span>
                <span className="text-[10px] text-[#d4af37] font-medium tracking-[0.2em] uppercase">
                  Av. Tahir Talha Kahraman
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden xl:flex items-center gap-6">
              {navLinks.slice(0, 4).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="nav-link text-[#0a1628] text-sm font-medium hover:text-[#d4af37] transition-colors whitespace-nowrap"
                >
                  {link.label}
                </Link>
              ))}
              
              {/* Hesaplama Dropdown */}
              <div className="relative" ref={hesaplamaRef}>
                <button
                  onClick={() => setIsHesaplamaOpen(!isHesaplamaOpen)}
                  className="nav-link text-[#0a1628] text-sm font-medium hover:text-[#d4af37] transition-colors whitespace-nowrap flex items-center gap-1"
                >
                  Hesaplama
                  <ChevronDown 
                    className={`w-4 h-4 transition-transform ${isHesaplamaOpen ? 'rotate-180' : ''}`} 
                  />
                </button>
                
                <AnimatePresence>
                  {isHesaplamaOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50"
                    >
                      {hesaplamaLinks.map((item, index) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsHesaplamaOpen(false)}
                          className={`flex items-center gap-3 px-4 py-3 text-sm text-[#0a1628] hover:bg-[#d4af37]/10 hover:text-[#d4af37] transition-colors ${
                            index === 0 ? 'border-b border-gray-100 bg-gray-50' : ''
                          }`}
                        >
                          <item.icon className="w-4 h-4" />
                          {item.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {navLinks.slice(4).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="nav-link text-[#0a1628] text-sm font-medium hover:text-[#d4af37] transition-colors whitespace-nowrap"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden xl:block">
              <Link
                href="/iletisim"
                className="btn-gold inline-flex items-center gap-2 text-sm px-4 py-2"
              >
                <Phone size={14} />
                Ön Görüşme
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-2 text-[#0a1628] hover:text-[#d4af37] transition-colors"
              aria-label="Menüyü aç/kapat"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="xl:hidden bg-white border-t border-gray-100 overflow-hidden"
            >
              <div className="px-6 py-4 space-y-1">
                {navLinks.slice(0, 4).map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-3 px-4 text-[#0a1628] font-medium hover:bg-[#d4af37]/10 hover:text-[#d4af37] rounded-lg transition-colors"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                
                {/* Mobile Hesaplama Dropdown */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <button
                    onClick={() => setIsMobileHesaplamaOpen(!isMobileHesaplamaOpen)}
                    className="w-full flex items-center justify-between py-3 px-4 text-[#0a1628] font-medium hover:bg-[#d4af37]/10 hover:text-[#d4af37] rounded-lg transition-colors"
                  >
                    Hesaplama
                    <ChevronDown 
                      className={`w-4 h-4 transition-transform ${isMobileHesaplamaOpen ? 'rotate-180' : ''}`} 
                    />
                  </button>
                  
                  <AnimatePresence>
                    {isMobileHesaplamaOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden ml-4"
                      >
                        {hesaplamaLinks.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => {
                              setIsMobileMenuOpen(false);
                              setIsMobileHesaplamaOpen(false);
                            }}
                            className="flex items-center gap-3 py-2 px-4 text-sm text-[#0a1628] hover:text-[#d4af37] transition-colors"
                          >
                            <item.icon className="w-4 h-4" />
                            {item.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
                
                {navLinks.slice(4).map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (index + 5) * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-3 px-4 text-[#0a1628] font-medium hover:bg-[#d4af37]/10 hover:text-[#d4af37] rounded-lg transition-colors"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.1 }}
                  className="pt-4"
                >
                  <Link
                    href="/iletisim"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="btn-gold w-full flex items-center justify-center gap-2"
                  >
                    <Phone size={16} />
                    Ücretsiz Ön Görüşme
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
