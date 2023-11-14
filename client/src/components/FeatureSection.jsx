import { Link } from "react-router-dom";

const FeatureSection = ({ fiveFeatures }) => {
  return (
    <div id="feature" className="my-24">
      <h1 className="section-title">Feature</h1>
      <div className="flex overflow-scroll gap-10 pb-8 coming-scrollbar">
        {fiveFeatures?.map((feat, i) => (
          <Link
            to={`/feature/${feat.featureNo}`}
            key={i}
            className="flex w-3/5 shrink-0 relative"
          >
            <img
              src={feat.photos[0]}
              className="aspect-video object-cover"
              alt=""
            />
            <div className="absolute left-0 bottom-0 right-0">
              <div className="bg-white max-w-[40%] p-4">
                <p className="text-textLight">Feature {feat.featureNo}</p>
                <h2 className="mb-1">{feat.featureTitle1}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default FeatureSection;
