import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ttkhukuk.com';

  // Ana sayfalar
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/hakkimizda`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/hizmetlerimiz`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/makaleler`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/iletisim`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ];

  // Hizmet sayfaları
  const services = [
    'ceza-hukuku',
    'ticaret-hukuku',
    'aile-hukuku',
    'is-hukuku',
    'gayrimenkul-hukuku',
    'icra-iflas-hukuku',
  ];

  const servicePages = services.map((service) => ({
    url: `${baseUrl}/hizmetlerimiz/${service}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Makale sayfaları
  const articles = [
    'bosanma-davalarinda-mal-paylasimi',
    'is-kazasi-tazminati-hesaplama',
    'sirket-kurulusu-rehberi',
    'kidem-tazminati-haklari',
    'ceza-davasinda-savunma-haklari',
    'kira-sozlesmesi-feshi',
  ];

  const articlePages = articles.map((article) => ({
    url: `${baseUrl}/makaleler/${article}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...servicePages, ...articlePages];
}
