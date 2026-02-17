import { 
  Heart, 
  Landmark, 
  ShoppingBag, 
  Truck, 
  Building2, 
  GraduationCap, 
  Briefcase, 
  Server 
} from "lucide-react";

const industries = [
  { icon: Heart, name: "Healthcare", description: "HIPAA-compliant security solutions" },
  { icon: Landmark, name: "Finance", description: "Banking-grade protection" },
  { icon: ShoppingBag, name: "Retail", description: "POS and inventory security" },
  { icon: Truck, name: "Logistics", description: "Fleet and warehouse monitoring" },
  { icon: Building2, name: "Government", description: "Classified data protection" },
  { icon: GraduationCap, name: "Education", description: "Campus-wide security" },
  { icon: Briefcase, name: "Corporate Offices", description: "Enterprise infrastructure" },
  { icon: Server, name: "Data Centers", description: "Critical infrastructure security" },
];

export function IndustriesSection() {
  return (
    <section className="section-padding relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background to-cyber-dark/50" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-secondary/10 border border-secondary/30 text-secondary text-sm font-medium mb-4">
            Industries We Serve
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
            Tailored Solutions for <span className="gradient-text">Every Sector</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our expertise spans multiple industries, delivering customized security 
            and infrastructure solutions that meet your specific requirements.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {industries.map((industry, index) => {
            const Icon = industry.icon;
            return (
              <div
                key={index}
                className="glass-card-hover p-6 text-center group"
              >
                <div className="w-16 h-16 rounded-full bg-secondary/10 border border-secondary/30 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="font-heading font-bold mb-1">{industry.name}</h3>
                <p className="text-xs text-muted-foreground">{industry.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
