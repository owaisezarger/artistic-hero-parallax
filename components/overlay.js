"use client";

const HeroOverlay = ({ images, index, setOverlayRef, isMobile }) => {
  if (!images) return null;

  return images.map((img, i) => (
    <img
      key={i}
      ref={(el) => setOverlayRef(index, i, el)}
      src={img}
      alt={`Overlay ${i + 1}`}
      className={`absolute ${
        isMobile
          ? i === 0
            ? "top-1/2 -translate-y-1/4 scale-150"
            : "top-0"
          : i === 0
          ? "top-60 scale-[2]"
          : "top-6"
      } ${isMobile ? "w-3/4" : "w-full"} h-auto z-${9 - i}`}
    />
  ));
};

export default HeroOverlay;