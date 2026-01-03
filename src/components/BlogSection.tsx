'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Clock, User, Tag } from 'lucide-react';

const articles = [
  {
    slug: 'bosanma-davalarinda-mal-paylasimi',
    title: 'Boşanma Davalarında Mal Paylaşımı Nasıl Yapılır?',
    excerpt: 'Boşanma sürecinde mal paylaşımının nasıl yapıldığını, edinilmiş mallara katılma rejimini ve haklarınızı detaylı olarak açıklıyoruz.',
    category: 'Aile Hukuku',
    readTime: '8 dk',
    author: 'Av. Tarih Talha Kahraman',
    date: '15 Aralık 2025',
    image: '/blog/bosanma.jpg',
  },
  {
    slug: 'is-kazasi-tazminati-hesaplama',
    title: 'İş Kazası Tazminatı Nasıl Hesaplanır?',
    excerpt: 'İş kazası sonrası hak edebileceğiniz tazminat türlerini ve hesaplama yöntemlerini öğrenin. Haklarınızı bilin.',
    category: 'İş Hukuku',
    readTime: '6 dk',
    author: 'Av. Tarih Talha Kahraman',
    date: '10 Aralık 2025',
    image: '/blog/is-kazasi.jpg',
  },
  {
    slug: 'sirket-kurulusu-rehberi',
    title: '2026 Yılında Şirket Kuruluşu: Tam Rehber',
    excerpt: 'Limited ve anonim şirket kuruluş süreçleri, gerekli belgeler, maliyetler ve dikkat edilmesi gereken noktalar hakkında kapsamlı rehber.',
    category: 'Ticaret Hukuku',
    readTime: '12 dk',
    author: 'Av. Tarih Talha Kahraman',
    date: '5 Aralık 2025',
    image: '/blog/sirket.jpg',
  },
];

export default function BlogSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative py-24 bg-white overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#0a1628]/5 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#d4af37] font-medium tracking-wider uppercase text-sm">
              Blog & Makaleler
            </span>
            <h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0a1628] mt-4 mb-4"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Hukuki Bilgiler
            </h2>
            <div className="divider-gold"></div>
            <p className="text-[#0a1628]/70 max-w-xl mt-4">
              Güncel hukuki gelişmeler, haklarınız ve dava süreçleri hakkında 
              bilgilendirici makalelerimizi okuyun.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link
              href="/makaleler"
              className="btn-outline text-[#0a1628] border-[#0a1628] hover:bg-[#0a1628] hover:text-white inline-flex items-center gap-2 group mt-6 md:mt-0"
            >
              Tüm Makaleler
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <motion.article
              key={article.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group"
            >
              <Link href={`/makaleler/${article.slug}`}>
                {/* Image */}
                <div className="aspect-[16/10] rounded-xl overflow-hidden mb-6 bg-gradient-to-br from-[#0a1628] to-[#1a2744] relative">
                  {/* Placeholder pattern */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-[#d4af37]/20 rounded-full flex items-center justify-center">
                        <Tag className="w-8 h-8 text-[#d4af37]" />
                      </div>
                      <span className="text-white/40 text-sm">{article.category}</span>
                    </div>
                  </div>
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-[#d4af37]/0 group-hover:bg-[#d4af37]/20 transition-colors duration-300"></div>
                </div>

                {/* Content */}
                <div>
                  {/* Meta */}
                  <div className="flex items-center gap-4 text-sm text-[#0a1628]/50 mb-3">
                    <span className="text-[#d4af37] font-medium">{article.category}</span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {article.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 
                    className="text-xl font-bold text-[#0a1628] mb-3 group-hover:text-[#d4af37] transition-colors line-clamp-2"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    {article.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-[#0a1628]/60 mb-4 line-clamp-2">
                    {article.excerpt}
                  </p>

                  {/* Author & Date */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-[#0a1628]/60">
                      <User size={14} />
                      <span>{article.author}</span>
                    </div>
                    <span className="text-[#0a1628]/40">{article.date}</span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
