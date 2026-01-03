'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { Phone, MessageCircle, Calendar, ArrowRight } from 'lucide-react';

export default function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#1a2744] to-[#243352]">
        {/* Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23d4af37' fill-opacity='0.5' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          }}
        ></div>
        
        {/* Gradient Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#d4af37]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[#d4af37] font-medium tracking-wider uppercase text-sm">
              İletişime Geçin
            </span>
            <h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-4 mb-6 leading-tight"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Hukuki Sorununuzu
              <span className="block text-gradient-gold">Birlikte Çözelim</span>
            </h2>
            <p className="text-white/70 text-lg mb-8 leading-relaxed">
              İlk görüşmemiz ücretsizdir. Hukuki durumunuzu değerlendirelim ve 
              size en uygun çözüm yolunu birlikte belirleyelim.
            </p>

            {/* Contact Options */}
            <div className="space-y-4">
              {[
                { 
                  icon: Phone, 
                  title: 'Hemen Arayın', 
                  desc: '+90 555 726 99 03', 
                  href: 'tel:+905557269903',
                  highlight: true 
                },
                { 
                  icon: MessageCircle, 
                  title: 'WhatsApp', 
                  desc: 'Mesaj gönderin', 
                  href: 'https://wa.me/905557269903' 
                },
                { 
                  icon: Calendar, 
                  title: 'Randevu Alın', 
                  desc: 'Online randevu sistemi', 
                  href: '/iletisim' 
                },
              ].map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 group ${
                    item.highlight
                      ? 'bg-gradient-to-r from-[#d4af37] to-[#f0d77a] text-[#0a1628]'
                      : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    item.highlight ? 'bg-[#0a1628]/20' : 'bg-white/10'
                  }`}>
                    <item.icon className={`w-6 h-6 ${item.highlight ? 'text-[#0a1628]' : 'text-[#d4af37]'}`} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">{item.title}</h4>
                    <p className={`text-sm ${item.highlight ? 'text-[#0a1628]/70' : 'text-white/60'}`}>
                      {item.desc}
                    </p>
                  </div>
                  <ArrowRight className={`w-5 h-5 group-hover:translate-x-1 transition-transform ${
                    item.highlight ? 'text-[#0a1628]' : 'text-[#d4af37]'
                  }`} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-2xl p-8 shadow-2xl"
          >
            <h3 
              className="text-2xl font-bold text-[#0a1628] mb-2"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Ücretsiz Ön Görüşme
            </h3>
            <p className="text-[#0a1628]/60 mb-6">
              Formu doldurun, 24 saat içinde size dönelim.
            </p>

            <form className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#0a1628] mb-2">
                    Adınız Soyadınız *
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Adınız Soyadınız"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#0a1628] mb-2">
                    Telefon *
                  </label>
                  <input
                    type="tel"
                    className="form-input"
                    placeholder="0555 726 99 03"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0a1628] mb-2">
                  E-posta *
                </label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="ornek@email.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0a1628] mb-2">
                  Konu *
                </label>
                <select className="form-input" required>
                  <option value="">Hukuki konu seçin</option>
                  <option value="ceza">Ceza Hukuku</option>
                  <option value="ticaret">Ticaret Hukuku</option>
                  <option value="aile">Aile Hukuku</option>
                  <option value="is">İş Hukuku</option>
                  <option value="gayrimenkul">Gayrimenkul Hukuku</option>
                  <option value="icra">İcra & İflas Hukuku</option>
                  <option value="diger">Diğer</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0a1628] mb-2">
                  Mesajınız
                </label>
                <textarea
                  className="form-input min-h-[120px] resize-none"
                  placeholder="Hukuki sorununuzu kısaca açıklayın..."
                  rows={4}
                ></textarea>
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="kvkk"
                  className="mt-1 w-4 h-4 text-[#d4af37] border-gray-300 rounded focus:ring-[#d4af37]"
                  required
                />
                <label htmlFor="kvkk" className="text-sm text-[#0a1628]/60">
                  <Link href="/kvkk" className="text-[#d4af37] hover:underline">KVKK Aydınlatma Metni</Link>&apos;ni 
                  okudum ve kabul ediyorum.
                </label>
              </div>

              <button
                type="submit"
                className="btn-gold w-full flex items-center justify-center gap-2 group"
              >
                Gönder
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            <p className="text-center text-sm text-[#0a1628]/50 mt-4">
              🔒 Bilgileriniz gizli tutulur ve üçüncü şahıslarla paylaşılmaz.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
