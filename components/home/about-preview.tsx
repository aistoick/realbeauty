"use client"

import { Button } from "@/components/ui/button"
import { Leaf, Award, Users } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/hooks/use-language"

export function AboutPreview() {
  const { t } = useLanguage()

  return (
    <section className="py-16 sm:py-20 gradient-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Content */}
          <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 sm:mb-6 text-balance">
                Beauty That Comes From Within
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed text-pretty mb-4 sm:mb-6">
                At Real Beauty, we believe that true beauty radiates from confidence and self-love. Our carefully
                crafted cosmetics enhance your natural features while celebrating your unique essence.
              </p>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed text-pretty">
                Founded with a passion for authenticity and sustainability, we create products that not only make you
                look beautiful but also feel good about your choices.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-6">
              <div className="text-center p-4 sm:p-0 hover:bg-primary/5 rounded-lg transition-colors duration-300 touch-manipulation">
                <div className="inline-flex items-center justify-center w-14 h-14 sm:w-12 sm:h-12 bg-primary/10 rounded-full mb-3">
                  <Leaf className="h-7 w-7 sm:h-6 sm:w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-1 text-base sm:text-sm">Natural</h3>
                <p className="text-sm text-muted-foreground">Organic ingredients</p>
              </div>
              <div className="text-center p-4 sm:p-0 hover:bg-primary/5 rounded-lg transition-colors duration-300 touch-manipulation">
                <div className="inline-flex items-center justify-center w-14 h-14 sm:w-12 sm:h-12 bg-primary/10 rounded-full mb-3">
                  <Award className="h-7 w-7 sm:h-6 sm:w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-1 text-base sm:text-sm">Premium</h3>
                <p className="text-sm text-muted-foreground">Luxury quality</p>
              </div>
              <div className="text-center p-4 sm:p-0 hover:bg-primary/5 rounded-lg transition-colors duration-300 touch-manipulation">
                <div className="inline-flex items-center justify-center w-14 h-14 sm:w-12 sm:h-12 bg-primary/10 rounded-full mb-3">
                  <Users className="h-7 w-7 sm:h-6 sm:w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-1 text-base sm:text-sm">Trusted</h3>
                <p className="text-sm text-muted-foreground">10k+ customers</p>
              </div>
            </div>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="btn-hover bg-transparent w-full sm:w-auto px-8 py-4 text-base sm:text-sm touch-manipulation"
            >
              <Link href="/about">Learn More About Us</Link>
            </Button>
          </div>

          <div className="relative order-first lg:order-last">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="images/hero.jpg"
                alt="Natural beauty"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            {/* Decorative elements - hidden on mobile for cleaner look */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/10 rounded-full blur-xl hidden sm:block"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/5 rounded-full blur-2xl hidden sm:block"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
