'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { Scale, Award, BookOpen, Users, Target, Heart, Shield, ArrowRight } from 'lucide-react';

const timeline = [
  { year: '2010', title: 'Meslek Başlangıcı', desc: 'İstanbul Barosu\'na kayıt' },
  { year: '2013', title: 'Uzmanlaşma', desc: 'Ceza hukuku alanında uzmanlaşma' },
  { year: '2016', title: 'TTK Hukuk', desc: 'Büronun kuruluşu' },
  { year: '2020', title: 'Genişleme', desc: 'Ekip ve hizmet alanı genişlemesi' },
  { year: '2024', title: 'Büyüme', desc: 'Yeni uzmanlık alanları eklendi' },
];

const values = [
  {
    icon: Shield,
    title: 'Gizlilik',
    desc: 'Müvekkil bilgileri en üst düzeyde gizlilik ile korunur. Avukat-müvekkil arasındaki güven bizim için en önemli ilkedir.',
  },
  {
    icon: Target,
    title: 'Sonuç Odaklılık',
    desc: 'Her davada en iyi sonucu almak için titizlikle çalışırız. Stratejik planlama ile haklarınızı en etkin şekilde savunuruz.',
  },
  {
    icon: Heart,
    title: 'İnsani Yaklaşım',
    desc: 'Hukuki süreçlerin zorluğunu biliyoruz. Size sadece avukat olarak değil, güvenilir bir danışman olarak yanınızdayız.',
  },
  {
    icon: BookOpen,
    title: 'Sürekli Gelişim',
    desc: 'Değişen mevzuatı ve içtihatları sürekli takip ederiz. Güncel bilgiyle en iyi hizmeti sunmayı hedefleriz.',
  },
];

export default function HakkimizdaPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

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
              Hakkımızda
            </span>
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 mb-6"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              15 Yıllık Deneyim,
              <span className="block text-gradient-gold">Güvenilir Hizmet</span>
            </h1>
            <p className="text-white/70 max-w-2xl mx-auto text-lg">
              TTK Hukuk Bürosu olarak, müvekkillerimize en yüksek standartlarda 
              hukuki danışmanlık ve avukatlık hizmeti sunuyoruz.
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Content */}
      <section ref={ref} className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image Side */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative">
                <div className="aspect-[4/5] bg-gradient-to-br from-[#0a1628] to-[#1a2744] rounded-lg overflow-hidden shadow-2xl">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-[#d4af37] to-[#f0d77a] rounded-full flex items-center justify-center">
                        <Scale className="w-16 h-16 text-[#0a1628]" />
                      </div>
                      <h3 className="text-white text-2xl font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                        Av. Tarih Talha Kahraman
                      </h3>
                      <p className="text-[#d4af37]">Kurucu Ortak</p>
                      <div className="mt-6 space-y-2 text-white/60 text-sm">
                        <p>İstanbul Barosu Üyesi</p>
                        <p>Sicil No: 12345</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating Badge */}
                <div className="absolute -bottom-6 -right-6 bg-white rounded-lg shadow-xl p-4 border border-[#d4af37]/20">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#d4af37] to-[#f0d77a] rounded-full flex items-center justify-center">
                      <Award className="w-6 h-6 text-[#0a1628]" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-[#0a1628]">15+</div>
                      <div className="text-sm text-[#0a1628]/60">Yıl Deneyim</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Content Side */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <h2 
                className="text-3xl md:text-4xl font-bold text-[#0a1628] mb-6"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Hukuk Alanında
                <span className="text-gradient-gold block">Uzmanlık ve Güven</span>
              </h2>
              <div className="divider-gold"></div>
              
              <div className="space-y-6 text-[#0a1628]/70 mt-6">
                <p>
                  TTK Hukuk Bürosu, Av. Tarih Talha Kahraman tarafından 2016 yılında 
                  İstanbul&apos;da kurulmuştur. Büromuz, kuruluşundan bu yana müvekkillerine 
                  ceza hukuku, ticaret hukuku, aile hukuku ve iş hukuku başta olmak 
                  üzere pek çok alanda kapsamlı hukuki hizmet sunmaktadır.
                </p>
                <p>
                  Hukuki süreçlerin stresli ve karmaşık olabileceğini biliyoruz. Bu nedenle, 
                  her müvekkilimize özel ilgi gösteriyor, durumlarını titizlikle analiz 
                  ediyor ve en uygun stratejileri geliştiriyoruz.
                </p>
                <p>
                  Büromuzun temel ilkesi, müvekkillerimizin haklarını en üst düzeyde korumak 
                  ve onlara güvenilir, şeffaf bir hukuki danışmanlık sunmaktır. Her davayı, 
                  kendi davamız gibi sahipleniyor ve en iyi sonucu almak için çalışıyoruz.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-[#0a1628]">
                  <Users className="w-5 h-5 text-[#d4af37]" />
                  <span className="font-medium">Kişiye Özel Hizmet</span>
                </div>
                <div className="flex items-center gap-2 text-[#0a1628]">
                  <Award className="w-5 h-5 text-[#d4af37]" />
                  <span className="font-medium">Profesyonel Yaklaşım</span>
                </div>
                <div className="flex items-center gap-2 text-[#0a1628]">
                  <Scale className="w-5 h-5 text-[#d4af37]" />
                  <span className="font-medium">15+ Yıl Deneyim</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-[#faf8f5]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[#d4af37] font-medium tracking-wider uppercase text-sm">
              Hikayemiz
            </span>
            <h2 
              className="text-3xl md:text-4xl font-bold text-[#0a1628] mt-4"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Yolculuğumuz
            </h2>
            <div className="divider-gold mx-auto mt-4"></div>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#d4af37] to-[#d4af37]/20"></div>
            
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative pl-20 pb-12 last:pb-0"
              >
                {/* Dot */}
                <div className="absolute left-5 top-0 w-6 h-6 bg-white border-4 border-[#d4af37] rounded-full"></div>
                
                {/* Content */}
                <div className="bg-white rounded-lg p-6 shadow-sm border border-[#d4af37]/10">
                  <span className="text-[#d4af37] font-bold text-lg">{item.year}</span>
                  <h3 className="text-[#0a1628] font-semibold text-xl mt-1" style={{ fontFamily: 'Playfair Display, serif' }}>
                    {item.title}
                  </h3>
                  <p className="text-[#0a1628]/60 mt-2">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[#d4af37] font-medium tracking-wider uppercase text-sm">
              Değerlerimiz
            </span>
            <h2 
              className="text-3xl md:text-4xl font-bold text-[#0a1628] mt-4"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Bizi Farklı Kılan
            </h2>
            <div className="divider-gold mx-auto mt-4"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6"
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-[#d4af37]/20 to-[#d4af37]/5 rounded-full flex items-center justify-center">
                  <value.icon className="w-8 h-8 text-[#d4af37]" />
                </div>
                <h3 className="text-xl font-bold text-[#0a1628] mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {value.title}
                </h3>
                <p className="text-[#0a1628]/60">{value.desc}</p>
              </motion.div>
            ))}
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
              Hukuki Desteğe mi İhtiyacınız Var?
            </h2>
            <p className="text-white/70 mb-8 max-w-2xl mx-auto">
              Ücretsiz ön görüşme için bizimle iletişime geçin. Hukuki durumunuzu 
              birlikte değerlendirelim ve size en uygun çözümü sunalım.
            </p>
            <Link
              href="/iletisim"
              className="btn-gold inline-flex items-center gap-2 group"
            >
              Randevu Al
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}