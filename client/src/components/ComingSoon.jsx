import { Link } from "react-router-dom";

const ComingSoon = ({ items }) => {
  return (
    <div className="section-container text-center md:px-4 my-24">
      <h1 className="section-title">Coming Soon</h1>
      <div className="flex gap-4 overflow-scroll pb-8">
        {items.map((item) => (
          <Link
            to={`/item/${item._id}`}
            className="w-64 shrink-0 flex relative p-6 bg-[#f5f5f5]"
            key={item._id}
          >
            <img className="w-full" src={item.photos[0]} alt="" />
            <p className="absolute top-0 left-1 text-gray-400 text-sm">
              Coming soon
            </p>
            <p className="absolute bottom-1 right-0 left-1 text-textLight text-xs">
              {item.name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default ComingSoon;
