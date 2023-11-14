import { useLoaderData, Await, defer } from "react-router-dom";
import { Suspense } from "react";
import { FadeIn, GoToTop } from "../components";
import customFetch from "../utilities/customFetch";
import logo from "../assets/logo.png";

export const loader = async ({ params }) => {
  const { id } = params;

  try {
    const res = customFetch.get(`feature/${id}`);

    return defer({ feature: res });
  } catch (error) {
    throw {
      status: error.response.status,
      message: error.response.data.msg,
    };
  }
};

const Feature = () => {
  const loaderPromise = useLoaderData();

  return (
    <Suspense
      fallback={
        <div className="h-screen w-screen opacity-100 grid place-items-center">
          <div className="flex w-40">
            <FadeIn>
              <img src={logo} alt="" />
            </FadeIn>
          </div>
        </div>
      }
    >
      <Await resolve={loaderPromise.feature}>
        {(loaderData) => {
          const feat = loaderData.data.data[0];

          return (
            <div>
              <div className="relative">
                <FadeIn delay={0.2}>
                  <img
                    className="w-full object-cover aspect-[4/5] md:aspect-video"
                    src={feat.photos[0]}
                    alt=""
                  />
                </FadeIn>
                <FadeIn delay={0.1} direction="left">
                  <div className="hidden md:flex absolute right-6 bottom-6 tracking-wider flex-col gap-4">
                    <p className="text-white text-2xl">
                      FEATURE {feat.featureNo}
                    </p>
                    {feat?.featureTitle1 && (
                      <div className=" text-textMd text-5xl">
                        <span className="bg-white inline-block px-4 py-2">
                          {feat?.featureTitle1}
                        </span>
                      </div>
                    )}
                    {feat?.featureTitle2 && (
                      <div className=" text-textMd text-5xl ">
                        <span className="bg-white inline-block px-4 py-2">
                          {feat?.featureTitle2}
                        </span>
                      </div>
                    )}
                  </div>
                </FadeIn>
              </div>
              <div className="section-container px-6 my-16 md:my-36">
                <div className="md:hidden">
                  <p className="text-textMd">FEATURE {feat.featureNo}</p>
                  {feat?.featureTitle1 && (
                    <div className=" text-textMd">
                      <span className=" inline-block">
                        {feat?.featureTitle1}
                      </span>
                    </div>
                  )}
                  {feat?.featureTitle2 && (
                    <div className=" text-textMd">
                      <span className="inline-block">
                        {feat?.featureTitle2}
                      </span>
                    </div>
                  )}
                </div>

                <div className="tracking-wider sm:tracking-widest text-lg my-24">
                  {feat?.mainContent}
                </div>
                <div className={`flex justify-end`}>
                  {feat.photos.length > 1 && (
                    <img
                      src={feat?.photos[1]}
                      className="object-cover"
                      alt=""
                    />
                  )}
                </div>
                <div className="tracking-wider sm:tracking-widest text-lg my-24">
                  {feat.section1Content}
                </div>
                <div className={`flex justify-start`}>
                  {feat?.photos?.length > 2 && (
                    <img
                      src={feat?.photos[2]}
                      className="object-cover"
                      alt=""
                    />
                  )}
                </div>
                <div className="tracking-wider sm:tracking-widest text-lg my-24">
                  {feat.section2Content}
                </div>
                <div className={`flex justify-end`}>
                  {feat.photos.length > 3 && (
                    <img src={feat.photos[3]} className="object-cover" alt="" />
                  )}
                </div>
                <div className="tracking-wider sm:tracking-widest text-lg my-24">
                  {feat?.section3Content}
                </div>
                <div className={`flex justify-start`}>
                  {feat.photos.length > 4 && (
                    <img src={feat.photos[4]} className="object-cover" alt="" />
                  )}
                </div>
                <div className="tracking-wider sm:tracking-widest text-lg my-24">
                  {feat?.section4Content}
                </div>
                <GoToTop />
              </div>
            </div>
          );
        }}
      </Await>
    </Suspense>
  );
};
export default Feature;
