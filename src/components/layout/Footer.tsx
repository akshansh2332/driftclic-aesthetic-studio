import { Link } from "react-router-dom";
import { Instagram, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="container-wide section-padding">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="text-xl font-medium tracking-widest">
              DRIFTCLIC
            </Link>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Minimal fashion for the modern individual. Quality over quantity.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-xs tracking-widest uppercase mb-4">Shop</h4>
            <ul className="space-y-3">
              {["New Arrivals", "Best Sellers", "Men", "Women", "Unisex"].map((item) => (
                <li key={item}>
                  <Link
                    to="/shop"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-xs tracking-widest uppercase mb-4">Info</h4>
            <ul className="space-y-3">
              {["About Us", "Contact", "FAQ", "Shipping", "Returns"].map((item) => (
                <li key={item}>
                  <Link
                    to={item === "About Us" ? "/about" : item === "Contact" ? "/contact" : "#"}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xs tracking-widest uppercase mb-4">Stay Connected</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Join for early access and updates.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Email"
                className="flex-1 px-4 py-2 bg-background border border-border text-sm focus:outline-none focus:border-foreground transition-colors duration-200"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-foreground text-background text-sm tracking-wide hover:opacity-80 transition-opacity duration-200"
              >
                Join
              </button>
            </form>
            <div className="flex gap-4 mt-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © 2025 DriftClic. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-200">
              Privacy
            </Link>
            <Link to="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-200">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
