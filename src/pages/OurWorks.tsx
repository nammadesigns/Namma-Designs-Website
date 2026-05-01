import React, { useState, useEffect, useMemo } from "react";
import { ExternalLink } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { getWorks, LocalWork as Work } from "../lib/localStorageService";
import { worksData } from "../data/worksData";
import { useSEO } from "@/hooks/useSEO";
import { SEO } from "@/lib/seo";

/* ─────────────────────────────────────────
   GRAPHIC DESIGN — category map + filters
───────────────────────────────────────── */
const categoryMap: Record<string, string> = {
  "1":  "Social Media", "2":  "Branding",     "3":  "Posters",
  "4":  "Posters",      "5":  "Branding",      "6":  "Posters",
  "7":  "Branding",     "8":  "Branding",      "9":  "Posters",
  "10": "Social Media", "11": "Social Media",  "12": "Posters",
  "13": "Social Media", "14": "Posters",       "15": "Posters",
  "16": "Posters",      "17": "Branding",      "18": "Posters",
  "19": "Branding",     "20": "Posters",       "21": "Ads",
  "22": "Posters",      "23": "Ads",           "24": "Social Media",
  "25": "Social Media", "26": "Ads",           "27": "Posters",
  "28": "Ads",          "29": "Ads",           "30": "Social Media",
  "31": "Ads",
};

const GD_FILTERS = ["All", "Posters", "Branding", "Social Media", "Ads"] as const;
type GDFilter = typeof GD_FILTERS[number];

/* ─────────────────────────────────────────
   WEB DEVELOPMENT — projects data
───────────────────────────────────────── */
interface WebProject {
  id: string;
  title: string;
  description: string;
  url: string;
  tag: string;
}

const webProjects: WebProject[] = [
  {
    id: "w1",
    title: "Restaurant Website",
    description: "Modern restaurant UI with clean layout and full menu showcase.",
    url: "https://sunny-nougat-3ba048.netlify.app/",
    tag: "Restaurant",
  },
  {
    id: "w2",
    title: "Real Estate Platform",
    description: "Property listing and showcase platform with modern filtering.",
    url: "https://prime-property-demo.vercel.app/",
    tag: "Real Estate",
  },
  {
    id: "w3",
    title: "Device Showcase",
    description: "Product display website with sleek UI and device highlights.",
    url: "https://ignite-device-showcase.vercel.app/",
    tag: "E-commerce",
  },
  {
    id: "w4",
    title: "MotoForge",
    description: "Bike customization brand website with bold visual identity.",
    url: "https://visionary-tapioca-290de6.netlify.app/",
    tag: "Brand Website",
  },
  {
    id: "w5",
    title: "Malnad Eco Stay",
    description: "Resort and homestay booking-style website with nature aesthetic.",
    url: "https://malnad-eco-stay.vercel.app/",
    tag: "Hospitality",
  },
];

/* Screenshot via microlink — no API key needed for basic use */
const screenshotUrl = (url: string) =>
  `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url`;

/* ─────────────────────────────────────────
   TOP-LEVEL TAB
───────────────────────────────────────── */
type Tab = "all" | "graphic" | "web";

/* ─────────────────────────────────────────
   PAGE
───────────────────────────────────────── */
const OurWorks: React.FC = () => {
  useSEO(SEO.ourworks);
  const [works, setWorks]       = useState<Work[]>(worksData);
  const [tab, setTab]           = useState<Tab>("all");
  const [gdFilter, setGdFilter] = useState<GDFilter>("All");
  const [lightbox, setLightbox] = useState<Work | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    getWorks().then(setWorks).catch(() => setWorks(worksData));
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setLightbox(null); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = lightbox ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  const filteredDesigns = useMemo(() =>
    gdFilter === "All"
      ? works
      : works.filter((w) => (categoryMap[w.id] ?? "Posters") === gdFilter),
    [works, gdFilter]
  );

  const showGraphic = tab === "all" || tab === "graphic";
  const showWeb     = tab === "all" || tab === "web";

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">

        {/* ── Page hero ── */}
        <section className="py-16 md:py-24 bg-[hsl(45,100%,50%,0.04)] border-b border-border">
          <div className="container mx-auto px-6 max-w-[1320px]">
            <span className="nd-fade-up text-xs font-bold tracking-[0.15em] uppercase text-primary">
              Portfolio
            </span>
            <h1 className="nd-fade-up delay-1 mt-3 text-4xl md:text-5xl font-extrabold text-foreground leading-tight tracking-tight">
              Our Work
            </h1>
            <p className="nd-fade-up delay-2 mt-4 text-base text-muted-foreground max-w-lg leading-relaxed">
              Real projects across graphic design and web development — built with purpose, delivered with precision.
            </p>
          </div>
        </section>

        {/* ── Top-level tabs ── */}
        <section className="sticky top-16 z-30 bg-white border-b border-border">
          <div className="container mx-auto px-6 max-w-[1320px]">
            <div className="flex items-center gap-1 py-3">
              {(["all", "graphic", "web"] as Tab[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`flex-shrink-0 text-xs font-semibold px-4 py-2 rounded-lg transition-colors duration-200 ${
                    tab === t
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  {t === "all" ? "All Work" : t === "graphic" ? "Graphic Design" : "Web Development"}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            SECTION 1 — GRAPHIC DESIGN
        ══════════════════════════════════════ */}
        {showGraphic && (
          <section className="py-16 md:py-20 border-b border-border">
            <div className="container mx-auto px-6 max-w-[1320px]">

              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
                <div>
                  <span className="text-xs font-bold tracking-[0.15em] uppercase text-primary">
                    01 — Design
                  </span>
                  <h2 className="mt-2 text-2xl md:text-3xl font-extrabold text-foreground leading-tight tracking-tight">
                    Graphic Design Work
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground max-w-md leading-relaxed">
                    Selected creative projects across branding, social media, and print.
                  </p>
                </div>

                {/* Sub-filters */}
                <div className="flex items-center gap-1 flex-wrap">
                  {GD_FILTERS.map((f) => (
                    <button
                      key={f}
                      onClick={() => setGdFilter(f)}
                      className={`text-xs font-semibold px-3.5 py-1.5 rounded-lg transition-colors duration-200 ${
                        gdFilter === f
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary border border-border"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                {filteredDesigns.map((work) => (
                  <button
                    key={work.id}
                    onClick={() => setLightbox(work)}
                    className="group relative overflow-hidden rounded-xl bg-secondary aspect-square text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <img
                      src={work.image}
                      alt={work.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/65 transition-all duration-300 flex items-end p-4">
                      <div className="translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                        <p className="text-white text-sm font-bold leading-tight">{work.title}</p>
                        <span className="inline-block mt-1.5 text-[10px] font-semibold tracking-widest uppercase bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                          {categoryMap[work.id] ?? "Design"}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

            </div>
          </section>
        )}

        {/* ══════════════════════════════════════
            SECTION 2 — WEB DEVELOPMENT
        ══════════════════════════════════════ */}
        {showWeb && (
          <section className="py-16 md:py-20 bg-secondary">
            <div className="container mx-auto px-6 max-w-[1320px]">

              {/* Header */}
              <div className="mb-12">
                <span className="text-xs font-bold tracking-[0.15em] uppercase text-primary">
                  02 — Development
                </span>
                <h2 className="mt-2 text-2xl md:text-3xl font-extrabold text-foreground leading-tight tracking-tight">
                  Web Development Projects
                </h2>
                <p className="mt-2 text-sm text-muted-foreground max-w-md leading-relaxed">
                  Live websites built for clients and demo projects — responsive, fast, and conversion-focused.
                </p>
              </div>

              {/* Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {webProjects.map((project) => (
                  <div
                    key={project.id}
                    className="group flex flex-col bg-white rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    {/* Screenshot */}
                    <div className="relative h-52 overflow-hidden bg-muted flex-shrink-0">
                      <img
                        src={screenshotUrl(project.url)}
                        alt={`${project.title} screenshot`}
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://images.unsplash.com/photo-1547658719-da2b51169166?w=640&q=80&auto=format&fit=crop";
                        }}
                      />
                      <span className="absolute top-3 left-3 text-[10px] font-bold tracking-widest uppercase bg-primary text-primary-foreground px-2.5 py-1 rounded-full">
                        {project.tag}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-1 p-6">
                      <h3 className="text-base font-extrabold text-foreground mb-2">
                        {project.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                        {project.description}
                      </p>
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 mt-5 text-sm font-semibold bg-foreground text-background px-5 py-2.5 rounded-xl hover:bg-foreground/85 transition-colors duration-200 self-start"
                      >
                        Visit Website <ExternalLink size={13} />
                      </a>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </section>
        )}

        <CTASection />
      </main>

      {/* ── Lightbox ── */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[9999] bg-black/92 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative max-w-3xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightbox.image}
              alt={lightbox.title}
              className="w-full max-h-[80vh] object-contain rounded-xl shadow-2xl"
            />
            <div className="mt-4 flex items-center justify-between">
              <div>
                <p className="text-white font-bold">{lightbox.title}</p>
                <span className="text-[10px] font-semibold tracking-widest uppercase text-primary">
                  {categoryMap[lightbox.id] ?? "Design"}
                </span>
              </div>
              <button
                onClick={() => setLightbox(null)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors duration-200 font-bold"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default OurWorks;
