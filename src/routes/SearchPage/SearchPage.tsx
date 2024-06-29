import { getPosts } from "@/api";
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

  //use effect for /search with no params, will give suggestions
  //   useEffect(() => {
  //     const fetchPosts = async () => {
  //       try {
  //         const posts = searchQuery
  //           ? await getPosts({ searchTerm: searchQuery })
  //           : await getPosts();
  //         setPosts(posts);
  //       } catch (error) {
  //         console.error("Error fetching posts:", error);
  //       }
  //     };
  //     fetchPosts();
  //   }, [searchQuery]);

  const handleSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchParams({ searchTerm: searchQuery });
    try {
      const posts = searchQuery
        ? await getPosts({ searchTerm: searchQuery })
        : await getPosts();
      setPosts(posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
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
        {searchQuery ? (
          <>
            <h1 className="text-muted-foreground">
              Results for
              <span className="text-foreground">
                {searchParams.get("searchTerm")}
              </span>
            </h1>
            <ul>
              {posts.map((post) => (
                <li key={post._id}>{post.title}</li>
              ))}
            </ul>
          </>
        ) : (
          <div>Recent Searches</div>
        )}
      </section>
    </div>
  );
}
