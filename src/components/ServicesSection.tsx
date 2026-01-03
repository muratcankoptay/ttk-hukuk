'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { 
  Scale, 
  Briefcase, 
  Heart, 
  Building2, 
  Home, 
  FileText,
  ArrowRight,
  Gavel
} from 'lucide-react';

const services = [
  {
    icon: Gavel,
    title: 'Ceza Hukuku',
    slug: 'ceza-hukuku',
    description: 'Ağır ceza, sulh ceza, çek davaları ve tüm cezai süreçlerde uzman savunma hizmeti.',
    features: ['Tutukluluk İtirazları', 'Temyiz Başvuruları', 'Uzlaştırma İşlemleri'],
  },
  {
    icon: Briefcase,
    title: 'Ticaret Hukuku',
    slug: 'ticaret-hukuku',
    description: 'Şirket kuruluşu, ticari sözleşmeler, iflas ve konkordato işlemleri.',
    features: ['Şirket Kuruluşu', 'Ortaklık Anlaşmazlıkları', 'Ticari Davalar'],
  },
  {
    icon: Heart,
    title: 'Aile Hukuku',
    slug: 'aile-hukuku',
    description: 'Boşanma, velayet, nafaka ve mal paylaşımı konularında hassas yaklaşım.',
    features: ['Anlaşmalı Boşanma', 'Çekişmeli Boşanma', 'Velayet Davaları'],
  },
  {
    icon: Building2,
    title: 'İş Hukuku',
    slug: 'is-hukuku',
    description: 'İşçi-işveren uyuşmazlıkları, tazminat talepleri ve iş sözleşmeleri.',
    features: ['İşe İade Davaları', 'Kıdem Tazminatı', 'İş Kazaları'],
  },
  {
    icon: Home,
    title: 'Gayrimenkul Hukuku',
    slug: 'gayrimenkul-hukuku',
    description: 'Tapu işlemleri, kira anlaşmazlıkları, imar ve iskan davaları.',
    features: ['Tahliye Davaları', 'Tapu İptal Davaları', 'Kamulaştırma'],
  },
  {
    icon: FileText,
    title: 'İcra & İflas Hukuku',
    slug: 'icra-iflas-hukuku',
    description: 'Alacak takibi, haciz işlemleri, iflas ve konkordato süreçleri.',
    features: ['İcra Takibi', 'Borca İtiraz', 'Menfi Tespit'],
  },
];

export default function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative py-24 bg-[#faf8f5] pattern-overlay overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6 z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#d4af37] font-medium tracking-wider uppercase text-sm">
              Uzmanlık Alanlarımız
            </span>
            <h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0a1628] mt-4 mb-6"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Hukuki Hizmetlerimiz
            </h2>
            <div className="divider-gold mx-auto"></div>
            <p className="text-[#0a1628]/70 max-w-2xl mx-auto mt-6">
              Her alanda uzmanlaşmış ekibimiz ile hukuki süreçlerinizde size en iyi 
              çözümleri sunuyoruz. Tüm davalarınızda yanınızdayız.
            </p>
          </motion.div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link href={`/hizmetlerimiz/${service.slug}`} className="block h-full">
                <div className="card-premium h-full group cursor-pointer">
                  {/* Icon */}
                  <div className="service-icon">
                    <service.icon className="w-8 h-8 text-[#d4af37]" />
                  </div>

                  {/* Content */}
                  <h3 
                    className="text-xl font-bold text-[#0a1628] mb-3 group-hover:text-[#d4af37] transition-colors"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    {service.title}
                  </h3>
                  <p className="text-[#0a1628]/60 mb-4 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-[#0a1628]/70">
                        <span className="w-1.5 h-1.5 bg-[#d4af37] rounded-full"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Link */}
                  <div className="flex items-center gap-2 text-[#d4af37] font-medium text-sm group-hover:gap-3 transition-all">
                    Detaylı Bilgi
                    <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <Link
            href="/hizmetlerimiz"
            className="btn-gold inline-flex items-center gap-2 group"
          >
            Tüm Hizmetlerimizi İnceleyin
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
