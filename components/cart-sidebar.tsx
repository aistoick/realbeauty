"use client"

import { Button } from "@/components/ui/button"
import { X, Plus, Minus, ShoppingBag } from "lucide-react"
import { useCartStore } from "@/hooks/use-cart-store"
import { useLanguage } from "@/hooks/use-language"
import Image from "next/image"
import { useEffect } from "react"

interface CartSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { items, updateQuantity, removeItem, clearCart } = useCartStore()
  const { t } = useLanguage()

  // Disable scroll when sidebar open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset"
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <>
      {/* BACKDROP */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`fixed right-0 top-0 h-full flex flex-col bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } w-full sm:w-[400px]`}
      >
        {/* HEADER */}
        <header className="flex items-center justify-between px-5 py-4 border-b border-gray-200 bg-gradient-to-r from-primary/5 to-purple-50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-full">
              <ShoppingBag className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">{t("cart.title")}</h2>
              <p className="text-sm text-gray-600">
                {totalItems}{" "}
                {totalItems === 1
                  ? t("cart.singleItem") || "item"
                  : t("cart.items") || "items"}
              </p>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full hover:bg-gray-100"
          >
            <X className="h-6 w-6" />
          </Button>
        </header>

        {/* BODY */}
        <main className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col justify-center items-center text-center h-full text-gray-500">
              <div className="p-5 bg-gray-100 rounded-full mb-4">
                <ShoppingBag className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {t("cart.empty") || "Your cart is empty"}
              </h3>
              <p className="text-sm mb-6">
                {t("cart.addSomething") || "Add some products to get started"}
              </p>
              <Button
                onClick={onClose}
                className="bg-primary hover:bg-primary/90 text-white px-6 py-3 text-base rounded-lg"
              >
                {t("cart.continueShopping") || "Continue Shopping"}
              </Button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-all duration-200"
              >
                {/* Product Image */}
                <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 flex flex-col justify-between">
                  <h3 className="font-medium text-gray-900 text-sm sm:text-base mb-2 line-clamp-2">
                    {item.name}
                  </h3>

                  <div className="flex items-center justify-between">
                    {/* Quantity Buttons */}
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          updateQuantity(item.id, Math.max(1, item.quantity - 1))
                        }
                        className="h-8 w-8 border-gray-300 hover:bg-primary/10"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="text-sm font-semibold w-8 text-center">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="h-8 w-8 border-gray-300 hover:bg-primary/10"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>

                    {/* Remove */}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:bg-red-50"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </main>

        {/* FOOTER */}
        {items.length > 0 && (
          <footer className="border-t border-gray-200 p-5 bg-white space-y-3 shadow-inner">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700 text-sm">
                {t("cart.total") || "Total items"}:
              </span>
              <span className="font-semibold text-gray-900">{totalItems}</span>
            </div>

            <Button className="w-full bg-primary text-white py-3 text-base font-semibold hover:bg-primary/90 rounded-lg">
              {t("cart.checkout") || "Proceed to Checkout"}
            </Button>

            <Button
              variant="outline"
              onClick={clearCart}
              className="w-full border-red-200 text-red-600 hover:bg-red-50 py-3 rounded-lg font-medium"
            >
              {t("cart.clear") || "Clear Cart"}
            </Button>
          </footer>
        )}
      </div>
    </>
  )
}
