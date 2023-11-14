import "./App.css";
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

//import loader
import { loader as featuresLoader } from "./Page/Features";
import { loader as featureLoader } from "./Page/Feature";
import { loader as visualLoader } from "./Page/Visual";
import { loader as itemsLoader } from "./Page/Items";
import { loader as itemLoader } from "./Page/Item";
import { loader as cartLoader } from "./Page/Cart";
import { loader as checkoutLoader } from "./Page/Checkout";
import { loader as homeLoader } from "./Page/Home";
import { loader as editItemLoader } from "./Page/EditItem";
import { loader as ordersLoader } from "./Page/Orders";
import { loader as editFeatureLoader } from "./Page/EditFeature";
import { loader as addFeatureLoader } from "./Page/AddFeature";
import { loader as adminLoader } from "./Page/AdminLayout";

//import action
import { action as itemAction } from "./Page/Item";
import { action as cartAction } from "./Page/Cart";
import { action as checkoutAction } from "./Page/Checkout";
import { action as registerAction } from "./Page/Register";
import { action as addItemAction } from "./Page/ManageItems";
import { action as editItemAction } from "./Page/EditItem";
import { action as editFeatureAction } from "./Page/EditFeature";
import { action as addFeatureAction } from "./Page/AddFeature";

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
        action: itemAction,
      },
      { path: "visual", element: <Visual />, loader: visualLoader },
      { path: "features", element: <Features />, loader: featuresLoader },
      { path: "feature/:id", element: <Feature />, loader: featureLoader },
      {
        path: "cart",
        element: <Cart />,
        loader: cartLoader,
        action: cartAction,
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
