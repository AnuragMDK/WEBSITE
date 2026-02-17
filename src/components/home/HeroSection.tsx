import { Shield, ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-dark" />
      <div className="absolute inset-0 cyber-grid" />
      
      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/15 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: "1s" }} />
      
      {/* Scan Lines Effect */}
      <div className="absolute inset-0 scan-lines pointer-events-none" />

      {/* Floating Data Lines */}
      <div className="absolute left-[10%] top-0 data-flow h-64" style={{ animationDelay: "0s" }} />
      <div className="absolute left-[30%] top-0 data-flow h-48" style={{ animationDelay: "1s" }} />
      <div className="absolute right-[20%] top-0 data-flow h-56" style={{ animationDelay: "2s" }} />
      <div className="absolute right-[40%] top-0 data-flow h-40" style={{ animationDelay: "0.5s" }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-8 animate-fade-in">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Enterprise Security Solutions</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 animate-slide-up">
            <span className="text-foreground">Secure Your</span>
            <br />
            <span className="gradient-text text-glow">Digital Future</span>
            <br />
            <span className="text-foreground">with CyberVision</span>
          </h1>

          {/* Subtext */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            Advanced Cybersecurity, Surveillance, and Network Infrastructure 
            Solutions for Modern Businesses in the UAE.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: "0.4s" }}>
            <a
              href="https://wa.me/971508033776"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="btn-cyber group">
                <MessageCircle className="w-5 h-5 mr-2" />
                Chat on WhatsApp
              </Button>
            </a>
            <Link to="/quote">
              <Button className="btn-cyber-outline group">
                Request a Quote
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 animate-fade-in" style={{ animationDelay: "0.6s" }}>
            {[
              { value: "500+", label: "Projects Delivered" },
              { value: "24/7", label: "Support Available" },
              { value: "100%", label: "SIRA Compliant" },
              { value: "10+", label: "Years Experience" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="font-heading text-3xl md:text-4xl font-bold text-primary text-glow mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
