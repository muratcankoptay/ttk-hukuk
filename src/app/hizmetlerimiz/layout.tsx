import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hizmetlerimiz',
  description: 'TTK Hukuk Bürosu hizmetleri: Ceza Hukuku, Ticaret Hukuku, Aile Hukuku, İş Hukuku, Gayrimenkul Hukuku, İcra ve İflas Hukuku alanlarında profesyonel avukatlık hizmeti.',
  openGraph: {
    title: 'Hizmetlerimiz | TTK Hukuk Bürosu',
    description: 'Geniş yelpazede sunduğumuz hukuki hizmetlerimizle her türlü hukuki sorununuzda yanınızdayız.',
  },
};

export default function HizmetlerimizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
