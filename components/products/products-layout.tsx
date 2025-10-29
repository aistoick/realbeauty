"use client"

import { useState, useMemo, useEffect } from "react"
import { useLanguage } from "@/hooks/use-language"
import { useCartStore } from "@/hooks/use-cart-store"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Menu,
  X,
  ChevronDown, 
  ChevronUp, 
} from "lucide-react"
import Image from "next/image"
import { db } from "@/lib/firebase"
import { collection, getDocs, query } from "firebase/firestore"

// ✅ Only 6 products per page now
const ITEMS_PER_PAGE = 6

// ❌ Rating va Reviews olib tashlandi
interface Product {
  id: string
  name: string
  description: {
    uz: string
    en: string
    ru: string
  }
  image: string
  category: string
  categoryName: string
  price: number
}

// ✅ Real katalog asosida yangilangan kategoriyalar
const STATIC_CATEGORIES = [
  // 🔹 Asosiy liniyalar
  { id: "cleansing_line", name: "Cleansing Line" },
  { id: "protection_line", name: "Protection Line" },
  { id: "brightening_line", name: "Brightening Line" },
  { id: "calming_line", name: "Calming Line" },
  { id: "ampoule_line", name: "Ampoule Line" },
  { id: "moisturizing_line", name: "Moisturizing Line" },
  { id: "stem_cell_line", name: "Stem Cell Line" },
  { id: "body_line", name: "Body Line" },
  { id: "mask_line", name: "Mask Line" },
  { id: "anti_wrinkle_line", name: "Anti-Wrinkle Line" },

  // 🔹 Qo‘shimcha liniyalar
  { id: "snail_line", name: "Snail Repair Line" },
  { id: "tox_line", name: "Tox Volume Line" },
  { id: "gold_line", name: "Gold Line" },
  { id: "honey_line", name: "Honey Line" },
  { id: "peeling_line", name: "Peeling Line" },
  { id: "clarity_line", name: "Clarity Line" },
  { id: "vita_c_line", name: "Vita-C Line" },
  { id: "super_moisture_line", name: "Super Moisture Line" },
  { id: "ceramide_line", name: "Ceramide Line" },
  { id: "azulene_line", name: "Azulene Calming Line" },
  { id: "campo_line", name: "Campo Calming Line" },
  { id: "wrinkle_care_line", name: "Wrinkle Care Line" },
]

export function ProductsLayout() {
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)
  
  // ✅ Kengaytiriladigan tavsif holati
  const [expandedDescriptions, setExpandedDescriptions] = useState<
    Record<string, boolean>
  >({})

  const { addItem } = useCartStore()
  const { language } = useLanguage() // ✅ lang: "uz" | "en" | "ru"

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true)
      try {
        // Ma'lumotlar bazasida ham rating va reviewsni o'chirish yoki e'tiborsiz qoldirish kerak
        const productsQuery = query(collection(db, "products"))
        const productSnapshot = await getDocs(productsQuery)
        const productsList = productSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Product[]
        setAllProducts(productsList)
      } catch (error) {
        console.error("Error reading products from Firebase:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // ✅ Filter logic
  const filteredProducts = useMemo(() => {
    if (activeCategory === "all") return allProducts
    return allProducts.filter((product) => product.category === activeCategory)
  }, [allProducts, activeCategory])

  // ✅ Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  )

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      image: product.image,
      quantity: 1,
      price: product.price,
    })
  }

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId)
    setCurrentPage(1)
    setIsCategoryOpen(false)
    setExpandedDescriptions({}) 
  }

  // ✅ Tavsifning kengayish holatini o'zgartiruvchi funksiya
  const toggleExpand = (productId: string) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [productId]: !prev[productId], 
    }))
  }

  if (isLoading) {
    return (
      <div className="container mx-auto flex justify-center items-center h-96">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <section className="bg-background py-12">
      <div className="container mx-auto px-4">
        {/* 🔹 Mobile Category Toggle */}
        <div className="flex items-center justify-between mb-6 lg:hidden">
          <h2 className="text-2xl font-bold text-foreground">Products</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsCategoryOpen((prev) => !prev)}
            className="flex items-center gap-2"
          >
            {isCategoryOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            Categories
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* 🔹 Sidebar */}
          <aside
            className={`lg:w-1/4 transition-all duration-300 ${
              isCategoryOpen
                ? "block border rounded-lg p-4 shadow-md bg-background mb-6 lg:mb-0"
                : "hidden lg:block"
            }`}
          >
            <div className="lg:sticky lg:top-24 max-h-[calc(100vh-6rem)] overflow-y-auto pr-2">
              <h3 className="text-xl font-bold mb-4 text-foreground tracking-tight">
                Categories
              </h3>
              <div className="space-y-1">
                <Button
                  variant={activeCategory === "all" ? "secondary" : "ghost"}
                  className="w-full justify-start text-base font-medium capitalize hover:bg-accent"
                  onClick={() => handleCategoryChange("all")}
                >
                  All products ({allProducts.length})
                </Button>

                {STATIC_CATEGORIES.map((cat) => {
                  const count = allProducts.filter((p) => p.category === cat.id).length
                  return (
                    <Button
                      key={cat.id}
                      variant={activeCategory === cat.id ? "secondary" : "ghost"}
                      className="w-full justify-start text-base font-medium capitalize hover:bg-accent"
                      onClick={() => handleCategoryChange(cat.id)}
                    >
                      {cat.name} ({count})
                    </Button>
                  )
                })}
              </div>
            </div>
          </aside>

          {/* 🔹 Product Grid */}
          <main className="lg:w-3/4">
            <div className="mb-8 hidden lg:block">
              <h2 className="text-3xl font-bold text-foreground mb-2 capitalize">
                {activeCategory === "all"
                  ? "All products"
                  : STATIC_CATEGORIES.find((cat) => cat.id === activeCategory)?.name}
              </h2>
              <p className="text-muted-foreground text-sm">
                Showing {startIndex + 1}–
                {Math.min(startIndex + ITEMS_PER_PAGE, filteredProducts.length)} of{" "}
                {filteredProducts.length} products
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {paginatedProducts.map((product) => {
                const isExpanded = expandedDescriptions[product.id]

                return (
                  <Card
                    key={product.id}
                    className="group overflow-hidden border border-border/60 shadow-sm hover:shadow-lg transition-all duration-500 hover:-translate-y-2 bg-background rounded-xl p-0"
                  >
                    <div className="relative w-full h-72 overflow-hidden rounded-t-xl">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>

                    <CardContent className="p-5 flex flex-col">
                      {/* ❌ Rating qismi olib tashlandi. Baholash uchun bo'sh joy qolmadi. */}

                      <h3 className="font-semibold text-lg text-foreground capitalize mb-1 line-clamp-1">
                        {product.name}
                      </h3>

                      {/* ✅ Multilingual Description & Toggle */}
                      <div className="mb-4">
                        <p
                          className={`text-sm text-muted-foreground ${
                            isExpanded ? "" : "line-clamp-2"
                          } min-h-[2.5rem]`}
                        >
                          {product.description?.[language] || ""}
                        </p>

                        <button
                          onClick={() => toggleExpand(product.id)}
                          className="flex items-center text-xs text-primary mt-1 hover:text-primary/80 transition-colors font-medium"
                          type="button"
                        >
                          {isExpanded ? "Show Less" : "Show More"}
                          {isExpanded ? (
                            <ChevronUp className="h-3 w-3 ml-1" />
                          ) : (
                            <ChevronDown className="h-3 w-3 ml-1" />
                          )}
                        </button>
                      </div>

                      <Button
                        onClick={() => handleAddToCart(product)}
                        className="w-full mt-auto rounded-full text-sm hover:scale-105 transition-transform font-medium"
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* ✅ Pagination Section */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-3 mt-8">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm text-muted-foreground">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </section>
  )
}