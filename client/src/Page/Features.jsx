import { Suspense } from "react";
import { Await, defer, Link, useLoaderData } from "react-router-dom";
import { FadeIn, GoToTop, ScreenLoader } from "../components";
import { useAppContext } from "../context/AppContext";
import customFetch from "../utilities/customFetch";

export const loader = async () => {
  try {
    const res = customFetch.get("feature");

    return defer({ features: res });
  } catch (error) {
    throw {
      status: error.response.status,
      message: error.response.data.msg,
    };
  }
};

const Features = () => {
  const loaderPromise = useLoaderData();

  const { user } = useAppContext();

  return (
    <>
      <div className="section-container px-6 mt-48">
        <h1 className="section-title">FEATURES</h1>

        <Suspense
          fallback={
            <div className="grid md:grid-cols-2 mt-8 gap-x-12 gap-y-12">
              <ScreenLoader />
              <ScreenLoader />
              <ScreenLoader />
              <ScreenLoader />
            </div>
          }
        >
          <Await resolve={loaderPromise.features}>
            {(loaderData) => {
              return (
                <div className="grid md:grid-cols-2 gap-x-12 gap-y-12 mb-20">
                  {loaderData.data.data.map((feat) => (
                    <div className="relative" key={feat.featureNo}>
                      {user?.role === "admin" && (
                        <Link
                          to={`/admin/editFeature/${feat.featureNo}`}
                          className="absolute bottom-2 right-3 hover:text-red-500 text-sm "
                        >
                          EDIT FEATURE
                        </Link>
                      )}
                      <Link
                        to={`/feature/${feat.featureNo}`}
                        key={feat.featureNo}
                      >
                        <div className="relative hover:opacity-70 transition-all">
                          <FadeIn delay={0.3}>
                            <img
                              src={feat.photos[0]}
                              className="w-full object-cover aspect-video"
                              alt=""
                            />
                            <div className="absolute bg-white right-0 bottom-0 text-textLight px-4 py-2">
                              FEATURE {feat.featureNo}
                            </div>
                          </FadeIn>
                        </div>
                        <FadeIn delay={0.4} direction="left">
                          <div className="py-6 px-4">
                            <div className="tracking-wider mb-4 text-lg sm:text-xl">
                              <p>{feat.featureTitle1}</p>
                              <p>{feat.featureTitle2}</p>
                            </div>
                            <p className="text-textLight text-sm">
                              {feat.date}
                            </p>
                          </div>
                        </FadeIn>
                      </Link>
                    </div>
                  ))}
                </div>
              );
            }}
          </Await>
        </Suspense>
      </div>
      <GoToTop />
    </>
  );
};
export default Features;
