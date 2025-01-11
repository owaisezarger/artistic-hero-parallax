import React from 'react';
import HeroMobile from './HeroMobile';
import HeroDesktop from './HeroDesktop';

const HeroContent = ({ section, index, activeSection, refs, handleImageHover }) => {
  return (
    <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className={`container mx-auto h-full ${
        index === activeSection ? "opacity-100" : "opacity-0"
      }`}>
        <HeroMobile 
          section={section} 
          index={index} 
          activeSection={activeSection}
          refs={refs}
        />
        <HeroDesktop 
          section={section} 
          index={index} 
          activeSection={activeSection}
          refs={refs}
          handleImageHover={handleImageHover}
        />
      </div>
    </div>
  );
};

export default HeroContent;