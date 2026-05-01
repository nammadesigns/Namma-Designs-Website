# Namma Designs — Official Website

A premium, agency-level website for **Namma Designs**, a creative design studio based in Kundapura, Karnataka. Built with a clean, minimal aesthetic inspired by Dot Design — structured, professional, and conversion-focused.

---

## Live Site

Deployed on **Vercel** → [nammadesigns.vercel.app](https://nammadesigns.vercel.app)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS + shadcn/ui |
| Routing | React Router v6 |
| Forms | React Hook Form + Zod |
| Email | EmailJS (`@emailjs/browser`) |
| Data | localStorage (feedback, works) |
| Deployment | Vercel |

---

## Project Structure

```
src/
├── components/
│   ├── ui/                  # shadcn/ui primitives
│   ├── Header.tsx           # Sticky nav — Home | About | Services | Our Work | Contact
│   ├── Footer.tsx           # 4-column footer with links, contact, socials
│   ├── Hero.tsx             # Homepage hero — split layout with local image
│   ├── ServicesPreview.tsx  # Homepage 3-card services teaser
│   ├── MyWorks.tsx          # Homepage 4-item featured works grid
│   ├── Process.tsx          # 4-step horizontal process section
│   ├── Stats.tsx            # Animated counter strip (dark background)
│   ├── Testimonials.tsx     # Client review cards
│   ├── CTASection.tsx       # Yellow brand CTA section
│   ├── PinnedFrame.tsx      # Portfolio image viewer with lightbox
│   └── WhatsAppButton.tsx   # Floating WhatsApp button
│
├── pages/
│   ├── Home.tsx             # Homepage
│   ├── About.tsx            # About page — story, values, stats
│   ├── Services.tsx         # Full services page — alternating split layout
│   ├── OurWorks.tsx         # Portfolio — Graphic Design + Web Development
│   ├── Contact.tsx          # Contact form (EmailJS) + info panel
│   ├── Feedback.tsx         # Feedback form + reviews grid
│   ├── Offers.tsx           # Special offers page
│   ├── Admin.tsx            # Admin panel (protected)
│   └── NotFound.tsx         # 404 page
│
├── hooks/
│   ├── useReveal.ts         # IntersectionObserver scroll-reveal hook
│   ├── use-mobile.tsx       # Mobile breakpoint hook
│   └── use-toast.ts         # Toast notification hook
│
├── lib/
│   ├── localStorageService.ts  # Works, feedback, offers CRUD via localStorage
│   ├── supabase.ts             # Supabase client (optional/future use)
│   └── utils.ts                # Tailwind class merge utility
│
├── data/
│   └── worksData.ts         # Static portfolio works data
│
├── styles/
│   └── enhancements.css     # Animation keyframes, hover utilities
│
├── index.css                # Design tokens, Inter font, scroll-reveal classes
└── App.tsx                  # Router + providers
```

---

## Pages

| Route | Page | Description |
|---|---|---|
| `/` | Home | Hero, services preview, featured works, process, stats, testimonials, CTA |
| `/about` | About | Brand story, values, stats, CTA |
| `/services` | Services | 5 services in alternating split layout |
| `/ourworks` | Our Work | Graphic design grid + web development project cards |
| `/contact` | Contact | EmailJS form + contact info + WhatsApp |
| `/feedback` | Feedback | Star rating form + all client reviews |
| `/offers` | Offers | Active special offers |
| `/admin` | Admin | Internal panel for managing works, feedback, offers |

---

## Services

1. **Graphic Designing** — Logo, branding, social media, print
2. **Web Development** — Business websites, responsive, CMS, e-commerce
3. **Digital Marketing** — Social media marketing, SEO, campaigns, analytics
4. **n8n Automation** — Workflow automation, API integrations, CRM sync
5. **Academic & Project Support** — Reports, presentations, final year projects

---

## Contact & Email Setup

Contact form uses **EmailJS** for direct browser-to-email delivery.

| Key | Value |
|---|---|
| Service ID | `service_i7na2te` |
| Template ID | `template_yo7ysc9` |
| Public Key | `khcDabOHfEJMRPAzT` |

Template variables used: `user_name`, `user_email`, `message`, `reply_to`

---

## Local Development

```bash
# Clone the repository
git clone https://github.com/nammadesigns/Namma-Designs-Website.git
cd Namma-Designs-Website

# Install dependencies
npm install

# Start dev server
npm run dev

# Production build
npm run build
```

---

## Environment Variables

Create a `.env` file in the root (optional — only needed if Supabase is enabled):

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

> The site runs fully without Supabase. All data (feedback, works) falls back to localStorage.

---

## Assets

```
public/
├── Designs/        # Portfolio design images (.webp)
├── images/
│   ├── Hero Section.webp       # Homepage hero image
│   ├── DIGITAL MARKETING.webp  # Services image
│   └── N8N AUTOMATION.webp     # Services image
└── favicon.ico / site.webmanifest / robots.txt / sitemap.xml
```

---

## Contact

- **Email** — nammadesigns01@gmail.com
- **Phone** — +91 94828 09025
- **Instagram** — [@namma_designs](https://www.instagram.com/namma_designs)
- **YouTube** — [@nammadesigns](https://youtube.com/@nammadesigns)
- **Location** — Kundapura, Karnataka, India

---

© 2025 Namma Designs. All rights reserved.
Designed & Developed by Namma Designs.
