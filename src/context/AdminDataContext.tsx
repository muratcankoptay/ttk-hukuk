'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { 
  Article, 
  Category, 
  SiteSettings, 
  DEMO_ARTICLES, 
  DEMO_CATEGORIES, 
  DEMO_SETTINGS 
} from '@/types/admin'

interface AdminDataContextType {
  // Makaleler
  articles: Article[]
  getArticle: (id: string) => Article | undefined
  createArticle: (article: Omit<Article, 'id' | 'createdAt' | 'updatedAt' | 'views'>) => Article
  updateArticle: (id: string, updates: Partial<Article>) => void
  deleteArticle: (id: string) => void
  publishArticle: (id: string) => void
  unpublishArticle: (id: string) => void
  
  // Kategoriler
  categories: Category[]
  createCategory: (category: Omit<Category, 'id' | 'articleCount'>) => void
  updateCategory: (id: string, updates: Partial<Category>) => void
  deleteCategory: (id: string) => void
  
  // Site Ayarları
  settings: SiteSettings
  updateSettings: (updates: Partial<SiteSettings>) => void
  
  // Aktiviteler
  activities: Activity[]
  addActivity: (type: Activity['type'], description: string) => void
}

interface Activity {
  id: string
  type: 'article_created' | 'article_updated' | 'article_published' | 'article_deleted' | 'settings_updated' | 'category_created'
  description: string
  timestamp: string
}

const AdminDataContext = createContext<AdminDataContextType | null>(null)

export function AdminDataProvider({ children }: { children: ReactNode }) {
  const [articles, setArticles] = useState<Article[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [settings, setSettings] = useState<SiteSettings>(DEMO_SETTINGS)
  const [activities, setActivities] = useState<Activity[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // LocalStorage'dan verileri yükle
  useEffect(() => {
    const savedArticles = localStorage.getItem('admin_articles')
    const savedCategories = localStorage.getItem('admin_categories')
    const savedSettings = localStorage.getItem('admin_settings')
    const savedActivities = localStorage.getItem('admin_activities')

    setArticles(savedArticles ? JSON.parse(savedArticles) : DEMO_ARTICLES)
    setCategories(savedCategories ? JSON.parse(savedCategories) : DEMO_CATEGORIES)
    setSettings(savedSettings ? JSON.parse(savedSettings) : DEMO_SETTINGS)
    setActivities(savedActivities ? JSON.parse(savedActivities) : [])
    setIsLoaded(true)
  }, [])

  // Verileri LocalStorage'a kaydet
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('admin_articles', JSON.stringify(articles))
    }
  }, [articles, isLoaded])

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('admin_categories', JSON.stringify(categories))
    }
  }, [categories, isLoaded])

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('admin_settings', JSON.stringify(settings))
    }
  }, [settings, isLoaded])

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('admin_activities', JSON.stringify(activities))
    }
  }, [activities, isLoaded])

  // Aktivite ekleme
  const addActivity = (type: Activity['type'], description: string) => {
    const newActivity: Activity = {
      id: Date.now().toString(),
      type,
      description,
      timestamp: new Date().toISOString()
    }
    setActivities(prev => [newActivity, ...prev].slice(0, 50)) // Son 50 aktivite
  }

  // Makale işlemleri
  const getArticle = (id: string) => articles.find(a => a.id === id)

  const createArticle = (articleData: Omit<Article, 'id' | 'createdAt' | 'updatedAt' | 'views'>): Article => {
    const newArticle: Article = {
      ...articleData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      views: 0
    }
    setArticles(prev => [newArticle, ...prev])
    addActivity('article_created', `"${articleData.title}" makalesi oluşturuldu`)
    return newArticle
  }

  const updateArticle = (id: string, updates: Partial<Article>) => {
    setArticles(prev => prev.map(article => 
      article.id === id 
        ? { ...article, ...updates, updatedAt: new Date().toISOString() }
        : article
    ))
    const article = articles.find(a => a.id === id)
    if (article) {
      addActivity('article_updated', `"${article.title}" makalesi güncellendi`)
    }
  }

  const deleteArticle = (id: string) => {
    const article = articles.find(a => a.id === id)
    setArticles(prev => prev.filter(a => a.id !== id))
    if (article) {
      addActivity('article_deleted', `"${article.title}" makalesi silindi`)
    }
  }

  const publishArticle = (id: string) => {
    setArticles(prev => prev.map(article =>
      article.id === id
        ? { ...article, status: 'published' as const, publishedAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
        : article
    ))
    const article = articles.find(a => a.id === id)
    if (article) {
      addActivity('article_published', `"${article.title}" makalesi yayınlandı`)
    }
  }

  const unpublishArticle = (id: string) => {
    setArticles(prev => prev.map(article =>
      article.id === id
        ? { ...article, status: 'draft' as const, updatedAt: new Date().toISOString() }
        : article
    ))
  }

  // Kategori işlemleri
  const createCategory = (categoryData: Omit<Category, 'id' | 'articleCount'>) => {
    const newCategory: Category = {
      ...categoryData,
      id: Date.now().toString(),
      articleCount: 0
    }
    setCategories(prev => [...prev, newCategory])
    addActivity('category_created', `"${categoryData.name}" kategorisi oluşturuldu`)
  }

  const updateCategory = (id: string, updates: Partial<Category>) => {
    setCategories(prev => prev.map(cat =>
      cat.id === id ? { ...cat, ...updates } : cat
    ))
  }

  const deleteCategory = (id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id))
  }

  // Ayar işlemleri
  const updateSettings = (updates: Partial<SiteSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }))
    addActivity('settings_updated', 'Site ayarları güncellendi')
  }

  return (
    <AdminDataContext.Provider value={{
      articles,
      getArticle,
      createArticle,
      updateArticle,
      deleteArticle,
      publishArticle,
      unpublishArticle,
      categories,
      createCategory,
      updateCategory,
      deleteCategory,
      settings,
      updateSettings,
      activities,
      addActivity
    }}>
      {children}
    </AdminDataContext.Provider>
  )
}

export function useAdminData() {
  const context = useContext(AdminDataContext)
  if (!context) {
    throw new Error('useAdminData must be used within an AdminDataProvider')
  }
  return context
}
