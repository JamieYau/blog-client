import { getPosts } from "@/api";
import PostItem from "@/components/PostItem";
import { Post } from "@/types/models";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("searchTerm") || "",
  );
  const [posts, setPosts] = useState<Post[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // Fetch posts whenever searchParams change
  useEffect(() => {
    (async () => {
      try {
        const posts = searchParams.get("searchTerm")
          ? await getPosts({ searchTerm: searchParams.get("searchTerm") || "" })
          : await getPosts();
        setPosts(posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    })();
  }, [searchParams]);

  const handleSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchParams({ searchTerm: searchQuery });
    setRecentSearches((prev) => [...new Set([searchQuery, ...prev])]);
  };

  return (
    <div className="flex w-full flex-col p-2">
      <form
        onSubmit={handleSearchSubmit}
        className="flex items-center rounded-full border bg-transparent sm:hidden"
      >
        <Search className="mx-3 min-h-6 min-w-6 stroke-[1.5]" />
        <input
          type="text"
          placeholder="Search"
          className="w-full rounded border border-none bg-transparent px-5 py-3 pl-0 outline-none placeholder:text-muted-foreground"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
      </form>
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
