import { motion } from "framer-motion";
import { Carousel } from ".";
import { useState } from "react";
import { Link } from "react-router-dom";

const Hero = ({ randomFeatures }) => {
  const [feature, setFeature] = useState(0);

  return (
    <div
      id="hero"
      className="relative grid sm:grid-cols-[3fr,2fr] mt-28 sm:mt-0 items-center gap-5 px-5 sm:px-0"
    >
      <Carousel setFeature={setFeature} autoSlide={true}>
        {randomFeatures.map((feat) => (
          <img
            className="object-cover aspect-[4/3]"
            key={feat.featureNo}
            src={feat.photos[0]}
          />
        ))}
      </Carousel>
      <div className="xl:px-16 space-y-6">
        {randomFeatures.map((feat, i) => (
          <div key={i}>
            {feature === i && (
              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  duration: 0.8,
                }}
              >
                <div className="space-y-6">
                  <p className="font-semibold text-lg">
                    FEATURE {feat.featureNo}
                  </p>
                  <div className="font-bold text-2xl md:leading-normal md:text-4xl xl:text-5xl xl:leading-snug">
                    <p>{feat.featureTitle1}</p>
                    <p>{feat.featureTitle2}</p>
                  </div>
                  <Link
                    to={`/feature/${feat.featureNo}`}
                    className="border border-black px-4 py-1 rounded-lg text-xl inline-block transition-all hover:text-white hover:bg-brandPrimary"
                  >
                    MORE
                  </Link>
                </div>
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Hero;

{
  /* <Carousel className="h-screen w-full px-10 sm:px-0 border rounded-0">
        <div className="w-full flex h-full">
          <img src={banner1} className="object-cover w-full" alt="" />
        </div>
        <div className="w-full flex h-full">
          <img src={banner2} className="object-cover w-full" alt="" />
        </div>
        <div className="w-full flex h-full">
          <img src={banner3} className="object-cover w-full" alt="" />
        </div>
      </Carousel> */
}

{
  /* <C slides={[banner1, banner2, banner3]} /> */
}

{
  /* <AnimatePresence key={i}>
{feature === i && (
  <motion.div
    initial={{
      opacity: 0,
    }}
    animate={{
      opacity: 1,
    }}
    transition={{
      duration: 0.5,
    }}
  >
    <div className="space-y-6">
      <p className="font-semibold text-lg">
        FEATURE {feat.featureNo}
      </p>
      <h1 className="font-bold text-2xl md:leading-normal md:text-4xl xl:text-5xl xl:leading-relaxed">
        {feat.title}
      </h1>
      <button className="border border-black px-4 py-1 rounded-lg text-xl">
        MORE
      </button>
    </div>
  </motion.div>
)}
</AnimatePresence> */
}
