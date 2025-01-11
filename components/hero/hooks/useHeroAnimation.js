import {useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { cleanupAnimations, startBackgroundAnimation, startZoomAnimation } from '../utils/animations';
import { sections } from '../constants/heroData';

export const useHeroAnimation = ({ 
  activeSection, 
  isInitialLoad, 
  setIsInitialLoad 
}) => {
  const titleRefsMobile = useRef([]);
  const imageRefsMobile = useRef([]);
  const descRefsMobile = useRef([]);
  const titleRefsDesktop = useRef([]);
  const imageRefsDesktop = useRef([]);
  const descRefsDesktop = useRef([]);
  const overlayRefs = useRef([]);
  const bgRefs = useRef([]);

  const activeAnimations = useRef([]);

  const animateSection = (direction, nextIndex) => {
    const currentSection = activeSection;
    const duration = 0.8;
    const ease = "power2.inOut";

    // Cleanup any existing animations for the current sections
    const currentElements = [
      bgRefs.current[currentSection],
      titleRefsMobile.current[currentSection],
      imageRefsMobile.current[currentSection],
      descRefsMobile.current[currentSection],
      titleRefsDesktop.current[currentSection],
      imageRefsDesktop.current[currentSection],
      descRefsDesktop.current[currentSection],
      ...(overlayRefs.current[currentSection]?.mobile || []),
      ...(overlayRefs.current[currentSection]?.desktop || [])
    ];
    cleanupAnimations(currentElements);

    // Hide current background
    gsap.to(bgRefs.current[currentSection], {
      y: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 1,
      duration: duration,
      ease: ease,
    });

    // Show and animate next background
    gsap.fromTo(
      bgRefs.current[nextIndex],
      {
        y: direction > 0 ? "-100%" : "100%",
        opacity: 0,
        scale: 1,
      },
      {
        y: "0%",
        opacity: 1,
        duration: duration,
        ease: ease,
        onComplete: () => {
          startBackgroundAnimation(bgRefs.current[nextIndex]);
        },
      }
    );

    // Mobile content elements including overlays
    const mobileContentElements = [
      titleRefsMobile.current[currentSection],
      imageRefsMobile.current[currentSection],
      descRefsMobile.current[currentSection],
      ...(overlayRefs.current[currentSection]?.mobile || []),
    ];

    // Desktop content elements including overlays
    const desktopContentElements = [
      titleRefsDesktop.current[currentSection],
      imageRefsDesktop.current[currentSection],
      descRefsDesktop.current[currentSection],
      ...(overlayRefs.current[currentSection]?.desktop || []),
    ];

    // Animate current section out
    gsap.to([...mobileContentElements, ...desktopContentElements], {
      y: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      duration: duration,
      ease: ease,
    });

    // Next section animations
    const nextMobileElements = [
      titleRefsMobile.current[nextIndex],
      imageRefsMobile.current[nextIndex],
      descRefsMobile.current[nextIndex],
      ...(overlayRefs.current[nextIndex]?.mobile || []),
    ];

    const nextDesktopElements = [
      titleRefsDesktop.current[nextIndex],
      imageRefsDesktop.current[nextIndex],
      descRefsDesktop.current[nextIndex],
      ...(overlayRefs.current[nextIndex]?.desktop || []),
    ];

    gsap.fromTo(
      [...nextMobileElements, ...nextDesktopElements],
      {
        y: direction > 0 ? "100%" : "-100%",
        opacity: 0,
      },
      {
        y: "0%",
        opacity: 1,
        duration: duration,
        ease: ease,
        onComplete: () => {
          startZoomAnimation(
            imageRefsMobile.current[nextIndex],
            imageRefsDesktop.current[nextIndex]
          );
        },
      }
    );
  };

  // Initial animation setup
  useLayoutEffect(() => {
    if (isInitialLoad) {
      const duration = 0.8;
      const ease = "power2.out";

      // Set initial positions for all sections
      sections.forEach((_, index) => {
        if (index !== 0) {
          gsap.set(bgRefs.current[index], { opacity: 0, y: "-100%" });
          
          // Mobile elements
          gsap.set(
            [
              titleRefsMobile.current[index],
              imageRefsMobile.current[index],
              descRefsMobile.current[index],
              ...(overlayRefs.current[index]?.mobile || []),
            ],
            { opacity: 0, y: "100%" }
          );

          // Desktop elements
          gsap.set(
            [
              titleRefsDesktop.current[index],
              imageRefsDesktop.current[index],
              descRefsDesktop.current[index],
              ...(overlayRefs.current[index]?.desktop || []),
            ],
            { opacity: 0, y: "100%" }
          );
        }
      });

      // Animate first section
      const animateFirstSection = () => {
        gsap.to(bgRefs.current[0], {
          y: "0%",
          opacity: 1,
          duration: 0.6,
          ease: ease,
        });

        // Animate mobile elements
        gsap.to(
          [
            titleRefsMobile.current[0],
            imageRefsMobile.current[0],
            descRefsMobile.current[0],
            ...(overlayRefs.current[0]?.mobile || []),
          ],
          {
            y: "0%",
            opacity: 1,
            duration: duration,
            ease: ease,
          }
        );

        // Animate desktop elements
        gsap.to(
          [
            titleRefsDesktop.current[0],
            imageRefsDesktop.current[0],
            descRefsDesktop.current[0],
            ...(overlayRefs.current[0]?.desktop || []),
          ],
          {
            y: "0%",
            opacity: 1,
            duration: duration,
            ease: ease,
            onComplete: () => {
              setIsInitialLoad(false);
              startBackgroundAnimation(bgRefs.current[0]);
              startZoomAnimation(
                imageRefsMobile.current[0],
                imageRefsDesktop.current[0]
              );
            },
          }
        );
      };

      animateFirstSection();
    }
  }, [isInitialLoad]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // Cleanup all animations
      sections.forEach((_, index) => {
        const elements = [
          bgRefs.current[index],
          titleRefsMobile.current[index],
          imageRefsMobile.current[index],
          descRefsMobile.current[index],
          titleRefsDesktop.current[index],
          imageRefsDesktop.current[index],
          descRefsDesktop.current[index],
          ...(overlayRefs.current[index]?.mobile || []),
          ...(overlayRefs.current[index]?.desktop || [])
        ];
        cleanupAnimations(elements);
      });

      // Kill any remaining GSAP animations
      gsap.killTweensOf([
        ...bgRefs.current,
        ...titleRefsMobile.current,
        ...imageRefsMobile.current,
        ...descRefsMobile.current,
        ...titleRefsDesktop.current,
        ...imageRefsDesktop.current,
        ...descRefsDesktop.current
      ]);
    };
  }, []);

  return {
    animateSection,
    refs: {
      titleRefsMobile,
      imageRefsMobile,
      descRefsMobile,
      titleRefsDesktop,
      imageRefsDesktop,
      descRefsDesktop,
      overlayRefs,
      bgRefs,
    },
  };
};
