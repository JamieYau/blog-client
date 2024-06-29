import { SearchContextType } from "@/types/search";
import {
  createContext,
  useState,
  ReactNode,
} from "react";
import { useSearchParams } from "react-router-dom";

export const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("searchTerm") || "",
  );
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  return (
    <SearchContext.Provider
      value={{
        searchParams,
        setSearchParams,
        searchQuery,
        setSearchQuery,
        recentSearches,
        setRecentSearches,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
