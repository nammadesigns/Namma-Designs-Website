import { useEffect, useRef, useState } from "react";

const metrics = [
  { value: 50, suffix: "+", label: "Projects Delivered" },
  { value: 10, suffix: "+", label: "Happy Clients" },
  { value: 5,  suffix: "★", label: "Average Rating" },
  { value: 20, suffix: "%", label: "More Affordable" },
];

function useCounter(target: number, active: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let cur = 0;
    const step = Math.max(1, Math.ceil(target / 50));
    const id = setInterval(() => {
      cur = Math.min(cur + step, target);
      setCount(cur);
      if (cur >= target) clearInterval(id);
    }, 35);
    return () => clearInterval(id);
  }, [active, target]);
  return count;
}

const StatItem = ({
  value, suffix, label, active,
}: { value: number; suffix: string; label: string; active: boolean }) => {
  const count = useCounter(value, active);
  return (
    <div className="text-center lg:text-left">
      <p className="text-4xl font-extrabold text-white tracking-tight leading-none">
        {count}<span className="text-primary">{suffix}</span>
      </p>
      <p className="text-sm text-white/50 mt-2">{label}</p>
    </div>
  );
};

const Stats = () => {
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setActive(true); obs.disconnect(); } },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-16 bg-[hsl(0,0%,8%)]">
      <div className="container mx-auto px-6 max-w-[1320px]">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
          {metrics.map((m) => (
            <StatItem key={m.label} {...m} active={active} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
