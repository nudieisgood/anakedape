// import { Link as ScrollLink } from "react-scroll";
import { Link } from "react-router-dom";
import { PiListThin, PiBagThin } from "react-icons/pi";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

import logo from "../assets/logo.png";
import ModalContainer from "./ModalContainer";
import HeaderModal from "./HeaderModal";
import { useAppContext } from "../context/AppContext";

const navItems = [
  { link: "ITEMS", path: "/all-items" },
  { link: "FEATURES", path: "/features" },
  { link: "VISUAL", path: "/visual" },
];

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(200);
  const [visible, setVisible] = useState(true);
  const { cart } = useAppContext();

  const handleScroll = () => {
    const currentScrollPos = window.scrollY;
    if (currentScrollPos > prevScrollPos && window.scrollY > 160) {
      setVisible(false);
    } else {
      setVisible(true);
    }
    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{
            y: "-100%",
            opacity: 0,
          }}
          exit={{
            y: "-100%",
            opacity: 0,
          }}
          animate={{
            y: visible ? "0" : "-100%",
            opacity: 1,
          }}
          transition={{
            y: { duration: 0.8 },
          }}
          className="py-4 px-4 lg:px-14 flex justify-between w-full fixed top-0 left-0 right-0 bg-transparent"
        >
          {showModal && (
            <ModalContainer setShowModal={setShowModal} showModal={showModal}>
              <HeaderModal setShowModal={setShowModal} />
            </ModalContainer>
          )}

          <Link to={"/"} className="flex w-40">
            <img src={logo} alt="" />
          </Link>
          <div className="flex items-center gap-6">
            <ul className="hidden md:flex gap-6">
              {navItems.map(({ link, path }) => (
                <Link
                  to={path}
                  key={path}
                  className="block text-base text-gray-900 hover:text-brandPrimary cursor-pointer"
                >
                  {link}
                </Link>
              ))}
            </ul>
            <div className="flex items-center gap-4">
              <button>
                <PiListThin
                  size={30}
                  onClick={() => setShowModal(!showModal)}
                />
              </button>

              {cart.length ? (
                <Link to={"/cart"} className="relative">
                  <PiBagThin size={30} className="" />
                  <div
                    className={`absolute bottom-4 left-3 w-6 h-6 grid place-items-center text-xs font-extralight bg-gray-200 opacity-70 text-black rounded-full`}
                  >
                    <p>{cart.length}</p>
                  </div>
                </Link>
              ) : (
                <Link to={"/cart"}>
                  <PiBagThin size={30} className="" />
                </Link>
              )}
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};
export default Header;
