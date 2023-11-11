import { Form, Link, useNavigation } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";

import FormInput from "./FormInput";
import FormFileInput from "./FormFileInput";
import FormTextarea from "./FormTextarea";

import Spinner from "./Spinner";

import { MdOutlineClose } from "react-icons/md";
import { useState } from "react";

const EditFeatureForm = ({ feature }) => {
  const {
    featureNo,
    date,
    featureTitle1,
    featureTitle2,
    photos,
    mainContent,
    section1Content,
    section2Content,
    section3Content,
    section4Content,
  } = feature;

  const navigation = useNavigation();
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
        labelText="feature title 1"
        name="featureTitle1"
        defaultValue={featureTitle1}
        placeHolder="If title too long please separate into two part"
      />
      <FormInput
        type="text"
        required={false}
        defaultValue={featureTitle2}
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
          defaultValue={date}
          labelText="Date"
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
          <FormFileInput
            des={
              <>
                <p>Note ! First photo will be the main photo of feature</p>
              </>
            }
          />
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

      <div className="lg:col-span-2">
        <FormTextarea
          required={false}
          name="mainContent"
          labelText="Main content"
          defaultValue={mainContent}
        />
      </div>
      <div className="lg:col-span-2">
        <FormTextarea
          defaultValue={section1Content}
          required={false}
          name="section1Content"
          labelText="Content Section 1"
        />
      </div>
      <div className="lg:col-span-2">
        <FormTextarea
          defaultValue={section2Content}
          required={false}
          name="section2Content"
          labelText="Content Section 2"
        />
      </div>
      <div className="lg:col-span-2">
        <FormTextarea
          defaultValue={section3Content}
          required={false}
          name="section3Content"
          labelText="Content Section 3"
        />
      </div>
      <div className="lg:col-span-2">
        <FormTextarea
          defaultValue={section4Content}
          required={false}
          name="section4Content"
          labelText="Content Section 4"
        />
      </div>

      <Link
        to="/features"
        className="absolute top-0 right-0 p-3 hover:text-primary text-gray-500"
      >
        <MdOutlineClose className="text-2xl" />
      </Link>

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
export default EditFeatureForm;
