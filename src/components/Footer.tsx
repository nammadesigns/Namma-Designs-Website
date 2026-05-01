import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-foreground text-white/70">
      <div className="container mx-auto px-6 max-w-[1320px] py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <img
                src="https://i.postimg.cc/mgFj0v2P/Namma-Designs-Logo.jpg"
                alt="Namma Designs"
                className="w-8 h-8 rounded-md object-cover"
              />
              <span className="text-base font-bold text-white">
                Namma<span className="text-primary">Designs</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed">
              A creative design studio delivering premium visuals at honest prices.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" aria-label="Facebook" className="hover:text-primary transition-colors duration-200">
                <Facebook size={18} />
              </a>
              <a
                href="https://www.instagram.com/namma_designs?igsh=MWNqcWV6d3J6b2RsZQ=="
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-primary transition-colors duration-200"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://youtube.com/@nammadesigns?si=6EEhi3TqPaiE1Brp"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="hover:text-primary transition-colors duration-200"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 tracking-wide">Services</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: "Graphic Designing", to: "/services" },
                { label: "Web Development",   to: "/services" },
                { label: "Digital Marketing", to: "/services" },
                { label: "Social Media",      to: "/services" },
                { label: "Print Design",      to: "/services" },
              ].map(({ label, to }) => (
                <li key={label}>
                  <Link to={to} className="hover:text-primary transition-colors duration-200">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 tracking-wide">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: "Home",     to: "/" },
                { label: "About",    to: "/about" },
                { label: "Services", to: "/services" },
                { label: "Our Work", to: "/ourworks" },
                { label: "Feedback", to: "/feedback" },
                { label: "Contact",  to: "/contact" },
              ].map(({ label, to }) => (
                <li key={to}>
                  <Link to={to} className="hover:text-primary transition-colors duration-200">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 tracking-wide">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin size={15} className="mt-0.5 flex-shrink-0 text-primary" />
                <span>Kundapura, Karnataka, India</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={15} className="flex-shrink-0 text-primary" />
                <a href="mailto:nammadesigns01@gmail.com" className="hover:text-primary transition-colors duration-200">
                  nammadesigns01@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={15} className="flex-shrink-0 text-primary" />
                <a href="tel:+919482809025" className="hover:text-primary transition-colors duration-200">
                  +91 94828 09025
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-6 max-w-[1320px] py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <p>© 2026 Namma Designs. All rights reserved.</p>
          <p>Designed & Developed by <span className="text-white/70 font-medium">Namma Designs</span></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
