import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Filter, X } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { products } from "@/data/products";
import { cn } from "@/lib/utils";

const categories = ["all", "men", "women", "unisex"];
const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
const colors = ["Off White", "Black", "Stone", "Sand", "Navy", "Cream", "Grey"];
const priceRanges = [
  { label: "All", min: 0, max: Infinity },
  { label: "Under $100", min: 0, max: 100 },
  { label: "$100 - $200", min: 100, max: 200 },
  { label: "Over $200", min: 200, max: Infinity },
];

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);

  const categoryParam = searchParams.get("category") || "all";
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState(0);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category filter
      if (selectedCategory !== "all" && product.category !== selectedCategory) {
        return false;
      }

      // Size filter
      if (selectedSize && !product.sizes.includes(selectedSize)) {
        return false;
      }

      // Color filter
      if (selectedColor && !product.colors.some(c => c.toLowerCase().includes(selectedColor.toLowerCase()))) {
        return false;
      }

      // Price filter
      const range = priceRanges[selectedPriceRange];
      if (product.price < range.min || product.price > range.max) {
        return false;
      }

      return true;
    });
  }, [selectedCategory, selectedSize, selectedColor, selectedPriceRange]);

  const clearFilters = () => {
    setSelectedCategory("all");
    setSelectedSize(null);
    setSelectedColor(null);
    setSelectedPriceRange(0);
    setSearchParams({});
  };

  const hasActiveFilters = selectedCategory !== "all" || selectedSize || selectedColor || selectedPriceRange > 0;

  return (
    <div className="section-padding">
      <div className="container-wide">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-light tracking-wide mb-4">Shop</h1>
          <p className="text-muted-foreground">
            {filteredProducts.length} {filteredProducts.length === 1 ? "item" : "items"}
          </p>
        </div>

        {/* Filter bar */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
          {/* Category tabs */}
          <div className="hidden md:flex gap-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  if (cat === "all") {
                    searchParams.delete("category");
                  } else {
                    searchParams.set("category", cat);
                  }
                  setSearchParams(searchParams);
                }}
                className={cn(
                  "text-sm tracking-wide capitalize transition-opacity duration-200",
                  selectedCategory === cat ? "opacity-100" : "opacity-50 hover:opacity-80"
                )}
              >
                {cat === "all" ? "All" : cat}
              </button>
            ))}
          </div>

          {/* Mobile filter toggle + Desktop filter button */}
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="flex items-center gap-2 text-sm tracking-wide"
          >
            <Filter size={16} />
            Filters
            {hasActiveFilters && (
              <span className="w-2 h-2 bg-foreground rounded-full" />
            )}
          </button>

          {/* Clear filters */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Clear all
            </button>
          )}
        </div>

        {/* Expanded filters */}
        <div
          className={cn(
            "overflow-hidden transition-all duration-300 ease-smooth",
            filtersOpen ? "max-h-96 opacity-100 mb-8" : "max-h-0 opacity-0"
          )}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 p-6 bg-secondary/30">
            {/* Mobile category */}
            <div className="md:hidden col-span-2">
              <h4 className="text-xs tracking-widest uppercase mb-3">Category</h4>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={cn(
                      "px-3 py-1 text-sm border transition-colors",
                      selectedCategory === cat
                        ? "bg-foreground text-background border-foreground"
                        : "border-border hover:border-foreground"
                    )}
                  >
                    {cat === "all" ? "All" : cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div>
              <h4 className="text-xs tracking-widest uppercase mb-3">Size</h4>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(selectedSize === size ? null : size)}
                    className={cn(
                      "w-10 h-10 text-sm border transition-colors",
                      selectedSize === size
                        ? "bg-foreground text-background border-foreground"
                        : "border-border hover:border-foreground"
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color */}
            <div>
              <h4 className="text-xs tracking-widest uppercase mb-3">Color</h4>
              <div className="flex flex-wrap gap-2">
                {colors.slice(0, 5).map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(selectedColor === color ? null : color)}
                    className={cn(
                      "px-3 py-1 text-sm border transition-colors",
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

            {/* Price */}
            <div>
              <h4 className="text-xs tracking-widest uppercase mb-3">Price</h4>
              <div className="flex flex-wrap gap-2">
                {priceRanges.map((range, idx) => (
                  <button
                    key={range.label}
                    onClick={() => setSelectedPriceRange(idx)}
                    className={cn(
                      "px-3 py-1 text-sm border transition-colors",
                      selectedPriceRange === idx
                        ? "bg-foreground text-background border-foreground"
                        : "border-border hover:border-foreground"
                    )}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Products grid */}
        {filteredProducts.length > 0 ? (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="text-muted-foreground mb-4">No products match your filters.</p>
            <button
              onClick={clearFilters}
              className="text-sm underline hover:no-underline transition-all"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
