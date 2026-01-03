'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, CheckCircle } from 'lucide-react';

const contactInfo = [
  {
    icon: Phone,
    title: 'Telefon',
    content: '+90 555 123 45 67',
    subContent: 'Acil durumlar için 7/24',
    href: 'tel:+905551234567',
  },
  {
    icon: Mail,
    title: 'E-posta',
    content: 'info@ttkhukuk.com',
    subContent: 'En kısa sürede dönüş',
    href: 'mailto:info@ttkhukuk.com',
  },
  {
    icon: MapPin,
    title: 'Adres',
    content: 'Merkez Mah. Adalet Cad. No:123',
    subContent: 'Kat:5 Daire:10, İstanbul',
    href: 'https://maps.google.com',
  },
  {
    icon: Clock,
    title: 'Çalışma Saatleri',
    content: 'Pzt - Cum: 09:00 - 18:00',
    subContent: 'Cmt: 10:00 - 14:00',
    href: null,
  },
];

export default function IletisimPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
    kvkk: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simüle edilmiş form gönderimi
    setIsSubmitted(true);
  };

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
              İletişim
            </span>
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 mb-6"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Bizimle
              <span className="block text-gradient-gold">İletişime Geçin</span>
            </h1>
            <p className="text-white/70 max-w-2xl mx-auto text-lg">
              Hukuki sorularınız için ücretsiz ön görüşme randevusu alın. 
              Size en kısa sürede dönüş yapalım.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-1"
            >
              <h2 
                className="text-2xl font-bold text-[#0a1628] mb-6"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                İletişim Bilgileri
              </h2>
              <p className="text-[#0a1628]/70 mb-8">
                Hukuki danışmanlık için aşağıdaki kanallardan bize ulaşabilirsiniz. 
                İlk görüşmemiz ücretsizdir.
              </p>

              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="flex items-start gap-4 p-4 rounded-xl bg-[#faf8f5] hover:bg-[#d4af37]/10 transition-colors group"
                      >
                        <div className="w-12 h-12 bg-gradient-to-br from-[#d4af37] to-[#f0d77a] rounded-lg flex items-center justify-center flex-shrink-0">
                          <item.icon className="w-6 h-6 text-[#0a1628]" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-[#0a1628] group-hover:text-[#d4af37] transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-[#0a1628]/70">{item.content}</p>
                          <p className="text-sm text-[#0a1628]/50">{item.subContent}</p>
                        </div>
                      </a>
                    ) : (
                      <div className="flex items-start gap-4 p-4 rounded-xl bg-[#faf8f5]">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#d4af37] to-[#f0d77a] rounded-lg flex items-center justify-center flex-shrink-0">
                          <item.icon className="w-6 h-6 text-[#0a1628]" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-[#0a1628]">{item.title}</h3>
                          <p className="text-[#0a1628]/70">{item.content}</p>
                          <p className="text-sm text-[#0a1628]/50">{item.subContent}</p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* WhatsApp Button */}
              <motion.a
                href="https://wa.me/905557269903"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8 flex items-center justify-center gap-3 w-full py-4 bg-[#25D366] text-white rounded-xl font-semibold hover:bg-[#1da851] transition-colors"
              >
                <MessageCircle className="w-6 h-6" />
                WhatsApp ile Yazın
              </motion.a>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-2"
            >
              <div className="bg-[#faf8f5] rounded-2xl p-8 md:p-12">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-10 h-10 text-green-500" />
                    </div>
                    <h3 
                      className="text-2xl font-bold text-[#0a1628] mb-4"
                      style={{ fontFamily: 'Playfair Display, serif' }}
                    >
                      Mesajınız Alındı!
                    </h3>
                    <p className="text-[#0a1628]/70 mb-6">
                      En kısa sürede size dönüş yapacağız. Teşekkür ederiz.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="text-[#d4af37] font-semibold hover:underline"
                    >
                      Yeni mesaj gönder
                    </button>
                  </motion.div>
                ) : (
                  <>
                    <h2 
                      className="text-2xl font-bold text-[#0a1628] mb-2"
                      style={{ fontFamily: 'Playfair Display, serif' }}
                    >
                      Ücretsiz Ön Görüşme
                    </h2>
                    <p className="text-[#0a1628]/60 mb-8">
                      Formu doldurun, 24 saat içinde size dönüş yapalım.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-[#0a1628] mb-2">
                            Adınız Soyadınız *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="form-input"
                            placeholder="Adınız Soyadınız"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#0a1628] mb-2">
                            Telefon *
                          </label>
                          <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="form-input"
                            placeholder="0555 726 99 03"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#0a1628] mb-2">
                          E-posta *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="form-input"
                          placeholder="ornek@email.com"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#0a1628] mb-2">
                          Konu *
                        </label>
                        <select
                          required
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="form-input"
                        >
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
                          Mesajınız *
                        </label>
                        <textarea
                          required
                          rows={5}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="form-input resize-none"
                          placeholder="Hukuki durumunuzu kısaca açıklayın..."
                        ></textarea>
                      </div>

                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          id="kvkk"
                          required
                          checked={formData.kvkk}
                          onChange={(e) => setFormData({ ...formData, kvkk: e.target.checked })}
                          className="mt-1 w-5 h-5 text-[#d4af37] border-gray-300 rounded focus:ring-[#d4af37]"
                        />
                        <label htmlFor="kvkk" className="text-sm text-[#0a1628]/60">
                          <Link href="/kvkk" className="text-[#d4af37] hover:underline">
                            KVKK Aydınlatma Metni
                          </Link>
                          &apos;ni okudum ve kişisel verilerimin işlenmesini kabul ediyorum. *
                        </label>
                      </div>

                      <button
                        type="submit"
                        className="btn-gold w-full flex items-center justify-center gap-2 group"
                      >
                        <Send size={18} />
                        Mesaj Gönder
                      </button>
                    </form>

                    <p className="text-center text-sm text-[#0a1628]/50 mt-6">
                      🔒 Bilgileriniz gizli tutulur ve üçüncü şahıslarla paylaşılmaz.
                    </p>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-24 bg-[#faf8f5]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 
              className="text-3xl font-bold text-[#0a1628]"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Ofisimizi Ziyaret Edin
            </h2>
            <p className="text-[#0a1628]/70 mt-2">
              Merkez Mah. Adalet Cad. No:123 Kat:5 Daire:10, İstanbul
            </p>
          </div>

          <div className="aspect-[21/9] bg-[#0a1628] rounded-2xl overflow-hidden">
            {/* Placeholder for map - in production, use Google Maps embed */}
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-[#d4af37] mx-auto mb-4" />
                <p className="text-white/60">Harita burada görüntülenecek</p>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 text-[#d4af37] font-semibold hover:underline"
                >
                  Google Maps&apos;te Aç →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
