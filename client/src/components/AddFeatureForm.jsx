import { Form, useNavigation } from "react-router-dom";
import { format } from "date-fns";
import FormInput from "./FormInput";
import FormFileInput from "./FormFileInput";
import FormTextarea from "./FormTextarea";
import Spinner from "./Spinner";

const AddFeatureForm = ({ errorArr, featureNo }) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Form
      method="post"
      encType="multipart/form-data"
      className="relative border p-6 rounded-sm shadow-lg shadow-grey-300 gap-3 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 items-center"
    >
      <FormInput
        type="text"
        labelText="feature title 1"
        name="featureTitle1"
        placeHolder="If title too long please separate into two part"
      />
      <FormInput
        type="text"
        required={false}
        labelText="feature title 2"
        name="featureTitle2"
        placeHolder="If title too long please separate into two part"
      />
      <div className="flex gap-1">
        <FormInput
          type="text"
          name="featureNo"
          readOnly={true}
          value={featureNo}
          labelText="Feature No."
        />
        <FormInput
          type="text"
          name="date"
          defaultValue={format(new Date(new Date()), "yyyy-MM-dd")}
          labelText="Date"
        />
      </div>

      <div className="lg:col-span-3">
        <FormFileInput
          title="Feature"
          des={
            <>
              <p>Note ! First photo will be the main photo of feature</p>
            </>
          }
        />
      </div>
      <div className="lg:col-span-2">
        <FormTextarea
          required={false}
          name="mainContent"
          labelText="Main content"
        />
      </div>
      <div className="lg:col-span-2">
        <FormTextarea
          required={false}
          name="section1Content"
          labelText="Content Section 1"
        />
      </div>
      <div className="lg:col-span-2">
        <FormTextarea
          required={false}
          name="section2Content"
          labelText="Content Section 2"
        />
      </div>
      <div className="lg:col-span-2">
        <FormTextarea
          required={false}
          name="section3Content"
          labelText="Content Section 3"
        />
      </div>
      <div className="lg:col-span-2">
        <FormTextarea
          required={false}
          name="section4Content"
          labelText="Content Section 4"
        />
      </div>

      <button
        disabled={isSubmitting ? true : false}
        type="submit"
        className="bg-brandPrimary text-white rounded-sm py-2 self-end"
      >
        {isSubmitting ? <Spinner /> : "SUBMIT"}
      </button>
    </Form>
  );
};
export default AddFeatureForm;

{
  /* <div className="lg:col-span-1">
<FeatureS1FileInput
  name="section1Photos"
  title="Section 1"
  des="Please uploads 1 ~ 2 photos"
/>
</div>
<div className="lg:col-span-2">
<FormTextarea name="section3Content" labelText="Content Section 3" />
</div>

<div className="lg:col-span-1">
<FeatureS2FileInput
  name="section2Photos"
  title="Section 2"
  des="Please uploads 1 ~ 2 photos"
/>
</div> */
}
