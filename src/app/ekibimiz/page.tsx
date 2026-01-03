'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Scale, 
  Award, 
  BookOpen, 
  Briefcase, 
  GraduationCap,
  Mail,
  Linkedin,
  ArrowRight,
  Quote
} from 'lucide-react';

const team = [
  {
    name: 'Av. Tarih Talha Kahraman',
    role: 'Kurucu Ortak',
    title: 'Ağır Ceza & Ticaret Hukuku Uzmanı',
    bio: '15 yılı aşkın deneyimiyle ceza ve ticaret hukuku alanında uzmanlaşmış olan Av. Tarih Talha Kahraman, TTK Hukuk Bürosu\'nun kurucusudur. İstanbul Üniversitesi Hukuk Fakültesi mezunudur.',
    education: [
      'İstanbul Üniversitesi Hukuk Fakültesi (2006-2010)',
      'Ceza Hukuku Yüksek Lisans (2012-2014)',
    ],
    expertise: ['Ağır Ceza Davaları', 'Ticari Uyuşmazlıklar', 'Şirket Hukuku', 'İcra & İflas'],
    experience: '15+ Yıl',
    email: 'tarih.kahraman@ttkhukuk.com',
    linkedin: '#',
    featured: true,
  },
  {
    name: 'Av. Elif Yıldırım',
    role: 'Kıdemli Avukat',
    title: 'Aile Hukuku Uzmanı',
    bio: 'Aile hukuku alanında 10 yıllık deneyime sahip Av. Elif Yıldırım, boşanma, velayet ve nafaka davalarında hassas ve profesyonel bir yaklaşımla hizmet vermektedir.',
    education: [
      'Ankara Üniversitesi Hukuk Fakültesi (2010-2014)',
      'Aile Hukuku Sertifika Programı (2016)',
    ],
    expertise: ['Boşanma Davaları', 'Velayet', 'Nafaka', 'Mal Paylaşımı'],
    experience: '10 Yıl',
    email: 'elif.yildirim@ttkhukuk.com',
    linkedin: '#',
    featured: false,
  },
  {
    name: 'Av. Mehmet Aksoy',
    role: 'Kıdemli Avukat',
    title: 'İş Hukuku Uzmanı',
    bio: 'İş hukuku ve sosyal güvenlik alanında uzmanlaşan Av. Mehmet Aksoy, işçi ve işveren haklarının korunmasında deneyimli kadrosuyla öne çıkmaktadır.',
    education: [
      'Marmara Üniversitesi Hukuk Fakültesi (2008-2012)',
      'İş Hukuku Doktora (Devam Ediyor)',
    ],
    expertise: ['İşe İade Davaları', 'Tazminat Davaları', 'İş Kazaları', 'Toplu Sözleşme'],
    experience: '12 Yıl',
    email: 'mehmet.aksoy@ttkhukuk.com',
    linkedin: '#',
    featured: false,
  },
  {
    name: 'Av. Zeynep Kara',
    role: 'Avukat',
    title: 'Gayrimenkul Hukuku Uzmanı',
    bio: 'Gayrimenkul ve imar hukuku konusunda uzmanlaşan Av. Zeynep Kara, tapu işlemleri, kira davaları ve kamulaştırma konularında güvenilir hukuki destek sunmaktadır.',
    education: [
      'Galatasaray Üniversitesi Hukuk Fakültesi (2014-2018)',
      'Gayrimenkul Hukuku Sertifikası (2019)',
    ],
    expertise: ['Tapu İşlemleri', 'Kira Davaları', 'İmar Hukuku', 'Kat Mülkiyeti'],
    experience: '6 Yıl',
    email: 'zeynep.kara@ttkhukuk.com',
    linkedin: '#',
    featured: false,
  },
  {
    name: 'Av. Can Demir',
    role: 'Avukat',
    title: 'İcra & İflas Hukuku Uzmanı',
    bio: 'İcra ve iflas hukuku alanında deneyimli Av. Can Demir, alacak takibi ve borç yapılandırması konularında etkin çözümler üretmektedir.',
    education: [
      'Dokuz Eylül Üniversitesi Hukuk Fakültesi (2015-2019)',
      'İcra İflas Hukuku Sertifikası (2020)',
    ],
    expertise: ['İcra Takibi', 'İflas Davaları', 'Konkordato', 'Alacak Tahsili'],
    experience: '5 Yıl',
    email: 'can.demir@ttkhukuk.com',
    linkedin: '#',
    featured: false,
  },
  {
    name: 'Stj. Av. Selin Öz',
    role: 'Stajyer Avukat',
    title: 'Genel Hukuk',
    bio: 'Hukuk fakültesini üstün başarıyla tamamlayan Stj. Av. Selin Öz, TTK Hukuk Bürosu\'nda stajını sürdürmekte ve tüm alanlarda deneyim kazanmaktadır.',
    education: [
      'İstanbul Bilgi Üniversitesi Hukuk Fakültesi (2019-2023)',
    ],
    expertise: ['Araştırma', 'Dosya Takibi', 'Duruşma Hazırlığı'],
    experience: '1 Yıl',
    email: 'selin.oz@ttkhukuk.com',
    linkedin: '#',
    featured: false,
  },
];

const values = [
  {
    icon: Scale,
    title: 'Adalet',
    desc: 'Her davada adaletin tesisi için mücadele ediyoruz.',
  },
  {
    icon: BookOpen,
    title: 'Uzmanlık',
    desc: 'Alanında uzman avukatlarla profesyonel hizmet.',
  },
  {
    icon: Award,
    title: 'Güven',
    desc: 'Şeffaf ve güvenilir hukuki danışmanlık.',
  },
];

export default function EkibimizPage() {
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
              Ekibimiz
            </span>
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 mb-6"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Uzman Kadromuzla
              <span className="block text-gradient-gold">Yanınızdayız</span>
            </h1>
            <p className="text-white/70 max-w-2xl mx-auto text-lg">
              Her biri alanında uzmanlaşmış avukatlarımız ile hukuki süreçlerinizde 
              size en iyi hizmeti sunuyoruz.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 p-6 bg-[#faf8f5] rounded-xl"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-[#d4af37] to-[#f0d77a] rounded-xl flex items-center justify-center flex-shrink-0">
                  <value.icon className="w-7 h-7 text-[#0a1628]" />
                </div>
                <div>
                  <h3 className="font-bold text-[#0a1628]">{value.title}</h3>
                  <p className="text-sm text-[#0a1628]/60">{value.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Lawyer */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {team.filter(member => member.featured).map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              {/* Image */}
              <div className="relative">
                <div className="aspect-[4/5] bg-gradient-to-br from-[#0a1628] to-[#1a2744] rounded-2xl overflow-hidden shadow-2xl">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="w-40 h-40 mx-auto mb-6 bg-gradient-to-br from-[#d4af37] to-[#f0d77a] rounded-full flex items-center justify-center">
                        <Scale className="w-20 h-20 text-[#0a1628]" />
                      </div>
                      <h3 className="text-white text-2xl font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                        {member.name}
                      </h3>
                      <p className="text-[#d4af37]">{member.role}</p>
                    </div>
                  </div>
                </div>
                
                {/* Stats Card */}
                <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-xl p-6 border border-[#d4af37]/20">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gradient-gold">{member.experience}</div>
                    <div className="text-sm text-[#0a1628]/60">Deneyim</div>
                  </div>
                </div>

                {/* Decorative */}
                <div className="absolute -top-4 -left-4 w-20 h-20 border-l-4 border-t-4 border-[#d4af37]"></div>
              </div>

              {/* Content */}
              <div>
                <span className="text-[#d4af37] font-medium">{member.role}</span>
                <h2 
                  className="text-3xl md:text-4xl font-bold text-[#0a1628] mt-2 mb-4"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  {member.name}
                </h2>
                <p className="text-[#0a1628]/60 text-lg mb-2">{member.title}</p>
                <div className="divider-gold"></div>
                
                <p className="text-[#0a1628]/70 mt-6 mb-6 leading-relaxed">
                  {member.bio}
                </p>

                {/* Education */}
                <div className="mb-6">
                  <h4 className="flex items-center gap-2 font-semibold text-[#0a1628] mb-3">
                    <GraduationCap className="w-5 h-5 text-[#d4af37]" />
                    Eğitim
                  </h4>
                  <ul className="space-y-2">
                    {member.education.map((edu, idx) => (
                      <li key={idx} className="text-[#0a1628]/70 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-[#d4af37] rounded-full mt-2"></span>
                        {edu}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Expertise */}
                <div className="mb-8">
                  <h4 className="flex items-center gap-2 font-semibold text-[#0a1628] mb-3">
                    <Briefcase className="w-5 h-5 text-[#d4af37]" />
                    Uzmanlık Alanları
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {member.expertise.map((exp, idx) => (
                      <span 
                        key={idx}
                        className="px-3 py-1 bg-[#d4af37]/10 text-[#0a1628] text-sm rounded-full"
                      >
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Contact */}
                <div className="flex gap-4">
                  <a
                    href={`mailto:${member.email}`}
                    className="flex items-center gap-2 text-[#0a1628] hover:text-[#d4af37] transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    <span className="text-sm">{member.email}</span>
                  </a>
                  <a
                    href={member.linkedin}
                    className="w-10 h-10 bg-[#0a1628] hover:bg-[#d4af37] text-white hover:text-[#0a1628] rounded-full flex items-center justify-center transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-16 bg-[#0a1628]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Quote className="w-16 h-16 text-[#d4af37]/30 mx-auto mb-6" />
          <blockquote 
            className="text-2xl md:text-3xl text-white italic leading-relaxed mb-6"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            &ldquo;Hukuk, toplumun temel taşıdır. Biz bu taşı her müvekkilimiz için 
            sağlam tutmak için buradayız.&rdquo;
          </blockquote>
          <cite className="text-[#d4af37]">— Av. Tarih Talha Kahraman</cite>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-24 bg-[#faf8f5]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[#d4af37] font-medium tracking-wider uppercase text-sm">
              Avukatlarımız
            </span>
            <h2 
              className="text-3xl md:text-4xl font-bold text-[#0a1628] mt-4"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Deneyimli Ekibimiz
            </h2>
            <div className="divider-gold mx-auto mt-4"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.filter(member => !member.featured).map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 group"
              >
                {/* Image */}
                <div className="aspect-[4/3] bg-gradient-to-br from-[#0a1628] to-[#1a2744] relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-[#d4af37] to-[#f0d77a] rounded-full flex items-center justify-center text-[#0a1628] text-3xl font-bold">
                      {member.name.split(' ').slice(-1)[0].charAt(0)}
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-[#d4af37]/0 group-hover:bg-[#d4af37]/10 transition-colors"></div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <span className="text-[#d4af37] text-sm font-medium">{member.role}</span>
                  <h3 
                    className="text-xl font-bold text-[#0a1628] mt-1 mb-1"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    {member.name}
                  </h3>
                  <p className="text-[#0a1628]/60 text-sm mb-4">{member.title}</p>
                  
                  <p className="text-[#0a1628]/70 text-sm mb-4 line-clamp-3">
                    {member.bio}
                  </p>

                  {/* Expertise Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {member.expertise.slice(0, 3).map((exp, idx) => (
                      <span 
                        key={idx}
                        className="px-2 py-0.5 bg-[#faf8f5] text-[#0a1628]/70 text-xs rounded"
                      >
                        {exp}
                      </span>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="text-center">
                      <div className="text-lg font-bold text-[#d4af37]">{member.experience}</div>
                      <div className="text-xs text-[#0a1628]/50">Deneyim</div>
                    </div>
                    <div className="flex gap-1">
                      {member.expertise.slice(0, 2).map((exp, idx) => (
                        <span 
                          key={idx}
                          className="px-2 py-1 bg-[#d4af37]/10 text-[#0a1628]/70 text-xs rounded"
                        >
                          {exp}
                        </span>
                      ))}
                    </div>
                    <a
                      href={`mailto:${member.email}`}
                      className="w-10 h-10 bg-[#0a1628] hover:bg-[#d4af37] text-white hover:text-[#0a1628] rounded-full flex items-center justify-center transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  </div>
                </div>
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
              Ekibimizle Tanışın
            </h2>
            <p className="text-white/70 mb-8 max-w-2xl mx-auto">
              Hukuki sorununuz için en uygun uzmanımızla görüşmek ister misiniz? 
              Ücretsiz ön görüşme için hemen randevu alın.
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