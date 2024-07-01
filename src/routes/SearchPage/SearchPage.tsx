import PostItem from "@/components/PostItem";
import SearchBar from "@/components/SearchBar";
import useSearch from "@/contexts/useSearch";
import { X } from "lucide-react";
import { Link, useLoaderData } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PostsResponse } from "@/types/api";
import PaginationComponent from "@/components/PaginationComponent";
import { useEffect } from "react";

export default function SearchPage() {
  const {
    searchParams,
    recentSearches,
    setRecentSearches,
    setSearchQuery,
    setSearchParams,
    setSortOrder,
    currentPage,
    setCurrentPage,
    setTotalPages,
    handlePageChange,
  } = useSearch();
  const { data: posts, meta } = useLoaderData() as PostsResponse;

  const removeSearchItem = (index: number) => {
    const newRecentSearches = recentSearches.filter((_, i) => i !== index);
    setRecentSearches(newRecentSearches);
  };

  const handleSortChange = (value: string) => {
    setSortOrder(value);
    const params = new URLSearchParams(searchParams.toString());
    params.set("order", value);
    setSearchParams(params);
  };

  useEffect(() => {
    if (meta) {
      setCurrentPage(meta.currentPage);
      setTotalPages(meta.totalPages);
    }
  }, [meta, setCurrentPage, setTotalPages]);

  return (
    <div className="flex w-full flex-col p-2 flex-1">
      <SearchBar formClassName="flex border bg-transparent sm:hidden" />
      <section className="flex flex-col flex-1">
        {searchParams.get("searchTerm") ? (
          <>
            <div className="flex items-center justify-between">
              <h1 className="my-7 text-2xl font-semibold tracking-tight text-muted-foreground sm:mt-0 md:text-4xl">
                <span className="mr-2">{meta.totalPosts}</span>
                Results for
                <span className="ml-1 text-foreground md:ml-2">
                  {searchParams.get("searchTerm")}
                </span>
              </h1>
              <Select onValueChange={(value) => handleSortChange(value)}>
                <SelectTrigger className="w-fit focus:ring-transparent">
                  <SelectValue placeholder="Sort by date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="desc">Newest</SelectItem>
                  <SelectItem value="asc">Oldest</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <ul className="flex flex-col gap-8 md:grid md:grid-cols-6 flex-1">
              {posts.map((post) => (
                <PostItem key={post._id} post={post} />
              ))}
            </ul>
            <PaginationComponent
              currentPage={currentPage}
              totalPages={meta.totalPages}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <>
            <h1 className="my-7 text-2xl font-semibold tracking-tight sm:mt-0">
              Recent searches
            </h1>
            <ul className="[&>*:not(:last-child)]:border-b">
              {recentSearches.map((recentItem, i) => (
                <li key={i} className="flex w-full justify-between py-4">
                  <Link
                    to={`/search?searchTerm=${encodeURIComponent(recentItem)}`}
                    onClick={() => setSearchQuery(recentItem)}
                  >
                    {recentItem}
                  </Link>
                  <X strokeWidth={1.1} onClick={() => removeSearchItem(i)} />
                </li>
              ))}
            </ul>
          </>
        )}
      </section>
    </div>
  );
}
