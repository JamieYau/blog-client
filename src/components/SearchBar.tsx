import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import useSearch from "@/contexts/useSearch";
import { useState, useRef, useEffect, FormEvent } from "react";

interface SearchBarProps {
  containerClassName?: string;
  svgClassName?: string;
}

export default function SearchBar({
  containerClassName,
  svgClassName,
}: SearchBarProps) {
  const {
    searchQuery,
    setSearchQuery,
    handleSearchSubmit,
    recentSearches,
    setRecentSearches,
  } = useSearch();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (searchQuery.trim() !== "") {
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }, [searchQuery]);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    setShowDropdown(false);
    inputRef.current?.blur();
    handleSearchSubmit(e);
  };

  const handleRecentSearchClick = (search: string) => {
    setSearchQuery(search);
    setShowDropdown(false);
  };

  const removeSearchItem = (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>,
    index: number,
  ) => {
    event.stopPropagation();
    const newRecentSearches = recentSearches.filter((_, i) => i !== index);
    setRecentSearches(newRecentSearches);
  };

  return (
    <div className={cn("relative rounded-full", containerClassName)}>
      <form
        onSubmit={(e) => handleFormSubmit(e)}
        className={"flex items-center rounded-full"}
      >
        <Search
          className={cn("mx-3 min-h-6 min-w-6 stroke-[1.5]", svgClassName)}
        />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search"
          className="w-full rounded border-none bg-transparent px-5 py-3 pl-0 outline-none placeholder:text-muted-foreground"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
      </form>
      {showDropdown && recentSearches.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute z-50 mt-1 w-full rounded-md border bg-background shadow-lg"
        >
          <ul className="py-1">
            {recentSearches.map((recentItem, index) => (
              <li
                key={index}
                className="flex cursor-pointer justify-between px-4 py-2 hover:bg-muted"
                onClick={() => handleRecentSearchClick(recentItem)}
              >
                {recentItem}
                <X
                  strokeWidth={1.1}
                  onClick={(e) => removeSearchItem(e, index)}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
