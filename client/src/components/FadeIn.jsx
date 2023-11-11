// framer motion
import {
  motion,
  useAnimation,
  useInView,
  AnimatePresence,
} from "framer-motion";

// react
import { useEffect, useRef } from "react";

const FadeIn = ({
  children,
  delay,
  direction,
  fullWidth,
  padding,
  isVisual,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <div
      ref={ref}
      className={`${fullWidth ? "w-full" : "w-auto"} ${
        padding ? "px-10" : "px-0"
      } flex ${isVisual ? "" : "items-center justify-center"}`}
    >
      <AnimatePresence>
        <motion.div
          variants={{
            hidden: {
              opacity: 0,
              x: direction === "right" ? -100 : direction === "left" ? 100 : 0,
              y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
            },
            visible: {
              opacity: 1,
              x: 0,
              y: 0,
            },
          }}
          exit={{ opacity: 0 }}
          initial="hidden"
          animate={controls}
          transition={{
            duration: 0.8,
            type: "tween",
            delay: delay || 0,
            ease: [0.25, 0.25, 0.25, 0.75],
          }}
          className={isVisual ? "flex" : "w-full"}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default FadeIn;
