import { Link } from "react-router-dom";
import { Post } from "../../types/models";
import styles from "./PostItem.module.css";

interface PostItemProps {
  post: Post;
}

// Utility function to strip HTML tags and extract text content
const stripHtmlTags = (html: string) => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};

export default function PostItem({ post }: PostItemProps) {
  const formattedDate = new Date(post.createdAt).toLocaleDateString();
  const truncatedContent =
    stripHtmlTags(post.content).length > 100
      ? stripHtmlTags(post.content).substring(0, 100) + "..."
      : stripHtmlTags(post.content);

  return (
    <li className={styles.postItem}>
      <Link to={`/posts/${post._id}`}>
        <h3 className={styles.postTitle}>{post.title}</h3>
        <p className={styles.postContent}>{truncatedContent}</p>
        <p className={styles.postAuthor}>
          <span>by </span>
          {post.author}
        </p>
        <p className={styles.postDate}>{formattedDate}</p>
      </Link>
    </li>
  );
}
