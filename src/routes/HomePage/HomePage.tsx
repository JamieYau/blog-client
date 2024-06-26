import { useLoaderData } from "react-router-dom";
import PostItem from "../../components/PostItem/PostItem";
import { Post } from "../../types/models";

export default function HomePage() {
  const posts = useLoaderData() as Post[];
  if (!posts) {
    // Handle case where posts is not yet loaded or is null
    return null; // or loading indicator or error message
  }
  return (
    <section className="flex flex-col">
      <h1 className="mb-4 text-4xl">Blog Posts</h1>
      <ul className="flex flex-col gap-4">
        {posts.map((post: Post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </ul>
    </section>
  );
}
