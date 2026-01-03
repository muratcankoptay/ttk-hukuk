import Link from 'next/link';
import { Scale, Phone, Mail, MapPin, Clock, ChevronRight, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const footerLinks = {
  hizmetler: [
    { label: 'Ceza Hukuku', href: '/hizmetlerimiz#ceza' },
    { label: 'Ticaret Hukuku', href: '/hizmetlerimiz#ticaret' },
    { label: 'Aile Hukuku', href: '/hizmetlerimiz#aile' },
    { label: 'İş Hukuku', href: '/hizmetlerimiz#is' },
    { label: 'Gayrimenkul Hukuku', href: '/hizmetlerimiz#gayrimenkul' },
  ],
  hizli: [
    { label: 'Hakkımızda', href: '/hakkimizda' },
    { label: 'Makaleler', href: '/makaleler' },
    { label: 'SSS', href: '/sss' },
    { label: 'İletişim', href: '/iletisim' },
    { label: 'Gizlilik Politikası', href: '/gizlilik' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#0a1628] text-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"></div>
      <div className="absolute top-20 right-10 w-64 h-64 bg-[#d4af37]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#d4af37]/3 rounded-full blur-3xl"></div>
      
      {/* CTA Section */}
      <div className="relative border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="bg-gradient-to-r from-[#1a2744] to-[#243352] rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                Hukuki Desteğe mi İhtiyacınız Var?
              </h3>
              <p className="text-white/70">
                Ücretsiz ön görüşme için hemen bizimle iletişime geçin.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/iletisim"
                className="btn-gold whitespace-nowrap"
              >
                Randevu Al
              </Link>
              <a
                href="tel:+905557269903"
                className="btn-outline whitespace-nowrap text-white border-white hover:bg-white hover:text-[#0a1628]"
              >
                +90 555 726 99 03
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-[#d4af37] to-[#f0d77a] rounded-lg flex items-center justify-center">
                <Scale className="w-7 h-7 text-[#0a1628]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                  TTK HUKUK
                </span>
                <span className="text-[10px] text-[#d4af37] font-medium tracking-[0.2em] uppercase">
                  Hukuk Bürosu
                </span>
              </div>
            </Link>
            <p className="text-white/60 mb-6 leading-relaxed">
              Av. Tarih Talha Kahraman önderliğinde, müvekkillerimize en yüksek standartlarda hukuki danışmanlık ve avukatlık hizmeti sunuyoruz.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#d4af37] hover:text-[#0a1628] transition-all duration-300"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-[#d4af37]"></span>
              Hizmetlerimiz
            </h4>
            <ul className="space-y-3">
              {footerLinks.hizmetler.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-[#d4af37] transition-colors flex items-center gap-2 group"
                  >
                    <ChevronRight size={14} className="text-[#d4af37] opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-[#d4af37]"></span>
              Hızlı Erişim
            </h4>
            <ul className="space-y-3">
              {footerLinks.hizli.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-[#d4af37] transition-colors flex items-center gap-2 group"
                  >
                    <ChevronRight size={14} className="text-[#d4af37] opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-[#d4af37]"></span>
              İletişim
            </h4>
            <ul className="space-y-4">
              <li>
                <a href="tel:+905557269903" className="flex items-start gap-3 text-white/60 hover:text-[#d4af37] transition-colors">
                  <Phone size={18} className="text-[#d4af37] mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-white">+90 555 726 99 03</div>
                    <div className="text-sm">Acil durumlar için 7/24</div>
                  </div>
                </a>
              </li>
              <li>
                <a href="mailto:info@ttkhukuk.com" className="flex items-start gap-3 text-white/60 hover:text-[#d4af37] transition-colors">
                  <Mail size={18} className="text-[#d4af37] mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-white">info@ttkhukuk.com</div>
                    <div className="text-sm">7/24 e-posta desteği</div>
                  </div>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-white/60">
                  <MapPin size={18} className="text-[#d4af37] mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-white">Adres</div>
                    <div className="text-sm">Merkez Mah. Adalet Cad. No:123<br />Kat:5 Daire:10, İstanbul</div>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex items-start gap-3 text-white/60">
                  <Clock size={18} className="text-[#d4af37] mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-white">Çalışma Saatleri</div>
                    <div className="text-sm">Pzt - Cum: 09:00 - 18:00<br />Cmt: 10:00 - 14:00</div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/50">
            <p>
              © {new Date().getFullYear()} TTK Hukuk Bürosu. Tüm hakları saklıdır.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/gizlilik" className="hover:text-[#d4af37] transition-colors">
                Gizlilik Politikası
              </Link>
              <Link href="/kvkk" className="hover:text-[#d4af37] transition-colors">
                KVKK Aydınlatma
              </Link>
              <Link href="/cerez" className="hover:text-[#d4af37] transition-colors">
                Çerez Politikası
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
