"use client"

import { useState, useMemo } from "react"
import { useLanguage } from "@/hooks/use-language"
import { useCartStore } from "@/hooks/use-cart-store"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ShoppingCart, Heart, Star, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

const productLines = [
  {
    id: "stem-cell",
    name: "Stem Cell Line",
    products: [
      {
        id: 1,
        name: "Stem Cell Skin",
        description: "Advanced stem cell technology for skin renewal and regeneration",
        image: "/stem-cell-skincare-bottle.jpg",
      },
      {
        id: 2,
        name: "Stem Cell Serum",
        description: "Concentrated serum with plant stem cells for anti-aging",
        image: "/serum-bottle-cosmetic.jpg",
      },
      {
        id: 3,
        name: "Stem Cell Z Serum",
        description: "Premium Z-formula serum for intensive skin repair",
        image: "/premium-serum-bottle.jpg",
      },
      {
        id: 4,
        name: "Stem Cell Ampoule",
        description: "High-concentration ampoule for targeted treatment",
        image: "/ampoule-skincare.jpg",
      },
      {
        id: 5,
        name: "Stem Cell Solution",
        description: "Complete solution for comprehensive skin care",
        image: "/skincare-solution-bottle.jpg",
      },
      {
        id: 6,
        name: "Stem Cell Coconut Ampoule Essence",
        description: "Nourishing essence with coconut and stem cell extracts",
        image: "/essence-bottle-coconut.jpg",
      },
      {
        id: 7,
        name: "Stem Cell Rebalance Balm",
        description: "Balancing balm for sensitive and irritated skin",
        image: "/balm-jar-cosmetic.jpg",
      },
      {
        id: 8,
        name: "Stem Cell Coconut Mask",
        description: "Hydrating mask with coconut oil and stem cells",
        image: "/face-mask-coconut.jpg",
      },
      {
        id: 9,
        name: "Stem Cell Hydro Cream",
        description: "Intensive hydrating cream with stem cell technology",
        image: "/hydro-cream-jar.jpg",
      },
      {
        id: 10,
        name: "Stem Cell Rich Cream",
        description: "Rich moisturizing cream for mature skin",
        image: "/rich-cream-jar-luxury.jpg",
      },
      {
        id: 11,
        name: "Stem Cell Hydro Mist",
        description: "Refreshing mist for instant hydration",
        image: "/mist-spray-bottle.jpg",
      },
      {
        id: 12,
        name: "Stem Cell Home Care Set",
        description: "Complete home care set with stem cell products",
        image: "/skincare-set-box.jpg",
      },
    ],
  },
  {
    id: "snail",
    name: "Snail Line",
    products: [
      {
        id: 13,
        name: "Snail Repair Skin",
        description: "Repairing toner with snail secretion filtrate",
        image: "/snail-skincare-toner.jpg",
      },
      {
        id: 14,
        name: "Snail Fill Up Essence",
        description: "Filling essence for plump and smooth skin",
        image: "/snail-essence-bottle.jpg",
      },
      {
        id: 15,
        name: "Snail Repair Bling Cream",
        description: "Radiant cream with snail mucin for glowing skin",
        image: "/snail-cream-jar-bling.jpg",
      },
    ],
  },
  {
    id: "tox",
    name: "Tox Line",
    products: [
      {
        id: 16,
        name: "Tox Volume Fill Up Essence",
        description: "Volumizing essence for firmer, fuller skin",
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        id: 17,
        name: "Tox Volume Cream",
        description: "Anti-aging cream with botox-like effects",
        image: "/placeholder.svg?height=300&width=400",
      },
    ],
  },
  {
    id: "honey",
    name: "Lovely Honey Line",
    products: [
      {
        id: 18,
        name: "Lovely Honey Ampoule",
        description: "Nourishing ampoule with pure honey extract",
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        id: 19,
        name: "Lovely Honey Serum",
        description: "Moisturizing serum with honey and royal jelly",
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        id: 20,
        name: "Lovely Honey Cream",
        description: "Rich honey cream for deep nourishment",
        image: "/placeholder.svg?height=300&width=400",
      },
    ],
  },
  {
    id: "gold",
    name: "Gold Line",
    products: [
      {
        id: 21,
        name: "Golden Time Expert Skin",
        description: "Luxury toner with gold particles",
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        id: 22,
        name: "Golden Time Expert Ampoule",
        description: "Premium ampoule with 24k gold",
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        id: 23,
        name: "Golden Time Expert Cream",
        description: "Anti-aging cream with gold and peptides",
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        id: 24,
        name: "Golden Time Expert Set",
        description: "Complete luxury skincare set",
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        id: 25,
        name: "Gold Salmon Egg Hydro Gel",
        description: "Hydrating gel with salmon egg extract",
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        id: 26,
        name: "Aqua Gold Plus Cream Modeling",
        description: "Professional modeling cream with gold",
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        id: 27,
        name: "Aqua Gold Plus Cream Modeling Powder",
        description: "Modeling powder for professional treatments",
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        id: 28,
        name: "Gold Patch",
        description: "Luxury hydrogel patches with gold",
        image: "/placeholder.svg?height=300&width=400",
      },
    ],
  },
  {
    id: "peeling",
    name: "Peeling Line",
    products: [
      {
        id: 29,
        name: "Resting Peel Powder",
        description: "Gentle enzyme peeling powder",
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        id: 30,
        name: "Resting Peel Solution",
        description: "Chemical peel solution for smooth skin",
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        id: 31,
        name: "Resting Hydra Mist",
        description: "Soothing mist after peeling treatment",
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        id: 32,
        name: "Double Peeling Gel",
        description: "Dual-action peeling gel for deep cleansing",
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        id: 33,
        name: "Face Clean Peel Cream",
        description: "Gentle peeling cream for daily use",
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        id: 34,
        name: "Healing Balm",
        description: "Restorative balm for post-treatment care",
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        id: 35,
        name: "CC Cream",
        description: "Color correcting cream with coverage",
        image: "/placeholder.svg?height=300&width=400",
      },
    ],
  },
  {
    id: "sun",
    name: "Protection / Sun",
    products: [
      {
        id: 36,
        name: "Waterfull Green Sun Cream (SPF50+ PA++++)",
        description: "High protection sun cream with green tea",
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        id: 37,
        name: "Aqua Shining Sunblock (SPF50+ PA+++)",
        description: "Water-resistant sunblock with shine",
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        id: 38,
        name: "Cica Perfect Suncream (SPF50+ PA++++)",
        description: "Soothing sun cream with centella asiatica",
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        id: 39,
        name: "Multi Protection Balm (SPF37 PA++)",
        description: "Multi-purpose protection balm",
        image: "/placeholder.svg?height=300&width=400",
      },
    ],
  },
]

const ITEMS_PER_PAGE = 12

export function ProductsLayout() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [favorites, setFavorites] = useState<number[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const { language } = useLanguage()
  const { addItem } = useCartStore()

  const allProducts = useMemo(() => {
    return productLines.flatMap((line) =>
      line.products.map((product) => ({
        ...product,
        category: line.id,
        categoryName: line.name,
        rating: 4.5 + Math.random() * 0.5, // Random rating between 4.5-5.0
        reviews: Math.floor(Math.random() * 200) + 50, // Random reviews 50-250
      })),
    )
  }, [])

  const filteredProducts = useMemo(() => {
    if (activeCategory === "all") return allProducts
    return allProducts.filter((product) => product.category === activeCategory)
  }, [allProducts, activeCategory])

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: 29.99, // Default price
      image: product.image,
      quantity: 1,
    })
  }

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId)
    setCurrentPage(1) // Reset to first page when changing category
  }

  return (
    <section className="bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <div className="sticky top-4">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Categories</h3>
              <div className="space-y-2">
                <Button
                  variant={activeCategory === "all" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => handleCategoryChange("all")}
                >
                  All Products ({allProducts.length})
                </Button>
                {productLines.map((line) => (
                  <Button
                    key={line.id}
                    variant={activeCategory === line.id ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => handleCategoryChange(line.id)}
                  >
                    {line.name} ({line.products.length})
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:w-3/4">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                {activeCategory === "all"
                  ? "All Products"
                  : productLines.find((line) => line.id === activeCategory)?.name}
              </h2>
              <p className="text-muted-foreground">
                Showing {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, filteredProducts.length)} of{" "}
                {filteredProducts.length} products
              </p>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
              {paginatedProducts.map((product) => (
                <Card
                  key={product.id}
                  className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-background"
                >
                  <div className="relative overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={400}
                      height={300}
                      className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 bg-background/80 hover:bg-background transition-colors"
                      onClick={() => toggleFavorite(product.id)}
                    >
                      <Heart
                        className={`h-4 w-4 ${favorites.includes(product.id) ? "fill-red-500 text-red-500" : "text-muted-foreground"}`}
                      />
                    </Button>
                  </div>

                  <CardContent className="p-4">
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                        />
                      ))}
                      <span className="text-xs text-muted-foreground ml-1">({product.reviews})</span>
                    </div>

                    <h3 className="font-semibold text-foreground mb-2 text-sm leading-tight">{product.name}</h3>

                    <p className="text-muted-foreground text-xs mb-3 line-clamp-2">{product.description}</p>

                    <Button onClick={() => handleAddToCart(product)} className="w-full text-xs" size="sm">
                      <ShoppingCart className="h-3 w-3 mr-1" />
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>

                <div className="flex gap-1">
                  {[...Array(totalPages)].map((_, i) => {
                    const page = i + 1
                    if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                      return (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(page)}
                          className="w-8 h-8 p-0"
                        >
                          {page}
                        </Button>
                      )
                    } else if (page === currentPage - 2 || page === currentPage + 2) {
                      return (
                        <span key={page} className="px-2">
                          ...
                        </span>
                      )
                    }
                    return null
                  })}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
