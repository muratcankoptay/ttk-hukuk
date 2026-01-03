import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ekibimiz',
  description: 'TTK Hukuk Bürosu avukat kadrosu. Av. Tahir Talha Kahraman ve deneyimli ekibimiz hakkında bilgi edinin. Ceza, ticaret, aile ve iş hukuku uzmanları.',
  openGraph: {
    title: 'Ekibimiz | TTK Hukuk Bürosu',
    description: 'Alanında uzman avukatlarımızla tanışın.',
  },
};

export default function EkibimizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
