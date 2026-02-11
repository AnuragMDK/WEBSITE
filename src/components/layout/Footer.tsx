import { Link } from "react-router-dom";
import { Shield, Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from "lucide-react";

const footerLinks = {
  services: [
    { name: "Cyber Security", path: "/services#cyber-security" },
    { name: "CCTV & SIRA", path: "/services#cctv" },
    { name: "Network Infrastructure", path: "/services#network" },
    { name: "Access Control", path: "/services#access-control" },
  ],
  company: [
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Careers", path: "/careers" },
    { name: "Partners", path: "/partners" },
  ],
  support: [
    { name: "24/7 Support", path: "/contact" },
    { name: "Documentation", path: "/docs" },
    { name: "AMC Services", path: "/services#amc" },
    { name: "Request Quote", path: "/quote" },
  ],
};

export function Footer() {
  return (
    <footer className="relative bg-cyber-dark border-t border-border/30">
      {/* Background Effects */}
      <div className="absolute inset-0 cyber-grid opacity-30" />
      
      <div className="container mx-auto px-4 relative">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-primary/20 border border-primary/50 flex items-center justify-center">
                <Shield className="w-7 h-7 text-primary" />
              </div>
              <span className="font-heading text-2xl font-bold">
                Cyber<span className="text-primary">Vision</span>
              </span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Your trusted partner for advanced cybersecurity, surveillance, and 
              network infrastructure solutions in the UAE.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <a href="tel:+971508033776" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                <Phone className="w-4 h-4" />
                <span>+971 50 803 3776</span>
              </a>
              <a href="mailto:info@cybervision.ae" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                <Mail className="w-4 h-4" />
                <span>info@cybervision.ae</span>
              </a>
              <div className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>Dubai, United Arab Emirates</span>
              </div>
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider mb-4 text-foreground">
              Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider mb-4 text-foreground">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider mb-4 text-foreground">
              Support
            </h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-border/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} CyberVision.ae. All rights reserved.
          </p>
          
          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
