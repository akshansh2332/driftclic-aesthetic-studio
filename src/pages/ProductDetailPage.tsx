import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Heart, Minus, Plus, ArrowLeft } from "lucide-react";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { ProductCard } from "@/components/product/ProductCard";
import { cn } from "@/lib/utils";

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useCart();

  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  if (!product) {
    return (
      <div className="section-padding">
        <div className="container-wide text-center">
          <h1 className="text-2xl font-light mb-4">Product not found</h1>
          <Link to="/shop" className="btn-primary inline-block">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      return;
    }
    addToCart(product, selectedSize, selectedColor);
  };

  const toggleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div>
      {/* Breadcrumb */}
      <div className="container-wide py-4 border-b border-border">
        <Link
          to="/shop"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Shop
        </Link>
      </div>

      {/* Product */}
      <div className="container-wide section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-[3/4] image-container">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.hoverImage && (
              <div className="aspect-[3/4] image-container">
                <img
                  src={product.hoverImage}
                  alt={`${product.name} alternate view`}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          {/* Details */}
          <div className="lg:sticky lg:top-24 lg:self-start space-y-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-light tracking-wide mb-2">
                {product.name}
              </h1>
              <p className="text-xl">${product.price}</p>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {/* Color */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs tracking-widest uppercase">Color</h4>
                {selectedColor && (
                  <span className="text-xs text-muted-foreground">{selectedColor}</span>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={cn(
                      "px-4 py-2 text-sm border transition-colors",
                      selectedColor === color
                        ? "bg-foreground text-background border-foreground"
                        : "border-border hover:border-foreground"
                    )}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs tracking-widest uppercase">Size</h4>
                <button
                  onClick={() => setShowSizeGuide(!showSizeGuide)}
                  className="text-xs underline hover:no-underline"
                >
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      "w-14 h-12 text-sm border transition-colors",
                      selectedSize === size
                        ? "bg-foreground text-background border-foreground"
                        : "border-border hover:border-foreground"
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {showSizeGuide && (
                <div className="mt-4 p-4 bg-secondary/50 text-sm">
                  <p className="text-muted-foreground">
                    XS: 32-34" / S: 34-36" / M: 38-40" / L: 42-44" / XL: 46-48"
                  </p>
                </div>
              )}
            </div>

            {/* Quantity */}
            <div>
              <h4 className="text-xs tracking-widest uppercase mb-3">Quantity</h4>
              <div className="flex items-center border border-border w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-secondary transition-colors"
                  disabled={quantity <= 1}
                >
                  <Minus size={16} />
                </button>
                <span className="px-6 text-sm">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-secondary transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                disabled={!selectedSize || !selectedColor}
                className={cn(
                  "btn-primary flex-1",
                  (!selectedSize || !selectedColor) && "opacity-50 cursor-not-allowed"
                )}
              >
                {!selectedSize || !selectedColor ? "Select options" : "Add to Cart"}
              </button>
              <button
                onClick={toggleWishlist}
                className="p-3 border border-border hover:border-foreground transition-colors"
              >
                <Heart
                  size={20}
                  className={cn(inWishlist && "fill-foreground")}
                />
              </button>
            </div>

            {/* Additional info */}
            <div className="pt-8 border-t border-border space-y-4 text-sm text-muted-foreground">
              <p>Free shipping on orders over $150</p>
              <p>Easy 30-day returns</p>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="section-padding bg-secondary/30">
          <div className="container-wide">
            <h2 className="text-2xl font-light tracking-wide mb-12 text-center">
              You may also like
            </h2>
            <div className="product-grid">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
