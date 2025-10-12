import { Facebook, Instagram, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#1a1a1a] py-8">
      <div className="container mx-auto px-6 text-center text-gray-400 max-w-7xl">
        <div className="flex justify-center space-x-6 mb-4">
          <a 
            href="#" 
            className="hover:text-primary transition-colors duration-300"
            aria-label="Facebook"
          >
            <Facebook size={24} />
          </a>
          <a 
            href="https://www.instagram.com/namma_designs?igsh=MWNqcWV6d3J6b2RsZQ==" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-primary transition-colors duration-300"
            aria-label="Instagram"
          >
            <Instagram size={24} />
          </a>
          <a 
            href="https://youtube.com/@nammadesigns?si=6EEhi3TqPaiE1Brp" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-primary transition-colors duration-300"
            aria-label="YouTube"
          >
            <Youtube size={24} />
          </a>
        </div>
        <p className="mb-2">&copy; 2025 Namma Designs. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;