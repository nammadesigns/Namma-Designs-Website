import { Star } from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";

interface Feedback {
  id: string;
  customer_name: string;
  feedback_text: string;
  rating: number;
}

const testimonials: Feedback[] = [
  {
    id: '1',
    customer_name: 'Sarah Johnson',
    feedback_text: 'Namma Designs transformed our brand identity completely. Their creativity and attention to detail are unmatched!',
    rating: 5,
  },
  {
    id: '2',
    customer_name: 'Michael Chen',
    feedback_text: 'Professional, responsive, and incredibly talented. They delivered exactly what we needed for our social media campaign.',
    rating: 5,
  },
  {
    id: '3',
    customer_name: 'Amanda Patel',
    feedback_text: 'The team at Namma Designs goes above and beyond. They not only met but exceeded our expectations.',
    rating: 5,
  }
];

const Testimonials = () => {

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