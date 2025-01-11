import React from 'react';
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const HeroMobile = ({ 
  section, 
  index,
  titleRef,
  imageRef,
  descRef,
  overlayRefs
}) => {
  return (
    <div className="flex flex-col h-full lg:hidden px-4 pt-16">
      <div className="flex-none section-text z-20 mb-8">
        <h2
          ref={titleRef}
          className="text-4xl text-left text-white whitespace-pre-line"
        >
          {section.content.title}
        </h2>
      </div>

      <div className="flex-1 flex items-center justify-center relative">
        <img
          ref={imageRef}
          src={section.content.mainImage}
          alt="Section Visual"
          className={`${
            index === 0 ? "w-full sm:w-1/2" : "sm:w-[44%] w-2/3"
          } h-auto relative z-10`}
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
        ref={descRef}
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
  );
};

export default HeroMobile;
