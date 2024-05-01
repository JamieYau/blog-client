import { useLoaderData } from "react-router-dom";
import { getPosts } from "../api";
import PostItem from "../components/PostItem";

export default function HomePage() {
  const posts = useLoaderData();

  return (
    <div className="Home">
      <h2>Blog Posts</h2>
      <ul>
        {posts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </ul>
    </div>
  );
}

// loader function
export async function loader() {
  const posts = await getPosts(); // Fetch posts data from your API
  return posts;
}
