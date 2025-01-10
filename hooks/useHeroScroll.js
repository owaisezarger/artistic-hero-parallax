"use client";
import { useLayoutEffect, useRef } from 'react';
import { SCROLL_COOLDOWN } from '@/config/section-data';

export const useHeroScroll = (
  containerRef,
  activeSection,
  setActiveSection,
  sections,
  animateSection,
  setAutoplayEnabled,
  resetAutoplayTimer
) => {
  const isScrolling = useRef(false);
  let touchStartY = 0;
  let lastScrollTime = Date.now();

  const handleScroll = (direction) => {
    const now = Date.now();
    if (isScrolling.current || now - lastScrollTime < SCROLL_COOLDOWN) return;

    const rect = containerRef.current.getBoundingClientRect();
    const isInView = rect.top <= 0 && rect.bottom + 1 >= window.innerHeight;

    if (!isInView) return;

    isScrolling.current = true;
    lastScrollTime = now;

    setActiveSection((prev) => {
      const next = prev + direction;
      if (next >= 0 && next < sections.length) {
        animateSection(direction, next);
        resetAutoplayTimer();
        return next;
      }
      if (prev === sections.length - 1 && direction > 0) {
        document.body.style.overflow = "auto";
        setAutoplayEnabled(false);
        return prev;
      }
      if (prev === 0 && direction < 0) {
        document.body.style.overflow = "auto";
        return prev;
      }
      return prev;
    });

    setTimeout(() => {
      isScrolling.current = false;
    }, SCROLL_COOLDOWN);
  };

  useLayoutEffect(() => {
    const container = containerRef.current;

    const handleScrollIntoView = () => {
      const rect = container.getBoundingClientRect();
      const isInView = rect.top <= 0 && rect.bottom + 1 >= window.innerHeight;

      if (isInView) {
        document.body.style.overflow = "hidden";
        setAutoplayEnabled(true);
        resetAutoplayTimer();
      } else {
        document.body.style.overflow = "auto";
        setAutoplayEnabled(false);
      }
    };

    const handleWheel = (e) => {
      const rect = container.getBoundingClientRect();
      const isInView = rect.top <= 0 && rect.bottom + 1 >= window.innerHeight;

      if (isInView) {
        const direction = e.deltaY > 0 ? 1 : -1;

        if (
          (activeSection > 0 || (activeSection === 0 && direction > 0)) &&
          (activeSection < sections.length - 1 ||
            (activeSection === sections.length - 1 && direction < 0))
        ) {
          e.preventDefault();
          document.body.style.overflow = "hidden";
        }

        handleScroll(direction);
      }
    };

    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      const rect = container.getBoundingClientRect();
      const isInView = rect.top <= 0 && rect.bottom + 1 >= window.innerHeight;

      if (isInView) {
        const touchEndY = e.touches[0].clientY;
        const direction = touchStartY > touchEndY ? 1 : -1;

        if (Math.abs(touchStartY - touchEndY) > 50) {
          if (
            (activeSection > 0 || (activeSection === 0 && direction > 0)) &&
            (activeSection < sections.length - 1 ||
              (activeSection === sections.length - 1 && direction < 0))
          ) {
            e.preventDefault();
            document.body.style.overflow = "hidden";
          }

          handleScroll(direction);
          touchStartY = touchEndY;
        }
      }
    };

    window.addEventListener("wheel", handleWheel, {
      passive: false,
      capture: true,
    });
    container.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    container.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });
    window.addEventListener("scroll", handleScrollIntoView);

    handleScrollIntoView();

    return () => {
      window.removeEventListener("wheel", handleWheel, { capture: true });
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("scroll", handleScrollIntoView);
      document.body.style.overflow = "auto";
    };
  }, [activeSection]);
};