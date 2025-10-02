"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, ShoppingCart, Check } from "lucide-react"
import Link from "next/link"
import { useCartStore } from "@/hooks/use-cart-store"
import { useLanguage } from "@/hooks/use-language"
import { useState } from "react"

const featuredProducts = [
  {
    id: 1,
    name: "Radiant Glow Foundation",
    image: "/elegant-foundation-bottle-minimalist-white-backgro.jpg",
    category: "Foundation",
  },
  {
    id: 2,
    name: "Butterfly Kiss Lipstick",
    image: "/luxury-lipstick-tube-minimalist-design.jpg",
    category: "Lipstick",
  },
  {
    id: 3,
    name: "Natural Blush Palette",
    image: "/blush-palette-compact-minimalist-packaging.jpg",
    category: "Blush",
  },
  
]

export function FeaturedProducts() {
  const { addItem, items } = useCartStore()
  const { t } = useLanguage()
  const [addedItems, setAddedItems] = useState<Set<number>>(new Set())

  const handleAddToCart = (product: (typeof featuredProducts)[0]) => {
    addItem({
      id: product.id.toString(),
      name: product.name,
      price: 0, // Price set to 0 as requested to remove pricing
      image: product.image,
      quantity: 1,
    })

    setAddedItems((prev) => new Set(prev).add(product.id))
    setTimeout(() => {
      setAddedItems((prev) => {
        const newSet = new Set(prev)
        newSet.delete(product.id)
        return newSet
      })
    }, 2000)
  }

  const isInCart = (productId: number) => {
    return items.some((item) => item.id === productId.toString())
  }

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 sm:mb-6 text-balance">
            Featured Products
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto text-pretty">
            Discover our carefully curated collection of premium cosmetics
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {featuredProducts.map((product, index) => (
            <Card
              key={product.id}
              className="group overflow-hidden border-0 shadow-sm hover:shadow-xl transition-all duration-500 bg-white touch-manipulation"
              style={{
                animationDelay: `${index * 0.1}s`,
                animation: "fadeInUp 0.6s ease-out forwards",
              }}
            >
              <div className="relative overflow-hidden bg-gray-50">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-64 sm:h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-white/90 hover:bg-white text-gray-600 hover:text-red-500 transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 w-10 h-10 sm:w-auto sm:h-auto touch-manipulation"
                >
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
              <CardContent className="p-4 sm:p-6">
                <div className="mb-4">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">{product.category}</span>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mt-1 group-hover:text-gray-600 transition-colors text-balance">
                    {product.name}
                  </h3>
                </div>
                <Button
                  onClick={() => handleAddToCart(product)}
                  disabled={isInCart(product.id)}
                  className={`w-full transition-all duration-300 hover:scale-105 touch-manipulation h-12 sm:h-auto text-base sm:text-sm ${
                    isInCart(product.id)
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : addedItems.has(product.id)
                        ? "bg-green-500 hover:bg-green-600 text-white"
                        : "bg-gray-900 hover:bg-gray-800 text-white"
                  }`}
                >
                  {isInCart(product.id) ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      {t("added")}
                    </>
                  ) : addedItems.has(product.id) ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      {t("added")}
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {t("addToCart")}
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button
            asChild
            variant="outline"
            className="border-gray-300 text-gray-700 hover:bg-gray-50 px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg rounded-full transition-all duration-300 hover:scale-105 bg-transparent touch-manipulation"
          >
            <Link href="/products">{t("viewAll")}</Link>
          </Button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  )
}
