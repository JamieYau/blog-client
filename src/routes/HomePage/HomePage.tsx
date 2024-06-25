import { useLoaderData } from "react-router-dom";
import PostItem from "../../components/PostItem/PostItem";
import { Post } from "../../types/models";
import styles from "./HomePage.module.css";

export default function HomePage() {
  const posts = useLoaderData() as Post[];
  if (!posts) {
    // Handle case where posts is not yet loaded or is null
    return null; // or loading indicator or error message
  }
  return (
    <div className={styles.homePage}>
      <h2 className={styles.header}>Blog Posts</h2>
      <ul className={styles.postList}>
        {posts.map((post: Post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </ul>
    </div>
  );
}
