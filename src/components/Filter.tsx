import { useSearchParams } from "react-router";
import { Button } from "./ui/button";

interface FilterOption {
  value: string;
  label: string;
}

interface FilterProps {
  filterField: string;
  options: FilterOption[];
}

function Filter({ filterField, options }: FilterProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField) || options.at(0)?.value;

  function handleClick(value: string) {
    searchParams.set(filterField, value);
    if (searchParams.get("page")) searchParams.set("page", "1");

    setSearchParams(searchParams);
  }

  return (
    <div className="border border-gray-100 bg-gray-0 shadow-sm rounded-sm p-2 flex gap-2">
      {options.map((option) => {
        const isActive = option.value === currentFilter;

        return (
          <Button
            variant="default"
            key={option.value}
            onClick={() => handleClick(option.value)}
            className={`
              border-none rounded-sm font-medium text-sm py-2 px-3 transition-all duration-300 cursor-pointer
              ${isActive ? "" : "bg-gray-50 hover:bg-gray-100 text-gray-950"}
            `}
          >
            {option.label}
          </Button>
        );
      })}
    </div>
  );
}

export default Filter;
