"use client";
import React, { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const ClutteredHero = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);
  const containerRef = useRef(null);
  const isScrolling = useRef(false);
  const autoplayTimerRef = useRef(null);
  const titleRefsMobile = useRef([]);
  const imageRefsMobile = useRef([]);
  const descRefsMobile = useRef([]);
  const titleRefsDesktop = useRef([]);
  const imageRefsDesktop = useRef([]);
  const descRefsDesktop = useRef([]);
  const overlayRefs = useRef([]);
  const bgRefs = useRef([]);

  const isMobileDevice = () => {
    return (
      typeof window !== "undefined" &&
      (navigator.userAgent.match(/Android/i) ||
        navigator.userAgent.match(/webOS/i) ||
        navigator.userAgent.match(/iPhone/i) ||
        navigator.userAgent.match(/iPad/i) ||
        navigator.userAgent.match(/iPod/i) ||
        navigator.userAgent.match(/BlackBerry/i) ||
        navigator.userAgent.match(/Windows Phone/i) ||
        window.matchMedia("(max-width: 768px)").matches)
    );
  };



  const sections = [
    {
      bgImage: "/images/home/home-hero-bg-1.png",
      content: {
        title: "Digital\n& Beyond",
        description:
          "ID8NXT is a Digital Marketing agency in Mumbai, India. We specialize in boosting businesses by focusing on their brand, using strategies, and harnessing digital tools.",
        mainImage: "./images/home/V1.png",
        overlayImages: [
          "/images/home/new-cloud.png",
          "/images/home/rectangle-1.png",
        ],
      },
    },
    {
      bgImage: "/images/home/home-hero-bg-2.png",
      content: {
        title: "Creativity\nmeets\nInnovation",
        description:
          "We offer branding, print, and digital marketing services across India.",
        mainImage: "/images/home/V2.png",

        overlayImages: ["/images/home/sec-2-rectangle.png"],

        hasBoxDecoration: true,
      },
    },
  ];

  // Navigation controls for mobile
  const handleNavigation = (direction) => {
    const nextIndex = activeSection + direction;
    if (nextIndex >= 0 && nextIndex < sections.length) {
      animateSection(direction, nextIndex);
      setActiveSection(nextIndex);
      resetAutoplayTimer();
    }
  };

  // Create continuous background zoom animation
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

  // Create zoom animation for images
  const startZoomAnimation = (index) => {
    // Handle mobile image
    if (
      imageRefsMobile.current[index] &&
      !imageRefsMobile.current[index].animationStarted
    ) {
      gsap.to(imageRefsMobile.current[index], {
        scale: 1.1,
        duration: 5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
      imageRefsMobile.current[index].animationStarted = true;
    }

    // Handle desktop image
    if (
      imageRefsDesktop.current[index] &&
      !imageRefsDesktop.current[index].animationStarted
    ) {
      gsap.to(imageRefsDesktop.current[index], {
        scale: 1.1,
        duration: 5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
      imageRefsDesktop.current[index].animationStarted = true;
    }
  };

  const handleImageHover = (index, isEnter) => {
    if (isEnter) {
      gsap.to(imageRefsDesktop.current[index], {
        x: "2px",
        duration: 0.4,
        repeat: 3,
        yoyo: true,
        ease: "power1.inOut",
        onComplete: () => {
          gsap.set(imageRefsDesktop.current[index], { x: 0 });
        },
      });
    }
  };

  const animateSection = (direction, nextIndex) => {
    const currentSection = activeSection;
    const duration = 0.8;
    const ease = "power2.inOut";

    // Hide current background
    gsap.to(bgRefs.current[currentSection], {
      y: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 1, // Reset scale
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
          startBackgroundAnimation(nextIndex);
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
          startZoomAnimation(nextIndex);
        },
      }
    );
  };

  useLayoutEffect(() => {
    if (isInitialLoad) {
      const duration = 0.8;
      const ease = "power2.out";

      sections.forEach((_, index) => {
        if (index !== 0) {
          gsap.set(bgRefs.current[index], { opacity: 0, y: "100%" });

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

      // Initial positions for first section
      gsap.set(bgRefs.current[0], { y: "-100%", opacity: 0 });

      // Mobile first section
      gsap.set(
        [
          titleRefsMobile.current[0],
          imageRefsMobile.current[0],
          descRefsMobile.current[0],
          ...(overlayRefs.current[0]?.mobile || []),
        ],
        { y: "100%", opacity: 0 }
      );

      // Desktop first section
      gsap.set(
        [
          titleRefsDesktop.current[0],
          imageRefsDesktop.current[0],
          descRefsDesktop.current[0],
          ...(overlayRefs.current[0]?.desktop || []),
        ],
        { y: "100%", opacity: 0 }
      );

      // Animate background
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
            startBackgroundAnimation(0);
            startZoomAnimation(0);
          },
        }
      );
    }
  }, [isInitialLoad]);

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
    const container = containerRef.current;
    let touchStartY = 0;
    let lastScrollTime = Date.now();
    const scrollCooldown = 1000;

    const handleScroll = (direction) => {
      // Disable scroll handling on mobile
      if (isMobileDevice()) return;

      const now = Date.now();
      if (isScrolling.current || now - lastScrollTime < scrollCooldown) return;

      const rect = container.getBoundingClientRect();
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
      }, scrollCooldown);
    };

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
      // Disable wheel handling on mobile
      if (isMobileDevice()) return;

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
      // Only track touch start on mobile for navigation buttons
      if (!isMobileDevice()) {
        touchStartY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e) => {
      // Disable touch move handling on mobile
      if (isMobileDevice()) return;

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
  }, [activeSection]);

  // Initialize autoplay timer
  useLayoutEffect(() => {
    resetAutoplayTimer();
    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, [autoplayEnabled]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-black isolate bg-[url('/images/home/home-hero-bg-1.png')]"
    >
      {sections.map((section, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full overflow-hidden ${
            index === 0 ? "visible" : "invisible"
          }`}
          style={{
            visibility: index === activeSection ? "visible" : "hidden",
            zIndex: index === activeSection ? 1 : 0,
          }}
        >
          {/* Background */}
          <div
            ref={(el) => (bgRefs.current[index] = el)}
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${section.bgImage})`,
              willChange: "transform",
              opacity: index === activeSection ? 1 : 0,
              visibility: index === activeSection ? "visible" : "hidden",
            }}
          />

          {/* Content */}
          <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className={`container mx-auto h-full ${
                index === activeSection ? "opacity-100" : "opacity-0"
              }`}
            >
              {/* Mobile Layout */}
              <div className="flex flex-col h-full lg:hidden px-4 pt-16">
                <div className="flex-none section-text z-20 mb-8">
                  <h2
                    ref={(el) => (titleRefsMobile.current[index] = el)}
                    className="text-4xl text-left text-white whitespace-pre-line"
                  >
                    {section.content.title}
                  </h2>
                </div>

                <div className="flex-1 flex items-center justify-center relative">
                  <img
                    ref={(el) => (imageRefsMobile.current[index] = el)}
                    src={section.content.mainImage}
                    alt="Section Visual"
                    className={`${
                      index === 0 ? "w-full sm:w-1/2" : "sm:w-[44%] w-2/3"
                    } h-auto relative z-10`}
                  />
                  {/* Mobile overlay images */}
                  {index === 0 &&
                    section.content.overlayImages &&
                    section.content.overlayImages.map((img, i) => (
                      <img
                        key={i}
                        ref={(el) => {
                          if (!overlayRefs.current[index]) {
                            overlayRefs.current[index] = {
                              mobile: [],
                              desktop: [],
                            };
                          }
                          overlayRefs.current[index].mobile[i] = el;
                        }}
                        src={img}
                        alt={`Overlay ${i + 1}`}
                        className={`absolute ${
                          i === 0
                            ? "top-2/3 w-3/4 sm:w-1/2 sm:left-32 left-4 -translate-y-1/4 scale-[1.5]"
                            : "top-20 w-3/4 sm:w-1/3"
                        } w-1/2 h-auto z-${9 - i}`}
                      />
                    ))}
                </div>

                <div
                  ref={(el) => (descRefsMobile.current[index] = el)}
                  className="flex-none section-text z-20 mt-20 mb-24"
                >
                  <p className="text-white/80 text-sm text-right px-4">
                    {section.content.description}
                  </p>
                  <div className="text-right mt-6">
                    <button className="border-b text-sm border-red-500 text-white px-4 py-2 rounded hover:bg-red-500/20 transition duration-300">
                      View Portfolio
                    </button>
                  </div>
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden lg:grid lg:grid-cols-3 gap-8 px-4 h-full items-center">
                <div className="section-text z-20">
                  {index === 1 && (
                    <img
                      ref={(el) => {
                        if (!overlayRefs.current[index]) {
                          overlayRefs.current[index] = {
                            mobile: [],
                            desktop: [],
                          };
                        }
                        overlayRefs.current[index].desktop[0] = el;
                      }}
                      src="/images/home/sec-2-rectangle.png"
                      alt="Decorative Rectangle"
                      className="relative w-36 -top-4 left-48 z-0"
                    />
                  )}
                  <h2
                    ref={(el) => (titleRefsDesktop.current[index] = el)}
                    className={`relative ${
                      index === 0 ? "top-0 left-0" : "-top-20 left-0"
                    } text-7xl text-white font-uni whitespace-pre-line`}
                  >
                    {section.content.title}
                  </h2>
                </div>

                <div className="relative">
                  <img
                    ref={(el) => (imageRefsDesktop.current[index] = el)}
                    src={section.content.mainImage}
                    alt="Section Visual"
                    className="w-full h-auto relative z-10"
                    onMouseEnter={() => handleImageHover(index, true)}
                    onMouseLeave={() => handleImageHover(index, false)}
                  />
                  {/* Desktop overlay images */}
                  {index === 0 &&
                    section.content.overlayImages &&
                    section.content.overlayImages.map((img, i) => (
                      <img
                        key={i}
                        ref={(el) => {
                          if (!overlayRefs.current[index]) {
                            overlayRefs.current[index] = {
                              mobile: [],
                              desktop: [],
                            };
                          }
                          overlayRefs.current[index].desktop[i] = el;
                        }}
                        src={img}
                        alt={`Overlay ${i + 1}`}
                        className={`absolute ${
                          i === 0 ? "top-60 scale-[2]" : "top-6"
                        } w-full h-auto z-${9 - i}`}
                      />
                    ))}
                </div>

                <div
                  ref={(el) => (descRefsDesktop.current[index] = el)}
                  className={`relative ${
                    index === 0 ? "top-40 right-0" : "top-40 right-0"
                  } section-text z-20`}
                >
                  <p className="text-white/80 text-lg text-right">
                    {section.content.description}
                  </p>
                  <button className="absolute top-30 right-0 border-b border-red-500 text-white px-4 py-2 rounded hover:bg-red-500/20 transition duration-300">
                    View Portfolio
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      {/* Mobile Navigation Controls */}
      <div className="lg:hidden absolute bottom-16 left-8 flex flex-col gap-2 z-50">
        <button
          onClick={() => handleNavigation(-1)}
          disabled={activeSection === 0}
          className={`p-2 rounded-full bg-white/10 backdrop-blur-sm transition-opacity ${
            activeSection === 0
              ? "opacity-50 cursor-not-allowed"
              : "opacity-100"
          }`}
        >
          <FaChevronUp className="w-3 h-3 text-white" />
        </button>
        <button
          onClick={() => handleNavigation(1)}
          disabled={activeSection === sections.length - 1}
          className={`p-2 rounded-full bg-white/10 backdrop-blur-sm transition-opacity ${
            activeSection === sections.length - 1
              ? "opacity-50 cursor-not-allowed"
              : "opacity-100"
          }`}
        >
          <FaChevronDown className="w-3 h-3 text-white" />
        </button>
      </div>
    </div>
  );
};

export default ClutteredHero;
