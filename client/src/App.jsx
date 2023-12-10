import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AppContextProvider } from "./context/AppContext";

//page comp
import {
  Home,
  Feature,
  Features,
  Item,
  Items,
  Visual,
  HomeLayout,
  Cart,
  Checkout,
  Login,
  Register,
  Completed,
  AdminLayout,
  ManageItems,
  EditItem,
  Orders,
  EditFeature,
  AddFeature,
  ErrorPage,
} from "./Page";

//import actions and loaders
import { loader as featuresLoader } from "./Page/Feature/Features";
import { loader as featureLoader } from "./Page/Feature/Feature";
import { loader as itemsLoader } from "./Page/Item/Items";
import { loader as itemLoader } from "./Page/Item/Item";
import { loader as cartLoader } from "./Page/Cart/Cart";
import {
  loader as checkoutLoader,
  action as checkoutAction,
} from "./Page/Checkout/Checkout";
import { loader as homeLoader } from "./Page/Home/Home";
import {
  loader as editItemLoader,
  action as editItemAction,
} from "./Page/Admin/EditItem";
import { loader as ordersLoader } from "./Page/Admin/Orders";
import { loader as editFeatureLoader } from "./Page/Admin/AddFeature";
import {
  loader as addFeatureLoader,
  action as addFeatureAction,
} from "./Page/Admin/AddFeature";
import { loader as adminLoader } from "./Page/Admin/AdminLayout";
import { action as addItemAction } from "./Page/Admin/ManageItems";
import { action as editFeatureAction } from "./Page/Admin/EditFeature";
import { action as registerAction } from "./Page/User/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home />, loader: homeLoader },
      { path: "register", element: <Register />, action: registerAction },
      { path: "login", element: <Login /> },
      { path: "all-items", element: <Items />, loader: itemsLoader },
      {
        path: "item/:id",
        element: <Item />,
        loader: itemLoader,
      },
      { path: "visual", element: <Visual /> },
      { path: "features", element: <Features />, loader: featuresLoader },
      { path: "feature/:id", element: <Feature />, loader: featureLoader },
      {
        path: "cart",
        element: <Cart />,
        loader: cartLoader,
      },
      {
        path: "completed",
        element: <Completed />,
      },
      {
        path: "checkout",
        element: <Checkout />,
        action: checkoutAction,
        loader: checkoutLoader,
      },
      {
        path: "admin",
        element: <AdminLayout />,
        loader: adminLoader,
        children: [
          { index: true, element: <ManageItems />, action: addItemAction },
          {
            path: "editItem/:id",
            element: <EditItem />,
            loader: editItemLoader,
            action: editItemAction,
          },
          {
            path: "Orders",
            element: <Orders />,
            loader: ordersLoader,
          },
          {
            path: "manage-feature",
            element: <AddFeature />,
            loader: addFeatureLoader,
            action: addFeatureAction,
          },
          {
            path: "editFeature/:id",
            element: <EditFeature />,
            loader: editFeatureLoader,
            action: editFeatureAction,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <AppContextProvider>
      <RouterProvider router={router} />
    </AppContextProvider>
  );
}

export default App;
