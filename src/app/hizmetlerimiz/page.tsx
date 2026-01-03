'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { 
  Gavel, 
  Briefcase, 
  Heart, 
  Building2, 
  Home, 
  FileText,
  ArrowRight,
  CheckCircle,
  Scale,
  Shield,
  Users,
  Clock
} from 'lucide-react';

const services = [
  {
    icon: Gavel,
    title: 'Ceza Hukuku',
    slug: 'ceza-hukuku',
    description: 'Ceza hukuku alanında uzman savunma ve hukuki danışmanlık hizmeti sunuyoruz. Soruşturma aşamasından Yargıtay sürecine kadar yanınızdayız.',
    features: [
      'Ağır Ceza Davaları',
      'Tutukluluk İtirazları',
      'Temyiz Başvuruları',
      'Uzlaştırma İşlemleri',
      'Ceza İnfaz Hukuku',
      'Çek Davaları',
    ],
    details: 'Ceza davalarında savunma, kişinin en temel haklarını korumak için kritik öneme sahiptir. Müvekkillerimizin suçsuzluk karinesinden yararlanarak en etkin savunmayı yapıyoruz.',
  },
  {
    icon: Briefcase,
    title: 'Ticaret Hukuku',
    slug: 'ticaret-hukuku',
    description: 'Şirketlerin ve girişimcilerin tüm ticari ihtiyaçlarında profesyonel hukuki destek sağlıyoruz.',
    features: [
      'Şirket Kuruluşu',
      'Ticari Sözleşmeler',
      'Ortaklık Anlaşmazlıkları',
      'İflas ve Konkordato',
      'Marka ve Patent',
      'Rekabet Hukuku',
    ],
    details: 'Ticari hayatın karmaşık yapısında müvekkillerimizin çıkarlarını koruyarak, hukuki riskleri minimize ediyoruz.',
  },
  {
    icon: Heart,
    title: 'Aile Hukuku',
    slug: 'aile-hukuku',
    description: 'Aile hukuku davalarında hassas ve profesyonel yaklaşımla müvekkillerimizin yanındayız.',
    features: [
      'Anlaşmalı Boşanma',
      'Çekişmeli Boşanma',
      'Velayet Davaları',
      'Nafaka Davaları',
      'Mal Paylaşımı',
      'Evlat Edinme',
    ],
    details: 'Aile içi anlaşmazlıkların çözümünde önceliğimiz, tarafların ve özellikle çocukların menfaatlerini korumaktır.',
  },
  {
    icon: Building2,
    title: 'İş Hukuku',
    slug: 'is-hukuku',
    description: 'İşçi ve işveren arasındaki uyuşmazlıklarda her iki taraf için de hukuki danışmanlık sunuyoruz.',
    features: [
      'İşe İade Davaları',
      'Kıdem-İhbar Tazminatı',
      'İş Kazaları',
      'Mobing Davaları',
      'İş Sözleşmeleri',
      'Sendika Hukuku',
    ],
    details: 'İş hukukunun karmaşık yapısında, güncel mevzuat ve içtihatları takip ederek müvekkillerimize en güncel hizmeti sunuyoruz.',
  },
  {
    icon: Home,
    title: 'Gayrimenkul Hukuku',
    slug: 'gayrimenkul-hukuku',
    description: 'Taşınmaz alım-satımından kira anlaşmazlıklarına kadar tüm gayrimenkul işlemlerinizde yanınızdayız.',
    features: [
      'Tapu İşlemleri',
      'Kira Davaları',
      'Tahliye Davaları',
      'Kat Mülkiyeti',
      'İmar Hukuku',
      'Kamulaştırma',
    ],
    details: 'Gayrimenkul yatırımlarınızın güvenliği için titiz bir hukuki inceleme ve danışmanlık hizmeti sunuyoruz.',
  },
  {
    icon: FileText,
    title: 'İcra & İflas Hukuku',
    slug: 'icra-iflas-hukuku',
    description: 'Alacak takibi ve borç yapılandırması konularında hem alacaklı hem de borçlu tarafında temsil hizmeti veriyoruz.',
    features: [
      'İcra Takibi',
      'Haciz İşlemleri',
      'Borca İtiraz',
      'Menfi Tespit',
      'İflas Davaları',
      'Konkordato',
    ],
    details: 'İcra ve iflas süreçlerinde müvekkillerimizin mali çıkarlarını en üst düzeyde koruyarak çözüm odaklı çalışıyoruz.',
  },
];

const whyChooseUs = [
  { icon: Shield, title: 'Gizlilik Garantisi', desc: 'Tüm bilgileriniz avukat-müvekkil gizliliği kapsamında korunur.' },
  { icon: Users, title: 'Uzman Kadro', desc: 'Alanında uzmanlaşmış deneyimli avukat kadrosu.' },
  { icon: Clock, title: '7/24 Destek', desc: 'Acil durumlar için her zaman ulaşılabilir durumdayız.' },
  { icon: Scale, title: 'Şeffaf Süreç', desc: 'Dava süreciniz hakkında sürekli bilgilendirme.' },
];

export default function HizmetlerimizPage() {
  const ref = useRef(null);

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
              Hizmetlerimiz
            </span>
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 mb-6"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Hukuki Çözüm
              <span className="block text-gradient-gold">Ortağınız</span>
            </h1>
            <p className="text-white/70 max-w-2xl mx-auto text-lg">
              Geniş yelpazede sunduğumuz hukuki hizmetlerimizle, her türlü 
              hukuki sorununuzda yanınızdayız.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services List */}
      <section ref={ref} className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="space-y-24">
            {services.map((service, index) => (
              <motion.div
                key={service.slug}
                id={service.slug.split('-')[0]}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Content */}
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#d4af37] to-[#f0d77a] rounded-xl flex items-center justify-center">
                      <service.icon className="w-8 h-8 text-[#0a1628]" />
                    </div>
                    <h2 
                      className="text-3xl md:text-4xl font-bold text-[#0a1628]"
                      style={{ fontFamily: 'Playfair Display, serif' }}
                    >
                      {service.title}
                    </h2>
                  </div>
                  
                  <p className="text-[#0a1628]/70 text-lg mb-6">
                    {service.description}
                  </p>
                  
                  <p className="text-[#0a1628]/60 mb-8">
                    {service.details}
                  </p>

                  <Link
                    href="/iletisim"
                    className="btn-gold inline-flex items-center gap-2 group"
                  >
                    Ücretsiz Ön Görüşme
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

                {/* Features Card */}
                <div className={`bg-[#faf8f5] rounded-2xl p-8 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <h3 className="text-xl font-bold text-[#0a1628] mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                    Hizmet Kapsamı
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-[#d4af37] flex-shrink-0" />
                        <span className="text-[#0a1628]/80">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-[#0a1628]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[#d4af37] font-medium tracking-wider uppercase text-sm">
              Neden Biz?
            </span>
            <h2 
              className="text-3xl md:text-4xl font-bold text-white mt-4"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              TTK Hukuk&apos;u Tercih Edin
            </h2>
            <div className="divider-gold mx-auto mt-4"></div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-white/5 rounded-xl border border-white/10 hover:border-[#d4af37]/30 transition-colors"
              >
                <div className="w-14 h-14 mx-auto mb-4 bg-[#d4af37]/10 rounded-full flex items-center justify-center">
                  <item.icon className="w-7 h-7 text-[#d4af37]" />
                </div>
                <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                <p className="text-white/60 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#faf8f5]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 
              className="text-3xl md:text-4xl font-bold text-[#0a1628] mb-6"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Hukuki Sorununuz İçin
              <span className="text-gradient-gold block">Hemen Başvurun</span>
            </h2>
            <p className="text-[#0a1628]/70 mb-8 max-w-2xl mx-auto">
              Ücretsiz ön görüşme için formu doldurun veya bizi arayın. 
              En kısa sürede size dönüş yapacağız.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/iletisim"
                className="btn-gold inline-flex items-center justify-center gap-2 group"
              >
                Randevu Al
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="tel:+905557269903"
                className="btn-outline text-[#0a1628] border-[#0a1628] hover:bg-[#0a1628] hover:text-white inline-flex items-center justify-center gap-2"
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