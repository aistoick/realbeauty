"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Heart, Star } from "lucide-react"
import Image from "next/image"

const products = [
  {
    id: 1,
    name: "Radiant Glow Foundation",
    category: "foundation",
    rating: 4.8,
    reviews: 124,
    image: "/luxury-foundation-bottle-cosmetic.jpg",
    description: "Full coverage foundation with a natural, radiant finish",
    isNew: true,
    isBestseller: false,
  },
  {
    id: 2,
    name: "Velvet Matte Lipstick",
    category: "lipstick",
    rating: 4.9,
    reviews: 89,
    image: "/elegant-lipstick-tube-cosmetic.jpg",
    description: "Long-lasting matte lipstick with intense color payoff",
    isNew: false,
    isBestseller: true,
  },
  {
    id: 3,
    name: "Butterfly Blush Palette",
    category: "blush",
    rating: 4.7,
    reviews: 67,
    image: "/blush-palette-cosmetic-makeup.jpg",
    description: "Multi-shade blush palette for a natural flush",
    isNew: false,
    isBestseller: false,
  },
  {
    id: 4,
    name: "Luminous Liquid Foundation",
    category: "foundation",
    rating: 4.6,
    reviews: 156,
    image: "/luxury-foundation-bottle-cosmetic.jpg",
    description: "Lightweight foundation with buildable coverage",
    isNew: false,
    isBestseller: true,
  },
  {
    id: 5,
    name: "Silk Finish Lipstick",
    category: "lipstick",
    rating: 4.8,
    reviews: 98,
    image: "/elegant-lipstick-tube-cosmetic.jpg",
    description: "Creamy lipstick with a silk-like finish",
    isNew: true,
    isBestseller: false,
  },
  {
    id: 6,
    name: "Sunset Eyeshadow Palette",
    category: "eyeshadow",
    rating: 4.9,
    reviews: 203,
    image: "/blush-palette-cosmetic-makeup.jpg",
    description: "12-shade eyeshadow palette with warm tones",
    isNew: false,
    isBestseller: true,
  },
]

export function ProductGrid() {
  const [favorites, setFavorites] = useState<number[]>([])
  const [cart, setCart] = useState<number[]>([])

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  const addToCart = (productId: number) => {
    setCart((prev) => [...prev, productId])
    // Show success message (you could add a toast here)
  }

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card
              key={product.id}
              className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-background"
            >
              {/* === O'ZGARISH SHU YERDA === */}
              {/* CardContent butun kartochkani o'raydi va undan padding (p-0) olib tashlanadi */}
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={400}
                    height={300}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.isNew && <Badge className="bg-accent text-accent-foreground">New</Badge>}
                    {product.isBestseller && <Badge className="bg-primary text-primary-foreground">Bestseller</Badge>}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-4 right-4 bg-background/80 hover:bg-background transition-colors"
                    onClick={() => toggleFavorite(product.id)}
                  >
                    <Heart
                      className={`h-4 w-4 ${favorites.includes(product.id) ? "fill-red-500 text-red-500" : "text-muted-foreground"}`}
                    />
                  </Button>
                </div>
                
                {/* Matn va tugmalar uchun alohida div yaratilib, unga padding (p-6) beriladi */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>

                  <h3 className="font-serif text-xl text-primary mb-2 text-balance">{product.name}</h3>

                  <p className="text-muted-foreground text-sm mb-4 text-pretty">{product.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex-1" />

                    <Button
                      onClick={() => addToCart(product.id)}
                      className="rounded-full px-6 hover:scale-105 transition-transform"
                      disabled={cart.includes(product.id)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {cart.includes(product.id) ? "Added" : "Add to Cart"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="rounded-full px-8 bg-transparent">
            Load More Products
          </Button>
        </div>
      </div>
    </section>
  )
}