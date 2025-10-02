"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowUp } from "lucide-react"

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  if (!isVisible) {
    return null
  }

  return (
    <Button
      onClick={scrollToTop}
      size="icon"
      className={`
        fixed bottom-6 right-4 sm:bottom-8 sm:right-8 z-50 
        rounded-full shadow-lg hover:shadow-xl 
        transition-all duration-300 hover:scale-110 
        bg-primary hover:bg-primary/90
        w-12 h-12 sm:w-10 sm:h-10
        touch-manipulation
        animate-in slide-in-from-bottom-2 fade-in-0
      `}
    >
      <ArrowUp className="h-5 w-5 sm:h-4 sm:w-4" />
    </Button>
  )
}
