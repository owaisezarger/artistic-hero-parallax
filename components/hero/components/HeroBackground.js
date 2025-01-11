import React from 'react';

const HeroBackground = ({ section, index, activeSection, bgRef }) => {
  return (
    <div
      ref={bgRef}
      className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${section.bgImage})`,
        willChange: "transform",
        opacity: index === activeSection ? 1 : 0,
        visibility: index === activeSection ? "visible" : "hidden",
      }}
    />
  );
};

export default HeroBackground;