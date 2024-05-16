import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./PostItem.module.css";

export default function PostItem({ post }) {
  const formattedDate = new Date(post.createdAt).toLocaleDateString();
  const truncatedContent =
    post.content.length > 100
      ? post.content.substring(0, 100) + "..."
      : post.content;

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

// Prop types validation
PostItem.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};
