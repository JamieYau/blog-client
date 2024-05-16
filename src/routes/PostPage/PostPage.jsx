import { useState } from "react";
import { useLoaderData, redirect } from "react-router-dom";
import { getPost, getPostComments, postComment } from "../../api";
import styles from "./PostPage.module.css";
import PostDetails from "../../components/PostDetails/PostDetails";
import CommentsList from "../../components/CommentsList/CommentsList";
import CommentForm from "../../components/CommentForm/CommentForm";

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
          <button onClick={() => redirect("/login")}>
            Login to post a comment
          </button>
        )}
        <CommentsList comments={comments} />
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
