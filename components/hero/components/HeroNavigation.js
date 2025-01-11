import React from 'react';
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const HeroNavigation = ({ activeSection, sectionsLength, onNavigate }) => {
  // Add click handlers with event prevention
  const handleUpClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (activeSection > 0) {
      onNavigate(-1);
    }
  };

  const handleDownClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (activeSection < sectionsLength - 1) {
      onNavigate(1);
    }
  };

  return (
    <div className="lg:hidden absolute bottom-16 left-8 flex flex-col gap-2 z-50">
      <button
        onClick={handleUpClick}
        disabled={activeSection === 0}
        className={`p-2 rounded-full bg-white/10 backdrop-blur-sm transition-opacity ${
          activeSection === 0
            ? "opacity-50 cursor-not-allowed"
            : "opacity-100 hover:bg-white/20"
        }`}
        aria-label="Previous section"
      >
        <FaChevronUp className="w-3 h-3 text-white" />
      </button>
      <button
        onClick={handleDownClick}
        disabled={activeSection === sectionsLength - 1}
        className={`p-2 rounded-full bg-white/10 backdrop-blur-sm transition-opacity ${
          activeSection === sectionsLength - 1
            ? "opacity-50 cursor-not-allowed"
            : "opacity-100 hover:bg-white/20"
        }`}
        aria-label="Next section"
      >
        <FaChevronDown className="w-3 h-3 text-white" />
      </button>
    </div>
  );
};

export default HeroNavigation;