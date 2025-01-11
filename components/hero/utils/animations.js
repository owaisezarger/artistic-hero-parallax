import gsap from 'gsap';

export const startBackgroundAnimation = (element) => {
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

export const startZoomAnimation = (element) => {
  if (element && !element.animationStarted) {
    gsap.to(element, {
      scale: 1.1,
      duration: 5,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });
    element.animationStarted = true;
  }
};