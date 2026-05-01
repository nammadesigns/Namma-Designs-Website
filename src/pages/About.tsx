import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import Stats from "@/components/Stats";
import { useReveal } from "@/hooks/useReveal";
import { DollarSign, Star, Zap, Lightbulb } from "lucide-react";

const values = [
  {
    icon: DollarSign,
    title: "Affordable Pricing",
    desc: "Agency-quality work at prices that work for every budget.",
  },
  {
    icon: Star,
    title: "Premium Quality",
    desc: "Every deliverable is crafted with care, precision, and intent.",
  },
  {
    icon: Zap,
    title: "Fast Delivery",
    desc: "Quick turnarounds without ever compromising on quality.",
  },
  {
    icon: Lightbulb,
    title: "Creative Approach",
    desc: "Fresh ideas and original thinking on every single project.",
  },
];

const About = () => {
  const storyRef = useReveal();
  const valuesRef = useReveal();

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">

        {/* ── SECTION 1: Hero split ── */}
        <section className="py-16 md:py-24 bg-[hsl(45,100%,50%,0.04)] border-b border-border">
          <div className="container mx-auto px-6 max-w-[1320px]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

              {/* Left: heading */}
              <div>
                <span className="nd-fade-up text-xs font-bold tracking-[0.15em] uppercase text-primary">
                  About Us
                </span>
                <h1 className="nd-fade-up delay-1 mt-3 text-4xl md:text-[3rem] font-extrabold text-foreground leading-[1.1] tracking-tight">
                  Design That Speaks<br />Before You Do
                </h1>
                <p className="nd-fade-up delay-2 mt-6 text-base text-muted-foreground leading-[1.8] max-w-md">
                  We're a creative studio from Karnataka building brands that communicate
                  clearly, look premium, and perform consistently.
                </p>
              </div>

              {/* Right: relevant image */}
              <div className="nd-fade-up delay-2">
                <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-secondary">
                  <img
                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&q=85&auto=format&fit=crop"
                    alt="Creative team collaborating on design work"
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── SECTION 2: Story split ── */}
        <section
          ref={storyRef as React.RefObject<HTMLElement>}
          className="py-20 md:py-28 bg-white border-b border-border"
        >
          <div className="container mx-auto px-6 max-w-[1320px]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

              {/* Left: story text */}
              <div className="nd-reveal space-y-5 text-base text-muted-foreground leading-[1.85]">
                <span className="block text-xs font-bold tracking-[0.15em] uppercase text-primary mb-4">
                  Our Story
                </span>
                <p>
                  Founded in 2025, <strong className="text-foreground font-semibold">Namma Designs</strong> was
                  built on a simple belief — great design should be accessible to every business,
                  not just the ones with big budgets.
                </p>
                <p>
                  We're a creative studio based in Kundapura, Karnataka, specializing in brand
                  identity, social media design, marketing materials, and web development.
                  Our work is rooted in clarity, purpose, and craft.
                </p>
                <p>
                  What sets us apart is our commitment to delivering agency-quality output at
                  prices that make sense — up to 20% more affordable than traditional agencies,
                  with zero compromise on quality or turnaround time.
                </p>
              </div>

              {/* Right: design process image */}
              <div className="nd-reveal">
                <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-secondary">
                  <img
                    src="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=900&q=85&auto=format&fit=crop"
                    alt="Designer working on brand identity project"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── SECTION 3: Values ── */}
        <section
          ref={valuesRef as React.RefObject<HTMLElement>}
          className="py-20 md:py-24 bg-[hsl(45,100%,50%,0.04)] border-b border-border"
        >
          <div className="container mx-auto px-6 max-w-[1320px]">

            <div className="nd-reveal mb-14">
              <span className="text-xs font-bold tracking-[0.15em] uppercase text-primary">
                Why Choose Us
              </span>
              <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-foreground leading-tight tracking-tight">
                What Drives Us
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="nd-reveal bg-white rounded-2xl p-8 border border-border hover:border-primary/30 hover:shadow-md transition-all duration-300"
                >
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                    <Icon size={20} className="text-primary" />
                  </div>
                  <h3 className="text-sm font-extrabold text-foreground mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ── SECTION 4: Stats ── */}
        <Stats />

        {/* ── SECTION 5: CTA ── */}
        <CTASection />

      </main>
      <Footer />
    </div>
  );
};

export default About;
