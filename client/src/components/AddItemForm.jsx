import { Form, Link, useNavigation } from "react-router-dom";

import FormInput from "./FormInput";
import FormFileInput from "./FormFileInput";
import FormSelect from "./FormSelect";
import FormTextarea from "./FormTextarea";
import Spinner from "./Spinner";

import { useState } from "react";
const status = ["coming soon", "new arrivals", "sale", "regular"];

const type = ["jacket", "shirt", "top", "hat", "accessory", "pants"];

const AddItemForm = ({ errorArr }) => {
  const [sizing, setSizing] = useState(true);
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
        labelText="item name"
        name="name"
        placeHolder="item name"
      />
      <FormInput
        type="text"
        labelText="item fabric"
        name="fabric"
        placeHolder="item fabric"
      />
      <div className="flex flex-col sm:flex-row gap-1">
        <FormInput
          type="text"
          name="price"
          placeHolder="USD"
          labelText="item price"
        />
        <FormSelect labelText="Item Type" name="type" list={type} />
        <FormSelect labelText="Item Status" name="status" list={status} />
      </div>
      <div className="lg:col-span-2">
        <h1 className="text-lg">Size / Qty</h1>
        <button
          className="border p-2 rounded-sm"
          type="button"
          onClick={() => {
            setSizing(!sizing);
          }}
        >
          {sizing ? "Different size" : "One Size"}
        </button>
        {sizing ? (
          <div className="flex flex-col sm:flex-row gap-1">
            <FormInput
              classValue="text-sm"
              type="number"
              labelText="SMALL/28W"
              name="sizeS"
              placeHolder="QTY"
            />
            <FormInput
              classValue="text-sm"
              type="number"
              labelText="MEDIUM/30W"
              name="sizeM"
              placeHolder="QTY"
            />
            <FormInput
              classValue="text-sm"
              type="number"
              labelText="LARGE/32W"
              name="sizeL"
              placeHolder="QTY"
            />
            <FormInput
              classValue="text-sm"
              type="number"
              labelText="XLARGE/34W"
              name="sizeXL"
              placeHolder="QTY"
            />
          </div>
        ) : (
          <div className=" sm:w-40">
            <FormInput
              classValue="text-sm"
              type="number"
              labelText="ONE SIZE"
              name="oneSize"
              placeHolder="QTY"
            />
          </div>
        )}
      </div>

      <div className="lg:col-span-2">
        <FormTextarea name="description" labelText="description" />{" "}
      </div>

      <div className="lg:col-span-2">
        <FormFileInput />
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
export default AddItemForm;
