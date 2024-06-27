import { Post } from "../../types/models";
import { FaRegComment } from "react-icons/fa";
import { Badge } from "../ui/badge";
import Prism from "prismjs";
import { AiOutlineLike } from "react-icons/ai";
import { useEffect, useState } from "react";
import { toggleLike } from "@/api";
import { cn } from "@/lib/utils";
import useAuth from "@/contexts/useAuth";

interface postProps {
  post: Post;
  commentCount: number;
}

export default function PostDetails({ post, commentCount }: postProps) {
  const { user } = useAuth();
  const [likes, setLikes] = useState(post.likes.length);
  const [userLiked, setUserLiked] = useState(
    user ? post.likes.includes(user.userId) : false,
  ); // Check if user has liked

  const handleToggleLike = async () => {
    try {
      const updatedPost = await toggleLike(post._id);
      setLikes(updatedPost.likes.length);
      setUserLiked(user ? updatedPost.likes.includes(user.userId) : false); // Update user like status
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  useEffect(() => {
    Prism.highlightAll();
  }, [post.content]);

  return (
    <>
      <img src={post.coverImageUrl} alt="" />
      <h1 className="my-8 text-5xl font-bold">{post.title}</h1>
      <div className="flex pb-8 font-medium text-muted-foreground">
        <p className="border-r pr-4">{post.author}</p>
        <p className="pl-4">{new Date(post.createdAt).toLocaleDateString()}</p>
      </div>
      <div className="flex w-full justify-between border-y p-4">
        <div className="flex select-none gap-8 text-muted-foreground">
          <span
            className={cn("flex items-center gap-1 leading-none", {
              "font-medium text-foreground": userLiked,
            })}
          >
            <AiOutlineLike
              className="h-5 w-5 cursor-pointer"
              onClick={handleToggleLike}
            />
            <span className="cursor-default hover:text-foreground">
              {likes}
            </span>
          </span>
          <span className="flex items-center gap-1 leading-none">
            <FaRegComment className="cursor-pointer hover:text-foreground" />
            <span className="cursor-default hover:text-foreground">
              {commentCount}
            </span>
          </span>
        </div>
        <div>
          <span className="space-x-2">
            {post.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </span>
        </div>
      </div>
      <div
        className="post-content mt-8 text-lg tracking-tight"
        dangerouslySetInnerHTML={{ __html: post.content }}
      ></div>
    </>
  );
}
