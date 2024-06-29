import { useContext } from "react";
import { SearchContext } from "./SearchProvider";
import { SearchContextType } from "@/types/search";

export default function useSearch(): SearchContextType {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearchContext must be used within a SearchProvider");
  }
  return context;
}
