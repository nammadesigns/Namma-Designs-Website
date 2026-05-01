import React, { useState, useEffect } from "react";
import { Star, Send } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { addFeedback, getFeedbacks, LocalFeedback as Feedback } from "../lib/localStorageService";
import { useToast } from "../hooks/use-toast";
import { useSEO } from "@/hooks/useSEO";
import { SEO } from "@/lib/seo";

const sampleFeedbacks: Feedback[] = [
  { id: "1", customer_name: "Sathyanarayana H R", rating: 5, feedback_text: "Super work on time, low cost, quick response every time. Professional services on editing, creating cards, Instagram promotions and more.", date: "18/10/2025", is_pinned: true,  created_at: "2024-10-18" },
  { id: "2", customer_name: "Amith Shetty",       rating: 5, feedback_text: "Amazing work with a very reasonable price. Highly recommend Namma Designs for all your creative needs.", date: "10/18/2025", is_pinned: true,  created_at: "2024-10-18" },
  { id: "3", customer_name: "Priya Sharma",        rating: 5, feedback_text: "Excellent design work! Very creative and professional. Highly recommended for all design needs.", date: "15/10/2025", is_pinned: false, created_at: "2024-10-15" },
  { id: "4", customer_name: "Rajesh Kumar",        rating: 4, feedback_text: "Good quality work and timely delivery. Will definitely work again for future projects.", date: "12/10/2025", is_pinned: false, created_at: "2024-10-12" },
  { id: "5", customer_name: "Sneha Patel",         rating: 5, feedback_text: "Outstanding creativity and attention to detail. The designs exceeded my expectations!", date: "08/10/2025", is_pinned: false, created_at: "2024-10-08" },
  { id: "6", customer_name: "Arjun Nair",          rating: 5, feedback_text: "Professional service with quick turnaround. The social media designs were perfect for our campaign.", date: "05/10/2025", is_pinned: false, created_at: "2024-10-05" },
];

/* ── Interactive star rating ── */
const StarRating = ({ value, onChange }: { value: number; onChange: (v: number) => void }) => {
  const [hovered, setHovered] = useState(0);
  const labels = ["", "Poor", "Fair", "Good", "Great", "Excellent"];

  return (
    <div className="flex items-center gap-1.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          className="focus:outline-none transition-transform duration-100 hover:scale-110"
          aria-label={`Rate ${star} stars`}
        >
          <Star
            size={28}
            className={`transition-colors duration-150 ${
              star <= (hovered || value)
                ? "fill-primary text-primary"
                : "text-border fill-border"
            }`}
          />
        </button>
      ))}
      {(hovered || value) > 0 && (
        <span className="ml-2 text-sm font-semibold text-primary">
          {labels[hovered || value]}
        </span>
      )}
    </div>
  );
};

/* ── Field wrapper ── */
const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex flex-col gap-2">
    <label className="text-sm font-semibold text-foreground">{label}</label>
    {children}
  </div>
);

const inputCls =
  "w-full px-4 py-3 text-sm bg-white border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all duration-200";

/* ── Page ── */
const FeedbackPage: React.FC = () => {
  useSEO(SEO.feedback);
  const { toast } = useToast();
  const [feedbacks, setFeedbacks]     = useState<Feedback[]>(sampleFeedbacks);
  const [name, setName]               = useState("");
  const [message, setMessage]         = useState("");
  const [rating, setRating]           = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    getFeedbacks()
      .then((data) => { if (data.length > 0) setFeedbacks(data); })
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setIsSubmitting(true);
    try {
      await addFeedback({
        customer_name: name.trim(),
        feedback_text: message.trim(),
        rating,
        date: new Date().toLocaleDateString(),
        is_pinned: false,
      });
      setName(""); setMessage(""); setRating(5);
      const updated = await getFeedbacks();
      if (updated.length > 0) setFeedbacks(updated);
      toast({ title: "Thank you!", description: "Your feedback has been submitted." });
    } catch {
      toast({ title: "Error", description: "Failed to submit. Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const avgRating = feedbacks.length
    ? (feedbacks.reduce((s, f) => s + f.rating, 0) / feedbacks.length).toFixed(1)
    : "5.0";

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">

        {/* ── Hero ── */}
        <section className="py-16 md:py-24 bg-[hsl(45,100%,50%,0.04)] border-b border-border">
          <div className="container mx-auto px-6 max-w-[1320px]">
            <span className="nd-fade-up text-xs font-bold tracking-[0.15em] uppercase text-primary">
              Client Reviews
            </span>
            <h1 className="nd-fade-up delay-1 mt-3 text-4xl md:text-[3rem] font-extrabold text-foreground leading-tight tracking-tight">
              Share Your Experience
            </h1>
            <p className="nd-fade-up delay-2 mt-4 text-base text-muted-foreground max-w-lg leading-[1.8]">
              Your feedback helps us improve and lets others know what to expect.
              We read every single review.
            </p>
          </div>
        </section>

        {/* ── Form + Stats layout ── */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6 max-w-[1320px]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

              {/* Left: Form */}
              <div>
                <h2 className="text-xl font-extrabold text-foreground mb-8">
                  Leave a Review
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <Field label="Your Name">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rahul Shetty"
                      className={inputCls}
                      required
                    />
                  </Field>

                  <Field label="Your Rating">
                    <StarRating value={rating} onChange={setRating} />
                  </Field>

                  <Field label="Your Feedback">
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us about your experience with our designs and services..."
                      rows={5}
                      className={`${inputCls} resize-none`}
                      required
                    />
                  </Field>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 bg-foreground text-background text-sm font-semibold px-7 py-3.5 rounded-xl hover:bg-foreground/85 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    <Send size={15} />
                    {isSubmitting ? "Submitting…" : "Submit Feedback"}
                  </button>
                </form>
              </div>

              {/* Right: Stats */}
              <div className="lg:pt-12">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: feedbacks.length.toString(), label: "Total Reviews" },
                    { value: `${avgRating}★`, label: "Average Rating" },
                    { value: `${feedbacks.filter(f => f.rating === 5).length}`, label: "5-Star Reviews" },
                    { value: "100%", label: "Satisfaction Rate" },
                  ].map(({ value, label }) => (
                    <div
                      key={label}
                      className="bg-[hsl(45,100%,50%,0.06)] border border-primary/15 rounded-2xl p-6"
                    >
                      <p className="text-3xl font-extrabold text-foreground tracking-tight">
                        {value}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1.5">{label}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl bg-secondary border border-border p-6">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Every review is read personally by our team. Your honest feedback
                    directly shapes how we work and grow. Thank you for taking the time.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── Testimonials grid ── */}
        <section className="py-16 md:py-20 bg-secondary border-t border-border">
          <div className="container mx-auto px-6 max-w-[1320px]">

            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
              <div>
                <span className="text-xs font-bold tracking-[0.15em] uppercase text-primary">
                  All Reviews
                </span>
                <h2 className="mt-2 text-2xl md:text-3xl font-extrabold text-foreground leading-tight">
                  What Our Clients Say
                </h2>
              </div>
              <p className="text-sm text-muted-foreground">{feedbacks.length} reviews</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {feedbacks.map((f) => (
                <div
                  key={f.id}
                  className="flex flex-col bg-white border border-border rounded-2xl p-7 hover:border-primary/30 hover:shadow-md transition-all duration-300"
                >
                  {/* Stars + date */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={13}
                          className={i < f.rating ? "fill-primary text-primary" : "fill-border text-border"}
                        />
                      ))}
                    </div>
                    <span className="text-[11px] text-muted-foreground">{f.date}</span>
                  </div>

                  {/* Quote — flex-1 keeps equal height */}
                  <p className="text-sm text-foreground leading-relaxed flex-1">
                    "{f.feedback_text}"
                  </p>

                  {/* Author */}
                  <div className="mt-6 pt-5 border-t border-border flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-foreground">{f.customer_name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Verified Client</p>
                    </div>
                    {f.is_pinned && (
                      <span className="text-[10px] font-bold tracking-widest uppercase bg-primary text-primary-foreground px-2.5 py-1 rounded-full">
                        Featured
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default FeedbackPage;
