import React from "react";
import { Link } from "react-router-dom";
import { Tag, X } from "lucide-react";
import { Button } from "./ui/button";

const OffersBanner: React.FC = () => {
  const [isVisible, setIsVisible] = React.useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white py-2 px-4 relative animate-pulse">
      <div className="container mx-auto flex items-center justify-center text-center">
        <div className="flex items-center space-x-2">
          <Tag className="animate-bounce" size={20} />
          <span className="font-bold text-sm md:text-base">
            🔥 LIMITED TIME OFFERS! Get Up To 50% OFF on All Design Services! 🔥
          </span>
          <Link to="/offers">
            <Button size="sm" variant="secondary" className="ml-4 font-bold">
              VIEW DEALS
            </Button>
          </Link>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 hover:bg-white/20 rounded-full p-1"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default OffersBanner;