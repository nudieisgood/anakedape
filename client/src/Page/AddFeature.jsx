import { redirect, useLoaderData } from "react-router-dom";
import customFetch from "../utilities/customFetch";
import { AddFeatureForm } from "../components";

export const loader = async () => {
  const res = await customFetch.get("feature");

  return res.data.data;
};

export const action = async ({ request }) => {
  const formData = await request.formData();

  try {
    const res = await customFetch.post("feature", formData);

    return redirect(`/feature/${res.data.data}`);
  } catch (error) {
    throw {
      status: error.response.status,
      message: error.response.data.msg,
    };
  }
};

const AddFeature = () => {
  const totalFeatures = useLoaderData().length;
  return (
    <div className="section-container px-4">
      <h1 className="font-bold text-3xl mb-4">ADD NEW FEATURE</h1>
      <p className="mb-4">CURRENT FEATURE No. {totalFeatures + 1}</p>
      <AddFeatureForm featureNo={totalFeatures + 1} />
    </div>
  );
};
export default AddFeature;
