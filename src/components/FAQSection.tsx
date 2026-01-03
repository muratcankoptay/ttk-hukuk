'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: 'İlk görüşme ücreti ne kadar?',
    answer: 'İlk görüşmemiz tamamen ücretsizdir. Bu görüşmede hukuki durumunuzu değerlendirir, size en uygun çözüm yollarını anlatır ve süreç hakkında bilgilendiririz. Herhangi bir ücret veya taahhüt söz konusu değildir.',
  },
  {
    question: 'Dava süreci ne kadar sürer?',
    answer: 'Dava süresi, davanın türüne, mahkemenin iş yoğunluğuna ve davanın karmaşıklığına göre değişir. Basit davalar 3-6 ay içinde sonuçlanabilirken, karmaşık davalar 2-3 yıl sürebilir. İlk görüşmemizde size tahmini bir süre verebiliriz.',
  },
  {
    question: 'Avukatlık ücretleri nasıl belirleniyor?',
    answer: 'Avukatlık ücretlerimiz, Türkiye Barolar Birliği tarifesine uygun olarak belirlenir. Ücretler davanın türüne, karmaşıklığına ve süresine göre değişir. Taksitli ödeme seçenekleri sunuyoruz. Şeffaf bir ücret politikası izliyoruz.',
  },
  {
    question: 'Online görüşme yapabiliyor musunuz?',
    answer: 'Evet, Zoom, Google Meet veya WhatsApp video üzerinden online görüşme yapabiliyoruz. Şehir dışından veya yurt dışından arayın müvekkillerimiz için bu seçenek oldukça kullanışlıdır.',
  },
  {
    question: 'Acil durumlarda size nasıl ulaşabilirim?',
    answer: 'Acil hukuki durumlar için 7/24 ulaşabileceğiniz WhatsApp hattımız mevcuttur: +90 555 726 99 03. Tutuklama, gözaltı gibi acil durumlarda derhal müdahale ediyoruz.',
  },
  {
    question: 'Hangi şehirlerde hizmet veriyorsunuz?',
    answer: 'Ana ofisimiz İstanbul\'dadır, ancak Türkiye\'nin her yerinde dava takibi yapabiliyoruz. Online görüşme imkanı ile yurt dışındaki Türk vatandaşlarına da hizmet veriyoruz.',
  },
];

export default function FAQSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section ref={ref} className="relative py-24 bg-[#faf8f5] pattern-overlay overflow-hidden">
      <div className="relative max-w-4xl mx-auto px-6 z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#d4af37] font-medium tracking-wider uppercase text-sm">
              Sık Sorulan Sorular
            </span>
            <h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0a1628] mt-4 mb-6"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Merak Edilenler
            </h2>
            <div className="divider-gold mx-auto"></div>
            <p className="text-[#0a1628]/70 max-w-2xl mx-auto mt-6">
              En çok sorulan soruların cevaplarını burada bulabilirsiniz. Farklı bir sorunuz 
              varsa bizimle iletişime geçmekten çekinmeyin.
            </p>
          </motion.div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div
                className={`bg-white rounded-xl overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'shadow-lg shadow-[#d4af37]/10' : 'shadow-sm'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left"
                >
                  <h3 
                    className={`font-semibold pr-4 transition-colors ${
                      openIndex === index ? 'text-[#d4af37]' : 'text-[#0a1628]'
                    }`}
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    {faq.question}
                  </h3>
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                      openIndex === index 
                        ? 'bg-[#d4af37] text-[#0a1628]' 
                        : 'bg-[#0a1628]/5 text-[#0a1628]'
                    }`}
                  >
                    {openIndex === index ? <Minus size={18} /> : <Plus size={18} />}
                  </div>
                </button>
                
                <motion.div
                  initial={false}
                  animate={{
                    height: openIndex === index ? 'auto' : 0,
                    opacity: openIndex === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-5 text-[#0a1628]/70 leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-[#0a1628]/60 mb-4">
            Sorunuzun cevabını bulamadınız mı?
          </p>
          <a
            href="/iletisim"
            className="text-[#d4af37] font-semibold hover:underline"
          >
            Bize ulaşın, size yardımcı olalım →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
