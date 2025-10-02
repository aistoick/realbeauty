import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ProductsHero } from "@/components/products/products-hero"
import { ProductsLayout } from "@/components/products/products-layout"

export default function ProductsPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <ProductsHero />
        <ProductsLayout />
      </main>
      <Footer />
    </div>
  )
}
