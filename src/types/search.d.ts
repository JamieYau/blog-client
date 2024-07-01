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
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  setTotalPages: React.Dispatch<React.SetStateAction<number>>;
  handlePageChange: (page: number) => void;
}
