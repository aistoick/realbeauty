"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, Globe } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

const languageNames = {
  en: "English",
  ru: "Русский",
  uz: "O'zbekcha",
} as const

const languageFlags = {
  en: "🇺🇸",
  ru: "🇷🇺",
  uz: "🇺🇿",
} as const

export function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false)
  const { language, setLanguage } = useLanguage()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && !(event.target as Element).closest(".language-switcher")) {
        setIsOpen(false)
      }
    }

    const handleScroll = () => {
      if (isOpen) setIsOpen(false)
    }

    document.addEventListener("click", handleClickOutside)
    document.addEventListener("scroll", handleScroll)

    return () => {
      document.removeEventListener("click", handleClickOutside)
      document.removeEventListener("scroll", handleScroll)
    }
  }, [isOpen])

  return (
    <div className="relative language-switcher">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 hover:bg-primary/10 touch-manipulation h-10 px-3 sm:h-auto sm:px-2"
      >
        <Globe className="h-4 w-4" />
        <span className="sm:hidden text-base">{languageFlags[language]}</span>
        <span className="hidden sm:inline text-sm">{languageNames[language]}</span>
        <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </Button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10 sm:hidden" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 top-full mt-2 w-44 sm:w-40 bg-background border border-border rounded-lg shadow-lg z-20 overflow-hidden">
            {Object.entries(languageNames).map(([code, name]) => (
              <button
                key={code}
                onClick={() => {
                  setLanguage(code as keyof typeof languageNames)
                  setIsOpen(false)
                }}
                className={`w-full px-4 py-3 sm:py-2 text-left hover:bg-primary/10 transition-colors touch-manipulation flex items-center gap-3 ${
                  language === code ? "bg-primary/20 text-primary font-medium" : ""
                }`}
              >
                <span className="text-lg sm:text-base">{languageFlags[code as keyof typeof languageFlags]}</span>
                <span className="text-base sm:text-sm">{name}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
