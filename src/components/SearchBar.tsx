import { Search } from "lucide-react";
import { FormEvent } from "react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  formClassName?: string;
  inputClassName?: string;
  svgClassName?: string;
}

export default function SearchBar({
  searchQuery,
  setSearchQuery,
  onSubmit,
  formClassName,
  inputClassName,
  svgClassName,
}: SearchBarProps) {
  return (
    <form
      onSubmit={onSubmit}
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
