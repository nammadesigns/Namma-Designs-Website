import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";

const Stats = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const statsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animateCounters();
        }
      },
      { threshold: 0.1 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const animateCounters = () => {
    const counters = document.querySelectorAll<HTMLElement>('[data-target]');
    counters.forEach((counter) => {
      const target = parseInt(counter.dataset.target || '0');
      const duration = 2000;
      const stepTime = Math.abs(Math.floor(duration / target));
      let current = 0;

      const timer = setInterval(() => {
        current++;
        const originalContent = counter.innerHTML.replace(/^\d+/, '');
        counter.innerHTML = current + originalContent;
        if (current === target) {
          clearInterval(timer);
        }
      }, stepTime);
    });
  };

  return (
    <section ref={statsRef} className="bg-secondary py-12">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-4xl font-bold text-primary" data-target="25">0+</h3>
            <p className="mt-2 text-muted-foreground">Happy Clients</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-4xl font-bold text-primary flex items-center justify-center gap-2" data-target="5">
              0 <Star className="fill-current" size={32} />
            </h3>
            <p className="mt-2 text-muted-foreground">Average Rating</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-4xl font-bold text-primary" data-target="30">0+</h3>
            <p className="mt-2 text-muted-foreground">Projects Completed</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;