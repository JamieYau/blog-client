import PropTypes from "prop-types";
import styles from "./CommentForm.module.css";

export default function CommentForm({
  newComment,
  setNewComment,
  handlePostComment,
}) {
  return (
    <form onSubmit={handlePostComment} className={styles.commentForm}>
      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        className={styles.commentInput}
        required
        placeholder="Add a comment..."
      />
      <button type="submit" className={styles.commentButton}>
        Post Comment
      </button>
    </form>
  );
}

CommentForm.propTypes = {
  newComment: PropTypes.string.isRequired,
  setNewComment: PropTypes.func.isRequired,
  handlePostComment: PropTypes.func.isRequired,
};
