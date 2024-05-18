import { useLoaderData } from "react-router-dom";
import PostItem from "../../components/PostItem/PostItem";
import styles from "./HomePage.module.css";

export default function HomePage() {
  const posts = useLoaderData();

  return (
    <div className={styles.homePage}>
      <h2 className={styles.header}>Blog Posts</h2>
      <ul className={styles.postList}>
        {posts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </ul>
    </div>
  );
}
