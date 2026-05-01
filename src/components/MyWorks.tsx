import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { getWorks, LocalWork as Work } from "../lib/localStorageService";
import { worksData } from "../data/worksData";
import { useReveal } from "@/hooks/useReveal";

const FEATURED_IDS = ["20", "7", "19", "4"]; // Namma Design Poster, CK Logo, MobileX, CK Poster

const MyWorks: React.FC = () => {
  const [designs, setDesigns] = useState<Work[]>([]);
  const ref = useReveal();

  useEffect(() => {
    getWorks()
      .then((all) => {
        // Pick 4 specific featured items, fall back to first 4
        const featured = FEATURED_IDS
          .map((id) => all.find((w) => w.id === id))
          .filter(Boolean) as Work[];
        setDesigns(featured.length === 4 ? featured : all.slice(0, 4));
      })
      .catch(() => setDesigns(worksData.slice(0, 4)));
  }, []);

  return (
    <section
      id="my-works"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-24 bg-secondary"
    >
      <div className="container mx-auto px-6 max-w-[1320px]">

        {/* Header */}
        <div className="nd-reveal flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <span className="text-xs font-bold tracking-[0.15em] uppercase text-primary">Portfolio</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-foreground leading-tight tracking-tight">
              Featured Works
            </h2>
            <p className="mt-3 text-sm text-muted-foreground max-w-sm leading-relaxed">
              A selection of recent projects across branding, social media, and print design.
            </p>
          </div>
          <Link
            to="/ourworks"
            className="inline-flex items-center gap-2 text-sm font-semibold text-foreground border border-border bg-white px-5 py-2.5 rounded-xl hover:border-foreground transition-colors duration-200 flex-shrink-0"
          >
            View All Works <ArrowRight size={14} />
          </Link>
        </div>

        {/* 4-column equal grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {designs.map((item) => (
            <div
              key={item.id}
              className="nd-reveal group relative overflow-hidden rounded-2xl bg-muted aspect-square"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/65 transition-all duration-300 flex items-end p-5">
                <div className="translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-white text-sm font-bold leading-tight">{item.title}</p>
                  <p className="text-white/60 text-xs mt-1">Graphic Design</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default MyWorks;
