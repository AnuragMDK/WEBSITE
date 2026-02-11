import { Layout } from "@/components/layout/Layout";
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
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const services = [
  {
    id: "cyber-security",
    icon: Shield,
    title: "Cyber Security Solutions",
    description: "Comprehensive protection against modern cyber threats with advanced threat detection and response systems.",
    features: [
      "Threat detection and response",
      "Security monitoring",
      "Incident response planning",
      "Security awareness training",
      "Risk assessment",
    ],
  },
  {
    id: "firewall",
    icon: ShieldCheck,
    title: "Firewall Sales & Support",
    description: "Enterprise-grade firewall solutions with 24/7 monitoring and expert configuration services.",
    features: [
      "Next-gen firewall deployment",
      "Configuration & optimization",
      "24/7 monitoring",
      "Firmware updates",
      "Performance tuning",
    ],
  },
  {
    id: "cctv",
    icon: Camera,
    title: "CCTV & SIRA Compliance",
    description: "Full SIRA-compliant surveillance systems with HD cameras and centralized monitoring.",
    features: [
      "SIRA-approved systems",
      "HD/4K camera installation",
      "Remote viewing setup",
      "NVR/DVR configuration",
      "Compliance documentation",
    ],
  },
  {
    id: "wifi",
    icon: Wifi,
    title: "Enterprise WiFi Solutions",
    description: "High-performance wireless networks designed for enterprise environments and seamless coverage.",
    features: [
      "Site survey & planning",
      "Enterprise AP deployment",
      "Guest network setup",
      "Bandwidth management",
      "WiFi analytics",
    ],
  },
  {
    id: "cabling",
    icon: Cable,
    title: "Structured Cabling",
    description: "Professional Cat6, fiber optic cabling, and complete server room infrastructure.",
    features: [
      "Cat6/Cat6A cabling",
      "Fiber optic installation",
      "Server room setup",
      "Cable management",
      "Testing & certification",
    ],
    featured: true,
  },
  {
    id: "amc",
    icon: Wrench,
    title: "AMC Support",
    description: "Comprehensive Annual Maintenance Contracts for uninterrupted IT operations.",
    features: [
      "Preventive maintenance",
      "Priority support",
      "Regular health checks",
      "Hardware replacement",
      "Performance optimization",
    ],
  },
  {
    id: "access-control",
    icon: Fingerprint,
    title: "Access Control Systems",
    description: "Biometric, card-based, and smart access solutions for secure facility management.",
    features: [
      "Biometric systems",
      "Card access systems",
      "Time & attendance",
      "Visitor management",
      "Integration with CCTV",
    ],
  },
  {
    id: "alarm",
    icon: Bell,
    title: "Alarm & Security Systems",
    description: "Integrated alarm systems with 24/7 monitoring and rapid response protocols.",
    features: [
      "Intrusion detection",
      "Fire alarm systems",
      "24/7 monitoring",
      "Mobile alerts",
      "Emergency response",
    ],
  },
  {
    id: "vapt",
    icon: Search,
    title: "VAPT Testing",
    description: "Thorough Vulnerability Assessment and Penetration Testing by certified security experts.",
    features: [
      "Network penetration testing",
      "Web app security testing",
      "Vulnerability scanning",
      "Detailed reporting",
      "Remediation guidance",
    ],
  },
  {
    id: "endpoint",
    icon: Lock,
    title: "Endpoint Protection",
    description: "Advanced antivirus and endpoint security solutions for complete device protection.",
    features: [
      "Advanced threat protection",
      "Ransomware defense",
      "Device encryption",
      "Centralized management",
      "Real-time monitoring",
    ],
  },
];

export default function ServicesPage() {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-dark" />
        <div className="absolute inset-0 cyber-grid opacity-30" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium mb-4">
              Our Services
            </span>
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
              Complete <span className="gradient-text">Security & Infrastructure</span> Solutions
            </h1>
            <p className="text-xl text-muted-foreground">
              From cybersecurity to network infrastructure, we deliver end-to-end 
              solutions that protect and empower your business.
            </p>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            {services.map((service, index) => {
              const Icon = service.icon;
              const isEven = index % 2 === 0;
              
              return (
                <div
                  key={service.id}
                  id={service.id}
                  className={`grid lg:grid-cols-2 gap-12 items-center ${
                    !isEven ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  <div className={!isEven ? "lg:order-2" : ""}>
                    <div className="icon-container mb-6 w-20 h-20">
                      <Icon className="w-10 h-10 text-primary" />
                    </div>
                    {service.featured && (
                      <span className="inline-block mb-4 text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                        Core Capability
                      </span>
                    )}
                    <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                      {service.title}
                    </h2>
                    <p className="text-lg text-muted-foreground mb-6">
                      {service.description}
                    </p>
                    <Link to="/quote">
                      <Button className="btn-cyber-outline group">
                        Request Quote
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                  
                  <div className={`glass-card p-8 ${!isEven ? "lg:order-1" : ""}`}>
                    <h3 className="font-heading font-bold mb-6">Key Features</h3>
                    <ul className="space-y-4">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-b from-background to-cyber-dark/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Contact our team for a free consultation and discover how we can 
            secure and optimize your infrastructure.
          </p>
          <a
            href="https://wa.me/971508033776"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="btn-cyber">Chat on WhatsApp</Button>
          </a>
        </div>
      </section>
    </Layout>
  );
}
