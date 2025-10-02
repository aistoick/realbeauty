import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import { ScrollToTop } from "@/components/scroll-to-top"
import { SmoothScroll } from "@/components/ui/smooth-scroll"
import "./globals.css"
import { LanguageProvider } from "@/hooks/use-language"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Real Beauty - Premium Cosmetics",
  description:
    "Discover your natural beauty with our premium cosmetic collection. Elegant, sustainable, and crafted for the modern woman who values authenticity and quality.",
  keywords: "cosmetics, beauty, makeup, skincare, premium, natural, elegant, Real Beauty",
  authors: [{ name: "Real Beauty" }],
  creator: "Real Beauty",
  openGraph: {
    title: "Real Beauty - Premium Cosmetics",
    description: "Discover your natural beauty with our premium cosmetic collection.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Real Beauty - Premium Cosmetics",
    description: "Discover your natural beauty with our premium cosmetic collection.",
  },
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} antialiased`}>
      <body className="min-h-screen bg-background font-sans text-foreground">
        <LanguageProvider>
          <SmoothScroll />
          {children}
          <ScrollToTop />
        </LanguageProvider>
      </body>
    </html>
  )
}
