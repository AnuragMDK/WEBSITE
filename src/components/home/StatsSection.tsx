import { Shield, Users, Clock, Award } from "lucide-react";

const stats = [
  {
    icon: Shield,
    value: "99.9%",
    label: "Uptime Guarantee",
    description: "Enterprise-grade reliability",
  },
  {
    icon: Users,
    value: "500+",
    label: "Active Clients",
    description: "Across UAE & GCC",
  },
  {
    icon: Clock,
    value: "<2hr",
    label: "Response Time",
    description: "For critical issues",
  },
  {
    icon: Award,
    value: "50+",
    label: "Certifications",
    description: "Industry recognized",
  },
];

export function StatsSection() {
  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="text-center group"
              >
                <div className="w-16 h-16 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-4 group-hover:cyber-glow transition-all duration-300">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <div className="font-heading text-4xl md:text-5xl font-bold text-primary text-glow mb-2">
                  {stat.value}
                </div>
                <div className="font-heading font-bold text-foreground mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.description}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
