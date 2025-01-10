"use client";
import { useLayoutEffect, useRef } from 'react';
import { AUTOPLAY_INTERVAL } from '@/config/section-data';

export const useAutoplay = (
  autoplayEnabled,
  setActiveSection,
  sections,
  animateSection
) => {
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
      }, AUTOPLAY_INTERVAL);
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

  return { resetAutoplayTimer };
};