import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import PinnedFrame from "./PinnedFrame";
import { getWorks, Work } from "../lib/localStorageService";

const MyWorks: React.FC = () => {
  const [designs, setDesigns] = useState<Work[]>([]);

  useEffect(() => {
    loadWorks();
  }, []);

  const loadWorks = async () => {
    try {
      const worksData = await getWorks();
      setDesigns(worksData);
    } catch (error) {
      console.error('Error loading works:', error);
    }
  };

  return (
    <section
      id="my-works"
      className="min-h-screen bg-[url('/images/board-bg.jpg')] bg-cover bg-center py-16"
    >
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-12 text-gray-900 drop-shadow-lg px-4">
        ✨ Our Works ✨
      </h2>

      <div className={`grid gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-6 max-w-6xl mx-auto ${
        designs.length === 1 
          ? 'grid-cols-1 place-items-center' 
          : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
      }`}>
        {designs.slice(0, 4).map((item) => (
          <div key={item.id} className="flex justify-center">
            <PinnedFrame image={item.image} title={item.title} />
          </div>
        ))}
      </div>
      
      <div className="text-center mt-8 sm:mt-12 px-4">
        <Link to="/ourworks">
          <Button size="lg" className="animate-fade-in transform hover:scale-105 transition-transform text-sm sm:text-base">
            View More Works
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default MyWorks;
