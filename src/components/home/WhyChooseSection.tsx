import { Clock, Zap, Award, TrendingUp, Shield } from "lucide-react";

const features = [
  {
    icon: Clock,
    title: "24/7 Technical Support",
    description: "Round-the-clock expert assistance for all your security and infrastructure needs.",
  },
  {
    icon: Zap,
    title: "Fast Deployment",
    description: "Rapid implementation with minimal disruption to your business operations.",
  },
  {
    icon: Award,
    title: "Certified Engineers",
    description: "Our team holds top industry certifications ensuring quality service delivery.",
  },
  {
    icon: TrendingUp,
    title: "Scalable Infrastructure",
    description: "Solutions designed to grow with your business from startup to enterprise.",
  },
  {
    icon: Shield,
    title: "Industry Best Practices",
    description: "Following global security standards and compliance requirements.",
  },
];

export function WhyChooseSection() {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <span className="inline-block px-4 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium mb-4">
              Why CyberVision
            </span>
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">
              Your Trusted <span className="gradient-text">Technology Partner</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              We don't just provide security solutions — we build long-term partnerships 
              that help your business thrive in an increasingly digital world.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="stat-glow p-4 rounded-xl bg-card/50 text-center">
                <div className="font-heading text-2xl md:text-3xl font-bold text-primary">500+</div>
                <div className="text-xs text-muted-foreground mt-1">Projects</div>
              </div>
              <div className="stat-glow p-4 rounded-xl bg-card/50 text-center">
                <div className="font-heading text-2xl md:text-3xl font-bold text-primary">98%</div>
                <div className="text-xs text-muted-foreground mt-1">Satisfaction</div>
              </div>
              <div className="stat-glow p-4 rounded-xl bg-card/50 text-center">
                <div className="font-heading text-2xl md:text-3xl font-bold text-primary">10+</div>
                <div className="text-xs text-muted-foreground mt-1">Years</div>
              </div>
            </div>
          </div>

          {/* Right Content - Features */}
          <div className="space-y-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="glass-card p-5 flex items-start gap-4 group hover:border-primary/50 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
