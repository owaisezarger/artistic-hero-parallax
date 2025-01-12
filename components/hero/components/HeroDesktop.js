import React from 'react';

const HeroDesktop = ({ 
  section, 
  index, 
  titleRef,
  imageRef,
  descRef,
  overlayRefs,
  handleImageHover 
}) => {
  return (
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
          ref={titleRef}
          className={`relative ${
            index === 0 ? "top-0 left-0" : "-top-20 left-0"
          } text-7xl text-white font-uni whitespace-pre-line`}
        >
          {section.content.title}
        </h2>
      </div>

      <div className="relative">
        <img
          ref={imageRef}
          src={section.content.mainImage}
          alt="Section Visual"
          className="w-full h-auto relative z-10"
          onMouseEnter={() => handleImageHover(index, true)}
          onMouseLeave={() => handleImageHover(index, false)}
        />
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
                i === 0 ? "top-1/2 scale-[2]" : "top-1/4"
              } w-full h-auto z-${9 - i} max-h-[40vh] object-contain`}
            />
          ))}
      </div>

      <div
        ref={descRef}
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
  );
};

export default HeroDesktop;