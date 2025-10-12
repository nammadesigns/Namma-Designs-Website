import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Star } from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";

interface Feedback {
  id: string;
  customer_name: string;
  rating: number;
  feedback_text: string;
}

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Feedback[]>([]);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    const { data, error } = await supabase
      .from('customer_feedback')
      .select('*')
      .eq('is_approved', true)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setTestimonials(data);
    }
  };

  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-6 max-w-7xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
          What Our Clients Say
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="hover:shadow-lg transition-shadow">
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
      </div>
    </section>
  );
};

export default Testimonials;