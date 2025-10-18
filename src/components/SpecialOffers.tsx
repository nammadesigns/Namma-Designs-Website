import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Tag, Calendar, Percent } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { getActiveOffers, Offer } from "../lib/supabaseService";

const SpecialOffers: React.FC = () => {
  const [offers, setOffers] = useState<Offer[]>([]);

  useEffect(() => {
    loadOffers();
  }, []);

  const loadOffers = async () => {
    try {
      const offersData = await getActiveOffers();
      setOffers(offersData.slice(0, 3)); // Show only first 3 offers
    } catch (error) {
      console.error('Error loading offers:', error);
    }
  };

  if (offers.length === 0) return null;

  return (
    <section className="py-20 bg-gradient-to-r from-primary/10 to-secondary/10">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Tag className="text-primary mr-3" size={32} />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              🔥 Special Offers 🔥
            </h2>
          </div>
          <p className="text-lg text-muted-foreground">
            Limited time deals you don't want to miss!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {offers.map((offer) => (
            <Card key={offer.id} className="hover:shadow-xl transition-shadow border-primary/30 bg-white">
              {offer.image && (
                <div className="w-full h-40 overflow-hidden rounded-t-lg">
                  <img src={offer.image} alt={offer.title} className="w-full h-full object-cover" />
                </div>
              )}
              <CardHeader className="bg-gradient-to-r from-primary/20 to-secondary/20">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Percent className="text-primary" size={18} />
                    <span className="font-bold text-primary text-lg">{offer.discount}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <Calendar size={12} />
                    <span>Until {new Date(offer.valid_until).toLocaleDateString()}</span>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-foreground">{offer.title}</h3>
              </CardHeader>
              <CardContent className="pt-3">
                <p className="text-sm text-muted-foreground mb-3">{offer.description}</p>
                <Link to="/contact">
                  <Button size="sm" className="w-full">
                    Claim Now
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link to="/offers">
            <Button size="lg" variant="outline" className="animate-pulse">
              <Tag className="mr-2" size={20} />
              View All Offers
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;