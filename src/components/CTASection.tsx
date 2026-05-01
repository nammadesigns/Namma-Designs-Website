import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

const CTASection = () => {
  const ref = useReveal();

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="py-24 bg-primary">
      <div className="container mx-auto px-6 max-w-[1320px] text-center">
        <span className="nd-reveal inline-block text-xs font-semibold tracking-widest uppercase text-primary-foreground/60 mb-4">
          Ready to Begin?
        </span>
        <h2 className="nd-reveal text-3xl md:text-5xl font-extrabold text-primary-foreground leading-tight tracking-tight max-w-2xl mx-auto">
          Let's Build Something<br />Remarkable Together
        </h2>
        <p className="nd-reveal mt-5 text-base text-primary-foreground/70 max-w-lg mx-auto">
          Tell us about your project and we'll get back to you within 24 hours.
        </p>
        <div className="nd-reveal mt-8">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-primary-foreground text-primary text-sm font-bold px-8 py-4 rounded-xl hover:bg-primary-foreground/90 transition-colors duration-200"
          >
            Start Your Project
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
