import { useState } from "react";
import { useLoaderData, Form, useSubmit, useNavigate } from "react-router-dom";
import { Spinner } from "../components";
import customFetch from "../utilities/customFetch";

export const loader = async () => {
  try {
    const res = await customFetch.get("order/orders");

    return res.data.data;
  } catch (error) {
    throw {
      status: error.response.status,
      message: error.response.data.msg,
    };
  }
};

export const action = async () => {
  return null;
};

const Orders = () => {
  const orders = useLoaderData();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleClick = async (orderId, status) => {
    setLoading(true);
    try {
      await customFetch.patch(`order/${orderId}`, { status: status });
      navigate(".");
    } catch (error) {
      throw {
        status: error.response.status,
        message: error.response.data.msg,
      };
    }
    setLoading(false);
  };

  return (
    <div className="text-md flex flex-col gap-4 section-container px-4">
      {orders.map((order) => (
        <div
          key={order._id}
          className="border-b py-4 grid md:grid-cols-[3fr,2fr] gap-8"
        >
          <div className="space-y-4">
            <h2 className="text-xl">ORDER NO. {order._id}</h2>
            <div>
              <h2 className="text-xl">SHIPPING INFO :</h2>
              <div className="px-2">
                <p>CITY : {order.city}</p>
                <p>POSTAL CODE : {order.postalCode}</p>
                <p>ADDRESS : {order.address}</p>
                <p>PHONE : {order.phone}</p>
              </div>
            </div>
            <div>
              <h2 className="text-xl">ITEMS INFO :</h2>
              <div className="px-2">
                {order.items.map((o) => (
                  <div key={o._id} className="border mb-1 p-2">
                    <p>ITEM NO. {o.itemId}</p>
                    <p className="px-2">SIZE : {o.sizing} - QTY 1</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="justify-self-end">
            {order.status === "pending" && (
              <div className="flex gap-2">
                <button
                  disabled={loading}
                  onClick={() => {
                    handleClick(order._id, "shipped");
                  }}
                  className="px-4 py-1 bg-brandPrimary text-white"
                >
                  {loading ? <Spinner /> : "Order Shipped"}
                </button>
                <button
                  disabled={loading}
                  onClick={() => {
                    handleClick(order._id, "cancel");
                  }}
                  className="px-4 py-1 bg-red-500 text-white"
                >
                  {loading ? <Spinner /> : " Cancel this order"}
                </button>
              </div>
            )}
            <p className="text-2xl mt-6 tracking-wider text-end">
              Status : {order.status}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Orders;
