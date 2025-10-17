import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import Typed from "typed.js";

const Hero = () => {
  const typedRef = useRef(null);

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: [
        'Namma Designs',
        'Professional <span class="text-primary">Graphic Design</span> Services'
      ],
      typeSpeed: 50,
      backSpeed: 25,
      loop: false,
      showCursor: true,
      cursorChar: '|',
      smartBackspace: true,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <section className="relative bg-white py-20 md:py-32 overflow-hidden">
      {/* Background Logo */}
      <div 
        className="absolute inset-0 opacity-5 bg-no-repeat bg-center bg-contain"
        style={{
          backgroundImage: 'url(https://i.postimg.cc/5tpJ1bLY/MY-L.png)',
          backgroundSize: '40%',
        }}
      />
      <div className="container mx-auto px-6 text-center max-w-7xl relative z-10">
        <h2 className="text-4xl md:text-6xl font-extrabold text-foreground leading-tight min-h-[8rem] md:min-h-[12rem]">
          <span ref={typedRef}></span>
        </h2>
        <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in">
          We bring your ideas to life with stunning visuals. From branding to social media, we do it all. 
          <span className="text-primary font-semibold"> At incredibly affordable prices!</span> Let's create something amazing together.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
          <Link to="/contact">
            <Button size="lg" className="animate-fade-in transform hover:scale-105 transition-transform">
              Get a Free Quote
            </Button>
          </Link>
          <Link to="/feedback">
            <Button 
              size="lg" 
              variant="outline" 
              className="animate-fade-in transform hover:scale-105 transition-transform border-2 border-primary text-primary hover:bg-primary hover:text-white bg-primary/5 shadow-lg"
            >
              ⭐ Give Feedback
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;