'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Clock, User, Tag, ArrowRight, Search } from 'lucide-react';
import { useState } from 'react';

const categories = [
  { slug: 'tumu', label: 'Tümü' },
  { slug: 'ceza-hukuku', label: 'Ceza Hukuku' },
  { slug: 'aile-hukuku', label: 'Aile Hukuku' },
  { slug: 'is-hukuku', label: 'İş Hukuku' },
  { slug: 'ticaret-hukuku', label: 'Ticaret Hukuku' },
  { slug: 'gayrimenkul-hukuku', label: 'Gayrimenkul Hukuku' },
];

const articles = [
  {
    slug: 'bosanma-davalarinda-mal-paylasimi',
    title: 'Boşanma Davalarında Mal Paylaşımı Nasıl Yapılır?',
    excerpt: 'Boşanma sürecinde mal paylaşımının nasıl yapıldığını, edinilmiş mallara katılma rejimini ve haklarınızı detaylı olarak açıklıyoruz.',
    category: 'Aile Hukuku',
    categorySlug: 'aile-hukuku',
    readTime: '8 dk',
    author: 'Av. Tarih Talha Kahraman',
    date: '15 Aralık 2025',
  },
  {
    slug: 'is-kazasi-tazminati-hesaplama',
    title: 'İş Kazası Tazminatı Nasıl Hesaplanır?',
    excerpt: 'İş kazası sonrası hak edebileceğiniz tazminat türlerini ve hesaplama yöntemlerini öğrenin. Haklarınızı bilin.',
    category: 'İş Hukuku',
    categorySlug: 'is-hukuku',
    readTime: '6 dk',
    author: 'Av. Tarih Talha Kahraman',
    date: '10 Aralık 2025',
  },
  {
    slug: 'sirket-kurulusu-rehberi',
    title: '2026 Yılında Şirket Kuruluşu: Tam Rehber',
    excerpt: 'Limited ve anonim şirket kuruluş süreçleri, gerekli belgeler, maliyetler ve dikkat edilmesi gereken noktalar hakkında kapsamlı rehber.',
    category: 'Ticaret Hukuku',
    categorySlug: 'ticaret-hukuku',
    readTime: '12 dk',
    author: 'Av. Tarih Talha Kahraman',
    date: '5 Aralık 2025',
  },
  {
    slug: 'kidem-tazminati-haklari',
    title: 'Kıdem Tazminatı: Şartları ve Hesaplaması',
    excerpt: 'Kıdem tazminatına hak kazanma şartları, hesaplama yöntemi ve dikkat edilmesi gereken hususlar hakkında detaylı bilgi.',
    category: 'İş Hukuku',
    categorySlug: 'is-hukuku',
    readTime: '7 dk',
    author: 'Av. Tarih Talha Kahraman',
    date: '1 Aralık 2025',
  },
  {
    slug: 'ceza-davasinda-savunma-haklari',
    title: 'Ceza Davasında Savunma Haklarınız',
    excerpt: 'Ceza davalarında sanık ve şüpheli olarak sahip olduğunuz haklar, susma hakkı, avukat talep etme ve diğer temel haklar.',
    category: 'Ceza Hukuku',
    categorySlug: 'ceza-hukuku',
    readTime: '9 dk',
    author: 'Av. Tarih Talha Kahraman',
    date: '25 Kasım 2025',
  },
  {
    slug: 'kira-sozlesmesi-feshi',
    title: 'Kira Sözleşmesi Feshi ve Tahliye Davaları',
    excerpt: 'Kira sözleşmesinin feshi, tahliye davası açma şartları ve kiracı-ev sahibi hakları hakkında kapsamlı rehber.',
    category: 'Gayrimenkul Hukuku',
    categorySlug: 'gayrimenkul-hukuku',
    readTime: '10 dk',
    author: 'Av. Tarih Talha Kahraman',
    date: '20 Kasım 2025',
  },
];

export default function MakalelerPage() {
  const [activeCategory, setActiveCategory] = useState('tumu');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = articles.filter((article) => {
    const matchesCategory = activeCategory === 'tumu' || article.categorySlug === activeCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
              Blog & Makaleler
            </span>
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 mb-6"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Hukuki
              <span className="block text-gradient-gold">Bilgi Bankası</span>
            </h1>
            <p className="text-white/70 max-w-2xl mx-auto text-lg">
              Güncel hukuki gelişmeler, haklarınız ve dava süreçleri hakkında 
              bilgilendirici makalelerimizi okuyun.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter & Search Section */}
      <section className="py-8 bg-white border-b border-gray-100 sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Categories */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => setActiveCategory(cat.slug)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === cat.slug
                      ? 'bg-[#d4af37] text-[#0a1628]'
                      : 'bg-[#faf8f5] text-[#0a1628]/70 hover:bg-[#d4af37]/10'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full lg:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#0a1628]/40" />
              <input
                type="text"
                placeholder="Makale ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-[#faf8f5] rounded-full border-none focus:ring-2 focus:ring-[#d4af37] text-[#0a1628]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {filteredArticles.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-[#0a1628]/60 text-lg">
                Aramanıza uygun makale bulunamadı.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article, index) => (
                <motion.article
                  key={article.slug}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <Link href={`/makaleler/${article.slug}`}>
                    {/* Image */}
                    <div className="aspect-[16/10] rounded-xl overflow-hidden mb-6 bg-gradient-to-br from-[#0a1628] to-[#1a2744] relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-16 h-16 mx-auto mb-4 bg-[#d4af37]/20 rounded-full flex items-center justify-center">
                            <Tag className="w-8 h-8 text-[#d4af37]" />
                          </div>
                          <span className="text-white/40 text-sm">{article.category}</span>
                        </div>
                      </div>
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
          )}
        </div>
      </section>

      {/* Newsletter Section */}
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
              Hukuki Gelişmelerden
              <span className="text-gradient-gold block">Haberdar Olun</span>
            </h2>
            <p className="text-white/70 mb-8 max-w-2xl mx-auto">
              E-bültenimize abone olun, yeni makaleler ve önemli hukuki 
              değişikliklerden ilk siz haberdar olun.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="E-posta adresiniz"
                className="flex-1 px-6 py-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-[#d4af37]"
              />
              <button
                type="submit"
                className="btn-gold whitespace-nowrap flex items-center justify-center gap-2"
              >
                Abone Ol
                <ArrowRight size={18} />
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </>
  );
}