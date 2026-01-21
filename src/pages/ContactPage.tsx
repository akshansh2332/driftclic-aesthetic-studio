import { useState } from "react";
import { Mail, Instagram, Twitter, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ContactPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Message sent",
      description: "We'll get back to you within 24-48 hours.",
    });

    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <div className="section-padding">
      <div className="container-wide">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-light tracking-wide mb-4">Contact</h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Have a question? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-light tracking-wide mb-6">Get in Touch</h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                We typically respond within 24-48 hours. For urgent inquiries, please reach out via email.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Mail size={20} className="text-muted-foreground mt-1" />
                <div>
                  <h3 className="text-sm font-medium mb-1">Email</h3>
                  <a
                    href="mailto:hello@driftclic.com"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    hello@driftclic.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin size={20} className="text-muted-foreground mt-1" />
                <div>
                  <h3 className="text-sm font-medium mb-1">Location</h3>
                  <p className="text-muted-foreground">
                    Los Angeles, California
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-4">Follow Us</h3>
              <div className="flex gap-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 border border-border hover:border-foreground transition-colors"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 border border-border hover:border-foreground transition-colors"
                >
                  <Twitter size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-xs tracking-widest uppercase mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-transparent border border-border focus:border-foreground outline-none transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs tracking-widest uppercase mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-transparent border border-border focus:border-foreground outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-xs tracking-widest uppercase mb-2">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-transparent border border-border focus:border-foreground outline-none transition-colors"
                >
                  <option value="">Select a topic</option>
                  <option value="order">Order Inquiry</option>
                  <option value="shipping">Shipping & Returns</option>
                  <option value="product">Product Question</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-xs tracking-widest uppercase mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-transparent border border-border focus:border-foreground outline-none transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full disabled:opacity-50"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
