import { SearchContextType } from "@/types/search";
import { createContext, useState, ReactNode, FormEvent } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export const SearchContext = createContext<SearchContextType | undefined>(
  undefined,
);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("searchTerm") || "",
  );
  const [sortOrder, setSortOrder] = useState(searchParams.get("order") || "");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    params.set("searchTerm", searchQuery);
    setSearchParams(params);
    if (searchQuery !== "") {
      setRecentSearches((prev) => [...new Set([searchQuery, ...prev])]);
    }
    navigate(
      `/search?searchTerm=${encodeURIComponent(searchQuery)}&order=${encodeURIComponent(params.get("order") || "")}`,
    );
  };

  return (
    <SearchContext.Provider
      value={{
        searchParams,
        setSearchParams,
        searchQuery,
        setSearchQuery,
        recentSearches,
        setRecentSearches,
        handleSearchSubmit,
        sortOrder,
        setSortOrder,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
