"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

const categories = [
  { id: "all", name: "All Products", count: 12 },
  { id: "foundation", name: "Foundation", count: 4 },
  { id: "lipstick", name: "Lipstick", count: 3 },
  { id: "eyeshadow", name: "Eyeshadow", count: 2 },
  { id: "blush", name: "Blush", count: 3 },
]

export function ProductCategories() {
  const [activeCategory, setActiveCategory] = useState("all")

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              onClick={() => setActiveCategory(category.id)}
              className="rounded-full px-6 py-2 transition-all duration-300 hover:scale-105"
            >
              {category.name}
              <span className="ml-2 text-xs opacity-70">({category.count})</span>
            </Button>
          ))}
        </div>
      </div>
    </section>
  )
}
