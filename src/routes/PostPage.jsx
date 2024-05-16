import { useState } from "react";
import { useLoaderData, redirect } from "react-router-dom";
import { getPost, getPostComments, postComment } from "../api";
import styles from "../styles/PostPage.module.css";

export default function PostPage() {
  const { post, comments } = useLoaderData();
  const [newComment, setNewComment] = useState("");
  const token = localStorage.getItem("token");

  const handlePostComment = async (e) => {
    e.preventDefault();
    if (!token) {
      return redirect("/login");
    }
    try {
      await postComment(post._id, { content: newComment });
      // Reload comments or handle state update
    } catch (error) {
      console.error("Error posting comment", error);
    }
  };
  return (
    <div className={styles.postPage}>
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
      <section className={styles.commentSection}>
        <h2 className={styles.commentHeader}>Comments</h2>
        {token ? (
          <form onSubmit={handlePostComment} className={styles.commentForm}>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className={styles.commentInput}
              placeholder="Add a comment..."
            />
            <button type="submit" className={styles.commentButton}>
              Post Comment
            </button>
          </form>
        ) : (
          <p>
            <button onClick={() => redirect("/login")}>
              Login to post a comment
            </button>
          </p>
        )}
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
      </section>
    </div>
  );
}

// loader function
export async function loader({ params }) {
  const post = await getPost(params.postId); // Fetch posts data from your API
  const comments = await getPostComments(params.postId);
  return { post, comments };
}
