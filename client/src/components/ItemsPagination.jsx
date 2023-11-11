import { useNavigate, useLocation } from "react-router-dom";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";

const ItemsPagination = ({ totalPages, totalItems, currentPage }) => {
  const { search, pathname } = useLocation();

  const navigate = useNavigate();

  const handlePageChange = (pageNum) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("currentPage", pageNum);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex gap-1">
      <button
        className="w-10 h-10 bg-gray-200 text-center flex justify-center items-center"
        onClick={() => {
          let goToPage = currentPage - 1;
          if (goToPage < 1) {
            goToPage = 1;
          }
          handlePageChange(goToPage);
        }}
      >
        <HiChevronDoubleLeft />
      </button>
      <div className="flex gap-1">
        {pages.map((page) => {
          return (
            <button
              className={`w-10 h-10  text-center flex justify-center items-center ${
                page === currentPage
                  ? "bg-brandPrimary text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => {
                handlePageChange(page);
              }}
              key={page}
            >
              {page}
            </button>
          );
        })}
      </div>
      <button
        className="w-10 h-10 bg-gray-200 text-center flex justify-center items-center"
        onClick={() => {
          let goToPage = currentPage + 1;
          if (goToPage > totalPages) {
            goToPage = totalPages;
          }
          handlePageChange(goToPage);
        }}
      >
        <HiChevronDoubleRight />
      </button>
    </div>
  );
};
export default ItemsPagination;
