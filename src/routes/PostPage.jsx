import { useLoaderData } from "react-router-dom";
import { getPost } from "../api";
import styles from "../styles/PostPage.module.css";

export default function PostPage() {
  const { post } = useLoaderData();
  return (
    <div className={styles.postPage}>
      <h2 className={styles.postTitle}>{post.title}</h2>
      <div className={styles.postDetails}>
        <p className={styles.postAuthor}>{post.author}</p>
        <p className={styles.postCreatedAt}>
          {new Date(post.createdAt).toLocaleDateString()}
        </p>
      </div>
      <div className={styles.postContent}>
        <p>{post.content}</p>
      </div>
    </div>
  );
}

// loader function
export async function loader({ params }) {
  const post = await getPost(params.postId); // Fetch posts data from your API
  return { post };
}
