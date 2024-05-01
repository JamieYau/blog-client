import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./PostItem.module.css";

export default function PostItem({ post }) {
  return (
    <li className={styles.postItem}>
      <Link to={`/posts/${post._id}`}>
        <h3 className={styles.postTitle}>{post.title}</h3>
        <p className={styles.postAuthor}>
          <span>by </span>
          {post.author}
        </p>
        <p className={styles.postDate}>
          {new Date(post.createdAt).toLocaleDateString()}
        </p>
      </Link>
    </li>
  );
}

// Prop types validation
PostItem.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};
