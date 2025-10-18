import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Tag, Calendar, Percent } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { getActiveOffers, Offer } from "../lib/supabaseService";

const OffersPage: React.FC = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    loadOffers();
  }, []);

  const loadOffers = async () => {
    try {
      const offersData = await getActiveOffers();
      setOffers(offersData);
    } catch (error) {
      console.error('Error loading offers:', error);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white sticky top-0 z-50 shadow-md">
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
            <Tag className="text-primary mb-2 sm:mb-0 sm:mr-3" size={32} />
            <h1 className="text-2xl sm:text-4xl lg:text-6xl font-extrabold text-foreground text-center">
              Special <span className="text-primary">Offers</span>
            </h1>
          </div>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Don't miss out on our exclusive deals and discounts on premium design services!
          </p>
        </div>
      </section>

      {/* Offers Section */}
      <section className="py-8 sm:py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          {offers.length === 0 ? (
            <div className="text-center py-12 sm:py-20">
              <div className="bg-gradient-to-br from-primary/5 to-secondary/10 rounded-lg p-6 sm:p-8 max-w-md mx-auto shadow-lg">
                <Tag className="text-primary mx-auto mb-4" size={40} />
                <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">No Active Offers</h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Check back soon for amazing deals and discounts!
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {offers.map((offer) => (
                <Card key={offer.id} className="hover:shadow-lg transition-shadow border-primary/20">
                  {offer.image && (
                    <div className="w-full h-48 overflow-hidden rounded-t-lg">
                      <img src={offer.image} alt={offer.title} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Percent className="text-primary" size={20} />
                        <span className="font-bold text-primary text-lg">{offer.discount}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                        <Calendar size={14} />
                        <span>Until {new Date(offer.valid_until).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-foreground">{offer.title}</h3>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <p className="text-muted-foreground mb-4">{offer.description}</p>
                    <Link to="/contact">
                      <Button className="w-full">
                        Claim Offer
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-8 sm:py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 text-center max-w-4xl">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-3 sm:mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground mb-6 sm:mb-8 px-4">
            Contact us today to discuss your project and claim these exclusive offers!
          </p>
          <Link to="/contact">
            <Button size="lg" className="transform hover:scale-105 transition-transform text-sm sm:text-base">
              Contact Us Now
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

export default OffersPage;