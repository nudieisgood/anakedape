import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { FormInput, Spinner } from "../components";
import { useAppContext } from "../context/appContext";
import customFetch from "../utilities/customFetch";

export const action = async ({ request }) => {
  return null;
};

const Login = () => {
  const { changeUser } = useAppContext();
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    try {
      const {
        data: { user },
      } = await customFetch.post("/auth/login", data);
      changeUser(user);
      navigate("/");
    } catch (error) {
      setError(error.response.data.msg);
    }
    setLoading(false);
  };

  return (
    <div className="section-container h-screen flex justify-center items-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-[30rem] mx-auto flex flex-col gap-2 border p-6 rounded-md border-t-4 border-t-brandPrimary shadow-lg shadow-grey-300"
      >
        <div className="flex text-2xl justify-center items-center gap-2 mb-5"></div>
        <h2 className="text-3xl text-center mb-3">LOG IN</h2>

        {error && (
          <p className="text-center text-xl text-red-500">信箱或帳號錯誤</p>
        )}

        <FormInput
          inputError={error}
          type="email"
          name="email"
          labelText="Email"
          placeHolder="youreamil@email.com"
        />
        <FormInput
          inputError={error}
          type="password"
          name="password"
          labelText="password"
          placeHolder="password"
        />

        <button
          type="submit"
          className="bg-brandPrimary text-white py-2 rounded-md"
          disabled={loading}
        >
          {loading ? <Spinner /> : "LOG IN"}
        </button>

        <div className="text-center p-2 text-gray-400">
          Not a member ?
          <Link to="/register" className="text-primary ml-2 underline">
            SIGN UP
          </Link>
        </div>
      </form>
    </div>
  );
};
export default Login;
