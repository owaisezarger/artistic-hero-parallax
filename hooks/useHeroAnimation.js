"use client";
import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ANIMATION_DURATION, ANIMATION_EASE } from '@/config/section-data';

export const useHeroAnimation = (
  bgRefs,
  titleRefs,
  imageRefs,
  descRefs,
  overlayRefs,
  activeSection,
  isInitialLoad,
  setIsInitialLoad,
  sections
) => {
  const startBackgroundAnimation = (index) => {
    if (!bgRefs.current[index].animationStarted) {
      gsap.to(bgRefs.current[index], {
        scale: 1.5,
        duration: 5,
        ease: "none",
        repeat: -1,
        yoyo: true,
      });
      bgRefs.current[index].animationStarted = true;
    }
  };

  const startZoomAnimation = (index) => {
    if (!imageRefs.current[index].animationStarted) {
      gsap.to(imageRefs.current[index], {
        scale: 1.1,
        duration: 5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
      imageRefs.current[index].animationStarted = true;
    }
  };

  // Initial load animation
  useLayoutEffect(() => {
    if (isInitialLoad) {
      const duration = 0.8;
      const ease = "power2.out";

      // Hide all sections except the first one
      sections.forEach((_, index) => {
        if (index !== 0) {
          gsap.set(bgRefs.current[index], { opacity: 0, y: "100%" });
          gsap.set(
            [
              titleRefs.current[index],
              imageRefs.current[index],
              descRefs.current[index],
              ...(overlayRefs.current[index] || []),
            ],
            { opacity: 0, y: "100%" }
          );
        }
      });

      // Set initial positions for first section
      gsap.set(bgRefs.current[0], {
        y: "-100%",
        opacity: 0,
      });

      gsap.set(
        [
          titleRefs.current[0],
          imageRefs.current[0],
          descRefs.current[0],
          ...(overlayRefs.current[0] || []),
        ],
        {
          y: "100%",
          opacity: 0,
        }
      );

      // Animate background from top
      gsap.to(bgRefs.current[0], {
        y: "0%",
        opacity: 1,
        duration: 0.6,
        ease: ease,
      });

      // Animate other elements from bottom
      gsap.to(
        [
          titleRefs.current[0],
          imageRefs.current[0],
          descRefs.current[0],
          ...(overlayRefs.current[0] || []),
        ],
        {
          y: "0%",
          opacity: 1,
          duration: duration,
          ease: ease,
          onComplete: () => {
            setIsInitialLoad(false);
            startBackgroundAnimation(0);
            startZoomAnimation(0);
          },
        }
      );
    }
  }, [isInitialLoad]);

  const handleImageHover = (index, isEnter) => {
    if (isEnter) {
      gsap.to(imageRefs.current[index], {
        x: "2px",
        duration: 0.4,
        repeat: 3,
        yoyo: true,
        ease: "power1.inOut",
        onComplete: () => {
          gsap.set(imageRefs.current[index], { x: 0 });
        },
      });
    }
  };

  const animateSection = (direction, nextIndex) => {
    const currentSection = activeSection;

    // Current section animations
    gsap.to(bgRefs.current[currentSection], {
      y: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      duration: ANIMATION_DURATION,
      ease: ANIMATION_EASE,
    });

    const contentElements = [
      titleRefs.current[currentSection],
      imageRefs.current[currentSection],
      descRefs.current[currentSection],
      ...(overlayRefs.current[currentSection] || []),
    ];

    gsap.to(contentElements, {
      y: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      duration: ANIMATION_DURATION,
      ease: ANIMATION_EASE,
    });

    // Next section animations
    gsap.fromTo(
      bgRefs.current[nextIndex],
      {
        y: direction > 0 ? "-100%" : "100%",
        opacity: 0,
      },
      {
        y: "0%",
        opacity: 1,
        duration: ANIMATION_DURATION,
        ease: ANIMATION_EASE,
      }
    );

    const nextContentElements = [
      titleRefs.current[nextIndex],
      imageRefs.current[nextIndex],
      descRefs.current[nextIndex],
      ...(overlayRefs.current[nextIndex] || []),
    ];

    gsap.fromTo(
      nextContentElements,
      {
        y: direction > 0 ? "100%" : "-100%",
        opacity: 0,
      },
      {
        y: "0%",
        opacity: 1,
        duration: ANIMATION_DURATION,
        ease: ANIMATION_EASE,
        onComplete: () => {
          startBackgroundAnimation(nextIndex);
          startZoomAnimation(nextIndex);
        },
      }
    );
  };

  return {
    startBackgroundAnimation,
    startZoomAnimation,
    handleImageHover,
    animateSection,
  };
};