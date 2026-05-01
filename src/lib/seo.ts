export interface PageSEO {
  title: string;
  description: string;
  canonical: string;
}

const BASE = "https://www.nammadesigns.site";

export const SEO: Record<string, PageSEO> = {
  home: {
    title: "Namma Designs | Web Design & Digital Services in Karnataka",
    description:
      "Namma Designs offers web development, graphic design, digital marketing, and n8n automation in Karnataka. Affordable, modern, and results-driven solutions for every business.",
    canonical: `${BASE}/`,
  },
  about: {
    title: "About Namma Designs | Creative Design Studio in Karnataka",
    description:
      "Learn about Namma Designs — a creative studio based in Kundapura, Karnataka, delivering premium branding, web development, and digital marketing at honest prices.",
    canonical: `${BASE}/about`,
  },
  services: {
    title: "Services | Web Development, Design & Marketing Solutions — Namma Designs",
    description:
      "Explore Namma Designs' full range of services: graphic design, web development, digital marketing, n8n automation, and academic project support in Karnataka.",
    canonical: `${BASE}/services`,
  },
  ourworks: {
    title: "Our Work | Namma Designs Portfolio — Graphic Design & Web Projects",
    description:
      "Browse Namma Designs' portfolio of graphic design work and live web development projects built for clients across Karnataka and India.",
    canonical: `${BASE}/ourworks`,
  },
  contact: {
    title: "Contact Namma Designs | Start Your Project Today",
    description:
      "Get in touch with Namma Designs for web design, graphic design, or digital marketing services in Karnataka. We respond within 24 hours.",
    canonical: `${BASE}/contact`,
  },
  feedback: {
    title: "Client Feedback | Namma Designs Reviews & Testimonials",
    description:
      "Read verified client reviews for Namma Designs. See what businesses across Karnataka say about our design, development, and marketing services.",
    canonical: `${BASE}/feedback`,
  },
};
