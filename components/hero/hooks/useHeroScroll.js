import { useLayoutEffect, useRef } from 'react';
import { isMobileDevice } from '../utils/deviceDetection';

export const useHeroScroll = ({
  containerRef,
  activeSection,
  setActiveSection,
  animateSection,
  sections,
  setAutoplayEnabled,
  resetAutoplayTimer
}) => {
  const isScrolling = useRef(false);
  const touchStartY = useRef(0);
  const lastScrollTime = useRef(Date.now());
  const scrollCooldown = 1000;

  const handleNavigation = (direction) => {
    const nextIndex = activeSection + direction;
    if (nextIndex >= 0 && nextIndex < sections.length) {
      animateSection(direction, nextIndex);
      setActiveSection(nextIndex);
      resetAutoplayTimer();
    }
  };

  const handleScroll = (direction) => {
    if (isMobileDevice()) return;

    const now = Date.now();
    if (isScrolling.current || now - lastScrollTime.current < scrollCooldown) return;

    const rect = containerRef.current.getBoundingClientRect();
    const isInView = rect.top <= 0 && rect.bottom + 1 >= window.innerHeight;

    if (!isInView) return;

    isScrolling.current = true;
    lastScrollTime.current = now;

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
    }, scrollCooldown);
  };

  

  useLayoutEffect(() => {
    if (isMobileDevice()) {
      document.body.style.overflow = "auto";
      return;
    }

    const container = containerRef.current;

    const handleScrollIntoView = () => {
      // Disable scroll lock on mobile
      if (isMobileDevice()) {
        document.body.style.overflow = "auto";
        setAutoplayEnabled(true);
        return;
      }
  
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
        handleScroll(direction);
        
        if (
          (activeSection > 0 || (activeSection === 0 && direction > 0)) &&
          (activeSection < sections.length - 1 || (activeSection === sections.length - 1 && direction < 0))
        ) {
          e.preventDefault();
          document.body.style.overflow = "hidden";
        }
      }
    };

    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      const touchEndY = e.touches[0].clientY;
      const direction = touchStartY.current > touchEndY ? 1 : -1;

      if (Math.abs(touchStartY.current - touchEndY) > 50) {
        handleScroll(direction);
        touchStartY.current = touchEndY;
      }
    };

    // Add event listeners only if not on mobile
    if (!isMobileDevice()) {
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
    }
    
    window.addEventListener("scroll", handleScrollIntoView);

    handleScrollIntoView();

    return () => {
      if (!isMobileDevice()) {
        window.removeEventListener("wheel", handleWheel, { capture: true });
        container.removeEventListener("touchstart", handleTouchStart);
        container.removeEventListener("touchmove", handleTouchMove);
      }
      window.removeEventListener("scroll", handleScrollIntoView);
      document.body.style.overflow = "auto";
    };
  }, [activeSection, sections.length]);

  return {
    handleNavigation,
    handleScroll
  };
};
