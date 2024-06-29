import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import useSearch from "@/contexts/useSearch";

interface SearchBarProps {
  formClassName?: string;
  inputClassName?: string;
  svgClassName?: string;
}

export default function SearchBar({
  formClassName,
  inputClassName,
  svgClassName,
}: SearchBarProps) {
   const { searchQuery, setSearchQuery, handleSearchSubmit } = useSearch();
  return (
    <form
      onSubmit={handleSearchSubmit}
      className={cn("items-center rounded-full", formClassName)}
    >
      <Search
        className={cn("mx-3 min-h-6 min-w-6 stroke-[1.5]", svgClassName)}
      />
      <input
        type="text"
        placeholder="Search"
        className={cn(
          "w-full rounded border-none bg-transparent px-5 py-3 pl-0 outline-none placeholder:text-muted-foreground",
          inputClassName,
        )}
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
      />
    </form>
  );
}
