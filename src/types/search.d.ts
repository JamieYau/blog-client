import { SetURLSearchParams } from "react-router-dom";

export interface SearchContextType {
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  recentSearches: string[];
  setRecentSearches: React.Dispatch<React.SetStateAction<string[]>>;
  handleSearchSubmit: (e: FormEvent<HTMLFormElement>) => void;
  sortOrder: string;
  setSortOrder: React.Dispatch<React.SetStateAction<string>>;
}
