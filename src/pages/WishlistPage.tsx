import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { ProductCard } from "@/components/product/ProductCard";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useCart();
  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  if (wishlistProducts.length === 0) {
    return (
      <div className="section-padding">
        <div className="container-wide text-center">
          <Heart size={48} className="mx-auto text-muted-foreground mb-6" />
          <h1 className="text-2xl font-light tracking-wide mb-4">Your Wishlist is Empty</h1>
          <p className="text-muted-foreground mb-8">
            Save items you love by clicking the heart icon.
          </p>
          <Link to="/shop" className="btn-primary inline-block">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="section-padding">
      <div className="container-wide">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-light tracking-wide mb-4">Wishlist</h1>
          <p className="text-muted-foreground">
            {wishlistProducts.length} {wishlistProducts.length === 1 ? "item" : "items"} saved
          </p>
        </div>

        <div className="product-grid">
          {wishlistProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
