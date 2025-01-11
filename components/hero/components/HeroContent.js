import React from 'react';
import HeroMobile from './HeroMobile';
import HeroDesktop from './HeroDesktop';

const HeroContent = ({ section, index, activeSection, refs, handleImageHover }) => {
  if (!refs) return null; // Add safety check

  return (
    <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className={`container mx-auto h-full ${
        index === activeSection ? "opacity-100" : "opacity-0"
      }`}>
        <HeroMobile 
          section={section} 
          index={index} 
          activeSection={activeSection}
          titleRef={(el) => (refs.titleRefsMobile.current[index] = el)}
          imageRef={(el) => (refs.imageRefsMobile.current[index] = el)}
          descRef={(el) => (refs.descRefsMobile.current[index] = el)}
          overlayRefs={refs.overlayRefs}
        />
        <HeroDesktop 
          section={section} 
          index={index} 
          activeSection={activeSection}
          titleRef={(el) => (refs.titleRefsDesktop.current[index] = el)}
          imageRef={(el) => (refs.imageRefsDesktop.current[index] = el)}
          descRef={(el) => (refs.descRefsDesktop.current[index] = el)}
          overlayRefs={refs.overlayRefs}
          handleImageHover={handleImageHover}
        />
      </div>
    </div>
  );
};

export default HeroContent;