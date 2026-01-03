import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hakkımızda',
  description: 'TTK Hukuk Bürosu - Av. Tahir Talha Kahraman hakkında bilgi edinin. 15+ yıllık deneyim ve güvenilir hukuki danışmanlık.',
  openGraph: {
    title: 'Hakkımızda | TTK Hukuk Bürosu',
    description: 'Av. Tahir Talha Kahraman ve TTK Hukuk ekibi hakkında detaylı bilgi.',
  },
};

export default function HakkimizdaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
