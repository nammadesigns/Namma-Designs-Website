import { Search, Lightbulb, PenTool, PackageCheck } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

const steps = [
  {
    num: "01",
    icon: Search,
    title: "Discovery",
    desc: "We learn your brand, goals, audience, and competitive landscape.",
  },
  {
    num: "02",
    icon: Lightbulb,
    title: "Strategy",
    desc: "We define the creative direction, messaging, and visual approach.",
  },
  {
    num: "03",
    icon: PenTool,
    title: "Design",
    desc: "We craft pixel-perfect visuals aligned with your brand identity.",
  },
  {
    num: "04",
    icon: PackageCheck,
    title: "Delivery",
    desc: "Final files delivered in all formats, ready to publish or print.",
  },
];

const Process = () => {
  const ref = useReveal();

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-[1320px]">

        {/* Header */}
        <div className="nd-reveal text-center max-w-xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-[0.15em] uppercase text-primary">How It Works</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-foreground leading-tight tracking-tight">
            Our 4-Step Process
          </h2>
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
            A clear, collaborative workflow that keeps you informed at every stage.
          </p>
        </div>

        {/* Steps — horizontal on desktop, vertical on mobile */}
        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">

          {/* Connector line — desktop only */}
          <div
            className="hidden lg:block absolute top-[2.6rem] left-[calc(12.5%+1.25rem)] right-[calc(12.5%+1.25rem)] h-px bg-border z-0"
            aria-hidden="true"
          />

          {steps.map(({ num, icon: Icon, title, desc }, i) => (
            <div key={num} className="nd-reveal relative z-10 flex flex-col items-center text-center lg:items-center">
              {/* Circle */}
              <div className="w-[52px] h-[52px] rounded-full bg-white border-2 border-border flex items-center justify-center mb-5 group-hover:border-primary transition-colors duration-300 flex-shrink-0 shadow-sm">
                <Icon size={20} className="text-primary" />
              </div>
              {/* Step number */}
              <span className="text-[10px] font-bold tracking-widest uppercase text-primary mb-2">{num}</span>
              <h3 className="text-base font-extrabold text-foreground mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-[200px]">{desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Process;
