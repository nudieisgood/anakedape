import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { BsInstagram } from "react-icons/bs";
import { AiOutlineFacebook } from "react-icons/ai";
import { FiTwitter } from "react-icons/fi";
import customFetch from "../utilities/customFetch";
import { useState } from "react";
import Spinner from "./Spinner";

const Footer = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, changeUser } = useAppContext();
  const adminLogin = async () => {
    try {
      setLoading(true);
      const {
        data: { user },
      } = await customFetch.post("auth/login", {
        email: "admin@gmail.com",
        password: "admin1234",
      });
      changeUser(user);
      navigate("/admin");
    } catch (error) {
      throw {
        status: error.response.status,
        message: error.response.data.msg,
      };
    }
    setLoading(false);
  };
  return (
    <div className="bg-brandPrimary text-white text-lg tracking-wider p-16">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="flex flex-col gap-2">
          <div>
            <Link className="hover:opacity-50" to={"/all-items"}>
              ALL ITEMS
            </Link>
          </div>
          <div>
            <Link className="hover:opacity-50" to={"/visual"}>
              VISUAL
            </Link>
          </div>
          <div>
            <Link className="hover:opacity-50" to={"/features"}>
              FEATURES
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div>
            <Link className="hover:opacity-50" to={"/"}>
              Shopping Guide
            </Link>
          </div>
          <div>
            <Link className="hover:opacity-50" to={"/"}>
              Terms
            </Link>
          </div>
          <div>
            <Link className="hover:opacity-50" to={"/"}>
              Policy
            </Link>
          </div>
          <div>
            <Link className="hover:opacity-50" to={"/"}>
              Customer Service
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Link to={"/"}>
              <BsInstagram className="hover:opacity-50" size={25} />
            </Link>
            <Link to={"/"}>
              <AiOutlineFacebook className="hover:opacity-50" size={25} />
            </Link>
            <Link to={"/"}>
              <FiTwitter className="hover:opacity-50" size={25} />
            </Link>
          </div>

          <div className="grow flex items-end">
            {user?.role === "admin" ? (
              <Link className="hover:opacity-50" to={"/admin"}>
                ADMIN INTERFACE
              </Link>
            ) : (
              <button
                type="type"
                className="bg-brandPrimary text-white py-2 rounded-md hover:opacity-50"
                disabled={loading}
                onClick={adminLogin}
              >
                {loading ? <Spinner /> : "LOG IN AS ADMIN (FOR DEMO)"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
