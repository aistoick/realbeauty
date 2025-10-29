"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Instagram, Mail, Heart, ChevronUp } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

export function Footer() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { t } = useLanguage()
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set())

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSubscribed(true)
    setEmail("")
    setIsSubmitting(false)

    setTimeout(() => setIsSubscribed(false), 3000)
  }

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(section)) newSet.delete(section)
      else newSet.add(section)
      return newSet
    })
  }

  return (
    <footer className="bg-gradient-to-br from-muted/30 via-background to-muted/20 border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Image
                src="/images/logo.png"
                alt="Real Beauty Logo"
                width={100}
                height={40}
                className="rounded-full"
              />
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed text-pretty">
              Discover your natural beauty with our premium cosmetic collection. Elegant, sustainable, and crafted for
              the modern woman who values authenticity.
            </p>

            {/* Social Media */}
            <div className="flex space-x-2 sm:space-x-3">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/realbeauty_uz/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-3 sm:p-2 hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:scale-110"
                >
                  <Instagram className="h-5 w-5" />
                </Button>
              </a>

              {/* Telegram Group */}
              <a
                href="https://t.me/+P2j2y7ScGN0zM2Vi"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-3 sm:p-2 hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:scale-110"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M9.036 15.58l-.396 5.583c.565 0 .81-.242 1.103-.531l2.647-2.509 5.492 4.029c1.006.557 1.723.263 1.983-.932l3.595-16.878.001-.001c.319-1.482-.526-2.066-1.511-1.701L1.158 9.47c-1.45.562-1.43 1.368-.247 1.728l5.601 1.747L18.73 6.76c.595-.363 1.136-.162.691.201l-10.385 8.62z" />
                  </svg>
                </Button>
              </a>

              {/* Telegram Admin */}
              <a
                href="https://t.me/realbeauty_admin"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-3 sm:p-2 hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:scale-110"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M9.036 15.58l-.396 5.583c.565 0 .81-.242 1.103-.531l2.647-2.509 5.492 4.029c1.006.557 1.723.263 1.983-.932l3.595-16.878.001-.001c.319-1.482-.526-2.066-1.511-1.701L1.158 9.47c-1.45.562-1.43 1.368-.247 1.728l5.601 1.747L18.73 6.76c.595-.363 1.136-.162.691.201l-10.385 8.62z" />
                  </svg>
                </Button>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <button
              onClick={() => toggleSection("quickLinks")}
              className="flex items-center justify-between w-full md:cursor-default"
            >
              <h4 className="font-semibold text-foreground">{t("quickLinks")}</h4>
              <ChevronUp
                className={`h-4 w-4 md:hidden transition-transform duration-300 ${
                  expandedSections.has("quickLinks") ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`space-y-3 md:block ${
                expandedSections.has("quickLinks") ? "block" : "hidden md:block"
              }`}
            >
              <Link href="/" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                {t("home")}
              </Link>
              <Link href="/about" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                {t("about")}
              </Link>
              <Link href="/products" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                {t("products")}
              </Link>
              <Link href="/contact" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                {t("contact")}
              </Link>
            </div>
          </div>

          {/* Customer Care */}
          <div className="space-y-4">
            <button
              onClick={() => toggleSection("customerCare")}
              className="flex items-center justify-between w-full md:cursor-default"
            >
              <h4 className="font-semibold text-foreground">Customer Care</h4>
              <ChevronUp
                className={`h-4 w-4 md:hidden transition-transform duration-300 ${
                  expandedSections.has("customerCare") ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`space-y-3 md:block ${
                expandedSections.has("customerCare") ? "block" : "hidden md:block"
              }`}
            >
              <Link href="/shipping" className="block text-muted-foreground hover:text-primary text-sm">
                Shipping Info
              </Link>
              <Link href="/returns" className="block text-muted-foreground hover:text-primary text-sm">
                Returns & Exchanges
              </Link>
              <Link href="/faq" className="block text-muted-foreground hover:text-primary text-sm">
                FAQ
              </Link>
              <Link href="/privacy" className="block text-muted-foreground hover:text-primary text-sm">
                Privacy Policy
              </Link>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Stay Beautiful</h4>
            <p className="text-muted-foreground text-sm text-pretty">{t("subscribeText")}</p>

            {isSubscribed ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <Heart className="h-6 w-6 text-green-600 mx-auto mb-2" />
                <p className="text-green-700 text-sm font-medium">Thank you for subscribing!</p>
                <p className="text-green-600 text-xs">Welcome to the Real Beauty family.</p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-background border-border/50 focus:border-primary transition-colors h-12 text-base"
                  required
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full hover:scale-105 transition-transform duration-300 h-12"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Subscribing...
                    </>
                  ) : (
                    <>
                      <Mail className="h-4 w-4 mr-2" />
                      {t("subscribe")}
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-12 pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm text-center md:text-left">
              © 2025 Real Beauty. All rights reserved. Crafted with love for natural beauty.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-muted-foreground">
              <Link href="/terms" className="hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <span>•</span>
              <Link href="/privacy" className="hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <span>•</span>
              <Link href="/cookies" className="hover:text-primary transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
