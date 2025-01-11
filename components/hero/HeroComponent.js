"use client";
import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import HeroBackground from './components/HeroBackground';
import HeroContent from './components/HeroContent';
import HeroNavigation from './components/HeroNavigation';
import { useHeroAnimation } from './hooks/useHeroAnimation';
import { useHeroScroll } from './hooks/useHeroScroll';
import { useHeroAutoplay } from './hooks/useHeroAutoplay';
import { sections } from './constants/heroData';

const HeroComponent = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);
  const containerRef = useRef(null);

  // Get animation functionality and refs
  const { animateSection, refs } = useHeroAnimation({
    activeSection,
    isInitialLoad,
    setIsInitialLoad,
    sections
  });

  // Get autoplay functionality
  const { resetAutoplayTimer } = useHeroAutoplay({
    autoplayEnabled,
    activeSection,
    setActiveSection,
    sections,
    animateSection
  });

  // Get scroll handling
  const { handleNavigation } = useHeroScroll({
    containerRef,
    activeSection,
    setActiveSection,
    animateSection,
    sections,
    setAutoplayEnabled,
    resetAutoplayTimer
  });

  // Image hover effect handler
  const handleImageHover = (index, isEnter) => {
    if (isEnter && refs?.imageRefsDesktop?.current?.[index]) {
      gsap.to(refs.imageRefsDesktop.current[index], {
        x: "2px",
        duration: 0.4,
        repeat: 3,
        yoyo: true,
        ease: "power1.inOut",
        onComplete: () => {
          gsap.set(refs.imageRefsDesktop.current[index], { x: 0 });
        },
      });
    }
  };

  if (!refs) return null; // Add safety check

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-black isolate"
    >
      {sections.map((section, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full overflow-hidden ${
            index === activeSection ? "visible" : "invisible"
          }`}
        >
          <HeroBackground 
            section={section}
            index={index}
            activeSection={activeSection}
            bgRef={(el) => (refs.bgRefs.current[index] = el)}
          />
          <HeroContent 
            section={section}
            index={index}
            activeSection={activeSection}
            refs={refs}
            handleImageHover={handleImageHover}
          />
        </div>
      ))}
      <HeroNavigation 
        activeSection={activeSection}
        sectionsLength={sections.length}
        onNavigate={handleNavigation}
      />
    </div>
  );
};

export default HeroComponent;