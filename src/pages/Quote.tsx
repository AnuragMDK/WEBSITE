import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { MessageCircle, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const quoteSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(200),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().optional(),
  company: z.string().optional(),
  service: z.string().min(1, "Please select a service"),
  message: z.string().trim().min(1, "Please describe your requirements").max(5000),
});

const services = [
  "Cyber Security Solutions",
  "Firewall Sales & Support",
  "CCTV & SIRA Compliance",
  "Enterprise WiFi Solutions",
  "Structured Cabling",
  "AMC Support",
  "Access Control Systems",
  "Alarm & Security Systems",
  "VAPT Testing",
  "Endpoint Protection",
  "Complete IT Infrastructure",
];

export default function QuotePage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const validatedData = quoteSchema.parse(formData);
      setIsSubmitting(true);

      const { error } = await supabase.from("leads").insert({
        name: validatedData.name,
        email: validatedData.email,
        phone: formData.phone || null,
        company: formData.company || null,
        service_interest: validatedData.service,
        message: validatedData.message,
      });

      if (error) throw error;

      setIsSubmitted(true);
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Validation Error",
          description: error.errors[0].message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to submit request. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <Layout>
        <section className="min-h-[80vh] flex items-center justify-center relative">
          <div className="absolute inset-0 bg-gradient-dark" />
          <div className="absolute inset-0 cyber-grid opacity-30" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-xl mx-auto text-center glass-card p-12">
              <div className="w-20 h-20 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center mx-auto mb-6 cyber-glow">
                <CheckCircle2 className="w-10 h-10 text-primary" />
              </div>
              <h1 className="text-3xl font-heading font-bold mb-4">
                Quote Request Received!
              </h1>
              <p className="text-muted-foreground mb-8">
                Thank you for your interest in CyberVision. Our team will review your 
                requirements and get back to you within 24 hours.
              </p>
              <a
                href="https://wa.me/971508033776"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="btn-cyber">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chat on WhatsApp Now
                </Button>
              </a>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-dark" />
        <div className="absolute inset-0 cyber-grid opacity-30" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium mb-4">
              Free Consultation
            </span>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Request a <span className="gradient-text">Custom Quote</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Tell us about your requirements and we'll prepare a tailored 
              solution for your business.
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="glass-card p-8 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Full Name *
                    </label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                      className="bg-muted/50 border-border/50 focus:border-primary"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email Address *
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                      className="bg-muted/50 border-border/50 focus:border-primary"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Phone Number
                    </label>
                    <Input
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+971 XX XXX XXXX"
                      className="bg-muted/50 border-border/50 focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Company
                    </label>
                    <Input
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Your company"
                      className="bg-muted/50 border-border/50 focus:border-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Service Required *
                  </label>
                  <Select
                    value={formData.service}
                    onValueChange={(value) => setFormData({ ...formData, service: value })}
                  >
                    <SelectTrigger className="bg-muted/50 border-border/50 focus:border-primary">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service} value={service}>
                          {service}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Project Details *
                  </label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your requirements, timeline, and any specific needs..."
                    rows={6}
                    className="bg-muted/50 border-border/50 focus:border-primary resize-none"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="btn-cyber w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Submitting..."
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Submit Quote Request
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-8 pt-8 border-t border-border/50 text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  Need immediate assistance?
                </p>
                <a
                  href="https://wa.me/971508033776"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" className="btn-cyber-outline">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Chat on WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
