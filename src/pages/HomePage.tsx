import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { products, collections } from "@/data/products";
import heroImage from "@/assets/hero-main.jpg";
import lifestyleImage from "@/assets/lifestyle-1.jpg";

export default function HomePage() {
  const bestSellers = products.filter((p) => p.isBestSeller);
  const newArrivals = products.filter((p) => p.isNew);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="DriftClic Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-background/20" />
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-widest mb-4 animate-fade-in">
            DRIFTCLIC
          </h1>
          <p className="text-lg md:text-xl font-light tracking-wide text-foreground/80 mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Less noise. More style.
          </p>
          <Link
            to="/shop"
            className="btn-primary inline-block animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Collections */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-light tracking-wide">Collections</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {collections.map((collection) => (
              <Link
                key={collection.id}
                to={`/shop?category=${collection.id}`}
                className="group relative aspect-[3/4] image-container"
              >
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-foreground/10 group-hover:bg-foreground/20 transition-colors duration-300" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-background">
                  <h3 className="text-2xl md:text-3xl font-light tracking-widest mb-2">
                    {collection.name}
                  </h3>
                  <p className="text-sm tracking-wide opacity-90">
                    {collection.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="section-padding bg-secondary/30">
        <div className="container-wide">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-2xl md:text-3xl font-light tracking-wide">Best Sellers</h2>
            <Link
              to="/shop"
              className="text-sm tracking-wide flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity"
            >
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="product-grid">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Lifestyle Image */}
      <section className="relative h-[70vh] min-h-[500px]">
        <img
          src={lifestyleImage}
          alt="DriftClic Lifestyle"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/10" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-background px-4">
            <p className="text-lg md:text-xl font-light tracking-wide mb-6">
              Designed for everyday comfort
            </p>
            <Link to="/about" className="btn-outline border-background text-background hover:bg-background hover:text-foreground">
              Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-2xl md:text-3xl font-light tracking-wide">New Arrivals</h2>
            <Link
              to="/shop"
              className="text-sm tracking-wide flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity"
            >
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="product-grid">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="section-padding bg-secondary/50">
        <div className="container-narrow text-center">
          <h2 className="text-2xl md:text-3xl font-light tracking-wide mb-4">
            Join the Community
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Get early access to new drops and exclusive offers.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 px-6 py-3 bg-background border border-border text-sm focus:outline-none focus:border-foreground transition-colors"
            />
            <button type="submit" className="btn-primary">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
