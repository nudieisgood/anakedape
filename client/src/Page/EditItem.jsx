import { useLoaderData, redirect } from "react-router-dom";
import { EditItemForm } from "../components";
import customFetch from "../utilities/customFetch";

export const loader = async ({ params }) => {
  const { id } = params;

  const res = await customFetch.get(`items/${id}`);

  return res.data.data;
};

export const action = async ({ request, params }) => {
  const { id } = params;
  const formData = await request.formData();

  try {
    const res = await customFetch.patch(`items/${id}`, formData);

    return redirect(`/item/${id}`);
  } catch (error) {
    throw {
      status: error.response.status,
      message: error.response.data.msg,
    };
  }
};

const EditItem = () => {
  const item = useLoaderData();

  return (
    <div className="section-container px-4">
      <h1 className="font-bold text-3xl mb-4">EDIT YOUR ITEM</h1>
      <EditItemForm item={item} />
    </div>
  );
};
export default EditItem;
