import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'İletişim',
  description: 'TTK Hukuk Bürosu iletişim bilgileri. Ücretsiz ön görüşme için hemen arayın veya form doldurun. Adres: İstanbul. Tel: +90 555 726 99 03',
  openGraph: {
    title: 'İletişim | TTK Hukuk Bürosu',
    description: 'Ücretsiz ön görüşme için bizimle iletişime geçin. 7/24 WhatsApp desteği.',
  },
};

export default function IletisimLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}