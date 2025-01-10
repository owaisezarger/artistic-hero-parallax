"use client";
import Button from "@/components/button";
import HeroOverlay from "./overlay";

const HeroContent = ({
  content,
  index,
  setTitleRef,
  setImageRef,
  setDescRef,
  setOverlayRef,
  handleImageHover,
  isMobile,
}) => {
  const MobileContent = () => (
    <div className="flex flex-col h-full md:hidden px-4 pt-16">
      <div className="flex-none section-text z-20 mb-8">
        <h2
          ref={(el) => setTitleRef(index, el)}
          className="text-4xl text-white whitespace-pre-line text-center"
        >
          {content.title}
        </h2>
      </div>

      <div className="flex-1 flex items-center justify-center relative">
        <img
          ref={(el) => setImageRef(index, el)}
          src={content.mainImage}
          alt="Section Visual"
          className="w-3/4 h-auto relative z-10"
        />
        <HeroOverlay
          images={content.overlayImages}
          index={index}
          setOverlayRef={setOverlayRef}
          isMobile={true}
        />
      </div>

      <div
        ref={(el) => setDescRef(index, el)}
        className="flex-none section-text z-20 mt-8 mb-16"
      >
        <p className="text-white/80 text-lg text-center px-4">
          {content.description}
        </p>
        <div className="text-center mt-6">
          <Button>View Portfolio</Button>
        </div>
      </div>
    </div>
  );

  const DesktopContent = () => (
    <div className="hidden md:grid md:grid-cols-3 gap-8 px-4 h-full items-center">
      <div className="section-text z-20">
        {index === 1 && content.hasBoxDecoration && (
          <img
            ref={(el) => {
              setOverlayRef(1, 0, el);
            }}
            src="/images/home/sec-2-rectangle.png"
            alt="Decorative Rectangle"
            className="relative w-36 -top-4 left-48 z-0"
          />
        )}
        <h2
          ref={(el) => setTitleRef(index, el)}
          className={`relative ${
            index === 0 ? "top-0 left-0" : "-top-20 left-0"
          } text-7xl text-white font-uni whitespace-pre-line`}
        >
          {content.title}
        </h2>
      </div>

      <div className="relative">
        <img
          ref={(el) => setImageRef(index, el)}
          src={content.mainImage}
          alt="Section Visual"
          className="w-full h-auto relative z-10"
          onMouseEnter={() => handleImageHover(index, true)}
          onMouseLeave={() => handleImageHover(index, false)}
        />
        <HeroOverlay
          images={content.overlayImages}
          index={index}
          setOverlayRef={setOverlayRef}
          isMobile={false}
        />
      </div>

      <div
        ref={(el) => setDescRef(index, el)}
        className={`relative ${
          index === 0 ? "top-40 right-0" : "top-40 right-0"
        } section-text z-20`}
      >
        <p className="text-white/80 text-lg text-right">{content.description}</p>
        <Button className="absolute top-30 right-0">View Portfolio</Button>
      </div>
    </div>
  );

  return (
    <>
      <MobileContent />
      <DesktopContent />
    </>
  );
};

export default HeroContent;