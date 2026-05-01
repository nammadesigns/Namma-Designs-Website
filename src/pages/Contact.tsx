import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useLocation } from "react-router-dom";
import emailjs from "@emailjs/browser";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { useSEO } from "@/hooks/useSEO";
import { SEO } from "@/lib/seo";
import { Loader2, Mail, Phone, MessageCircle, Clock, ShieldCheck } from "lucide-react";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";

const SERVICE_ID  = "service_i7na2te";
const TEMPLATE_ID = "template_yo7ysc9";
const PUBLIC_KEY  = "khcDabOHfEJMRPAzT";

// Initialize EmailJS once
emailjs.init(PUBLIC_KEY);

const formSchema = z.object({
  name:    z.string().min(1, "Name is required"),
  email:   z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

const inputCls =
  "w-full px-4 py-3 text-sm bg-white border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all duration-200";

const Contact = () => {
  useSEO(SEO.contact);
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const location = useLocation();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    const pkg = new URLSearchParams(location.search).get("package");
    if (pkg === "basic-website") {
      form.setValue("message", "Hi, I'm interested in the Basic Website Package (₹3,999). Please share more details and next steps.");
    }
  }, [location]);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          user_name:  data.name,
          user_email: data.email,
          message:    data.message,
          reply_to:   data.email,
        }
      );
      setSubmitted(true);
      form.reset();
      toast({ title: "Message sent!", description: "We'll get back to you within 24 hours." });
    } catch {
      toast({ title: "Error", description: "Failed to send. Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">

        {/* ── Hero ── */}
        <section className="py-16 md:py-24 bg-[hsl(45,100%,50%,0.04)] border-b border-border">
          <div className="container mx-auto px-6 max-w-[1320px]">
            <span className="nd-fade-up text-xs font-bold tracking-[0.15em] uppercase text-primary">
              Get In Touch
            </span>
            <h1 className="nd-fade-up delay-1 mt-3 text-4xl md:text-[3rem] font-extrabold text-foreground leading-tight tracking-tight">
              Let's Start a Project
            </h1>
            <p className="nd-fade-up delay-2 mt-4 text-base text-muted-foreground max-w-lg leading-[1.8]">
              Tell us what you need and we'll get back to you within 24 hours.
              No spam, no pressure — just a conversation.
            </p>
          </div>
        </section>

        {/* ── Split: Form + Info ── */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6 max-w-[1320px]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

              {/* ── Left: Form ── */}
              <div>
                {submitted ? (
                  <div className="rounded-2xl bg-[hsl(45,100%,50%,0.06)] border border-primary/20 p-10 text-center">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                      <ShieldCheck size={24} className="text-primary" />
                    </div>
                    <h2 className="text-xl font-extrabold text-foreground mb-2">Message Received!</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Thank you for reaching out. We'll reply to your email within 24 hours.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-6 text-sm font-semibold text-primary hover:underline"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-xl font-extrabold text-foreground mb-8">Send Us a Message</h2>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-semibold text-foreground">
                                Your Name
                              </FormLabel>
                              <FormControl>
                                <input
                                  {...field}
                                  placeholder="e.g. Rahul Shetty"
                                  autoComplete="name"
                                  className={inputCls}
                                />
                              </FormControl>
                              <FormMessage className="text-xs" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-semibold text-foreground">
                                Email Address
                              </FormLabel>
                              <FormControl>
                                <input
                                  {...field}
                                  type="email"
                                  placeholder="you@example.com"
                                  autoComplete="email"
                                  className={inputCls}
                                />
                              </FormControl>
                              <FormMessage className="text-xs" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-semibold text-foreground">
                                Your Message
                              </FormLabel>
                              <FormControl>
                                <textarea
                                  {...field}
                                  rows={5}
                                  placeholder="Tell us about your project, what you need, and your timeline..."
                                  className={`${inputCls} resize-none`}
                                />
                              </FormControl>
                              <FormMessage className="text-xs" />
                            </FormItem>
                          )}
                        />

                        {/* Honeypot */}
                        <div className="sr-only" aria-hidden="true">
                          <input type="text" name="_gotcha" tabIndex={-1} aria-hidden="true" />
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="inline-flex items-center gap-2 bg-foreground text-background text-sm font-semibold px-7 py-3.5 rounded-xl hover:bg-foreground/85 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                        >
                          {isSubmitting ? (
                            <><Loader2 size={15} className="animate-spin" /> Sending…</>
                          ) : (
                            "Send Message"
                          )}
                        </button>

                        {/* Trust note */}
                        <p className="text-xs text-muted-foreground flex items-center gap-1.5 pt-1">
                          <ShieldCheck size={13} className="text-primary flex-shrink-0" />
                          We never share your information. No spam, ever.
                        </p>

                      </form>
                    </Form>
                  </>
                )}
              </div>

              {/* ── Right: Contact info ── */}
              <div className="lg:pt-12 space-y-5">

                <h2 className="text-xl font-extrabold text-foreground mb-6">Contact Details</h2>

                {/* Email */}
                <a
                  href="mailto:nammadesigns01@gmail.com"
                  className="flex items-start gap-4 p-5 rounded-2xl border border-border hover:border-primary/30 hover:shadow-sm transition-all duration-200 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-200">
                    <Mail size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-0.5">Email</p>
                    <p className="text-sm font-semibold text-foreground">nammadesigns01@gmail.com</p>
                    <p className="text-xs text-muted-foreground mt-0.5">We reply within 24 hours</p>
                  </div>
                </a>

                {/* Phone */}
                <a
                  href="tel:+919482809025"
                  className="flex items-start gap-4 p-5 rounded-2xl border border-border hover:border-primary/30 hover:shadow-sm transition-all duration-200 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-200">
                    <Phone size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-0.5">Phone</p>
                    <p className="text-sm font-semibold text-foreground">+91 94828 09025</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Available online · Mon–Sat, 9am–7pm</p>
                  </div>
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/919482809025?text=Hi%20Namma%20Designs%2C%20I%27d%20like%20to%20discuss%20a%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-5 rounded-2xl border border-[#25D366]/30 bg-[#25D366]/5 hover:bg-[#25D366]/10 hover:border-[#25D366]/50 transition-all duration-200 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#25D366]/15 flex items-center justify-center flex-shrink-0">
                    <MessageCircle size={18} className="text-[#25D366]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-0.5">WhatsApp</p>
                    <p className="text-sm font-semibold text-foreground">Quick Chat on WhatsApp</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Fastest way to reach us</p>
                  </div>
                </a>

                {/* Response time note */}
                <div className="flex items-start gap-3 p-5 rounded-2xl bg-secondary border border-border">
                  <Clock size={16} className="text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    <span className="font-semibold text-foreground">Typical response time: under 24 hours.</span>{" "}
                    For urgent requests, WhatsApp is the fastest way to reach us.
                  </p>
                </div>

              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default Contact;
