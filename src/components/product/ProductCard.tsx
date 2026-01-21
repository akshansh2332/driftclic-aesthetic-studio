import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useCart();
  const inWishlist = isInWishlist(product.id);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="group product-card block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <div className="relative aspect-[3/4] image-container mb-4">
        <img
          src={isHovered && product.hoverImage ? product.hoverImage : product.image}
          alt={product.name}
          className="product-image"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <span className="px-2 py-1 bg-background text-[10px] tracking-widest uppercase">
              New
            </span>
          )}
          {product.isBestSeller && (
            <span className="px-2 py-1 bg-foreground text-background text-[10px] tracking-widest uppercase">
              Best Seller
            </span>
          )}
        </div>

        {/* Wishlist button */}
        <button
          onClick={toggleWishlist}
          className={cn(
            "absolute top-3 right-3 p-2 bg-background/90 backdrop-blur-sm transition-all duration-200",
            "opacity-0 group-hover:opacity-100",
            inWishlist && "opacity-100"
          )}
        >
          <Heart
            size={16}
            className={cn(
              "transition-all duration-200",
              inWishlist && "fill-foreground"
            )}
          />
        </button>

        {/* Quick add */}
        <div className={cn(
          "absolute bottom-0 left-0 right-0 p-4 bg-background/90 backdrop-blur-sm transition-all duration-300",
          "opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"
        )}>
          <span className="text-xs tracking-widest uppercase text-center block">
            Quick View
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="space-y-1">
        <h3 className="text-sm font-medium">{product.name}</h3>
        <p className="text-sm text-muted-foreground">${product.price}</p>
      </div>
    </Link>
  );
}
