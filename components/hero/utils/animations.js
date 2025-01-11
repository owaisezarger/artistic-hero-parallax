import gsap from 'gsap';

export const startBackgroundAnimation = (element) => {
  // Add safety check for element
  if (!element || typeof element !== 'object') return;
  
  // Check if animation is already running
  if (!element.animationStarted) {
    gsap.to(element, {
      scale: 1.5,
      duration: 5,
      ease: "none",
      repeat: -1,
      yoyo: true,
    });
    element.animationStarted = true;
  }
};

export const startZoomAnimation = (mobileElement, desktopElement) => {
  // Handle mobile image animation
  if (mobileElement && typeof mobileElement === 'object' && !mobileElement.animationStarted) {
    gsap.to(mobileElement, {
      scale: 1.1,
      duration: 5,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });
    mobileElement.animationStarted = true;
  }

  // Handle desktop image animation
  if (desktopElement && typeof desktopElement === 'object' && !desktopElement.animationStarted) {
    gsap.to(desktopElement, {
      scale: 1.1,
      duration: 5,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });
    desktopElement.animationStarted = true;
  }
};