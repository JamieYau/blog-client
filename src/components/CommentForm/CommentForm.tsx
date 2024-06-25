import styles from "./CommentForm.module.css";

interface CommentFormProps {
  newComment: string;
  setNewComment: React.Dispatch<React.SetStateAction<string>>;
  handlePostComment: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function CommentForm({
  newComment,
  setNewComment,
  handlePostComment,
}: CommentFormProps) {
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
