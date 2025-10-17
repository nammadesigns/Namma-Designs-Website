import React, { useState } from "react";

interface PinnedFrameProps {
  image: string;
  title: string;
}

const PinnedFrame: React.FC<PinnedFrameProps> = ({ image, title }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Frame */}
      <div
        onClick={() => setIsOpen(true)}
        className="relative bg-white shadow-xl rounded-xl p-4 w-64 h-72 sm:w-72 sm:h-80 flex flex-col items-center justify-between transform rotate-[-2deg] hover:rotate-0 hover:scale-105 transition-all duration-300 cursor-pointer"
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
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-[9999] p-4 animate-fadeIn"
        >
          <div 
            className="relative max-w-full max-h-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={image}
              alt={title}
              className="max-h-[85vh] max-w-[95vw] w-auto h-auto object-contain rounded-lg shadow-2xl border-2 border-white/20"
            />
            <h3 className="text-white text-lg sm:text-xl font-semibold mt-4 text-center px-4">
              {title}
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="absolute -top-2 -right-2 sm:top-2 sm:right-2 bg-white text-black rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center font-bold shadow-lg hover:bg-gray-200 transition-colors text-sm sm:text-base"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PinnedFrame;
