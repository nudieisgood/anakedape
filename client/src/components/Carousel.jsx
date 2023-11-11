import { useState, useEffect } from "react";

import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
export default function Carousel({
  children: slides,
  autoSlide = false,
  autoSlideInterval = 3000,
  setFeature,
}) {
  const [curr, setCurr] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setFeature(curr);
    }, 0);
  }, [curr]);

  const prev = () => {
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  };

  const next = () => {
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));
  };

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, []);

  return (
    <div className="relative sm:h-screen overflow-hidden scroll-smooth">
      <div
        className="flex w-full h-full transition-transform ease-out duration-500"
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {slides}
      </div>

      <div className="absolute inset-0 flex items-center justify-between p-4">
        <button
          onClick={prev}
          className="text-opacity-50 text-white hover:text-opacity-70 transition-all"
        >
          <BsChevronLeft size={30} />
        </button>
        <button
          onClick={next}
          className="text-opacity-50 text-white hover:text-opacity-70 transition-all"
        >
          <BsChevronRight size={30} />
        </button>
      </div>

      <div className="absolute bottom-4 right-0 left-0">
        <div className="flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <div
              onClick={() => {
                setCurr(i);
              }}
              key={i}
              className={`
              w-3 h-3 bg-white opacity-50 rounded-full hover:opacity-70 hover:p-2 cursor-pointer transition-all
              ${curr === i ? "p-2" : "bg-opacity-50"}
            `}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
