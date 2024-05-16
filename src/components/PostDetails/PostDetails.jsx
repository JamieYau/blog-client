import PropTypes from "prop-types";
import styles from "./PostDetails.module.css";

export default function PostDetails({ post }) {
  return (
    <>
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
    </>
  );
}

PostDetails.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
};
