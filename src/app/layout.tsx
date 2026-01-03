import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppWrapper from "@/components/WhatsAppWrapper";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ttkhukuk.com"),
  title: {
    default: "TTK Hukuk Bürosu | Av. Tahir Talha Kahraman | İstanbul Avukat",
    template: "%s | TTK Hukuk Bürosu",
  },
  description:
    "TTK Hukuk Bürosu - Av. Tahir Talha Kahraman önderliğinde ceza, ticaret, aile ve iş hukuku alanlarında 15+ yıllık deneyimle profesyonel hukuki danışmanlık. İstanbul'da güvenilir avukatlık hizmeti.",
  keywords: [
    "istanbul avukat",
    "hukuk bürosu",
    "ceza avukatı",
    "boşanma avukatı",
    "ticaret hukuku",
    "iş hukuku avukatı",
    "TTK Hukuk",
    "Tahir Talha Kahraman",
    "avukatlık",
    "hukuki danışmanlık",
  ],
  authors: [{ name: "Av. Tahir Talha Kahraman" }],
  creator: "TTK Hukuk Bürosu",
  publisher: "TTK Hukuk Bürosu",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://ttkhukuk.com",
    siteName: "TTK Hukuk Bürosu",
    title: "TTK Hukuk Bürosu | Av. Tahir Talha Kahraman",
    description:
      "15+ yıllık deneyimle ceza, ticaret, aile ve iş hukuku alanlarında profesyonel avukatlık hizmeti. Ücretsiz ön görüşme için hemen arayın.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "TTK Hukuk Bürosu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TTK Hukuk Bürosu | Av. Tahir Talha Kahraman",
    description:
      "15+ yıllık deneyimle profesyonel avukatlık hizmeti. Ücretsiz ön görüşme için hemen arayın.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
  },
  alternates: {
    canonical: "https://ttkhukuk.com",
  },
};

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  name: "TTK Hukuk Bürosu",
  alternateName: "Av. Tahir Talha Kahraman Hukuk Bürosu",
  description:
    "Ceza, ticaret, aile ve iş hukuku alanlarında profesyonel avukatlık ve hukuki danışmanlık hizmeti.",
  url: "https://ttkhukuk.com",
  logo: "https://ttkhukuk.com/logo.png",
  image: "https://ttkhukuk.com/og-image.jpg",
  telephone: "+905557269903",
  email: "info@ttkhukuk.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Merkez Mah. Adalet Cad. No:123 Kat:5 Daire:10",
    addressLocality: "İstanbul",
    addressRegion: "İstanbul",
    postalCode: "34000",
    addressCountry: "TR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "41.0082",
    longitude: "28.9784",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "10:00",
      closes: "14:00",
    },
  ],
  priceRange: "$$",
  areaServed: {
    "@type": "Country",
    name: "Türkiye",
  },
  founder: {
    "@type": "Person",
    name: "Av. Tahir Talha Kahraman",
    jobTitle: "Kurucu Avukat",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "150",
    bestRating: "5",
    worstRating: "1",
  },
  sameAs: [
    "https://facebook.com/ttkhukuk",
    "https://twitter.com/ttkhukuk",
    "https://linkedin.com/company/ttkhukuk",
    "https://instagram.com/ttkhukuk",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        
        {/* Favicon and PWA */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0a1628" />
        <meta name="color-scheme" content="light dark" />
        
        {/* Performance hints */}
        <meta httpEquiv="x-dns-prefetch-control" content="on" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppWrapper />
      </body>
    </html>
  );
}
