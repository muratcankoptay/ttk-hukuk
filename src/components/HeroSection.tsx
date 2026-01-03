'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Shield, Award, Users, Scale } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#0a1628]">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-[#1a2744] rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#d4af37]/5 rounded-full blur-3xl"></div>
        
        {/* Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
        
        {/* Decorative Lines */}
        <svg className="absolute bottom-0 left-0 w-full h-32 text-[#d4af37]/10" preserveAspectRatio="none">
          <path d="M0,100 Q250,50 500,80 T1000,60 T1500,90 L1500,150 L0,150 Z" fill="currentColor" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-[#d4af37]/10 border border-[#d4af37]/20 rounded-full px-4 py-2 mb-8"
            >
              <span className="w-2 h-2 bg-[#d4af37] rounded-full animate-pulse"></span>
              <span className="text-[#d4af37] text-sm font-medium">15+ Yıllık Deneyim</span>
            </motion.div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
              Haklarınız İçin
              <span className="block mt-2">
                <span className="text-gradient-gold">Kararlı</span> Savunma
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-lg text-white/70 mb-8 max-w-xl leading-relaxed">
              Av. Tahir Talha Kahraman ve deneyimli ekibimiz ile hukuki süreçlerinizde 
              yanınızdayız. Ceza, ticaret, aile ve iş hukuku alanlarında uzman kadromuzla 
              haklarınızı koruyoruz.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link
                href="/iletisim"
                className="btn-gold inline-flex items-center justify-center gap-2 group"
              >
                Ücretsiz Danışmanlık
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/hizmetlerimiz"
                className="btn-outline text-white border-white/30 hover:border-[#d4af37] hover:text-[#d4af37] hover:bg-transparent inline-flex items-center justify-center gap-2"
              >
                Hizmetlerimiz
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-8">
              {[
                { icon: Shield, label: 'Gizlilik Garantisi' },
                { icon: Award, label: 'Profesyonel Hizmet' },
                { icon: Users, label: 'Kişiye Özel Çözüm' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-full bg-[#d4af37]/10 flex items-center justify-center">
                    <item.icon size={18} className="text-[#d4af37]" />
                  </div>
                  <span className="text-white/80 text-sm font-medium">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Content - Decorative Element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:flex items-center justify-center"
          >
            {/* Main Circle */}
            <div className="relative w-[450px] h-[450px]">
              {/* Outer Ring */}
              <div className="absolute inset-0 rounded-full border-2 border-[#d4af37]/20 animate-spin" style={{ animationDuration: '30s' }}></div>
              
              {/* Middle Ring */}
              <div className="absolute inset-8 rounded-full border border-[#d4af37]/30"></div>
              
              {/* Inner Content */}
              <div className="absolute inset-16 rounded-full bg-gradient-to-br from-[#1a2744] to-[#243352] flex items-center justify-center shadow-2xl">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-[#d4af37] to-[#f0d77a] rounded-2xl flex items-center justify-center shadow-lg shadow-[#d4af37]/30 animate-float">
                    <Scale className="w-12 h-12 text-[#0a1628]" />
                  </div>
                  <h3 className="text-white text-xl font-bold mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
                    TTK HUKUK
                  </h3>
                  <p className="text-[#d4af37] text-xs tracking-[0.3em] uppercase">Bürosu</p>
                </div>
              </div>
              
              {/* Floating Elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-10 right-10 w-16 h-16 bg-gradient-to-br from-[#d4af37]/20 to-[#d4af37]/5 rounded-xl backdrop-blur-sm flex items-center justify-center border border-[#d4af37]/20"
              >
                <span className="text-2xl font-bold text-[#d4af37]">15+</span>
              </motion.div>
              
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute bottom-10 left-10 w-20 h-20 bg-gradient-to-br from-[#d4af37]/20 to-[#d4af37]/5 rounded-xl backdrop-blur-sm flex items-center justify-center border border-[#d4af37]/20"
              >
                <div className="text-center">
                  <Scale className="w-8 h-8 text-[#d4af37]" />
                </div>
              </motion.div>
              
              <motion.div
                animate={{ y: [-5, 15, -5] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-1/2 -right-4 w-14 h-14 bg-gradient-to-br from-[#d4af37]/20 to-[#d4af37]/5 rounded-full backdrop-blur-sm flex items-center justify-center border border-[#d4af37]/20"
              >
                <Award className="w-6 h-6 text-[#d4af37]" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-white/40 text-xs uppercase tracking-widest">Keşfet</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2"
          >
            <div className="w-1.5 h-1.5 bg-[#d4af37] rounded-full"></div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
