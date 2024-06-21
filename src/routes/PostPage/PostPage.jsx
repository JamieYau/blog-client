import { useState } from "react";
import { useLoaderData, redirect, Link } from "react-router-dom";
import { postComment, formatWithAuthor } from "../../api";
import styles from "./PostPage.module.css";
import PostDetails from "../../components/PostDetails/PostDetails";
import CommentsList from "../../components/CommentsList/CommentsList";
import CommentForm from "../../components/CommentForm/CommentForm";

export default function PostPage() {
  const { post, comments: initialComments } = useLoaderData();
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState("");
  const token = localStorage.getItem("token");

  const handlePostComment = async (e) => {
    e.preventDefault();
    if (!token) {
      return redirect("/login");
    }
    try {
      const response = await postComment(post._id, { content: newComment });
      const newCommentData = response.data;
      const formattedComment = await formatWithAuthor(newCommentData);
      setComments((prevComments) => [...prevComments, formattedComment]);
      setNewComment(""); // Clear the comment form
    } catch (error) {
      console.error("Error posting comment", error);
    }
  };

  return (
    <div className={styles.postPage}>
      <section className={styles.postSection}>
        <PostDetails post={post} />
      </section>
      <section className={styles.commentSection}>
        <h2 className={styles.commentHeader}>Comments</h2>

        {token ? (
          <CommentForm
            newComment={newComment}
            setNewComment={setNewComment}
            handlePostComment={handlePostComment}
          />
        ) : (
          <Link to="/login" className={styles.login}>
            Login to post a comment
          </Link>
        )}

        <CommentsList comments={comments} />
      </section>
    </div>
  );
}
