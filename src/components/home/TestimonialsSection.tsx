import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Ahmed Al Rashid",
    company: "Dubai Tech Solutions",
    content: "CyberVision transformed our entire IT infrastructure. Their team's expertise in both security and networking is unmatched. Highly recommended for any enterprise.",
    rating: 5,
  },
  {
    name: "Sarah Johnson",
    company: "Emirates Healthcare Group",
    content: "The SIRA-compliant CCTV system they installed exceeded our expectations. Professional, efficient, and their 24/7 support is genuinely available.",
    rating: 5,
  },
  {
    name: "Mohammed Al Maktoum",
    company: "Al Futtaim Retail",
    content: "From structured cabling to access control, CyberVision delivered a complete solution that scaled perfectly with our expansion across multiple locations.",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyber-dark/50 to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
            Trusted by <span className="gradient-text">Industry Leaders</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            See what our clients say about partnering with CyberVision for their 
            security and infrastructure needs.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="glass-card p-8 relative group hover:border-primary/50 transition-all duration-300"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 text-primary/20">
                <Quote className="w-12 h-12" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>

              {/* Content */}
              <p className="text-muted-foreground mb-6 relative z-10">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div>
                <div className="font-heading font-bold">{testimonial.name}</div>
                <div className="text-sm text-muted-foreground">{testimonial.company}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
