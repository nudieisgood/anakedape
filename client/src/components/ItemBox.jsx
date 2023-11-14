import { useState } from "react";
import { Link } from "react-router-dom";
import customFetch from "../utilities/customFetch";

const ItemBox = ({ item, user }) => {
  const [available, setAvailable] = useState(item.isAvailable);

  const activeItem = async (id) => {
    try {
      setAvailable(!available);
      await customFetch.put(`items/${id}`);
    } catch (error) {
      throw {
        status: error.response.status,
        message: error.response.data.msg,
      };
    }
  };

  const totalStock = item?.stock
    .map((s) => s.quantity)
    ?.reduce((curr, acc) => curr + acc, 0);

  return (
    <div className="relative" key={item._id}>
      {user?.role === "admin" && (
        <div className="absolute top-2 right-3 z-50">
          <Link
            to={`/admin/editItem/${item._id}`}
            className="hover:text-red-500 text-sm"
          >
            EDIT ITEM
          </Link>

          <div className="text-end">
            <label className="relative inline-flex items-center cursor-pointer">
              <button
                type="button"
                onClick={() => {
                  activeItem(item._id);
                }}
                className={`w-11 h-6 rounded-full ${
                  available
                    ? "after:translate-x-full after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all bg-brandPrimary"
                    : "after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all bg-gray-200"
                }  `}
              ></button>
            </label>
          </div>
        </div>
      )}
      <Link to={`/item/${item._id}`} className={available ? "" : "opacity-70"}>
        <div className="p-6 bg-[#f5f5f5]">
          <div className="hover:opacity-0 transition-all duration-1000">
            <img src={item.photos[0]} alt="" />
            <p className="text-center absolute bottom-2 left-0 right-0 text-textLight text-sm">
              {item.name}
            </p>
          </div>
          <div className="bg-[#f5f5f5] absolute bottom-2 left-0 right-0 top-0 opacity-0 hover:opacity-100 transition-all duration-1000">
            <img src={item.photos[item.photos.length - 1]} alt="" />
          </div>
          {!totalStock && (
            <p className="absolute top-2 left-2 text-textLight text-sm">
              SOLD OUT
            </p>
          )}
          {item.status === "coming soon" && (
            <p className="absolute top-2 left-2 text-textLight text-sm">
              COMING SOON
            </p>
          )}
        </div>
      </Link>
    </div>
  );
};

export default ItemBox;
