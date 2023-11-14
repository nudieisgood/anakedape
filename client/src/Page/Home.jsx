import { Suspense } from "react";
import logo from "../assets/logo.png";
import {
  ComingSoon,
  Hero,
  News,
  FeatureSection,
  NewArrivals,
  GoToTop,
  FadeIn,
} from "../components";
import customFetch from "../utilities/customFetch";
import { Link, useLoaderData, Await, defer } from "react-router-dom";
import visual1 from "../assets/visual/visual1.jpeg";
import visual2 from "../assets/visual/visual2.jpeg";

const data = {
  visualTitle: "2023 Autumn / Winter",
  visualImage1: visual1,
  visualImage2: visual2,
};

export const loader = async () => {
  try {
    const res = customFetch.get("items", {
      params: { status: ["new arrivals", "coming soon"] },
    });

    const resForLastFiveFeat = customFetch.get("feature/last-five-features");
    const resForRandomFeat = customFetch.get("feature/random-features");

    return defer({
      items: res,
      fiveFeatures: resForLastFiveFeat,
      randomFeatures: resForRandomFeat,
    });
  } catch (error) {
    return error;
  }
};

const Home = () => {
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
      <Await
        resolve={Promise.all([
          loaderPromise.items,
          loaderPromise.fiveFeatures,
          loaderPromise.randomFeatures,
        ])}
      >
        {(loaderData) => {
          const [itemsData, fiveFeaturesData, randomFeaturesData] = loaderData;
          const items = itemsData.data.data;
          const fiveFeatures = fiveFeaturesData.data.data;
          const randomFeatures = randomFeaturesData.data.data;

          const comingSoon = items.filter(
            (item) => item.status === "coming soon"
          );
          const newArrivals = items.filter(
            (item) => item.status === "new arrivals"
          );
          return (
            <div>
              <FadeIn>
                <Hero randomFeatures={randomFeatures} />
              </FadeIn>
              <News />
              <NewArrivals items={newArrivals} />
              <ComingSoon items={comingSoon} />
              <FadeIn>
                <div className="w-screen h-screen flex relative overflow-hidden mx-auto transition-all duration-1000">
                  <div className="flex w-full">
                    <img
                      className="object-cover w-full"
                      src={data.visualImage1}
                      alt=""
                    />
                  </div>
                  <div className="flex w-full">
                    <img
                      className="object-cover w-full"
                      src={data.visualImage2}
                      alt=""
                    />
                  </div>

                  <div className="absolute flex justify-center items-center mx-auto top-0 bottom-0 right-0 left-0 text-white">
                    <div className="text-center space-y-2">
                      <h2>{data.visualTitle}</h2>
                      <h1 className="text-4xl">VISUAL</h1>
                      <Link
                        to={"/visual"}
                        className="inline-block border border-white px-4 py-1 rounded-lg hover:bg-white hover:text-textDark transition-all"
                      >
                        More
                      </Link>
                    </div>
                  </div>
                </div>
              </FadeIn>
              <FeatureSection fiveFeatures={fiveFeatures} />
              <GoToTop />
            </div>
          );
        }}
      </Await>
    </Suspense>
  );
};
export default Home;
