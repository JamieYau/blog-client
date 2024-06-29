import PostItem from "@/components/PostItem";
import SearchBar from "@/components/SearchBar";
import useSearch from "@/contexts/useSearch";
import { Post } from "@/types/models";
import { useLoaderData } from "react-router-dom";

export default function SearchPage() {
  const { searchParams, recentSearches } = useSearch();
  const posts = useLoaderData() as Post[];

  return (
    <div className="flex w-full flex-col p-2">
      <SearchBar formClassName="flex border bg-transparent sm:hidden" />
      <section>
        {searchParams.get("searchTerm") ? (
          <>
            <h1 className="my-7 text-2xl font-semibold tracking-tight text-muted-foreground sm:mt-0">
              Results for
              <span className="ml-1 text-foreground">
                {searchParams.get("searchTerm")}
              </span>
            </h1>
            <ul>
              {posts.map((post) => (
                <PostItem key={post._id} post={post} />
              ))}
            </ul>
          </>
        ) : (
          <>
            <h1 className="my-7 text-2xl font-semibold tracking-tight">
              Recent searches
            </h1>
            <ul>
              {recentSearches.map((postName, i) => (
                <li key={i}>{postName}</li>
              ))}
            </ul>
          </>
        )}
      </section>
    </div>
  );
}
