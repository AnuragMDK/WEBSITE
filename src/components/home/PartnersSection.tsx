const partners = [
  "Cisco",
  "Fortinet",
  "Hikvision",
  "Dahua",
  "Ubiquiti",
  "Microsoft",
  "Sophos",
  "Palo Alto",
];

const certifications = [
  "ISO 27001",
  "SIRA Certified",
  "PCI DSS",
  "SOC 2",
];

export function PartnersSection() {
  return (
    <section className="py-16 relative border-y border-border/30">
      <div className="container mx-auto px-4">
        {/* Technology Partners */}
        <div className="mb-12">
          <p className="text-center text-sm text-muted-foreground mb-8 font-medium uppercase tracking-wider">
            Technology Partners
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="px-6 py-3 rounded-lg bg-card/50 border border-border/50 text-muted-foreground font-heading font-medium text-sm hover:text-primary hover:border-primary/50 transition-all"
              >
                {partner}
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <p className="text-center text-sm text-muted-foreground mb-8 font-medium uppercase tracking-wider">
            Certifications & Compliance
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="px-6 py-3 rounded-full bg-primary/10 border border-primary/30 text-primary font-medium text-sm"
              >
                {cert}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
