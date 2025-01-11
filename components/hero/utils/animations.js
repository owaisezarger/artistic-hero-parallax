import gsap from 'gsap';

// Create a map to store animations by element
const animationMap = new Map();

export const startBackgroundAnimation = (element) => {
  if (!element || typeof element !== 'object') return;
  
  // Kill any existing animation on this element
  if (animationMap.has(element)) {
    animationMap.get(element).kill();
  }

  // Create new animation
  const animation = gsap.to(element, {
    scale: 1.5,
    duration: 5,
    ease: "none",
    repeat: -1,
    yoyo: true,
  });

  // Store the animation
  animationMap.set(element, animation);
  element.animationStarted = true;

  return animation;
};

export const startZoomAnimation = (mobileElement, desktopElement) => {
  // Handle mobile image animation
  if (mobileElement && typeof mobileElement === 'object') {
    if (animationMap.has(mobileElement)) {
      animationMap.get(mobileElement).kill();
    }

    const mobileAnimation = gsap.to(mobileElement, {
      scale: 1.1,
      duration: 5,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });

    animationMap.set(mobileElement, mobileAnimation);
    mobileElement.animationStarted = true;
  }

  // Handle desktop image animation
  if (desktopElement && typeof desktopElement === 'object') {
    if (animationMap.has(desktopElement)) {
      animationMap.get(desktopElement).kill();
    }

    const desktopAnimation = gsap.to(desktopElement, {
      scale: 1.1,
      duration: 5,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });

    animationMap.set(desktopElement, desktopAnimation);
    desktopElement.animationStarted = true;
  }
};

export const cleanupAnimations = (elements) => {
  elements.forEach(element => {
    if (element && animationMap.has(element)) {
      animationMap.get(element).kill();
      animationMap.delete(element);
      if (element.animationStarted) {
        element.animationStarted = false;
      }
    }
  });
};