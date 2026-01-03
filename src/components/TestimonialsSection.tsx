'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Mehmet Yılmaz',
    role: 'İşadamı',
    content: 'Ticari davamda gösterdikleri profesyonel yaklaşım ve başarılı sonuç için TTK Hukuk ekibine minnettarım. Her aşamada bilgilendirildim ve kendimi güvende hissettim.',
    rating: 5,
    caseType: 'Ticaret Davası',
  },
  {
    id: 2,
    name: 'Ayşe Kaya',
    role: 'Öğretmen',
    content: 'Boşanma sürecimde hem hukuki hem de insani anlamda büyük destek aldım. Zorlu bir dönemde yanımda olduğunuz için teşekkür ederim.',
    rating: 5,
    caseType: 'Aile Hukuku',
  },
  {
    id: 3,
    name: 'Ali Demir',
    role: 'Mühendis',
    content: 'İş kazası sonrası haklarımı öğrenmek için başvurduğumda, tüm süreci titizlikle yönettiler. Hak ettiğim tazminatı aldım.',
    rating: 5,
    caseType: 'İş Hukuku',
  },
  {
    id: 4,
    name: 'Fatma Şahin',
    role: 'Esnaf',
    content: 'Kira anlaşmazlığımda hızlı ve etkili bir çözüm sağladılar. Profesyonellik ve güven bir arada. Kesinlikle tavsiye ederim.',
    rating: 5,
    caseType: 'Gayrimenkul Hukuku',
  },
  {
    id: 5,
    name: 'Hasan Özkan',
    role: 'Şirket Müdürü',
    content: 'Ceza davamda gösterdikleri savunma stratejisi gerçekten etkileyiciydi. Sonuç beklentilerimin çok üzerindeydi.',
    rating: 5,
    caseType: 'Ceza Hukuku',
  },
];

export default function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section ref={ref} className="relative py-24 bg-[#0a1628] overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#0a1628] via-[#1a2744] to-[#0a1628]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#d4af37]/5 rounded-full blur-3xl"></div>
        
        {/* Decorative Quote */}
        <Quote className="absolute top-20 left-10 w-32 h-32 text-[#d4af37]/5" />
        <Quote className="absolute bottom-20 right-10 w-48 h-48 text-[#d4af37]/5 rotate-180" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#d4af37] font-medium tracking-wider uppercase text-sm">
              Müvekkil Yorumları
            </span>
            <h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-4 mb-6"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Müvekkillerimiz Ne Diyor?
            </h2>
            <div className="divider-gold mx-auto"></div>
          </motion.div>
        </div>

        {/* Testimonials Slider */}
        <div className="relative max-w-4xl mx-auto">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10"
          >
            {/* Quote Icon */}
            <div className="w-16 h-16 bg-gradient-to-br from-[#d4af37] to-[#f0d77a] rounded-full flex items-center justify-center mb-8 mx-auto">
              <Quote className="w-8 h-8 text-[#0a1628]" />
            </div>

            {/* Rating */}
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#d4af37] text-[#d4af37]" />
              ))}
            </div>

            {/* Content */}
            <blockquote className="text-xl md:text-2xl text-white/90 text-center mb-8 leading-relaxed italic">
              &ldquo;{testimonials[currentIndex].content}&rdquo;
            </blockquote>

            {/* Author */}
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#d4af37]/30 to-[#d4af37]/10 rounded-full flex items-center justify-center text-[#d4af37] text-xl font-bold">
                {testimonials[currentIndex].name.charAt(0)}
              </div>
              <h4 className="text-white font-semibold text-lg">
                {testimonials[currentIndex].name}
              </h4>
              <p className="text-white/60 text-sm">{testimonials[currentIndex].role}</p>
              <span className="inline-block mt-2 text-[#d4af37] text-xs font-medium tracking-wider uppercase bg-[#d4af37]/10 px-3 py-1 rounded-full">
                {testimonials[currentIndex].caseType}
              </span>
            </div>
          </motion.div>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full bg-white/10 hover:bg-[#d4af37] flex items-center justify-center text-white hover:text-[#0a1628] transition-all duration-300"
              aria-label="Önceki yorum"
            >
              <ChevronLeft size={24} />
            </button>
            
            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-[#d4af37] w-8'
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Yorum ${index + 1}`}
                />
              ))}
            </div>
            
            <button
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full bg-white/10 hover:bg-[#d4af37] flex items-center justify-center text-white hover:text-[#0a1628] transition-all duration-300"
              aria-label="Sonraki yorum"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          {[
            { number: '15+', label: 'Yıllık Deneyim' },
            { number: '6', label: 'Uzman Avukat' },
            { number: '7/24', label: 'Destek Hattı' },
            { number: '6', label: 'Uzmanlık Alanı' },
          ].map((stat, index) => (
            <div key={index} className="p-4">
              <div className="text-3xl font-bold text-gradient-gold mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
                {stat.number}
              </div>
              <div className="text-white/60 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
