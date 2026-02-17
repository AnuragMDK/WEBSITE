import { Layout } from "@/components/layout/Layout";
import { Shield, Target, Eye, Award, Users, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const values = [
  {
    icon: Shield,
    title: "Security First",
    description: "Every solution we design prioritizes the security of your data and infrastructure.",
  },
  {
    icon: Target,
    title: "Precision",
    description: "We deliver targeted solutions that address your specific business challenges.",
  },
  {
    icon: Eye,
    title: "Vigilance",
    description: "24/7 monitoring and proactive threat detection keep you protected.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "Industry certifications and best practices guide everything we do.",
  },
];

const team = [
  {
    name: "Senior Security Consultants",
    count: "10+",
    description: "CISSP, CEH certified experts",
  },
  {
    name: "Network Engineers",
    count: "15+",
    description: "Cisco & Fortinet certified",
  },
  {
    name: "Field Technicians",
    count: "20+",
    description: "Rapid deployment teams",
  },
  {
    name: "Support Staff",
    count: "24/7",
    description: "Always available help desk",
  },
];

export default function AboutPage() {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-dark" />
        <div className="absolute inset-0 cyber-grid opacity-30" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[120px]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1 rounded-full bg-secondary/10 border border-secondary/30 text-secondary text-sm font-medium mb-4">
              About CyberVision
            </span>
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
              Securing <span className="gradient-text">UAE's Digital</span> Infrastructure
            </h1>
            <p className="text-xl text-muted-foreground">
              With over a decade of experience, CyberVision has established itself 
              as a trusted partner for enterprise security and IT infrastructure in the UAE.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                To provide businesses across the UAE and GCC with world-class 
                cybersecurity and IT infrastructure solutions that protect their 
                assets, enable growth, and ensure operational continuity.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                We believe that every organization deserves access to enterprise-grade 
                security, regardless of size. Our solutions are designed to scale with 
                your business, from startup to multinational corporation.
              </p>
              <div className="flex items-center gap-8 mt-8">
                <div className="flex items-center gap-3">
                  <Users className="w-8 h-8 text-primary" />
                  <div>
                    <div className="font-heading font-bold text-2xl">500+</div>
                    <div className="text-sm text-muted-foreground">Clients</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="w-8 h-8 text-primary" />
                  <div>
                    <div className="font-heading font-bold text-2xl">7</div>
                    <div className="text-sm text-muted-foreground">Countries</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="glass-card p-8 md:p-12">
              <h3 className="font-heading font-bold text-2xl mb-6">Our Vision</h3>
              <p className="text-muted-foreground mb-8">
                To become the leading provider of integrated security and infrastructure 
                solutions in the Middle East, setting the standard for innovation, 
                reliability, and customer service.
              </p>
              <div className="space-y-4">
                {["SIRA Certified Partner", "ISO 27001 Compliant", "24/7 SOC Operations", "Local UAE Expertise"].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-gradient-to-b from-background to-cyber-dark/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Our Core Values
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The principles that guide our work and define our commitment to our clients.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="glass-card-hover p-8 text-center">
                  <div className="w-16 h-16 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-heading font-bold text-xl mb-3">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Stats */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Our Team
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A dedicated team of certified professionals ready to secure your business.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="glass-card p-8 text-center">
                <div className="font-heading text-4xl font-bold text-primary text-glow mb-2">
                  {member.count}
                </div>
                <h3 className="font-heading font-bold mb-2">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-t from-background to-cyber-dark/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Partner with CyberVision
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Join hundreds of businesses that trust us with their security and infrastructure needs.
          </p>
          <Link to="/contact">
            <Button className="btn-cyber">Contact Our Team</Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
