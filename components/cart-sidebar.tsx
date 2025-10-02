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

  return (
    <>
      {/* Enhanced Backdrop with better mobile touch handling */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-50 transition-opacity duration-300 backdrop-blur-sm"
          onClick={onClose}
          style={{ touchAction: "none" }}
        />
      )}

      {/* Enhanced Sidebar with better mobile responsiveness */}
      <div
        className={`fixed right-0 top-0 h-full bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } w-full sm:w-96 max-w-full`}
      >
        <div className="flex flex-col h-full">
          {/* Enhanced Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 bg-gradient-to-r from-primary/5 to-purple-50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-full">
                <ShoppingBag className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">{t("cart.title")}</h2>
                <p className="text-sm text-gray-600">
                  {items.length} {items.length === 1 ? "item" : "items"}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full touch-manipulation"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>

          {/* Enhanced Cart Items with better mobile touch targets */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            {items.length === 0 ? (
              <div className="text-center py-12 sm:py-16">
                <div className="p-4 bg-gray-50 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                  <ShoppingBag className="h-10 w-10 text-gray-300" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">{t("cart.empty")}</h3>
                <p className="text-gray-500 mb-6 text-sm">Add some products to get started</p>
                <Button
                  onClick={onClose}
                  className="bg-primary hover:bg-primary/90 px-8 py-3 text-base touch-manipulation"
                >
                  {t("cart.continueShopping")}
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 text-sm sm:text-base mb-3 line-clamp-2">{item.name}</h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                            className="h-8 w-8 p-0 touch-manipulation hover:bg-primary/10"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-sm font-medium w-10 text-center py-1">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="h-8 w-8 p-0 touch-manipulation hover:bg-primary/10"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 touch-manipulation"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Enhanced Footer with better mobile buttons */}
          {items.length > 0 && (
            <div className="border-t border-gray-200 p-4 sm:p-6 space-y-4 bg-white">
              <div className="space-y-3">
                <Button className="w-full bg-gradient-to-r from-primary via-purple-600 to-pink-600 hover:from-primary/90 hover:via-purple-700 hover:to-pink-700 text-white py-4 text-base font-medium touch-manipulation">
                  {t("cart.checkout")}
                </Button>
                <Button
                  variant="outline"
                  onClick={clearCart}
                  className="w-full text-red-500 border-red-200 hover:bg-red-50 bg-transparent py-3 touch-manipulation"
                >
                  {t("cart.clear")}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
