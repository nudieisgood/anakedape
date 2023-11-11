import {
  redirect,
  Form,
  Link,
  useActionData,
  useNavigation,
} from "react-router-dom";
import { FormInput, Spinner } from "../components";
import customFetch from "../utilities/customFetch";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post("/auth/register", data);
    return redirect("/login");
  } catch (error) {
    throw {
      status: error.response.status,
      message: error.response.data.msg,
    };
  }
};

const Register = () => {
  const isSubmitting = useNavigation().state === "submitting";
  const errorData = useActionData();
  const errorArr = errorData?.split(",");

  return (
    <div className="section-container h-screen flex justify-center items-center px-4">
      <Form
        method="post"
        className="w-[30rem] mx-auto flex flex-col gap-2 border p-6 rounded-md border-t-4 border-t-brandPrimary shadow-lg shadow-grey-300"
      >
        <div className="flex text-2xl justify-center items-center gap-2 mb-5"></div>
        <h2 className="text-3xl text-center mb-3">Sign up</h2>
        <FormInput
          type="text"
          name="lastName"
          placeHolder="Last name"
          labelText="Last name"
        />
        <FormInput
          type="text"
          name="firstName"
          placeHolder="First name"
          labelText="First name"
        />
        <FormInput
          type="email"
          name="email"
          labelText="Email"
          placeHolder="youreamil@email.com"
          inputError={
            errorArr?.includes("invalid email format.") ||
            errorArr?.includes("email already exists.")
          }
        />
        {errorArr?.includes("invalid email format.") && (
          <p className="bg-red-500">invalid email format.</p>
        )}
        {errorArr?.includes("email already exists.") && (
          <p className="bg-red-500">email already exists.</p>
        )}
        <FormInput
          type="password"
          name="password"
          placeHolder="password should longer than 8 characters"
          labelText="password"
          inputError={errorArr?.includes(
            "password should longer than 8 characters."
          )}
        />
        {errorArr?.includes("password should longer than 8 characters.") && (
          <p className="bg-red-500">
            password should longer than 8 characters.
          </p>
        )}
        <button
          disabled={isSubmitting}
          type="submit"
          className="bg-brandPrimary text-white py-2 rounded-md"
        >
          {isSubmitting ? <Spinner /> : "SUBMIT"}
        </button>
        <div className="text-center p-2 text-gray-400">
          Already a member ?
          <Link to="/login" className="text-gray-400 ml-2 underline">
            LOGIN
          </Link>
        </div>
      </Form>
    </div>
  );
};
export default Register;
