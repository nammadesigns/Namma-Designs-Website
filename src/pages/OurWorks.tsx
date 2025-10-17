import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Palette } from "lucide-react";
import { Button } from "../components/ui/button";
import PinnedFrame from "../components/PinnedFrame";
import { getWorks, Work } from "../lib/supabaseService";



const OurWorks: React.FC = () => {
  const [works, setWorks] = useState<Work[]>([]);

  useEffect(() => {
    loadWorks();
  }, []);

  const loadWorks = async () => {
    try {
      const worksData = await getWorks();
      setWorks(worksData);
    } catch (error) {
      console.error('Error loading works:', error);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white sticky top-0 z-40 shadow-md">
        <nav className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center max-w-7xl">
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3">
            <img src="https://i.postimg.cc/5tpJ1bLY/MY-L.png" alt="Namma Designs Logo" className="w-8 h-8 sm:w-10 sm:h-10" />
            <h1 className="text-lg sm:text-2xl font-bold text-foreground">
              Namma <span className="text-primary">Designs</span>
            </h1>
          </Link>
          
          <Link to="/">
            <Button variant="outline" className="flex items-center space-x-1 sm:space-x-2 text-sm sm:text-base px-3 sm:px-4">
              <ArrowLeft size={14} className="sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Back to Home</span>
              <span className="sm:hidden">Back</span>
            </Button>
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 to-secondary/10 py-8 sm:py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 text-center max-w-7xl">
          <div className="flex flex-col sm:flex-row items-center justify-center mb-4 sm:mb-6">
            <Palette className="text-primary mb-2 sm:mb-0 sm:mr-3" size={32} />
            <h1 className="text-2xl sm:text-4xl lg:text-6xl font-extrabold text-foreground text-center">
              Our <span className="text-primary">Creative Works</span>
            </h1>
          </div>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Explore our complete portfolio of stunning designs, from branding to social media graphics. 
            Each piece crafted with passion and precision.
          </p>
        </div>
      </section>

      {/* Works Grid */}
      <section className="py-8 sm:py-12 lg:py-16 bg-[url('/images/board-bg.jpg')] bg-cover bg-center min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 drop-shadow-lg mb-2 sm:mb-4">
              ✨ Complete Portfolio ✨
            </h2>
            <p className="text-sm sm:text-base text-gray-700 drop-shadow-sm">
              Showcasing {works.length} amazing designs
            </p>
          </div>

          {works.length === 0 ? (
            <div className="text-center py-12 sm:py-20">
              <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 sm:p-8 max-w-md mx-auto shadow-lg">
                <Palette className="text-primary mx-auto mb-4" size={40} />
                <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">No Works Yet</h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Our portfolio is being updated. Check back soon for amazing designs!
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8 justify-items-center">
              {works.map((work) => (
                <div key={work.id} className="transform hover:scale-105 transition-transform duration-300 w-full max-w-sm">
                  <PinnedFrame image={work.image} title={work.title} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-8 sm:py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 text-center max-w-4xl">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-3 sm:mb-4">
            Love What You See?
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground mb-6 sm:mb-8 px-4">
            Let's create something amazing together. Get your custom design today!
          </p>
          <Link to="/contact">
            <Button size="lg" className="transform hover:scale-105 transition-transform text-sm sm:text-base">
              Start Your Project
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-6 sm:py-8">
        <div className="container mx-auto px-4 sm:px-6 text-center max-w-7xl">
          <div className="flex items-center justify-center mb-3 sm:mb-4">
            <img src="https://i.postimg.cc/5tpJ1bLY/MY-L.png" alt="Logo" className="w-6 h-6 sm:w-8 sm:h-8 mr-2" />
            <span className="text-sm sm:text-base text-foreground font-semibold">
              Namma <span className="text-primary">Designs</span>
            </span>
          </div>
          <p className="text-muted-foreground text-xs sm:text-sm">
            © 2025 Namma Designs. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default OurWorks;