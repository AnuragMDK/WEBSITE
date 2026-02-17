import { 
  Shield, 
  ShieldCheck, 
  Camera, 
  Wifi, 
  Cable, 
  Wrench, 
  Fingerprint, 
  Bell, 
  Search, 
  Lock,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    icon: Shield,
    title: "Cyber Security Solutions",
    description: "Comprehensive protection against modern cyber threats with advanced threat detection.",
    color: "primary",
  },
  {
    icon: ShieldCheck,
    title: "Firewall Sales & Support",
    description: "Enterprise-grade firewall solutions with 24/7 monitoring and expert configuration.",
    color: "primary",
  },
  {
    icon: Camera,
    title: "CCTV & SIRA Compliance",
    description: "Full SIRA-compliant surveillance systems with HD cameras and centralized monitoring.",
    color: "secondary",
  },
  {
    icon: Wifi,
    title: "Enterprise WiFi Solutions",
    description: "High-performance wireless networks designed for enterprise environments.",
    color: "primary",
  },
  {
    icon: Cable,
    title: "Structured Cabling",
    description: "Professional Cat6, fiber optic cabling, and complete server room infrastructure.",
    color: "secondary",
    featured: true,
  },
  {
    icon: Wrench,
    title: "AMC Support",
    description: "Comprehensive Annual Maintenance Contracts for uninterrupted IT operations.",
    color: "primary",
  },
  {
    icon: Fingerprint,
    title: "Access Control Systems",
    description: "Biometric, card-based, and smart access solutions for secure facility management.",
    color: "secondary",
  },
  {
    icon: Bell,
    title: "Alarm & Security Systems",
    description: "Integrated alarm systems with 24/7 monitoring and rapid response protocols.",
    color: "primary",
  },
  {
    icon: Search,
    title: "VAPT Testing",
    description: "Thorough Vulnerability Assessment and Penetration Testing by certified experts.",
    color: "secondary",
  },
  {
    icon: Lock,
    title: "Endpoint Protection",
    description: "Advanced antivirus and endpoint security solutions for complete device protection.",
    color: "primary",
  },
];

export function ServicesSection() {
  return (
    <section className="section-padding relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-cyber-dark/50 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium mb-4">
            Our Services
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
            Complete <span className="gradient-text">Security & Infrastructure</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From cybersecurity to network infrastructure, we deliver end-to-end solutions 
            that protect and empower your business.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className={`glass-card-hover p-6 group ${
                  service.featured ? "lg:col-span-1 xl:col-span-1 ring-1 ring-primary/30" : ""
                }`}
              >
                <div className={`icon-container mb-4 group-hover:scale-110 transition-transform duration-300 ${
                  service.color === "secondary" ? "bg-secondary/20 border-secondary/30" : ""
                }`}>
                  <Icon className={`w-8 h-8 ${service.color === "secondary" ? "text-secondary" : "text-primary"}`} />
                </div>
                <h3 className="font-heading text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {service.description}
                </p>
                {service.featured && (
                  <span className="inline-block mt-3 text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                    Core Capability
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* View All Link */}
        <div className="text-center mt-12">
          <Link to="/services" className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all">
            View All Services
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
