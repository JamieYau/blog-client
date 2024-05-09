import { useLoaderData } from "react-router-dom";
import { getPost } from "../api";

export default function PostPage() {
  const { post } = useLoaderData();
  return (
    <div>
      <h2>{post.title}</h2>
      <p>Author: {post.authorId}</p>
      <p>Published: {post.published ? "Yes" : "No"}</p>
      <p>Created At: {new Date(post.createdAt).toLocaleString()}</p>
      <p>Updated At: {new Date(post.updatedAt).toLocaleString()}</p>
      <p>Content: {post.content}</p>
    </div>
  );
}

// loader function
export async function loader({ params }) {
  const post = await getPost(params.postId); // Fetch posts data from your API
  return { post };
}
