import { NavLink } from "react-router-dom";

const AdminNav = () => {
  return (
    <nav className="w-full flex justify-center items-center mt-8 gap-4">
      <NavLink
        end
        className="flex gap-1 account py-2 px-6 rounded-md transition ease-in-out delay-100 hover:border"
        to="."
      >
        <p className="uppercase tracking-wider">Add item</p>
      </NavLink>
      <NavLink
        end
        className="flex gap-1 account py-2 px-6 rounded-md transition ease-in-out delay-100 hover:border"
        to="orders"
      >
        <p className="uppercase tracking-wider">orders</p>
      </NavLink>
      <NavLink
        className="flex gap-1 account py-2 px-6 rounded-md transition ease-in-out delay-100 hover:border"
        to="manage-feature"
      >
        <p className="uppercase tracking-wider">manage features</p>
      </NavLink>
    </nav>
  );
};
export default AdminNav;
