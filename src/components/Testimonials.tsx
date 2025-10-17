import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { getFeedbacks, Feedback } from "../lib/localStorageService";



const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Feedback[]>([]);

  useEffect(() => {
    loadFeedbacks();
  }, []);

  const loadFeedbacks = async () => {
    try {
      const feedbacksData = await getFeedbacks();
      const pinnedFeedbacks = feedbacksData.filter(f => f.isPinned);
      setTestimonials(pinnedFeedbacks.slice(0, 3));
    } catch (error) {
      console.error('Error loading feedbacks:', error);
    }
  };

  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-6 max-w-7xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
          What Our Clients Say
        </h2>
        
        <div className={`grid gap-8 ${
          testimonials.length === 1 
            ? 'grid-cols-1 place-items-center max-w-md mx-auto' 
            : 'grid-cols-1 md:grid-cols-3'
        }`}>
          {testimonials.slice(0, 3).map((testimonial) => (
            <Card key={testimonial.id} className="hover:shadow-lg transition-shadow w-full">
              <CardHeader>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="fill-primary text-primary" size={20} />
                  ))}
                </div>
                <p className="font-semibold text-foreground">{testimonial.customer_name}</p>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground italic">"{testimonial.feedback_text}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/feedback">
            <Button size="lg" className="animate-fade-in transform hover:scale-105 transition-transform">
              Give Feedback
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;