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

    cart: {
      title: "Shopping Cart",
      empty: "Your cart is empty",
      continueShopping: "Continue Shopping",
      checkout: "Checkout",
      clear: "Clear Cart",
      total: "Total",
      subtotal: "Subtotal",
      quantity: "Quantity",
      remove: "Remove",
    },

    // Hero Section
    heroTitle: "Discover Your Natural Beauty",
    heroSubtitle: "Premium cosmetics crafted for the modern woman who values authenticity and quality",
    shopNow: "Shop Now",

    // About
    aboutTitle: "About RealBeauty",
    aboutDescription: "We believe in enhancing your natural beauty with premium, sustainable cosmetics.",

    // Footer
    quickLinks: "Quick Links",
    followUs: "Follow Us",
    newsletter: "Newsletter",
    subscribeText: "Subscribe to get updates on new products",
    subscribe: "Subscribe",

    // Contact
    contactTitle: "Contact Us",
    contactDescription: "Get in touch with our beauty experts",

    // Product Categories
    stemCell: "Stem Cell Line",
    snailTox: "Snail Line / Tox Line",
    lovelyHoney: "Lovely Honey Line",
    gold: "Gold Line",
    peeling: "Peeling Line / Resting Peel",
    protection: "Protection Line (Sun / CC)",
    functional: "Functional Line / Special Care",
    vitaC: "Vita-C Line",
    moisture: "Super Moisture / Aqua Memorize",
    calming: "Calming Line",
    clarity: "Clarity Line",
    acInfusion: "AC Infusion Line",
    ampoule: "Ampoule Line (multi)",
    cleansing: "Cleansing Line",
    ceramide: "Ceramide",
    bodyMassage: "Body / Massage Care",
    maskPack: "Mask Pack Line",
    collagen: "Collagen Line",
    basicMulti: "Basic / Multi Line",
    modelingMask: "Modeling Mask Line",
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

    cart: {
      title: "Корзина",
      empty: "Ваша корзина пуста",
      continueShopping: "Продолжить покупки",
      checkout: "Оформить заказ",
      clear: "Очистить корзину",
      total: "Итого",
      subtotal: "Промежуточный итог",
      quantity: "Количество",
      remove: "Удалить",
    },

    // Hero Section
    heroTitle: "Откройте свою естественную красоту",
    heroSubtitle: "Премиальная косметика для современной женщины, которая ценит подлинность и качество",
    shopNow: "Купить сейчас",

    // About
    aboutTitle: "О RealBeauty",
    aboutDescription:
      "Мы верим в подчеркивание вашей естественной красоты с помощью премиальной, экологичной косметики.",

    // Footer
    quickLinks: "Быстрые ссылки",
    followUs: "Подписывайтесь",
    newsletter: "Рассылка",
    subscribeText: "Подпишитесь на обновления о новых продуктах",
    subscribe: "Подписаться",

    // Contact
    contactTitle: "Свяжитесь с нами",
    contactDescription: "Свяжитесь с нашими экспертами по красоте",

    // Product Categories
    stemCell: "Линия стволовых клеток",
    snailTox: "Линия улитки / Токс",
    lovelyHoney: "Линия прекрасный мед",
    gold: "Золотая линия",
    peeling: "Линия пилинга",
    protection: "Защитная линия",
    functional: "Функциональная линия",
    vitaC: "Линия Вита-С",
    moisture: "Супер увлажнение",
    calming: "Успокаивающая линия",
    clarity: "Линия чистоты",
    acInfusion: "Линия AC инфузия",
    ampoule: "Линия ампул",
    cleansing: "Очищающая линия",
    ceramide: "Керамиды",
    bodyMassage: "Уход за телом / Массаж",
    maskPack: "Линия масок",
    collagen: "Коллагеновая линия",
    basicMulti: "Базовая / Мульти линия",
    modelingMask: "Линия моделирующих масок",
  },
  uz: {
    // Navigation
    home: "BOSH SAHIFA",
    about: "BIZ HAQIMIZDA",
    products: "MAHSULOTLAR",
    contact: "ALOQA",
    reviews: "SHARHLAR",
    shop: "DO'KON",

    // Common
    addToCart: "Savatga qo'shish",
    added: "Qo'shildi",
    viewAll: "Barcha mahsulotlarni ko'rish",
    categories: "Kategoriyalar",
    allProducts: "Barcha mahsulotlar",
    productsFound: "mahsulot topildi",
    noProductsFound: "Bu kategoriyada mahsulot topilmadi.",
    new: "Yangi",
    bestseller: "Eng ko'p sotilgan",

    cart: {
      title: "Xarid savati",
      empty: "Savatingiz bo'sh",
      continueShopping: "Xaridni davom ettirish",
      checkout: "To'lov",
      clear: "Savatni tozalash",
      total: "Jami",
      subtotal: "Oraliq jami",
      quantity: "Miqdor",
      remove: "O'chirish",
    },

    // Hero Section
    heroTitle: "Tabiiy go'zalligingizni kashf eting",
    heroSubtitle: "Haqiqiylik va sifatni qadrlaydigan zamonaviy ayol uchun premium kosmetika",
    shopNow: "Hozir xarid qiling",

    // About
    aboutTitle: "RealBeauty haqida",
    aboutDescription: "Biz sizning tabiiy go'zalligingizni premium, barqaror kosmetika bilan ta'kidlashga ishonamiz.",

    // Footer
    quickLinks: "Tezkor havolalar",
    followUs: "Bizni kuzatib boring",
    newsletter: "Yangiliklar",
    subscribeText: "Yangi mahsulotlar haqida yangilanishlarni olish uchun obuna bo'ling",
    subscribe: "Obuna bo'lish",

    // Contact
    contactTitle: "Biz bilan bog'laning",
    contactDescription: "Go'zallik mutaxassislarimiz bilan bog'laning",

    // Product Categories
    stemCell: "Ildiz hujayra liniyasi",
    snailTox: "Salyangoz / Toks liniyasi",
    lovelyHoney: "Sevimli asal liniyasi",
    gold: "Oltin liniyasi",
    peeling: "Piling liniyasi",
    protection: "Himoya liniyasi",
    functional: "Funktsional liniya",
    vitaC: "Vita-C liniyasi",
    moisture: "Super namlik",
    calming: "Tinchlantiruvchi liniya",
    clarity: "Tiniqlik liniyasi",
    acInfusion: "AC infuziya liniyasi",
    ampoule: "Ampula liniyasi",
    cleansing: "Tozalash liniyasi",
    ceramide: "Seramid",
    bodyMassage: "Tana / Massaj parvarishi",
    maskPack: "Niqob liniyasi",
    collagen: "Kollagen liniyasi",
    basicMulti: "Asosiy / Multi liniya",
    modelingMask: "Modellashtiruvchi niqob liniyasi",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && ["en", "ru", "uz"].includes(savedLanguage)) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
