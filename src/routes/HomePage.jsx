import { useLoaderData, Link } from "react-router-dom";
import { getPosts } from "../api"

export default function HomePage() {
  const posts = useLoaderData();

  return (
    <div className="Home">
      <h2>Blog Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            <Link to={`/posts/${post._id}`}>{post.title}</Link> by {post.author}
          </li>
        ))}
      </ul>
    </div>
  );
}

// loader function
export async function loader () {
  const posts = await getPosts(); // Fetch posts data from your API
  return posts;
}
