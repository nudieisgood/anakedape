import { useLoaderData, redirect } from "react-router-dom";
import { EditFeatureForm } from "../components";
import customFetch from "../utilities/customFetch";

export const loader = async ({ params }) => {
  const { id } = params;

  const res = await customFetch.get(`feature/${id}`);

  return res.data.data[0];
};

export const action = async ({ request, params }) => {
  const { id } = params;
  const formData = await request.formData();

  try {
    await customFetch.patch(`feature/${id}`, formData);
    return redirect(`/feature/${id}`);
  } catch (error) {
    throw {
      status: error.response.status,
      message: error.response.data.msg,
    };
  }
};

const EditFeature = () => {
  const feature = useLoaderData();
  return (
    <div className="section-container px-4">
      <h1 className="font-bold text-3xl mb-4">EDIT YOUR FEATURE</h1>
      <EditFeatureForm feature={feature} />
    </div>
  );
};
export default EditFeature;
