import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { useReveal } from "@/hooks/useReveal";

/* ── Shared split-section component ── */
interface ServiceSectionProps {
  tag: string;
  title: string;
  description: string;
  bullets: string[];
  image: string;
  imageAlt: string;
  reverse?: boolean;
  cta?: string;
}

const ServiceSection = ({
  tag, title, description, bullets, image, imageAlt, reverse = false, cta,
}: ServiceSectionProps) => {
  const ref = useReveal();

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="py-20 md:py-28 border-b border-border last:border-0"
    >
      <div className="container mx-auto px-6 max-w-[1320px]">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
            reverse ? "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1" : ""
          }`}
        >
          {/* Image */}
          <div className="nd-reveal">
            <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-secondary">
              <img
                src={image}
                alt={imageAlt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          {/* Content */}
          <div className="nd-reveal">
            <span className="text-xs font-bold tracking-[0.15em] uppercase text-primary">
              {tag}
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-foreground leading-tight tracking-tight">
              {title}
            </h2>
            <p className="mt-5 text-base text-muted-foreground leading-[1.8]">
              {description}
            </p>
            <ul className="mt-8 space-y-3">
              {bullets.map((b) => (
                <li key={b} className="flex items-center gap-3 text-sm text-foreground">
                  <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Check size={11} className="text-primary" strokeWidth={3} />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 mt-10 bg-foreground text-background text-sm font-semibold px-7 py-3.5 rounded-xl hover:bg-foreground/85 transition-colors duration-200"
            >
              {cta ?? "Get Started"} <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ── Page ── */
const ServicesPage = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">

        {/* Page hero */}
        <section className="py-16 md:py-24 bg-[hsl(45,100%,50%,0.04)] border-b border-border">
          <div className="container mx-auto px-6 max-w-[1320px]">
            <span className="nd-fade-up text-xs font-bold tracking-[0.15em] uppercase text-primary">
              What We Do
            </span>
            <h1 className="nd-fade-up delay-1 mt-3 text-4xl md:text-[3rem] font-extrabold text-foreground leading-tight tracking-tight max-w-2xl">
              Our Services
            </h1>
            <p className="nd-fade-up delay-2 mt-5 text-base text-muted-foreground max-w-xl leading-[1.8]">
              We offer end-to-end creative and digital services — from building your brand identity
              to growing your audience online. Everything your business needs, under one roof.
            </p>
          </div>
        </section>

        {/* Service 1 — Graphic Designing (image left) */}
        <ServiceSection
          tag="01 — Design"
          title="Graphic Designing"
          description="Great design is the foundation of every successful brand. We create visuals that communicate your values, attract your audience, and leave a lasting impression — across every touchpoint."
          bullets={[
            "Logo Design & Brand Identity",
            "Social Media Graphics",
            "Poster & Flyer Design",
            "Print Design (Business Cards, Banners)",
          ]}
          image="https://images.unsplash.com/photo-1626785774573-4b799315345d?w=900&q=85&auto=format&fit=crop"
          imageAlt="Graphic design workspace with branding mockups"
        />

        {/* Service 2 — Web Development (image right) */}
        <ServiceSection
          tag="02 — Development"
          title="Web Development"
          description="Your website is your most powerful sales tool. We build fast, responsive, and conversion-focused websites that look great on every device and help your business grow online."
          bullets={[
            "Business & Portfolio Websites",
            "Fully Responsive Design",
            "CMS Integration",
            "Landing Pages & E-commerce",
          ]}
          image="https://images.unsplash.com/photo-1547658719-da2b51169166?w=900&q=85&auto=format&fit=crop"
          imageAlt="Laptop showing a professional website UI"
          reverse
        />

        {/* Service 3 — Digital Marketing (image left) */}
        <ServiceSection
          tag="03 — Marketing"
          title="Digital Marketing"
          description="Reach the right people at the right time. Our data-driven marketing strategies help you build a strong online presence, grow your audience, and turn followers into paying customers."
          bullets={[
            "Social Media Marketing",
            "SEO Optimization",
            "Campaign Management",
            "Analytics & Reporting",
          ]}
          image="/images/DIGITAL MARKETING.webp"
          imageAlt="Digital marketing analytics dashboard"
        />

        {/* Service 4 — n8n Automation (image right) */}
        <ServiceSection
          tag="04 — Automation"
          title="n8n Automation"
          description="Automate your business workflows and save time with powerful no-code automation using n8n. From lead capture to data syncing, we build efficient systems that reduce manual work and let your team focus on what matters."
          bullets={[
            "Workflow Automation",
            "API Integrations",
            "Lead Management Automation",
            "WhatsApp & Email Automation",
            "CRM & Database Sync",
          ]}
          image="/images/N8N AUTOMATION.webp"
          imageAlt="n8n automation workflow dashboard with connected nodes"
          reverse
        />

        {/* Service 5 — Academic & Project Support (image left) */}
        <ServiceSection
          tag="05 — Academic Support"
          title="Academic & Project Support"
          description="Professional support for students to build high-quality academic projects, presentations, and reports with a practical and industry-focused approach. Delivered with clarity, structure, and attention to detail."
          bullets={[
            "Assignment Reports (Well-Structured & Formatted)",
            "Website-Based Projects",
            "PowerPoint Presentations",
            "Mini & Final Year Projects",
            "Project Documentation",
          ]}
          image="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&q=85&auto=format&fit=crop"
          imageAlt="Students collaborating on academic project with laptop"
          cta="Get Support"
        />

        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default ServicesPage;
