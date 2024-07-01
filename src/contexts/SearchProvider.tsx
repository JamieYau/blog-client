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
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page")) || 1,
  );
  const [totalPages, setTotalPages] = useState(1);
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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    setSearchParams(params);
    navigate(`/search?${params.toString()}`);
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
        currentPage,
        setCurrentPage,
        totalPages,
        setTotalPages,
        handlePageChange,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
