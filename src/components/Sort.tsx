import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSearchParams } from "react-router";
import { Button } from "./ui/button";

type SortOption = {
  value: string;
  label: string;
};

const Sort = ({ options }: { options: SortOption[] }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeSort = searchParams.get("sort") || "";

  function handleClick(option: SortOption) {
    searchParams.set("sort", option.value);
    if (searchParams.get("page")) searchParams.set("page", "1");

    setSearchParams(searchParams);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="border border-gray-100 bg-gray-0 shadow-sm rounded-sm p-2 flex gap-2">
          <Button variant="ghost">{activeSort ? activeSort : "Sort"}</Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {options.map((option) => {
          const isActive = searchParams.get("sort") === option.value;
          return (
            <DropdownMenuItem
              key={option.value}
              onClick={() => handleClick(option as SortOption)}
              className={isActive ? "font-medium" : ""}
            >
              {option.label}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Sort;
