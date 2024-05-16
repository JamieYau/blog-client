import PropTypes from "prop-types";
import styles from "./CommentsList.module.css";

export default function CommentsList({ comments }) {
  return (
    <ul className={styles.comments}>
      {comments.map((comment) => (
        <li key={comment._id} className={styles.comment}>
          <p className={styles.commentAuthor}>{comment.author}</p>
          <p className={styles.commentCreatedAt}>
            {new Date(comment.createdAt).toLocaleDateString()}
          </p>
          <p className={styles.commentContent}>{comment.content}</p>
        </li>
      ))}
    </ul>
  );
}

CommentsList.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    })
  ).isRequired,
};
