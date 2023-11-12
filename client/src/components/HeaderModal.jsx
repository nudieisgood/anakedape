import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { PiListThin, PiBagThin } from "react-icons/pi";

const links = [
  { link: "jacket", path: "/all-items?typeFilter=jacket" },
  { link: "shirt", path: "/all-items?typeFilter=shirt" },
  { link: "pants", path: "/all-items?typeFilter=pants" },
  { link: "top", path: "/all-items?typeFilter=top" },
  { link: "hat", path: "/all-items?typeFilter=hat" },
  { link: "accessory", path: "/all-items?typeFilter=accessory" },
];

const HeaderModal = ({ setShowModal }) => {
  const { user, logout, cart } = useAppContext();

  return (
    <div className="p-10 grid md:grid-cols-2 xl:grid-cols-3 gap-16">
      <div className="flex flex-col gap-4 text-white text-start">
        <div>
          <Link
            onClick={() => {
              setShowModal(false);
            }}
            to={"/all-items"}
            className="text-3xl hover:opacity-50"
          >
            ALL ITEMS
          </Link>
        </div>
        {links.map((link) => (
          <div key={link.link}>
            <Link
              onClick={() => {
                setShowModal(false);
              }}
              to={link.path}
              className="text-2xl uppercase hover:opacity-50"
            >
              {link.link}
            </Link>
          </div>
        ))}
      </div>
      <div className="text-white flex flex-col text-start gap-5">
        <div>
          <Link
            onClick={() => {
              setShowModal(false);
            }}
            to={"/features"}
            className="text-3xl hover:opacity-50"
          >
            FEATURES
          </Link>
        </div>
        <div>
          <Link
            onClick={() => {
              setShowModal(false);
            }}
            to={"/visual"}
            className="text-3xl hover:opacity-50"
          >
            VISUAL
          </Link>
        </div>
      </div>
      <div className="text-white flex flex-col items-start gap-4">
        <div className="flex gap-4">
          <Link
            to="/register"
            className="border border-white px-2 py-1 rounded-lg hover:opacity-50"
            onClick={() => {
              setShowModal(false);
            }}
          >
            Sign up
          </Link>
        </div>
        {user ? (
          <button
            onClick={() => {
              logout();
              setShowModal(false);
            }}
            className="border border-white px-2 py-1 rounded-lg hover:opacity-50"
          >
            Log out
          </button>
        ) : (
          <Link
            to="/login"
            onClick={() => {
              setShowModal(false);
            }}
            className="border border-white px-2 py-1 rounded-lg hover:opacity-50"
          >
            Login in
          </Link>
        )}

        {cart.length ? (
          <Link
            onClick={() => {
              setShowModal(false);
            }}
            to={"/cart"}
            className="relative mt-4"
          >
            <PiBagThin size={40} className="" />
            <div
              className={`absolute bottom-6 left-6 w-6 h-6 grid place-items-center text-xs font-extralight bg-gray-200 opacity-70 text-black rounded-full`}
            >
              <p>{cart.length}</p>
            </div>
          </Link>
        ) : (
          <Link
            className="mt-4"
            onClick={() => {
              setShowModal(false);
            }}
            to={"/cart"}
          >
            <PiBagThin size={40} className="" />
          </Link>
        )}
      </div>
    </div>
  );
};
export default HeaderModal;
