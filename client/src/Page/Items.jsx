import {
  useLoaderData,
  useSubmit,
  Form,
  Await,
  defer,
  useNavigation,
} from "react-router-dom";
import {
  FormRowSelect,
  ItemsPagination,
  ItemBox,
  ScreenLoader,
} from "../components";
import { useAppContext } from "../context/AppContext";
import customFetch from "../utilities/customFetch";
import { Suspense } from "react";

const filter = {
  ALL: "all",
  JACKET: "jacket",
  PANTS: "pants",
  SHIRT: "shirt",
  top: "top",
  HAT: "hat",
  ACCESSORY: "accessory",
};

const statusfilter = {
  ALL: "all",
  COMINGSOON: "coming soon",
  NEWARRIVAL: "new arrivals",
  ONSALE: "sale",
};

export const loader = async ({ request }) => {
  const queryEntriesArr = [...new URL(request.url).searchParams.entries()];
  const queryObj = Object.fromEntries(queryEntriesArr);

  try {
    const res = customFetch.get("items", {
      params: queryObj,
    });

    return defer({
      items: res,
    });
  } catch (error) {
    return error;
  }
};

const Items = () => {
  const queryEntriesArr = [
    ...new URL(window.location.href).searchParams.entries(),
  ];
  const searchValues = Object.fromEntries(queryEntriesArr);

  const loaderPromise = useLoaderData();
  const navigation = useNavigation();
  const submit = useSubmit();
  const { user } = useAppContext();

  const isPageLoading = navigation.state === "loading";

  if (isPageLoading && navigation.location.pathname === "/all-items")
    return (
      <div className="section-container mt-48 px-10">
        <div className="grid md:grid-cols-3 mt-8 gap-6">
          <ScreenLoader />
          <ScreenLoader />
          <ScreenLoader />
          <ScreenLoader />
          <ScreenLoader />
          <ScreenLoader />
        </div>
      </div>
    );

  return (
    <div className="section-container mt-48 px-10">
      <Suspense
        fallback={
          <div className="grid md:grid-cols-3 mt-8 gap-6">
            <ScreenLoader />
            <ScreenLoader />
            <ScreenLoader />
            <ScreenLoader />
            <ScreenLoader />
            <ScreenLoader />
          </div>
        }
      >
        <Await resolve={loaderPromise.items}>
          {(loaderData) => {
            const { totalItems, currentPage } = loaderData.data;
            const { data: items } = loaderData.data;
            return (
              <>
                <div className="flex justify-between items-center py-4">
                  <div className="flex items-center gap-8">
                    <h1 className=" sm:text-3xl font-extrabold tracking-wider uppercase">
                      {searchValues?.typeFilter}
                    </h1>
                    <p className="text-textMd text-xs sm:text-lg">
                      {totalItems} items
                    </p>
                  </div>
                  <div>
                    <Form className="md:flex gap-2">
                      <FormRowSelect
                        name="statusFilter"
                        list={[...Object.values(statusfilter)]}
                        defaultValue={searchValues?.statusFilter}
                        onChange={(e) => {
                          submit(e.currentTarget.form);
                        }}
                      />
                      <FormRowSelect
                        name="typeFilter"
                        list={[...Object.values(filter)]}
                        defaultValue={searchValues?.typeFilter}
                        onChange={(e) => {
                          submit(e.currentTarget.form);
                        }}
                      />
                    </Form>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 mt-8 gap-6">
                  {items?.map((item) => (
                    <ItemBox key={item._id} item={item} user={user} />
                  ))}
                </div>
                <div className="flex justify-center my-20">
                  {totalItems > 16 && (
                    <ItemsPagination
                      totalPages={Math.ceil(totalItems / 16)}
                      totalItems={items.length}
                      currentPage={currentPage}
                    />
                  )}
                </div>
              </>
            );
          }}
        </Await>
      </Suspense>
    </div>
  );
};
export default Items;
