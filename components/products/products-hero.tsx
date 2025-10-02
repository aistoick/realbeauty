"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Grid, List } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

interface ProductsHeroProps {
  onSearch?: (query: string) => void
  onViewChange?: (view: "grid" | "list") => void
  currentView?: "grid" | "list"
}

export function ProductsHero({ onSearch, onViewChange, currentView = "grid" }: ProductsHeroProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const { language } = useLanguage()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch?.(searchQuery)
  }

  return (
    <section className="bg-gradient-to-br from-mint-50 via-white to-turquoise-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-serif text-gray-800 mb-6 text-balance">
            {language === "en" && "Our Products"}
            {language === "uz" && "Bizning Mahsulotlarimiz"}
            {language === "ru" && "Наши Товары"}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto text-pretty leading-relaxed">
            {language === "en" &&
              "Discover our carefully curated collection of premium cosmetics, designed to enhance your natural beauty with the finest ingredients and innovative formulations."}
            {language === "uz" &&
              "Eng yaxshi ingredientlar va innovatsion formulalar bilan tabiiy go'zalligingizni oshirish uchun mo'ljallangan premium kosmetika to'plamimizni kashf eting."}
            {language === "ru" &&
              "Откройте для себя нашу тщательно подобранную коллекцию премиальной косметики, созданной для подчеркивания вашей естественной красоты с использованием лучших ингредиентов."}
          </p>
        </div>

        {/* Search and Filter Bar */}
       
      </div>
    </section>
  )
}
