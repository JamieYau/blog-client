import { useState } from "react";
import { useLoaderData, redirect, Link } from "react-router-dom";
import { postComment, formatWithAuthor } from "../../api";
import PostDetails from "../../components/PostDetails/PostDetails";
import CommentsList from "../../components/CommentsList/CommentsList";
import CommentForm from "../../components/CommentForm/CommentForm";
import { Comment, Post } from "../../types/models";
import { buttonVariants } from "@/components/ui/button";
import useAuth from "@/contexts/useAuth";

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

  return (
    <div className="flex w-full max-w-2xl flex-col items-center">
      <article className="mb-8 w-full pt-8">
        <PostDetails post={post} commentCount={comments.length} />
      </article>
      <section className="flex w-full flex-col gap-4">
        <h2 className="w-full text-2xl font-medium">Comments</h2>

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

        <CommentsList comments={comments} />
      </section>
    </div>
  );
}
