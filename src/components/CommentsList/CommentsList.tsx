import { Comment } from "../../types/models";
import styles from "./CommentsList.module.css";

interface commentListProps {
  comments: Comment[];
}

export default function CommentsList({ comments }: commentListProps) {
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
