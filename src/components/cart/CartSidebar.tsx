import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

export function CartSidebar() {
  const { items, isOpen, closeCart, removeFromCart, updateQuantity, cartTotal } = useCart();

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-foreground/20 z-50 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={closeCart}
      />

      {/* Sidebar */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-full max-w-md bg-background z-50 shadow-2xl transition-transform duration-300 ease-smooth flex flex-col",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-sm tracking-widest uppercase">Cart ({items.length})</h2>
          <button onClick={closeCart} className="p-2 -mr-2 hover:opacity-70 transition-opacity">
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <ShoppingBag size={48} className="text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-6">Your cart is empty</p>
              <button
                onClick={closeCart}
                className="btn-outline"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div
                  key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                  className="flex gap-4"
                >
                  <div className="w-20 h-24 bg-secondary flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-medium">{item.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {item.selectedSize} / {item.selectedColor}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-border">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.selectedSize,
                              item.selectedColor,
                              item.quantity - 1
                            )
                          }
                          className="p-2 hover:bg-secondary transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={12} />
                        </button>
                        <span className="px-3 text-sm">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.selectedSize,
                              item.selectedColor,
                              item.quantity + 1
                            )
                          }
                          className="p-2 hover:bg-secondary transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <button
                        onClick={() =>
                          removeFromCart(item.id, item.selectedSize, item.selectedColor)
                        }
                        className="text-xs text-muted-foreground hover:text-foreground underline transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="text-sm font-medium">${item.price * item.quantity}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border p-6 space-y-4">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span className="font-medium">${cartTotal}</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Shipping calculated at checkout
            </p>
            <Link
              to="/checkout"
              onClick={closeCart}
              className="btn-primary w-full block text-center"
            >
              Checkout
            </Link>
            <button
              onClick={closeCart}
              className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors underline"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
