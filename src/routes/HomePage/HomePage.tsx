import { Link, useLoaderData } from "react-router-dom";
import PostItem from "../../components/PostItem";
import { PostsResponse } from "@/types/api";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function HomePage() {
  const { data: posts, meta } = useLoaderData() as PostsResponse;
  if (!posts) {
    // Handle case where posts is not yet loaded or is null
    return null; // or loading indicator or error message
  }
  return (
    <section className="flex flex-col">
      <h1 className="mb-10 w-full border-b pb-8 text-center text-4xl font-semibold">
        Recent Posts
      </h1>
      <ul className="flex flex-col gap-8 md:grid md:grid-cols-6">
        {posts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </ul>

      {meta.totalPages > 1 && (
        <div className="mt-4 flex justify-center">
          <Link to="/search?searchTerm=a" className={cn(buttonVariants({ variant: "outline" }), "border-primary rounded-full tracking-tight font-normal")}>
            See more posts
          </Link>
        </div>
      )}
    </section>
  );
}
