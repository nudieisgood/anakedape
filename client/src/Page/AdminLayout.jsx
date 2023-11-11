import AdminNav from "./AdminNav";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="my-32">
      <AdminNav />
      <Outlet />
    </div>
  );
};
export default AdminLayout;
