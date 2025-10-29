"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "en" | "ru" | "uz"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    // Navigation
    home: "HOME",
    about: "ABOUT",
    products: "PRODUCTS",
    contact: "CONTACT",
    reviews: "REVIEWS",
    shop: "SHOP",

    // Common
    addToCart: "Add to Cart",
    added: "Added",
    viewAll: "View All Products",
    categories: "Categories",
    allProducts: "All Products",
    productsFound: "products found",
    noProductsFound: "No products found in this category.",
    new: "New",
    bestseller: "Bestseller",

    // ✅ Cart Section
    cart: {
      title: "Shopping Cart",
      empty: "Your cart is empty",
      addSomething: "Add some products to get started",
      continueShopping: "Continue Shopping",
      checkout: "Proceed to Checkout",
      clear: "Clear Cart",
      total: "Total items",
      subtotal: "Subtotal",
      quantity: "Quantity",
      remove: "Remove",
      items: "items",
      singleItem: "item",
    },

    // Hero Section
    heroTitle: "Discover Your Natural Beauty",
    heroSubtitle:
      "Premium cosmetics crafted for the modern woman who values authenticity and quality",
    shopNow: "Shop Now",
  },

  ru: {
    // Navigation
    home: "ГЛАВНАЯ",
    about: "О НАС",
    products: "ПРОДУКТЫ",
    contact: "КОНТАКТЫ",
    reviews: "ОТЗЫВЫ",
    shop: "МАГАЗИН",

    // Common
    addToCart: "В корзину",
    added: "Добавлено",
    viewAll: "Посмотреть все продукты",
    categories: "Категории",
    allProducts: "Все товары",
    productsFound: "товаров найдено",
    noProductsFound: "В этой категории товары не найдены.",
    new: "Новинка",
    bestseller: "Хит продаж",

    // ✅ Cart Section
    cart: {
      title: "Корзина",
      empty: "Ваша корзина пуста",
      addSomething: "Добавьте товары, чтобы начать покупки",
      continueShopping: "Продолжить покупки",
      checkout: "Оформить заказ",
      clear: "Очистить корзину",
      total: "Всего товаров",
      subtotal: "Промежуточный итог",
      quantity: "Количество",
      remove: "Удалить",
      items: "товаров",
      singleItem: "товар",
    },

    // Hero Section
    heroTitle: "Откройте свою естественную красоту",
    heroSubtitle:
      "Премиальная косметика для современной женщины, которая ценит подлинность и качество",
    shopNow: "Купить сейчас",
  },

  uz: {
    // Navigation
    home: "BOSH SAHIFA",
    about: "BIZ HAQIMIZDA",
    products: "MAHSULOTLAR",
    contact: "ALOQA",
    reviews: "SHARHLAR",
    shop: "DO‘KON",

    // Common
    addToCart: "Savatga qo‘shish",
    added: "Qo‘shildi",
    viewAll: "Barcha mahsulotlarni ko‘rish",
    categories: "Kategoriyalar",
    allProducts: "Barcha mahsulotlar",
    productsFound: "mahsulot topildi",
    noProductsFound: "Bu kategoriyada mahsulot topilmadi.",
    new: "Yangi",
    bestseller: "Eng ko‘p sotilgan",

    // ✅ Cart Section
    cart: {
      title: "Savatcha",
      empty: "Savatingiz bo‘sh",
      addSomething: "Xaridni boshlash uchun mahsulot qo‘shing",
      continueShopping: "Xaridni davom ettirish",
      checkout: "Buyurtmani rasmiylashtirish",
      clear: "Savatchani tozalash",
      total: "Jami mahsulotlar",
      subtotal: "Oraliq jami",
      quantity: "Miqdor",
      remove: "O‘chirish",
      items: "ta mahsulot",
      singleItem: "ta mahsulot",
    },

    // Hero Section
    heroTitle: "Tabiiy go‘zalligingizni kashf eting",
    heroSubtitle:
      "Haqiqiylik va sifatni qadrlaydigan zamonaviy ayollar uchun premium kosmetika",
    shopNow: "Hozir xarid qiling",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    const saved = localStorage.getItem("language") as Language
    if (saved && ["en", "ru", "uz"].includes(saved)) setLanguage(saved)
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
  }

  // ✅ Deep-key support (e.g. "cart.title")
  const t = (key: string): string => {
    const parts = key.split(".")
    let value: any = translations[language]
    for (const part of parts) {
      value = value?.[part]
      if (value === undefined) return key
    }
    return typeof value === "string" ? value : key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
