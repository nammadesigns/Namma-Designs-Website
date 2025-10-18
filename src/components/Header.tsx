import { Link, useLocation } from "react-router-dom";
import { Menu, X, Tag } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white sticky top-0 z-50 shadow-md">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center max-w-7xl">
        <Link to="/" className="flex items-center space-x-3">
          <img src="https://i.postimg.cc/5tpJ1bLY/MY-L.png" alt="Namma Designs Logo" className="w-10 h-10" />
          <h1 className="text-2xl font-bold text-foreground">
            Namma <span className="text-primary">Designs</span>
          </h1>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link 
            to="/" 
            className={`transition-colors duration-300 ${isActive('/') ? 'text-primary font-semibold' : 'text-muted-foreground hover:text-primary'}`}
          >
            Home
          </Link>
          <Link 
            to="/about" 
            className={`transition-colors duration-300 ${isActive('/about') ? 'text-primary font-semibold' : 'text-muted-foreground hover:text-primary'}`}
          >
            About Us
          </Link>
          <Link 
            to="/ourworks" 
            className={`transition-colors duration-300 ${isActive('/ourworks') ? 'text-primary font-semibold' : 'text-muted-foreground hover:text-primary'}`}
          >
            Our Works
          </Link>
          <Link 
            to="/offers" 
            className={`relative transition-colors duration-300 flex items-center space-x-1 ${isActive('/offers') ? 'text-primary font-semibold' : 'text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded-full font-bold'}`}
          >
            <Tag size={16} />
            <span>OFFERS</span>
          </Link>
          <Link to="/contact">
            <Button 
              className={`transition-colors duration-300 ${isActive('/contact') ? 'bg-primary/90' : ''}`}
            >
              Contact Us
            </Button>
          </Link>
        </div>

        <button 
          className="md:hidden text-foreground"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <Link 
            to="/" 
            className="block py-2 px-4 text-sm text-muted-foreground hover:bg-secondary"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/about" 
            className="block py-2 px-4 text-sm text-muted-foreground hover:bg-secondary"
            onClick={() => setIsMenuOpen(false)}
          >
            About Us
          </Link>
          <Link 
            to="/ourworks" 
            className="block py-2 px-4 text-sm text-muted-foreground hover:bg-secondary"
            onClick={() => setIsMenuOpen(false)}
          >
            Our Works
          </Link>
          <Link 
            to="/offers" 
            className="flex items-center justify-center space-x-1 py-2 px-4 text-sm bg-red-500 text-white font-bold mx-4 my-2 rounded"
            onClick={() => setIsMenuOpen(false)}
          >
            <Tag size={16} />
            <span>OFFERS</span>
          </Link>
          <Link 
            to="/contact" 
            className="block py-2 px-4 text-sm text-muted-foreground hover:bg-secondary"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact Us
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;