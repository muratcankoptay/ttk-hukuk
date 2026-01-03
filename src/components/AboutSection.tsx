'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { Award, BookOpen, Scale, Shield, ArrowRight } from 'lucide-react';

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative py-24 bg-white overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#faf8f5] to-transparent"></div>
      
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Main Image Container */}
            <div className="relative">
              <div className="aspect-[4/5] bg-[#0a1628] rounded-lg overflow-hidden shadow-2xl">
                {/* Placeholder for lawyer image */}
                <div className="w-full h-full bg-gradient-to-br from-[#1a2744] to-[#0a1628] flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-[#d4af37] to-[#f0d77a] rounded-full flex items-center justify-center">
                      <Scale className="w-16 h-16 text-[#0a1628]" />
                    </div>
                    <p className="text-white/60 text-sm">Av. Tahir Talha Kahraman</p>
                    <p className="text-[#d4af37] text-xs tracking-widest uppercase mt-1">Kurucu Ortak</p>
                  </div>
                </div>
              </div>

              {/* Floating Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute -bottom-8 -right-8 bg-white rounded-lg shadow-xl p-6 border border-[#d4af37]/20"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#d4af37] to-[#f0d77a] rounded-full flex items-center justify-center">
                    <Award className="w-7 h-7 text-[#0a1628]" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-[#0a1628]" style={{ fontFamily: 'Playfair Display, serif' }}>
                      15+
                    </div>
                    <div className="text-[#0a1628]/60 text-sm">Yıllık Deneyim</div>
                  </div>
                </div>
              </motion.div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 border-l-4 border-t-4 border-[#d4af37]"></div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-r-4 border-b-4 border-[#d4af37]/30"></div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[#d4af37] font-medium tracking-wider uppercase text-sm">
              Hakkımızda
            </span>
            <h2 
              className="text-3xl md:text-4xl font-bold text-[#0a1628] mt-4 mb-6 leading-tight"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Hukuki Süreçlerinizde
              <span className="block text-gradient-gold">Güvenilir Ortağınız</span>
            </h2>
            <div className="divider-gold"></div>

            <p className="text-[#0a1628]/70 mb-6 leading-relaxed">
              Av. Tahir Talha Kahraman tarafından kurulan TTK Hukuk Bürosu, 15 yılı aşkın 
              tecrübesiyle müvekkillerine en yüksek standartlarda hukuki danışmanlık ve 
              avukatlık hizmeti sunmaktadır.
            </p>

            <p className="text-[#0a1628]/70 mb-8 leading-relaxed">
              Ceza hukuku, ticaret hukuku, aile hukuku ve iş hukuku başta olmak üzere 
              pek çok alanda uzmanlaşmış kadromuzla, her davaya özgü stratejiler 
              geliştirerek müvekkillerimizin haklarını en etkin şekilde savunuyoruz.
            </p>

            {/* Features */}
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              {[
                { icon: Scale, title: 'Adil Yaklaşım', desc: 'Her davaya tarafsız ve adil bakış açısı' },
                { icon: BookOpen, title: 'Sürekli Gelişim', desc: 'Güncel mevzuat takibi ve eğitimler' },
                { icon: Award, title: 'Profesyonel Hizmet', desc: 'Titiz ve özverili çalışma anlayışı' },
                { icon: Shield, title: 'Gizlilik İlkesi', desc: 'Müvekkil bilgilerinde tam gizlilik' },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#d4af37]/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-[#d4af37]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#0a1628] mb-1">{feature.title}</h4>
                    <p className="text-sm text-[#0a1628]/60">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Link
              href="/hakkimizda"
              className="btn-gold inline-flex items-center gap-2 group"
            >
              Daha Fazla Bilgi
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
