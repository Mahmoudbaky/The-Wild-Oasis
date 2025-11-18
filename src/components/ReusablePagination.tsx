import { useSearchParams } from "react-router";
import { Button } from "./ui/button";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

const PAGE_SIZE = 10;

const ReusablePagination = ({ count }: { count: number }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const pageCount = Math.ceil(count / PAGE_SIZE);

  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;

    searchParams.set("page", next.toString());
    setSearchParams(searchParams);
  }

  function prevPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;

    searchParams.set("page", prev.toString());
    setSearchParams(searchParams);
  }

  if (pageCount <= 1) return null;

  return (
    <div className=" flex flex-col md:flex-row items-center justify-between mx-5">
      <p>
        Showing <span>{(currentPage - 1) * PAGE_SIZE + 1}</span> to{" "}
        <span>
          {currentPage === pageCount ? count : currentPage * PAGE_SIZE}
        </span>{" "}
        of <span>{count}</span> results
      </p>

      <div>
        <Button
          disabled={currentPage === 1}
          onClick={prevPage}
          variant="outline"
          className="mr-2 border-none shadow-none cursor-pointer"
        >
          <HiChevronLeft /> <span>Previous</span>
        </Button>

        <Button
          disabled={currentPage === pageCount}
          onClick={nextPage}
          variant="outline"
          className="mr-2 border-none shadow-none cursor-pointer"
        >
          <HiChevronRight /> <span>Next</span>
        </Button>
      </div>
    </div>
  );
};

export default ReusablePagination;
