import { Link } from "react-router-dom";

const NewArrivals = ({ items }) => {
  return (
    <div id="newArrivals" className="section-container text-center md:px-4">
      <h1 className="section-title">New Arrivals</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
        {items.map((item) => (
          <Link
            to={`/item/${item._id}`}
            key={item._id}
            className=" bg-[#f5f5f5]"
          >
            <img src={item.photos[0]} alt="" className="p-6" />
            <p className="text-textLight text-sm md:text-lg pb-2">
              {item.name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default NewArrivals;
