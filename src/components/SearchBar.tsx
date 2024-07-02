import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import useSearch from "@/contexts/useSearch";
import { useState, useRef, useEffect, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

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
    setSearchParams,
    handleSearchSubmit,
    recentSearches,
    setRecentSearches,
    sortOrder,
  } = useSearch();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
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
    if (searchQuery.trim() === "") {
      setShowDropdown(false);
    }
  }, [searchQuery]);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    setShowDropdown(false);
    inputRef.current?.blur();
    handleSearchSubmit(e);
  };

  const handleRecentSearchClick = (recentItem: string) => {
    setSearchQuery(recentItem);
    setShowDropdown(false);

    const params = new URLSearchParams();
    params.set("searchTerm", recentItem);
    setSearchParams(params);
    navigate(
      `/search?searchTerm=${encodeURIComponent(recentItem)}&order=${encodeURIComponent(sortOrder)}`,
    );
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
          onChange={(event) => {
            setSearchQuery(event.target.value),
              event.target.value && setShowDropdown(true);
          }}
          onFocus={() => setShowDropdown(true)}
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
