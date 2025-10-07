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
    name: "SUPER MOISTURE CLEANSING",
    image: "/images/products/SUPER_MOISTURE_CLEANSING.jpg",
    category: "SUPER MOISTURE LINE",
  },
  {
    id: 2,
    name: "CICA PERFECT SUNCREAM",
    image: "/images/products/spa.jpg",
    category: "Lipstick",
  },
  {
    id: 3,
    name: "CERAMIDE INTENSIVE E5 CREAM",
    image: "/images/products/meritik.jpg",
    category: "CERAMIDE",
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
      price: 0,
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

  const isInCart = (productId: number) =>
    items.some((item) => item.id === productId.toString())

  return (
    <section className="py-14 sm:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3">
            Featured Products
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto">
            Discover our carefully curated collection of premium cosmetics
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-10">
          {featuredProducts.map((product, index) => (
            <Card
              key={product.id}
              className="group overflow-hidden border-0 shadow-sm hover:shadow-md transition-all duration-500 bg-white h-full flex flex-col rounded-xl"
              style={{
                animationDelay: `${index * 0.1}s`,
                animation: "fadeInUp 0.5s ease-out forwards",
              }}
            >
              {/* ✅ SMALLER IMAGE CONTAINER */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-50">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 bg-white/90 hover:bg-white text-gray-600 hover:text-red-500 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 w-9 h-9 sm:w-10 sm:h-10"
                >
                  <Heart className="h-4 w-4" />
                </Button>
              </div>

              {/* CONTENT */}
              <CardContent className="p-4 sm:p-5 flex flex-col flex-grow">
                <div className="mb-3">
                  <span className="text-[11px] font-medium text-gray-500 uppercase tracking-wider">
                    {product.category}
                  </span>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 mt-1 group-hover:text-gray-600 transition-colors leading-tight">
                    {product.name}
                  </h3>
                </div>

                <Button
                  onClick={() => handleAddToCart(product)}
                  disabled={isInCart(product.id)}
                  className={`mt-auto w-full transition-all duration-300 hover:scale-105 h-10 sm:h-11 text-sm sm:text-[15px] rounded-full font-medium ${
                    isInCart(product.id)
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : addedItems.has(product.id)
                      ? "bg-green-500 hover:bg-green-600 text-white"
                      : "bg-gray-900 hover:bg-gray-800 text-white"
                  }`}
                >
                  {isInCart(product.id) || addedItems.has(product.id) ? (
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

        {/* VIEW ALL */}
        <div className="text-center">
          <Button
            asChild
            variant="outline"
            className="border-gray-300 text-gray-700 hover:bg-gray-50 px-5 sm:px-7 py-3 sm:py-4 text-sm sm:text-base rounded-full transition-all duration-300 hover:scale-105"
          >
            <Link href="/products">{t("viewAll")}</Link>
          </Button>
        </div>
      </div>

      {/* ANIMATION */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(25px);
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
