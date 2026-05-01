import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Hero = () => (
  <section className="bg-[hsl(45,100%,50%,0.04)] pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden">
    <div className="container mx-auto px-6 max-w-[1320px]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

        {/* ── Left: Copy ── */}
        <div className="order-2 lg:order-1">
          <span className="nd-fade-up inline-block text-xs font-bold tracking-[0.15em] uppercase text-primary mb-5">
            Creative Design Studio · Kundapura
          </span>

          <h1 className="nd-fade-up delay-1 text-[2.6rem] sm:text-5xl lg:text-[3.4rem] font-extrabold text-foreground leading-[1.08] tracking-tight">
            We Design Brands<br />
            That{" "}
            <span className="relative whitespace-nowrap">
              <span className="relative z-10">Stand Out</span>
              <svg
                className="absolute -bottom-1 left-0 w-full"
                viewBox="0 0 200 10"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M0 8 Q50 0 100 6 Q150 12 200 4"
                  stroke="hsl(45,100%,50%)"
                  strokeWidth="3.5"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <p className="nd-fade-up delay-2 mt-6 text-base md:text-[1.05rem] text-muted-foreground leading-[1.75] max-w-[460px]">
            From bold brand identities to high-converting social media campaigns —
            Namma Designs delivers agency-quality work at prices that make sense for every business.
          </p>

          <div className="nd-fade-up delay-3 flex flex-col sm:flex-row gap-3 mt-9">
            <Link
              to="/services"
              className="inline-flex items-center justify-center gap-2 bg-foreground text-background text-sm font-semibold px-7 py-3.5 rounded-xl hover:bg-foreground/85 transition-colors duration-200"
            >
              Explore Services
              <ArrowRight size={15} />
            </Link>
            <Link
              to="/ourworks"
              className="inline-flex items-center justify-center gap-2 border border-border bg-white text-foreground text-sm font-semibold px-7 py-3.5 rounded-xl hover:border-foreground transition-colors duration-200"
            >
              View Our Work
            </Link>
          </div>

          {/* Stats strip */}
          <div className="nd-fade-up delay-4 flex flex-wrap gap-x-8 gap-y-4 mt-12 pt-8 border-t border-border">
            {[
              { value: "50+", label: "Projects Delivered" },
              { value: "10+", label: "Happy Clients" },
              { value: "5.0★", label: "Average Rating" },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="text-2xl font-extrabold text-foreground tracking-tight">{value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: Hero image ── */}
        <div className="nd-fade-up delay-2 order-1 lg:order-2 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[560px]">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src="/images/Hero Section.webp"
                alt="Namma Designs creative studio"
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
            <div className="absolute inset-0 bg-primary/5 rounded-3xl blur-3xl -z-10 scale-110 pointer-events-none" />
          </div>
        </div>

      </div>
    </div>
  </section>
);

export default Hero;
