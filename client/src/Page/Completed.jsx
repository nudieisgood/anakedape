import { useEffect } from "react";
import { useAppContext } from "../context/AppContext";

const Completed = () => {
  const { setCart } = useAppContext();
  useEffect(() => {
    localStorage.setItem("cart", null);
    setCart([]);
  });

  return (
    <div className="section-container px-4">
      <div className="h-screen flex justify-center items-center">
        <div className="text-center space-y-4">
          <h1 className="text-3xl tracking-widest font-semibold">CONTRAS</h1>
          <div>
            <p className="text-center md:w-[50%] mx-auto">
              Your order has been confirmed, if there's any lack of items we
              will send you a notification email, if not, after we ship your
              order. you will receive email of shipping memo which can track
              delivery status.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Completed;
