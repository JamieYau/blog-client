import { Post } from "../../types/models";
import styles from "./PostDetails.module.css";

interface postProps {
  post: Post;
}

export default function PostDetails({ post }: postProps) {
  return (
    <>
      <h2 className={styles.postTitle}>{post.title}</h2>
      <div className={styles.postDetails}>
        <p className={styles.postAuthor}>{post.author}</p>
        <p className={styles.postCreatedAt}>
          {new Date(post.createdAt).toLocaleDateString()}
        </p>
      </div>
      <div
        className={styles.postContent}
        dangerouslySetInnerHTML={{ __html: post.content }}
      ></div>
    </>
  );
}