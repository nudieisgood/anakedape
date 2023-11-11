import { Link, useRouteError } from "react-router-dom";
import logo from "../assets/logo.png";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex flex-col gap-5 items-center">
        <Link to={"/"} className="w-40 flex ">
          <img src={logo} alt="" />
        </Link>
        <h1 className="text-3xl tracking-wider">
          Oops... Something went wrong.
        </h1>

        <p className="flex gap-4 text-2xl">
          <span>{error.status}</span>
          <span>{error.status ? 404 && "PAGE NOT FOUND." : error.message}</span>
        </p>
        <Link
          className="text-gray-500 hover:underline hover:text-brandPrimary"
          to={"/"}
        >
          BACK TO HOME PAGE
        </Link>
      </div>
    </div>
  );
};
export default ErrorPage;
