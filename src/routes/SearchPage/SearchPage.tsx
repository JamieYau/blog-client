import PostItem from "@/components/PostItem";
import SearchBar from "@/components/SearchBar";
import useSearch from "@/contexts/useSearch";
import { Post } from "@/types/models";
import { X } from "lucide-react";
import { Link, useLoaderData } from "react-router-dom";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SearchPage() {
  const {
    searchParams,
    recentSearches,
    setRecentSearches,
    setSearchQuery,
    setSearchParams,
    setSortOrder,
  } = useSearch();
  const posts = useLoaderData() as Post[];

  const removeSearchItem = (index: number) => {
    const newRecentSearches = recentSearches.filter((_, i) => i !== index);
    setRecentSearches(newRecentSearches);
  };

  const handleSortChange = (value: string) => {
    setSortOrder(value);
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", value);
    setSearchParams(params);
  };

  return (
    <div className="flex w-full flex-col p-2">
      <SearchBar formClassName="flex border bg-transparent sm:hidden" />
      <section>
        {searchParams.get("searchTerm") ? (
          <>
            <div className="flex items-center justify-between">
              <h1 className="my-7 text-2xl font-semibold tracking-tight text-muted-foreground sm:mt-0 md:text-4xl">
                Results for
                <span className="ml-1 text-foreground md:ml-2">
                  {searchParams.get("searchTerm")}
                </span>
              </h1>
              <Select onValueChange={(value) => handleSortChange(value)}>
                <SelectTrigger className="focus:ring-transparent w-fit">
                  <SelectValue placeholder="Sort by date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="desc">Newest</SelectItem>
                  <SelectItem value="asc">Oldest</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <ul>
              {posts.map((post) => (
                <PostItem key={post._id} post={post} />
              ))}
            </ul>
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
