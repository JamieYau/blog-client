import { useState } from "react";
import { useLoaderData, redirect, Link } from "react-router-dom";
import { postComment, formatWithAuthor } from "../../api";
import styles from "./PostPage.module.css";
import PostDetails from "../../components/PostDetails/PostDetails";
import CommentsList from "../../components/CommentsList/CommentsList";
import CommentForm from "../../components/CommentForm/CommentForm";
import { Comment, Post } from "../../types/models";

interface PostPageLoaderData {
  post: Post;
  comments: Comment[];
}

export default function PostPage() {
  const { post, comments: initialComments } = useLoaderData() as PostPageLoaderData;
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState<string>("");
  const accessToken = localStorage.getItem("accessToken");

  const handlePostComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!accessToken) {
      return redirect("/login");
    }
    try {
      const comment = await postComment(post._id, { content: newComment });
      const formattedComment = await formatWithAuthor(comment) as Comment;
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

        {accessToken ? (
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
