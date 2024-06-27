import { useLoaderData } from "react-router-dom";
import PostItem from "../../components/PostItem/PostItem";
import { Post } from "../../types/models";

export default function HomePage() {
  const posts = useLoaderData() as Post[];
  if (!posts) {
    // Handle case where posts is not yet loaded or is null
    return null; // or loading indicator or error message
  }
  posts.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  return (
    <section className="flex flex-col">
      <h1 className="mb-10 text-4xl w-full text-center font-semibold pb-8 border-b">Blog Posts</h1>
      <ul className="flex flex-col gap-4">
        {posts.map((post: Post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </ul>
    </section>
  );
}
