import { useAppContext } from "../context/AppContext";
import { BsTrash3 } from "react-icons/bs";
import { useLoaderData, useNavigate } from "react-router-dom";
import customFetch from "../utilities/customFetch";
import { useState } from "react";
import { Spinner } from "@material-tailwind/react";

export const loader = async () => {
  const cart = JSON.parse(localStorage.getItem("cart"));
  if (!cart) return { msg: "Your cart is empty" };
  const cartItems = Object.values(cart.map((c) => c.itemId));

  try {
    const res = await customFetch.get("items", {
      params: { cartItemsId: cartItems },
    });

    return cart.map((c) => {
      const itemInfo = res.data.data.filter((item) => item._id === c.itemId)[0];
      return { ...c, itemInfo };
    });
  } catch (error) {
    throw {
      status: error.response.status,
      message: error.response.data.msg,
    };
  }
};

export const action = async ({ request }) => {
  return null;
};

const Cart = () => {
  const cartItems = useLoaderData();

  if (cartItems.msg)
    return (
      <div className="mx-auto max-w-[1080px] my-32 px-6">
        <h1 className="section-title">CART</h1>
        <div className="flex justify-center">
          <div>
            <p className="text-textDark font-semibold text-start text-xl">
              {cartItems.msg}
            </p>
          </div>
        </div>
      </div>
    );

  const { cart, removeFromCart } = useAppContext();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const checkStockArr = [];
  const checkout = async () => {
    setIsSubmitting(true);
    try {
      const res = await customFetch.post("checkout", cart);
      setIsSubmitting(false);
      navigate(`/checkout?c=${res.data.token}`);
    } catch (error) {
      throw {
        status: error.response.status,
        message: error.response.data.msg,
      };
    }
  };

  const priceArr = [];

  const removeItem = (id, size) => {
    setLoading(true);
    removeFromCart({ itemId: id, sizing: size });
    navigate("/cart");
    setLoading(false);
  };

  return (
    <div className="mx-auto max-w-[1080px] my-32 px-6">
      <h1 className="section-title">CART</h1>
      <div className="flex justify-center">
        <div>
          <p className="text-textDark font-semibold text-start">
            Purchase Restrictions Announcement
          </p>
          <p className="text-textLight text-start">
            Purchases are limited to one, per color, per size
          </p>
        </div>
      </div>

      <div className="text-center text-red-500 mt-8 font-semibold"></div>
      <div className="mt-24 text-sm sm:text-md [&>*:nth-child(2)]:border-t">
        <div className="hidden sm:grid sm:grid-cols-[auto,1fr,auto,auto] border-t py-3">
          <div className="">ITEM</div>
          <div className=""></div>
          <div className="w-[156px]">QUANTITY</div>
          <div className="w-[66px] flex justify-end">PRICE</div>
        </div>

        {cartItems?.map((c, i) => {
          const { name, photos, price, stock } = c.itemInfo;
          const stockQty = stock.filter((st) => st.size === c.sizing)[0]
            .quantity;

          if (stockQty === 0) checkStockArr.push(stockQty);

          priceArr.push(price);
          return (
            <div
              key={i}
              className="py-8 grid grid-cols-[auto,1fr] gap-y-4  sm:grid-cols-[auto,1fr,auto,auto] gap-1 sm:gap-5 md:gap-10 border-b"
            >
              <div className="w-[150px]">
                <img
                  src={photos[0]}
                  className="w-fill object-cover aspect-square"
                  alt=""
                />
              </div>
              <div className="tracking-wider uppercase flex flex-col gap-2">
                <p className="font-semibold">{name}</p>
                <div className="space-y-1">
                  <p className="text-textLight">$ {price} USD</p>
                  <p className="text-textLight">SIZE: {c.sizing}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="border border-gray-200 rounded-sm px-10 py-3">
                  1
                </div>
                <p className="text-red-500">{!stockQty && "OUT OF STOCK"}</p>
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => {
                    removeItem(c.itemId, c.sizing);
                  }}
                >
                  {loading ? <Spinner /> : <BsTrash3 size={15} />}
                </button>
              </div>
              <div className="flex items-center gap-6 justify-self-end">
                $ {price * 1} USD
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col gap-2 items-end pt-10">
        <p className="text-lg font-semibold">
          TOTAL PRICE : $ {priceArr.reduce((acc, curr) => acc + curr, 0)}
          USD
        </p>
        <p className="text-xs text-textLight">
          Tax included and shipping calculated at checkout
        </p>
        <p className="text-xs text-red-500">
          {checkStockArr.length > 0 &&
            "Please remove items that are out of stock before checkout."}
        </p>
        <button
          disabled={isSubmitting || checkStockArr.length > 0}
          onClick={checkout}
          className={`bg-brandPrimary text-white px-16 py-2 rounded-sm ${
            checkStockArr.length > 0 && "opacity-50"
          }`}
        >
          {isSubmitting ? <Spinner /> : "CHECK OUT"}
        </button>
      </div>
    </div>
  );
};
export default Cart;
