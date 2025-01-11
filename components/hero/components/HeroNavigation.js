import React from 'react';
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const HeroNavigation = ({ activeSection, sectionsLength, onNavigate }) => {
  return (
    <div className="lg:hidden absolute bottom-16 left-8 flex flex-col gap-2 z-50">
      <button
        onClick={() => onNavigate(-1)}
        disabled={activeSection === 0}
        className={`p-2 rounded-full bg-white/10 backdrop-blur-sm transition-opacity ${
          activeSection === 0
            ? "opacity-50 cursor-not-allowed"
            : "opacity-100"
        }`}
      >
        <FaChevronUp className="w-3 h-3 text-white" />
      </button>
      <button
        onClick={() => onNavigate(1)}
        disabled={activeSection === sectionsLength - 1}
        className={`p-2 rounded-full bg-white/10 backdrop-blur-sm transition-opacity ${
          activeSection === sectionsLength - 1
            ? "opacity-50 cursor-not-allowed"
            : "opacity-100"
        }`}
      >
        <FaChevronDown className="w-3 h-3 text-white" />
      </button>
    </div>
  );
};

export default HeroNavigation;