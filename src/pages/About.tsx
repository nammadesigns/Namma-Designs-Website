import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 max-w-7xl">
            <h1 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
              About Namma Designs
            </h1>
            <div className="max-w-4xl mx-auto text-lg text-muted-foreground space-y-6">
              <p>
                Welcome to Namma Designs, where creativity meets passion. Founded in 2025, our mission has been to 
                provide top-tier graphic design services that help businesses and individuals make a memorable impact. 
                We believe that great design is not just about aesthetics, but about clear communication and effective storytelling.
              </p>
              <p>
                Our team is composed of talented designers who are experts in their craft. We specialize in a wide range 
                of services, from creating powerful brand identities to designing engaging social media content. We pride 
                ourselves on our collaborative approach, working closely with our clients to understand their vision and 
                bring it to life with precision and flair.
              </p>
              <p>
                What sets us apart is our commitment to affordability without compromising quality. We understand that 
                great design should be accessible to everyone, which is why we offer professional services at prices 
                significantly lower than traditional agencies. Our goal is to empower businesses and individuals with 
                stunning visuals that drive results.
              </p>
              <p>
                At Namma Designs, your success is our success. We are dedicated to delivering high-quality work that 
                exceeds expectations and drives results. Let's create something beautiful together.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;