import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Star, ArrowRight } from "lucide-react";
import { getFeedbacks, LocalFeedback as Feedback } from "../lib/localStorageService";
import { useReveal } from "@/hooks/useReveal";

const topFeedbacks: Feedback[] = [
  {
    id: "top1",
    customer_name: "Sathyanarayana H R",
    rating: 5,
    feedback_text: "Super work on time, low cost, quick response every time. Professional services on editing, creating cards, Instagram promotions and more.",
    date: "18/10/2025",
    is_pinned: true,
    created_at: "2024-10-18",
  },
  {
    id: "top2",
    customer_name: "Amith Shetty",
    rating: 5,
    feedback_text: "Amazing work with a very reasonable price. Highly recommend Namma Designs for all your creative needs.",
    date: "10/18/2025",
    is_pinned: true,
    created_at: "2024-10-18",
  },
  {
    id: "top3",
    customer_name: "Priya Sharma",
    rating: 5,
    feedback_text: "Excellent design work! Very creative and professional. Highly recommended for all design needs.",
    date: "15/10/2025",
    is_pinned: true,
    created_at: "2024-10-15",
  },
];

const Testimonials = () => {
  // Initialize with static data — cards are always visible immediately
  const [testimonials, setTestimonials] = useState<Feedback[]>(topFeedbacks);
  const ref = useReveal();

  useEffect(() => {
    getFeedbacks()
      .then((data) => {
        const pinned = data.filter((f) => f.is_pinned).slice(0, 3);
        if (pinned.length > 0) setTestimonials(pinned);
      })
      .catch(() => {});
  }, []);

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-[1320px]">

        {/* Header */}
        <div className="nd-reveal flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <span className="text-xs font-bold tracking-[0.15em] uppercase text-primary">
              Testimonials
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-foreground leading-tight tracking-tight">
              What Clients Say
            </h2>
          </div>
          <Link
            to="/feedback"
            className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors duration-200 flex-shrink-0"
          >
            Leave a Review <ArrowRight size={15} />
          </Link>
        </div>

        {/* Cards — no nd-reveal on individual cards to avoid async timing issue */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="group bg-[hsl(45,100%,50%,0.04)] border border-border rounded-2xl p-7 hover:border-primary/30 hover:shadow-md transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={14} className="fill-primary text-primary" />
                ))}
              </div>
              {/* Quote */}
              <p className="text-sm text-foreground leading-relaxed">
                "{t.feedback_text}"
              </p>
              {/* Author */}
              <div className="mt-6 pt-5 border-t border-border">
                <p className="text-sm font-semibold text-foreground">{t.customer_name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">Verified Client</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
