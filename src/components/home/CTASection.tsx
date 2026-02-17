import { MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function CTASection() {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />
      <div className="absolute inset-0 cyber-grid opacity-20" />
      
      {/* Glow Effects */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-secondary/20 rounded-full blur-[100px]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center glass-card p-12 md:p-16">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
            Build a Secure and <span className="gradient-text">Reliable IT Foundation</span> Today
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let our experts design a comprehensive security and infrastructure 
            solution tailored to your business needs.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/971508033776"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="btn-cyber group">
                <MessageCircle className="w-5 h-5 mr-2" />
                Start WhatsApp Chat
              </Button>
            </a>
            <Link to="/contact">
              <Button className="btn-cyber-outline group">
                Contact Us
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
