import { Form, useNavigation, useNavigate } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";

import FormInput from "./FormInput";
import FormFileInput from "./FormFileInput";
import FormSelect from "./FormSelect";
import FormTextarea from "./FormTextarea";

import Spinner from "./Spinner";

import { useState } from "react";
import customFetch from "../utilities/customFetch";
const status = ["coming soon", "new arrivals", "sale", "regular"];

const type = ["jacket", "shirt", "top", "hat", "accessory", "pants"];

const EditItemForm = ({ item }) => {
  const {
    photos,
    isAvailable,
    name,
    stock,
    fabric,
    price,
    description,
    status: itemStatus,
    type: itemType,
    _id,
  } = item;

  const [sizing, setSizing] = useState(stock.length > 1);
  const navigation = useNavigation();
  const navigate = useNavigate();
  const isSubmitting = navigation.state === "submitting";

  const [ogPhotos, setOgPhotos] = useState(photos);

  const deleteOgPhoto = (photo) => {
    const updateOgPhotos = ogPhotos.filter((item) => item !== photo);

    setOgPhotos(updateOgPhotos);
  };

  const changeMainPic = (photo) => {
    const otherPhotos = ogPhotos.filter((ogPhoto) => ogPhoto !== photo);
    setOgPhotos([photo, ...otherPhotos]);
  };

  return (
    <Form
      method="post"
      encType="multipart/form-data"
      className="relative border p-6 rounded-sm shadow-lg shadow-grey-300 gap-3 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 items-center"
    >
      <FormInput
        type="text"
        defaultValue={name}
        labelText="item name"
        name="name"
        placeHolder="item name"
      />
      <FormInput
        defaultValue={fabric}
        type="text"
        labelText="item fabric"
        name="fabric"
        placeHolder="item fabric"
      />
      <div className="flex flex-col sm:flex-row gap-1">
        <FormInput
          defaultValue={price}
          type="text"
          name="price"
          placeHolder="USD"
          labelText="item price"
        />
        <FormSelect
          defaultValue={itemType}
          labelText="Item Type"
          name="type"
          list={type}
        />
        <FormSelect
          defaultValue={itemStatus}
          labelText="Item Status"
          name="status"
          list={status}
        />
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
          {sizing ? "One Size" : "different size"}
        </button>
        {sizing ? (
          <div className="flex flex-col sm:flex-row gap-1">
            <FormInput
              defaultValue={stock[0]?.quantity}
              classValue="text-sm"
              type="number"
              labelText="SMALL / 28W"
              name="sizeS"
              placeHolder="QTY"
            />
            <FormInput
              defaultValue={stock[1]?.quantity}
              classValue="text-sm"
              type="number"
              labelText="MEDIUM / 30W"
              name="sizeM"
              placeHolder="QTY"
            />
            <FormInput
              defaultValue={stock[2]?.quantity}
              classValue="text-sm"
              type="number"
              labelText="LARGE / 32W"
              name="sizeL"
              placeHolder="QTY"
            />
            <FormInput
              defaultValue={stock[3]?.quantity}
              classValue="text-sm"
              type="number"
              labelText="XLARGE / 34W"
              name="sizeXL"
              placeHolder="QTY"
            />
          </div>
        ) : (
          <div className="w-40">
            <FormInput
              defaultValue={stock[0]?.quantity}
              classValue="text-sm"
              type="number"
              labelText="ONE SIZE"
              name="oneSize"
              placeHolder="QTY"
            />
          </div>
        )}
      </div>

      <div className="lg:col-span-3">
        <FormTextarea
          name="description"
          defaultValue={description}
          labelText="description"
        />
      </div>

      <div className="lg:col-span-3">
        <div>
          <input
            className="hidden"
            id="ogPhotos"
            name="ogPhotos"
            readOnly
            value={ogPhotos}
          />
          <FormFileInput />
          <p className="text-sm text-gray-400 mt-2 flex items-center">
            已上傳圖片 點擊{<BsTrash className="text-sm text-primary inline" />}
            刪除 / {<AiFillStar className="text-sm text-gray inline" />} 為首圖
          </p>
          <div className="grid gap-1 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {ogPhotos.length > 0 &&
              ogPhotos.map((photo) => (
                <div className="h-32 flex relative" key={photo}>
                  <img
                    className="rounded-2xl w-full object-cover"
                    src={photo}
                    alt="place photos"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      deleteOgPhoto(photo);
                    }}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-transparent opacity-0 hover:opacity-80"
                  >
                    <BsTrash className="text-6xl text-primary" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      changeMainPic(photo);
                    }}
                    className="absolute top-1 left-1 bg-transparent"
                  >
                    {photo === ogPhotos[0] ? (
                      <AiFillStar className="text-2xl text-brandPrimary opacity-100" />
                    ) : (
                      <AiFillStar className="text-2xl text-brandPrimary opacity-20 hover:opacity-100" />
                    )}
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>

      <button
        disabled={isSubmitting ? true : false}
        type="submit"
        className="bg-brandPrimary text-white rounded-sm py-2 self-end mt-4"
      >
        {isSubmitting ? <Spinner /> : "SUBMIT"}
      </button>
    </Form>
  );
};
export default EditItemForm;
