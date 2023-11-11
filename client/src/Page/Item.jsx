import { useLoaderData, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import customFetch from "../utilities/customFetch";

export const loader = async ({ params }) => {
  const { id } = params;
  try {
    const res = await customFetch.get(`items/${id}`);
    return res.data.data;
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

const Item = () => {
  const [sizing, setSizing] = useState(false);
  const navigate = useNavigate();
  const item = useLoaderData();

  const { cart, addToCart } = useAppContext();
  const { photos, name, type, price, description, fabric, _id, stock, status } =
    item;

  const handleSubmit = () => {
    if (!sizing) return;
    addToCart({ itemId: _id, sizing });
    navigate("/cart");
  };

  const isSizeInCart = cart
    .filter((item) => {
      return item.itemId === _id;
    })
    .map((i) => i.sizing)
    .includes(sizing);

  return (
    <div className="bg-[#f5f5f5] py-48 w-full">
      <div className="section-container grid md:grid-cols-[7fr,5fr] gap-10">
        <div className="flex flex-col">
          {photos.map((img, i) => (
            <div key={i} className="flex">
              <img
                src={img}
                className="w-full object-cover aspect-squares]"
                alt=""
              />
            </div>
          ))}
        </div>
        <div className="px-8">
          <div className="flex flex-col pt-16 gap-6  w-full">
            <h1 className="text-2xl font-semibold tracking-wider">{name}</h1>
            <p>$ {price} USD</p>
            {
              <div className="flex justify-between text-xs gap-1">
                {stock?.map((s, i) => {
                  return (
                    <button
                      disabled={!s.quantity}
                      onClick={() => {
                        setSizing(s.size);
                      }}
                      key={i}
                      className={`border border-textLight py-2 grow uppercase ${
                        sizing === s.size
                          ? "bg-[#001d3d] text-white"
                          : "bg-white "
                      }`}
                    >
                      {!s.quantity ? (
                        <p className="line-through">{s.size}</p>
                      ) : (
                        <p>{s.size}</p>
                      )}
                    </button>
                  );
                })}
              </div>
            }
            {status === "coming soon" ? (
              <button
                disabled
                className={`bg-brandPrimary text-white px-4 py-3 ${"opacity-70"}`}
              >
                COMING SOON
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={
                  !sizing ||
                  isSizeInCart ||
                  !stock
                    .map((s) => s.quantity)
                    .reduce((curr, acc) => curr + acc, 0)
                }
                className={`bg-brandPrimary text-white px-4 py-3 ${
                  (isSizeInCart || !sizing) && "opacity-70"
                }`}
              >
                {!stock
                  .map((s) => s.quantity)
                  .reduce((curr, acc) => curr + acc, 0)
                  ? "SOLD OUT"
                  : isSizeInCart
                  ? "IN CART"
                  : "ADD TO CART"}
              </button>
            )}

            <p className="text-textLight">{description}</p>
            <div className="bg-textLight h-[1px]"></div>
            <p className="text-textLight uppercase text-sm">
              fabric : {fabric}
            </p>
            <p className="text-textLight uppercase text-sm">
              item type : {type}
              {`${
                stock[0]?.size === "ONE SIZE FITS ALL"
                  ? "(ONE SIZE FITS ALL)"
                  : ""
              }`}
            </p>
            {type === "pants" && (
              <div className="text-textLight uppercase text-sm">
                <p>SIZE GUIDE :</p>
                <p>SMALL(30W) / MEDIUM(32W )/ LARGE(34W) / XLARGE(36W)</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Item;
