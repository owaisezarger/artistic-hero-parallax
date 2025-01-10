"use client";
import React, { useRef, useState } from "react";
import { sections } from "@/config/section-data";
import { useHeroAnimation } from "@/hooks/useHeroAnimation";
import { useAutoplay } from "@/hooks/useAutoplay";
import { useHeroScroll } from "@/hooks/useHeroScroll";
import HeroSection from "./section";

const Hero = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);
  
  const containerRef = useRef(null);
  const titleRefs = useRef([]);
  const imageRefs = useRef([]);
  const descRefs = useRef([]);
  const bgRefs = useRef([]);
  const overlayRefs = useRef([]);

  const {
    startBackgroundAnimation,
    startZoomAnimation,
    handleImageHover,
    animateSection,
  } = useHeroAnimation(
    bgRefs,
    titleRefs,
    imageRefs,
    descRefs,
    overlayRefs,
    activeSection,
    isInitialLoad,
    setIsInitialLoad,
    sections
  );

  const { resetAutoplayTimer } = useAutoplay(
    autoplayEnabled,
    setActiveSection,
    sections,
    animateSection
  );

  useHeroScroll(
    containerRef,
    activeSection,
    setActiveSection,
    sections,
    animateSection,
    setAutoplayEnabled,
    resetAutoplayTimer
  );

  const setOverlayRef = (sectionIndex, overlayIndex, el) => {
    if (!overlayRefs.current[sectionIndex]) {
      overlayRefs.current[sectionIndex] = [];
    }
    overlayRefs.current[sectionIndex][overlayIndex] = el;
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-black isolate bg-[url('/images/home/home-hero-bg-1.png')]"
    >
      {sections.map((section, index) => (
        <HeroSection
          key={index}
          section={section}
          index={index}
          activeSection={activeSection}
          refs={{ bgRefs, titleRefs, imageRefs, descRefs }}
          handleImageHover={handleImageHover}
          setOverlayRef={setOverlayRef}
        />
      ))}
    </div>
  );
};

export default Hero;