"use client";

const HeroBackground = ({ bgImage, bgRef, isFirstSection }) => {
  return (
    <div
      ref={bgRef}
      className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${bgImage})`,
        willChange: "transform",
        opacity: isFirstSection ? 1 : 0,
      }}
    />
  );
};

export default HeroBackground;