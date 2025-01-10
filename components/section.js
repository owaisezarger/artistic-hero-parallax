"use client";
import HeroBackground from "./background";
import HeroContent from "./content";

const HeroSection = ({
  section,
  index,
  activeSection,
  refs,
  handleImageHover,
  setOverlayRef,
}) => {
  const { bgRefs, titleRefs, imageRefs, descRefs } = refs;

  return (
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
      <HeroBackground
        bgImage={section.bgImage}
        bgRef={(el) => (bgRefs.current[index] = el)}
        isFirstSection={index === 0}
      />

      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`container mx-auto h-full ${
            index === activeSection ? "opacity-100" : "opacity-0"
          }`}
        >
          <HeroContent
            content={section.content}
            index={index}
            setTitleRef={(index, el) => (titleRefs.current[index] = el)}
            setImageRef={(index, el) => (imageRefs.current[index] = el)}
            setDescRef={(index, el) => (descRefs.current[index] = el)}
            setOverlayRef={setOverlayRef}
            handleImageHover={handleImageHover}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;