import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hukuki Hesaplama Araçları | TTK Hukuk Bürosu',
  description: 'Kıdem tazminatı, ihbar tazminatı, nafaka, kira artışı, trafik kazası tazminatı ve yasal faiz hesaplama araçları. Ücretsiz online hukuki hesaplama.',
  keywords: [
    'kıdem tazminatı hesaplama',
    'ihbar tazminatı hesaplama',
    'nafaka hesaplama',
    'kira artışı hesaplama',
    'trafik kazası tazminatı',
    'yasal faiz hesaplama',
    'hukuki hesaplama araçları',
    'avukat hesaplama',
    'tazminat hesaplama',
  ],
  openGraph: {
    title: 'Hukuki Hesaplama Araçları | TTK Hukuk Bürosu',
    description: 'Kıdem tazminatı, nafaka, kira artışı ve daha fazlası için ücretsiz hesaplama araçları.',
    url: 'https://ttkhukuk.com/hesaplama-araclari',
    type: 'website',
  },
};

export default function HesaplamaAraclariLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
