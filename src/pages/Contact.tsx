import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  useEffect(() => {
    const trackVisit = async () => {
      await supabase.from('visitor_analytics').insert({
        page_path: '/contact',
        user_agent: navigator.userAgent,
      });
    };
    trackVisit();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { error } = await supabase.from('contact_submissions').insert({
      name: formData.name,
      email: formData.email,
      message: formData.message,
    });

    setIsSubmitting(false);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success!",
        description: "Your message has been sent. We'll get back to you soon!",
      });
      setFormData({ name: '', email: '', message: '' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-secondary">
        <section className="py-20">
          <div className="container mx-auto px-6 max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
              Contact Us
            </h1>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Send us a Message</CardTitle>
                <p className="text-center text-muted-foreground">
                  Ready to start your next project? Send us a message and we'll get back to you shortly.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>

                <div className="text-center mt-6">
                  <p className="text-muted-foreground">Or email us directly at:</p>
                  <a 
                    href="mailto:nammadesigns01@gmail.com" 
                    className="text-primary hover:underline font-semibold"
                  >
                    nammadesigns01@gmail.com
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;