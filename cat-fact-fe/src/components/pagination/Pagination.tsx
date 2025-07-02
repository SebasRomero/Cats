import { definePagination } from "./defineQuery";

interface PaginationProps {
  currentPage: number;
  pages: (number | string)[];
  totalPages: number;
}

const Pagination = ({ currentPage, pages, totalPages }: PaginationProps) => {
  return (
    <div className="flex justify-center mt-8 items-center">
      <section className="flex gap-1 mx-auto">
        {currentPage > 1 && (
          <a
            href={definePagination(currentPage - 1)}
            className="text-black font-semibold"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
          </a>
        )}

        {pages.map((page, i) =>
          typeof page === "string" ? (
            <span key={page} className="text-black font-semibold">...</span>
          ) : (
            <a
              key={page}
              href={definePagination(page)}
              className={`px-2 mx-1 rounded-4xl ${
                page === currentPage
                  ? "bg-orange-300 text-black font-semibold"
                  : "text-black font-semibold"
              }`}
            >
              {page}
            </a>
          )
        )}

        {currentPage < totalPages && (
          <a
            href={definePagination(currentPage + 1)}
            className="text-black font-semibold"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </a>
        )}
      </section>
    </div>
  );
};

export default Pagination;
