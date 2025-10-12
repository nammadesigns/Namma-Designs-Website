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
    <section className="bg-white py-20 md:py-32">
      <div className="container mx-auto px-6 text-center max-w-7xl">
        <h2 className="text-4xl md:text-6xl font-extrabold text-foreground leading-tight min-h-[8rem] md:min-h-[12rem]">
          <span ref={typedRef}></span>
        </h2>
        <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in">
          We bring your ideas to life with stunning visuals. From branding to social media, we do it all. 
          <span className="text-primary font-semibold"> At incredibly affordable prices!</span> Let's create something amazing together.
        </p>
        <Link to="/contact">
          <Button size="lg" className="mt-8 animate-fade-in transform hover:scale-105 transition-transform">
            Get a Free Quote
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default Hero;