// Makale tipi
export interface Article {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage: string
  category: string
  tags: string[]
  author: string
  status: 'draft' | 'published' | 'archived'
  publishedAt: string | null
  createdAt: string
  updatedAt: string
  views: number
  seo: {
    metaTitle: string
    metaDescription: string
    keywords: string[]
  }
}

// Kategori tipi
export interface Category {
  id: string
  name: string
  slug: string
  description: string
  articleCount: number
}

// Site ayarları tipi
export interface SiteSettings {
  siteName: string
  siteDescription: string
  contactEmail: string
  contactPhone: string
  address: string
  workingHours: string
  socialMedia: {
    facebook: string
    twitter: string
    instagram: string
    linkedin: string
    youtube: string
  }
  seo: {
    defaultMetaTitle: string
    defaultMetaDescription: string
    googleAnalyticsId: string
  }
}

// Dashboard istatistikleri
export interface DashboardStats {
  totalArticles: number
  publishedArticles: number
  draftArticles: number
  totalViews: number
  monthlyViews: number
  topArticles: { title: string; views: number; slug: string }[]
  recentActivities: {
    id: string
    type: 'article_created' | 'article_updated' | 'article_published' | 'settings_updated'
    description: string
    timestamp: string
  }[]
}

// Demo veriler
export const DEMO_CATEGORIES: Category[] = [
  { id: '1', name: 'Ceza Hukuku', slug: 'ceza-hukuku', description: 'Ceza hukuku ile ilgili makaleler', articleCount: 5 },
  { id: '2', name: 'Aile Hukuku', slug: 'aile-hukuku', description: 'Aile hukuku ile ilgili makaleler', articleCount: 3 },
  { id: '3', name: 'İş Hukuku', slug: 'is-hukuku', description: 'İş hukuku ile ilgili makaleler', articleCount: 4 },
  { id: '4', name: 'Ticaret Hukuku', slug: 'ticaret-hukuku', description: 'Ticaret hukuku ile ilgili makaleler', articleCount: 2 },
  { id: '5', name: 'Trafik Hukuku', slug: 'trafik-hukuku', description: 'Trafik hukuku ile ilgili makaleler', articleCount: 3 },
  { id: '6', name: 'Gayrimenkul Hukuku', slug: 'gayrimenkul-hukuku', description: 'Gayrimenkul hukuku ile ilgili makaleler', articleCount: 2 },
]

export const DEMO_ARTICLES: Article[] = [
  {
    id: '1',
    title: 'Boşanma Davası Süreci ve Dikkat Edilmesi Gerekenler',
    slug: 'bosanma-davasi-sureci',
    excerpt: 'Boşanma davası açmadan önce bilmeniz gereken tüm detaylar ve süreç hakkında kapsamlı rehber.',
    content: `<h2>Boşanma Davası Nedir?</h2><p>Boşanma davası, evlilik birliğinin hukuki olarak sona erdirilmesi için açılan davadır...</p>`,
    coverImage: '/images/articles/bosanma.jpg',
    category: 'Aile Hukuku',
    tags: ['boşanma', 'aile hukuku', 'velayet', 'nafaka'],
    author: 'Av. Tahir Talha Kahraman',
    status: 'published',
    publishedAt: '2025-12-15T10:00:00Z',
    createdAt: '2025-12-10T08:00:00Z',
    updatedAt: '2025-12-15T10:00:00Z',
    views: 1250,
    seo: {
      metaTitle: 'Boşanma Davası Süreci | TTK Hukuk',
      metaDescription: 'Boşanma davası açmadan önce bilmeniz gereken tüm detaylar.',
      keywords: ['boşanma davası', 'boşanma avukatı', 'istanbul boşanma']
    }
  },
  {
    id: '2',
    title: 'İş Kazası Tazminatı Nasıl Hesaplanır?',
    slug: 'is-kazasi-tazminati-hesaplama',
    excerpt: 'İş kazası sonucu hak edilen tazminatların hesaplanması ve dava süreci hakkında detaylı bilgiler.',
    content: `<h2>İş Kazası Tazminatı</h2><p>İş kazası geçiren işçiler, işverenden maddi ve manevi tazminat talep edebilir...</p>`,
    coverImage: '/images/articles/is-kazasi.jpg',
    category: 'İş Hukuku',
    tags: ['iş kazası', 'tazminat', 'işçi hakları'],
    author: 'Av. Tahir Talha Kahraman',
    status: 'published',
    publishedAt: '2025-12-20T14:00:00Z',
    createdAt: '2025-12-18T09:00:00Z',
    updatedAt: '2025-12-20T14:00:00Z',
    views: 890,
    seo: {
      metaTitle: 'İş Kazası Tazminatı Hesaplama | TTK Hukuk',
      metaDescription: 'İş kazası tazminatı nasıl hesaplanır? Detaylı rehber.',
      keywords: ['iş kazası', 'tazminat hesaplama', 'işçi hakları']
    }
  },
  {
    id: '3',
    title: 'Kıdem Tazminatı Hakkında Bilmeniz Gerekenler',
    slug: 'kidem-tazminati-rehberi',
    excerpt: 'Kıdem tazminatı şartları, hesaplaması ve dava süreci hakkında kapsamlı rehber.',
    content: `<h2>Kıdem Tazminatı Nedir?</h2><p>Kıdem tazminatı, belirli şartları sağlayan işçilere ödenen bir tazminat türüdür...</p>`,
    coverImage: '/images/articles/kidem.jpg',
    category: 'İş Hukuku',
    tags: ['kıdem tazminatı', 'işçi hakları', 'iş hukuku'],
    author: 'Av. Tahir Talha Kahraman',
    status: 'draft',
    publishedAt: null,
    createdAt: '2025-12-28T11:00:00Z',
    updatedAt: '2025-12-28T11:00:00Z',
    views: 0,
    seo: {
      metaTitle: 'Kıdem Tazminatı Rehberi | TTK Hukuk',
      metaDescription: 'Kıdem tazminatı hakkında bilmeniz gereken her şey.',
      keywords: ['kıdem tazminatı', 'işten çıkma', 'tazminat hesaplama']
    }
  }
]

export const DEMO_SETTINGS: SiteSettings = {
  siteName: 'TTK Hukuk Bürosu',
  siteDescription: 'Av. Tahir Talha Kahraman önderliğinde profesyonel hukuki danışmanlık',
  contactEmail: 'info@ttkhukuk.com',
  contactPhone: '+90 555 726 99 03',
  address: 'Levent, İstanbul',
  workingHours: 'Pazartesi - Cuma: 09:00 - 18:00',
  socialMedia: {
    facebook: 'https://facebook.com/ttkhukuk',
    twitter: 'https://twitter.com/ttkhukuk',
    instagram: 'https://instagram.com/ttkhukuk',
    linkedin: 'https://linkedin.com/company/ttkhukuk',
    youtube: ''
  },
  seo: {
    defaultMetaTitle: 'TTK Hukuk Bürosu | İstanbul Avukat',
    defaultMetaDescription: 'Profesyonel hukuki danışmanlık hizmetleri',
    googleAnalyticsId: 'G-XXXXXXXXXX'
  }
}
