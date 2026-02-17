import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(200, "Name is too long"),
  email: z.string().trim().email("Invalid email address").max(255, "Email is too long"),
  phone: z.string().optional(),
  company: z.string().optional(),
  message: z.string().trim().min(1, "Message is required").max(5000, "Message is too long"),
});

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    value: "+971 50 803 3776",
    href: "tel:+971508033776",
  },
  {
    icon: Mail,
    title: "Email",
    value: "info@cybervision.ae",
    href: "mailto:info@cybervision.ae",
  },
  {
    icon: MapPin,
    title: "Address",
    value: "Dubai, United Arab Emirates",
    href: "#",
  },
  {
    icon: Clock,
    title: "Support",
    value: "24/7 Available",
    href: "#",
  },
];

export default function ContactPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const validatedData = contactSchema.parse(formData);
      setIsSubmitting(true);

      const { error } = await supabase.from("leads").insert({
        name: validatedData.name,
        email: validatedData.email,
        phone: formData.phone || null,
        company: formData.company || null,
        message: validatedData.message,
      });

      if (error) throw error;

      toast({
        title: "Message Sent!",
        description: "We'll get back to you within 24 hours.",
      });

      setFormData({ name: "", email: "", phone: "", company: "", message: "" });
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
          description: "Failed to send message. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

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
              Get in Touch
            </span>
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
              Let's Secure Your <span className="gradient-text">Digital Future</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Contact our team for a free consultation and discover how we can 
              protect and optimize your infrastructure.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="space-y-6">
              <h2 className="font-heading font-bold text-2xl mb-8">Contact Information</h2>
              
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <a
                    key={index}
                    href={info.href}
                    className="glass-card p-6 flex items-start gap-4 group hover:border-primary/50 transition-all block"
                  >
                    <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0 group-hover:cyber-glow transition-all">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-heading font-bold mb-1">{info.title}</div>
                      <div className="text-muted-foreground">{info.value}</div>
                    </div>
                  </a>
                );
              })}

              {/* Map Placeholder */}
              <div className="glass-card p-4 mt-8">
                <div className="aspect-video rounded-lg bg-muted/50 flex items-center justify-center">
                  <MapPin className="w-12 h-12 text-muted-foreground/50" />
                </div>
                <p className="text-center text-sm text-muted-foreground mt-4">
                  Dubai, United Arab Emirates
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="glass-card p-8 md:p-12">
                <h2 className="font-heading font-bold text-2xl mb-6">Send us a Message</h2>
                
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
                      Message *
                    </label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your requirements..."
                      rows={6}
                      className="bg-muted/50 border-border/50 focus:border-primary resize-none"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="btn-cyber w-full md:w-auto"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
