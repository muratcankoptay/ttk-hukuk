import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Makaleler',
  description: 'TTK Hukuk Bürosu blog ve makaleleri. Ceza, aile, iş, ticaret ve gayrimenkul hukuku hakkında güncel bilgiler, haklarınız ve dava süreçleri.',
  openGraph: {
    title: 'Makaleler | TTK Hukuk Bürosu',
    description: 'Hukuki konularda bilgilendirici makaleler ve güncel gelişmeler.',
  },
};

export default function MakalelerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}