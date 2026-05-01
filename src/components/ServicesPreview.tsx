import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

const services = [
  {
    id: "graphic",
    tag: "Design",
    title: "Graphic Designing",
    desc: "Brand identities, posters, social media graphics, and print materials crafted with precision.",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=640&q=80&auto=format&fit=crop",
    imageAlt: "Graphic design workspace",
  },
  {
    id: "web",
    tag: "Development",
    title: "Web Development",
    desc: "Fast, responsive websites built to convert visitors into customers.",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=640&q=80&auto=format&fit=crop",
    imageAlt: "Web development on laptop screen",
  },
  {
    id: "marketing",
    tag: "Marketing",
    title: "Digital Marketing",
    desc: "Strategy-driven campaigns that grow your audience and drive measurable results.",
    image: "/images/DIGITAL MARKETING.webp",
    imageAlt: "Digital marketing analytics dashboard",
  },
];

const ServicesPreview = () => {
  const ref = useReveal();

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-[1320px]">

        {/* Header */}
        <div className="nd-reveal flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <span className="text-xs font-bold tracking-[0.15em] uppercase text-primary">
              What We Provide
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-foreground leading-tight tracking-tight">
              Services Built for<br className="hidden sm:block" /> Modern Brands
            </h2>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-foreground border border-border px-5 py-2.5 rounded-xl hover:border-foreground transition-colors duration-200 flex-shrink-0"
          >
            Explore Services <ArrowRight size={14} />
          </Link>
        </div>

        {/* 3-column cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map(({ id, tag, title, desc, image, imageAlt }) => (
            <Link
              key={id}
              to="/services"
              className="nd-reveal group flex flex-col bg-white border border-border rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden bg-secondary flex-shrink-0">
                <img
                  src={image}
                  alt={imageAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <span className="absolute top-4 left-4 text-[10px] font-bold tracking-widest uppercase bg-primary text-primary-foreground px-2.5 py-1 rounded-full">
                  {tag}
                </span>
              </div>
              {/* Text */}
              <div className="flex flex-col flex-1 p-7">
                <h3 className="text-base font-extrabold text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{desc}</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground mt-6 group-hover:text-primary transition-colors duration-200">
                  Learn More <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform duration-200" />
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ServicesPreview;
