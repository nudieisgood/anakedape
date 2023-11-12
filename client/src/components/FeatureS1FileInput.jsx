import { useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import customFetch from "../utilities/customFetch";
import { backendBaseURL } from "../utilities/customFetch";

const FeatureS1FileInput = ({ des }) => {
  const [section1Photos, setSection1Photos] = useState([]);

  const uploadPhotoS1 = async (e) => {
    const files = e.target.files;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("section1Photos", files[i]);
    }

    try {
      const res = await customFetch.post("/upload/section1Photos", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const { data } = res.data;

      setSection1Photos(data);
    } catch (error) {
      return error;
    }
  };

  return (
    <div>
      <h2 className="text-lg">{"Section 1 photos"} Images</h2>
      <p className="text-md text-textLight">{des}</p>
      <div className="grid gap-1 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {section1Photos.length > 0 &&
          section1Photos.map((photo) => {
            return (
              <div className="h-32 flex" key={photo}>
                <img
                  className="rounded-2xl w-full object-cover"
                  src={`${backendBaseURL}/${photo}`}
                  alt="place photos"
                />
              </div>
            );
          })}

        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex gap-2 items-center p-2">
            <AiOutlineCloudUpload className="text-4xl text-gray-500" />
          </div>
          <input
            multiple
            name="section1Photos"
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={uploadPhotoS1}
          />
        </label>
      </div>
    </div>
  );
};

export default FeatureS1FileInput;
