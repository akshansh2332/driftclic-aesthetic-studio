import lifestyleImage from "@/assets/lifestyle-1.jpg";

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src={lifestyleImage}
            alt="DriftClic About"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/30" />
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-light tracking-widest text-background">
            Our Story
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-narrow">
          <div className="space-y-12">
            <div>
              <h2 className="text-2xl font-light tracking-wide mb-6">The Philosophy</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                DriftClic was born from a simple idea: clothing should be effortless. In a world of constant noise and endless trends, we believe in the power of simplicity.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We design pieces that transcend seasons. Minimal silhouettes. Premium fabrics. Timeless colors. Every item is crafted to become a staple in your wardrobe—not a fleeting trend.
              </p>
            </div>

            <div className="border-l-2 border-foreground pl-8 py-4">
              <blockquote className="text-xl md:text-2xl font-light italic">
                "Less noise. More style."
              </blockquote>
            </div>

            <div>
              <h2 className="text-2xl font-light tracking-wide mb-6">Quality First</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We source only the finest materials—organic cotton, premium linen, sustainable blends. Each piece is designed in-house and produced in small batches to ensure quality over quantity.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our commitment to sustainability isn't just a trend. It's a core value. We believe that fashion should respect both the people who wear it and the planet we share.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-light tracking-wide mb-6">For Everyone</h2>
              <p className="text-muted-foreground leading-relaxed">
                DriftClic is designed for the modern individual—regardless of gender, age, or style. Our pieces are meant to be mixed, matched, and made your own. Because true style isn't about following rules. It's about feeling confident in what you wear.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-secondary/30">
        <div className="container-wide">
          <h2 className="text-2xl font-light tracking-wide mb-12 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <h3 className="text-lg font-medium tracking-wide mb-4">Simplicity</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Clean lines, neutral tones, minimal branding. Every design decision serves a purpose.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-medium tracking-wide mb-4">Quality</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Premium fabrics, expert craftsmanship. Pieces built to last, not to be replaced.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-medium tracking-wide mb-4">Sustainability</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Ethical production, eco-friendly materials. Fashion that respects our planet.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
