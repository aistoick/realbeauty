"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, ShoppingBag, ChevronDown } from "lucide-react"
import { useCartStore } from "@/hooks/use-cart-store"
import { CartSidebar } from "@/components/cart-sidebar"
import { useLanguage } from "@/hooks/use-language"
import { LanguageSwitcher } from "@/components/language-switcher"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { getTotalItems } = useCartStore()
  const { t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && !(event.target as Element).closest(".mobile-menu-container")) {
        setIsOpen(false)
      }
    }
    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const navItems = [
    { href: "/", label: t("home") },
    { href: "/about", label: t("about") },
    { href: "/products", label: t("products") },
    { href: "/contact", label: t("contact") },
  ]

  return (
    <>
      <nav
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled ? "bg-white/98 backdrop-blur-md shadow-lg" : "bg-white/95 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`flex justify-between items-center transition-all duration-300 ${scrolled ? "h-16" : "h-20"}`}
          >
            {/* Desktop Navigation - Left */}
            <div className="hidden md:flex items-center space-x-12">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-600 hover:text-gray-900 transition-colors font-medium tracking-wide text-sm relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </div>

            {/* Logo - Center */}
          <Link href="/" className="flex items-center">
  <img
    src="images/logo.png"
    alt="RealBeauty Logo"
    className={`transition-all duration-300 ${scrolled ? "w-26 h-10" : "w-36 h-16"}`}
  />
</Link>

            {/* Desktop Actions - Right */}
            <div className="hidden md:flex items-center space-x-6">
              <LanguageSwitcher />
              <Button
                variant="ghost"
                size="sm"
                className="relative p-2 hover:bg-primary/10 transition-colors"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingBag className="h-5 w-5 text-gray-600" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium animate-pulse">
                    {getTotalItems()}
                  </span>
                )}
              </Button>
            </div>

            {/* Mobile Actions */}
            <div className="md:hidden flex items-center gap-2">
              <LanguageSwitcher />
              <Button
                variant="ghost"
                size="sm"
                className="relative p-2 hover:bg-primary/10 transition-colors"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingBag className="h-5 w-5 text-gray-600" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium animate-pulse">
                    {getTotalItems()}
                  </span>
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 hover:bg-primary/10 transition-colors mobile-menu-container"
              >
                {isOpen ? <X className="h-6 w-6 text-gray-600" /> : <Menu className="h-6 w-6 text-gray-600" />}
              </Button>
            </div>
          </div>

          {/* Enhanced Mobile Menu */}
          {isOpen && (
            <div className="md:hidden mobile-menu-container">
              <div className="absolute left-0 right-0 top-full bg-white/98 backdrop-blur-md shadow-2xl border-t border-gray-100 animate-in slide-in-from-top-2 duration-300">
                <div className="px-4 py-6 space-y-1">
                  {navItems.map((item, index) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center justify-between px-4 py-4 text-gray-700 hover:text-primary hover:bg-primary/5 transition-all duration-200 font-medium tracking-wide rounded-lg group"
                      onClick={() => setIsOpen(false)}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <span className="text-lg">{item.label}</span>
                      <ChevronDown className="h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  ))}

                  {/* Mobile-specific quick actions */}
                  <div className="pt-4 mt-4 border-t border-gray-100">
                    <Button
                      onClick={() => {
                        setIsCartOpen(true)
                        setIsOpen(false)
                      }}
                      className="w-full justify-start text-left h-auto py-4 px-4 bg-primary/5 hover:bg-primary/10 text-primary rounded-lg"
                    >
                      <ShoppingBag className="h-5 w-5 mr-3" />
                      <span className="text-lg font-medium">
                        {t("cart.title")} ({getTotalItems()})
                      </span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}
