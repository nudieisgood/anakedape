import { Outlet, ScrollRestoration } from "react-router-dom";
import { Header, Footer } from "../components";

const HomeLayout = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen">
        <ScrollRestoration />

        <Outlet />
      </div>
      <Footer />
    </>
  );
};
export default HomeLayout;
