import { Link, useLoaderData, useSubmit, Form } from "react-router-dom";
import { FormRowSelect, ItemsPagination } from "../components";
import { useAppContext } from "../context/AppContext";
import customFetch from "../utilities/customFetch";

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
    const res = await customFetch.get("items", {
      params: queryObj,
    });

    return {
      items: res.data.data,
      searchValues: queryObj,
      currentPage: res.data.currentPage,
      totalItems: res.data.totalItems,
    };
  } catch (error) {
    return error;
  }
};

const Items = () => {
  const { items, searchValues, currentPage, totalItems } = useLoaderData();
  const { user } = useAppContext();

  const submit = useSubmit();
  return (
    <div className="section-container mt-48 px-10">
      <div className="flex justify-between items-center py-4">
        <div className="flex items-center gap-8">
          <h1 className=" sm:text-3xl font-extrabold tracking-wider uppercase">
            {searchValues?.typeFilter}
          </h1>
          <p className="text-textMd text-xs sm:text-lg">{totalItems} items</p>
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
        {items?.map((item) => {
          const totalStock = item?.stock
            .map((s) => s.quantity)
            ?.reduce((curr, acc) => curr + acc, 0);
          return (
            <Link to={`/item/${item._id}`} key={item._id} className="">
              <div className="relative p-6 bg-[#f5f5f5]">
                <div className="hover:opacity-0 transition-all duration-1000">
                  <img src={item.photos[0]} alt="" />
                  <p className="text-center absolute bottom-2 left-0 right-0 text-textLight text-sm">
                    {item.name}
                  </p>
                </div>
                <div className="bg-[#f5f5f5] absolute bottom-2 left-0 right-0 top-0 opacity-0 hover:opacity-100 transition-all duration-1000">
                  <img src={item.photos[item.photos.length - 1]} alt="" />
                </div>
                {!totalStock && (
                  <p className="absolute top-2 left-2 text-textLight text-sm">
                    SOLD OUT
                  </p>
                )}
                {item.status === "coming soon" && (
                  <p className="absolute top-2 left-2 text-textLight text-sm">
                    COMING SOON
                  </p>
                )}
                {user?.role === "admin" && (
                  <Link
                    to={`/admin/editItem/${item._id}`}
                    className="absolute top-2 right-3 hover:text-red-500 text-sm "
                  >
                    EDIT ITEM
                  </Link>
                )}
              </div>
            </Link>
          );
        })}
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
    </div>
  );
};
export default Items;

// if (!queryObj?.typeFilter || queryObj?.typeFilter === "all items")
// return { allItems: items };

// const filterItems = items.filter(
// (item) => item.type === queryObj?.typeFilter
// );

// return { searchValues: queryObj, allItems: filterItems };
