import { AnimatePresence, motion } from "framer-motion";
import { IoCloseOutline } from "react-icons/io5";

const ModalContainer = ({ setShowModal, showModal, children }) => {
  const clickOutside = (e) => {
    e.target.classList.contains("outside") && setShowModal(false);
  };
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          ease: "linear",
          duration: 0.3,
        }}
        onClick={clickOutside}
        className="flex absolute top-0 left-0 right-0 w-screen h-screen z-20 bg-gray-800/50 items-center justify-end outside"
      >
        <motion.div
          // initial={{ y: "-100%" }}
          // animate={{ y: "0" }}
          // exit={{ y: "-100%" }}
          // transition={{
          //   ease: "linear",
          //   duration: 0.3,
          //   y: { duration: 0.3 },
          // }}
          className="h-[100%] w-[100%] sm:w-[50%] text-center bg-brandPrimary relative"
        >
          {children}
          <button
            className="absolute top-1 right-5 text-white text-2xl"
            onClick={() => {
              setShowModal(false);
            }}
          >
            <IoCloseOutline size={40} />
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
export default ModalContainer;
