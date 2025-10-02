"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Pause } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const heroSlides = [
  {
    id: "01",
    title: "MULTI CAMPO ",
    subtitle: "AMPOULE",
    description: "A serum that contain Centella Asiatica Extract help protect skin from external environment, improve skin complexion and make skin glow.",
    image: "images/products/hero-1.png",
    bgColor: "bg-gradient-to-br from-green-50 to-green-100",
  },
  {
    id: "02",
    title: "AQUA MEMORIZE ",
    subtitle: "LINE",
    description: "AQUA MEMORIZE LINE",
    image: "/images/products/hero-2.png",
    bgColor: "bg-gradient-to-br from-blue-50 to-blue-100",
  },
  {
    id: "03",
    title: "VITA-C RETURN ",
    subtitle: "SERUM",
    description: "A serum that contain Centella Asiatica Extract help protect skin from external environment, improve skin complexion and make skin glow.",
    image: "/images/products/hero-3.png",
    bgColor: "bg-gradient-to-br from-yellow-50 to-orange-50",
  },
]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  useEffect(() => {
    if (!isAutoPlaying) return

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [isAutoPlaying])

  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    } else if (isRightSwipe) {
      setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
    }
  }

  const currentProduct = heroSlides[currentSlide]

  return (
    <section
      className={`relative min-h-screen flex items-center transition-all duration-1000 ${currentProduct.bgColor}`}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[80vh]">
          {/* Enhanced Left Content for mobile */}
          <div className="space-y-6 lg:space-y-8 lg:pr-12 text-center lg:text-left">
            {/* Large Background Number - adjusted for mobile */}
            <div className="relative">
              <span className="absolute -top-4 sm:-top-8 -left-2 sm:-left-4 text-[120px] sm:text-[200px] lg:text-[300px] font-bold text-gray-100 leading-none select-none">
                {currentProduct.id}
              </span>
              <div className="relative z-10 pt-12 sm:pt-16">
                <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold text-gray-800 leading-tight mb-4 sm:mb-6">
                  {currentProduct.title}
                  <br />
                  <span className="text-gray-600">{currentProduct.subtitle}</span>
                </h1>
                <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 max-w-md mx-auto lg:mx-0 leading-relaxed text-pretty">
                  {currentProduct.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start">
                  <Button
                    asChild
                    className="bg-gray-900 hover:bg-gray-800 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-full transition-all duration-300 hover:scale-105 w-full sm:w-auto touch-manipulation"
                  >
                    <Link href="/products">
                      Shop Now
                      <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                    </Link>
                  </Button>

                  {/* Mobile-specific auto-play control */}
                  {/* <Button
                    variant="outline"
                    onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                    className="px-4 py-3 rounded-full border-gray-300 hover:border-gray-400 sm:hidden touch-manipulation"
                  >
                    {isAutoPlaying ? (
                      <>
                        <Pause className="h-4 w-4 mr-2" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Play
                      </>
                    )}
                  </Button> */}
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Right Product Image for mobile */}
          <div className="relative order-first lg:order-last">
            <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] w-full">
              <Image
                src={currentProduct.image || "/placeholder.svg"}
                alt={`${currentProduct.title} ${currentProduct.subtitle}`}
                fill
                className="object-contain transition-all duration-1000 hover:scale-105"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
              />
            </div>

            {/* Enhanced Next Item Button for mobile */}
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
              className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 w-12 h-12 sm:w-16 sm:h-16 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 group touch-manipulation"
            >
              <div className="text-center">
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 group-hover:text-gray-900 transition-colors mx-auto" />
                <span className="text-xs text-gray-500 mt-1 hidden sm:block"></span>
              </div>
            </button>
          </div>
        </div>

        {/* Enhanced Slide Indicators for mobile */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`transition-all duration-300 rounded-full touch-manipulation ${
                index === currentSlide
                  ? "w-6 sm:w-8 h-2 sm:h-3 bg-gray-900"
                  : "w-2 sm:w-3 h-2 sm:h-3 bg-gray-400 hover:bg-gray-500"
              }`}
            />
          ))}
        </div>

        {/* Mobile swipe indicator */}
        <div className="absolute bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2 text-center lg:hidden">
          <p className="text-xs text-gray-500 mb-2">Swipe to explore</p>
          <div className="flex justify-center space-x-1">
            <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"></div>
            <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
            <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
          </div>
        </div>
      </div>
    </section>
  )
}
