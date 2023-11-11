import { useState, useEffect, useRef } from "react";
import {
  ComingSoon,
  Hero,
  News,
  FeatureSection,
  NewArrivals,
} from "../components";
import customFetch from "../utilities/customFetch";
import { Link, useLoaderData } from "react-router-dom";
import visual1 from "../assets/visual/visual1.jpeg";
import visual2 from "../assets/visual/visual2.jpeg";

const data = {
  visualTitle: "2023 Autumn / Winter",
  visualImage1: visual1,
  visualImage2: visual2,
};

export const loader = async () => {
  try {
    console.log("test");
    const res = await customFetch.get("items", {
      params: { status: ["new arrivals", "coming soon"] },
    });

    const resForLastFiveFeat = await customFetch.get(
      "feature/last-five-features"
    );
    const resForRandomFeat = await customFetch.get("feature/random-features");

    return {
      items: res.data.data,
      fiveFeatures: resForLastFiveFeat.data.data,
      randomFeatures: resForRandomFeat.data.data,
    };
  } catch (error) {
    return error;
  }
};

const Home = () => {
  const [visual, setVisual] = useState(false);
  const lastRef = useRef();
  const { items, fiveFeatures, randomFeatures } = useLoaderData();

  const comingSoon = items.filter((item) => item.status === "coming soon");
  const newArrivals = items.filter((item) => item.status === "new arrivals");
  useEffect(() => {
    if (!lastRef?.current) return;

    const obs = new IntersectionObserver(
      function (entries) {
        const ent = entries[0];
        if (ent.isIntersecting) {
          setVisual(true);
        }
        if (!ent.isIntersecting) {
          setVisual(false);
        }
      },
      {
        root: null,
        threshold: [0.2, 0.8],
      }
    );

    obs.observe(lastRef.current);
  }, [lastRef]);

  return (
    <>
      <Hero randomFeatures={randomFeatures} />
      <News />
      <NewArrivals items={newArrivals} />
      <ComingSoon items={comingSoon} />
      <div
        id="visual"
        ref={lastRef}
        className={`${
          visual ? "w-screen" : "w-[80%]"
        } h-screen flex relative overflow-hidden mx-auto transition-all duration-1000`}
      >
        <img className="w-full object-cover" src={data.visualImage1} alt="" />
        <img className="w-full object-cover" src={data.visualImage2} alt="" />
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
      <FeatureSection fiveFeatures={fiveFeatures} />
    </>
  );
};
export default Home;
