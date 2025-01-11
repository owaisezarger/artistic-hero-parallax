import { useLayoutEffect, useRef } from 'react';

export const useHeroAutoplay = ({
  autoplayEnabled,
  activeSection,
  setActiveSection,
  sections,
  animateSection
}) => {
  const autoplayTimerRef = useRef(null);

  const resetAutoplayTimer = () => {
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
    }

    if (autoplayEnabled) {
      autoplayTimerRef.current = setInterval(() => {
        setActiveSection((prev) => {
          const next = (prev + 1) % sections.length;
          animateSection(1, next);
          return next;
        });
      }, 5000);
    }
  };

  useLayoutEffect(() => {
    resetAutoplayTimer();
    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, [autoplayEnabled]);

  return {
    resetAutoplayTimer
  };
};