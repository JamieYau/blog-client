import { useState } from "react";
import { useLoaderData, redirect, Link } from "react-router-dom";
import { postComment, formatWithAuthor, deleteComment } from "@/api";
import PostDetails from "@/components/PostDetails";
import CommentForm from "@/components/CommentForm";
import { Comment, Post } from "@/types/models";
import { buttonVariants } from "@/components/ui/button";
import useAuth from "@/contexts/useAuth";
import CommentItem from "@/components/Comment";

interface PostPageLoaderData {
  post: Post;
  comments: Comment[];
}

export default function PostPage() {
  const { post, comments: initialComments } =
    useLoaderData() as PostPageLoaderData;
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState<string>("");
  const accessToken = localStorage.getItem("accessToken");
  const { checkTokenExpiration } = useAuth();

  const handlePostComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!accessToken) {
      return redirect("/login");
    }
    await checkTokenExpiration();
    try {
      const comment = await postComment(post._id, { content: newComment });
      const formattedComment = (await formatWithAuthor(comment)) as Comment;
      setComments((prevComments) => [...prevComments, formattedComment]);
      setNewComment(""); // Clear the comment form
    } catch (error) {
      console.error("Error posting comment", error);
    }
  };

  const handleUpdateComment = async (updatedComment: Comment) => {
    const formattedComment = (await formatWithAuthor(
      updatedComment,
    )) as Comment;
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment._id === formattedComment._id ? formattedComment : comment,
      ),
    );
  };

  const handleDeleteComment = async (comment: Comment) => {
    await checkTokenExpiration();
    const response = await deleteComment(comment._id);
    response &&
      setComments((prevComments) =>
        prevComments.filter((c) => c._id !== comment._id),
      );
  };

  return (
    <div className="flex w-full max-w-2xl flex-col items-center">
      <article className="mb-8 w-full pt-8">
        <PostDetails post={post} commentCount={comments.length} />
      </article>
      <section id="comments" className="flex w-full flex-col gap-4">
        <h2 className="w-full text-2xl font-medium">
          Comments <span>{`(${comments.length})`}</span>
        </h2>
        {accessToken ? (
          <CommentForm
            newComment={newComment}
            setNewComment={setNewComment}
            handlePostComment={handlePostComment}
          />
        ) : (
          <Link to="/login" className={buttonVariants({ variant: "default" })}>
            Login to post a comment
          </Link>
        )}
        <ul className="flex flex-col gap-4 pt-4">
          {comments.map((comment) => (
            <CommentItem
              key={comment._id}
              comment={comment}
              onUpdateComment={handleUpdateComment}
              onDeleteComment={handleDeleteComment}
            />
          ))}
        </ul>
      </section>
    </div>
  );
}
