import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";

interface PinnedFrameProps {
  image: string;
  title: string;
}

const PinnedFrame: React.FC<PinnedFrameProps> = ({ image, title }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {/* Frame */}
      <div
        onClick={() => setIsOpen(true)}
        className="relative bg-white shadow-xl rounded-xl p-4 w-60 h-72 sm:w-64 sm:h-80 md:w-72 md:h-80 flex flex-col items-center justify-between transform rotate-[-2deg] hover:rotate-0 hover:scale-105 transition-all duration-300 cursor-pointer mx-auto"
      >
        {/* Push pin */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-red-500 rounded-full shadow-md border-2 border-gray-200 z-10"></div>
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-[2px] h-4 bg-gray-700 z-0"></div>

        {/* Image */}
        <img
          src={image}
          alt={title}
          className="w-full h-52 object-cover rounded-lg shadow-md"
        />

        {/* Title */}
        <h3 className="font-semibold text-gray-800 text-center mt-3 text-base">
          {title}
        </h3>
      </div>

      {/* Modal */}
      {isOpen && createPortal(
        <div
          onClick={() => setIsOpen(false)}
          className="fixed top-0 left-0 w-screen h-screen bg-black/90 flex items-center justify-center p-4"
          style={{ position: 'fixed', zIndex: 999999, margin: 0, padding: '1rem' }}
        >
          <div 
            className="relative flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={image}
              alt={title}
              className="max-h-[85vh] max-w-[90vw] w-auto h-auto object-contain rounded-lg shadow-2xl"
            />
            <h3 className="text-white text-lg font-semibold mt-4 text-center px-4 max-w-[90vw] break-words">
              {title}
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 bg-white/90 text-black rounded-full w-10 h-10 flex items-center justify-center font-bold shadow-lg hover:bg-white transition-colors"
            >
              ✕
            </button>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default PinnedFrame;
