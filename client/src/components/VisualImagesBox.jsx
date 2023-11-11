import { useState, useEffect } from "react";

const VisualImagesBox = ({
  children: slides,
  autoSlide = false,
  autoSlideInterval = (Math.floor(Math.random() * 3) + 7) * 1000,
}) => {
  const [curr, setCurr] = useState(0);

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
      <div className="flex w-full h-full">{slides[curr]}</div>
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
};

export default VisualImagesBox;
