'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Scale } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-b from-[#0a1628] to-[#1a2744] px-6">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Logo */}
          <div className="w-20 h-20 mx-auto mb-8 bg-gradient-to-br from-[#d4af37] to-[#f0d77a] rounded-2xl flex items-center justify-center">
            <Scale className="w-10 h-10 text-[#0a1628]" />
          </div>

          {/* 404 Text */}
          <h1 
            className="text-8xl md:text-9xl font-bold text-gradient-gold mb-4"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            404
          </h1>

          <h2 
            className="text-2xl md:text-3xl font-bold text-white mb-4"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Sayfa Bulunamadı
          </h2>

          <p className="text-white/60 max-w-md mx-auto mb-8">
            Aradığınız sayfa mevcut değil veya taşınmış olabilir. 
            Ana sayfaya dönerek devam edebilirsiniz.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="btn-gold inline-flex items-center justify-center gap-2"
            >
              <Home size={18} />
              Ana Sayfa
            </Link>
            <button
              onClick={() => window.history.back()}
              className="btn-outline text-white border-white/30 hover:border-[#d4af37] hover:text-[#d4af37] hover:bg-transparent inline-flex items-center justify-center gap-2"
            >
              <ArrowLeft size={18} />
              Geri Dön
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}