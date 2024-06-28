import { Post } from "../types/models";
import { FaRegComment } from "react-icons/fa";
import { Badge } from "./ui/badge";
import Prism from "prismjs";
import { AiOutlineLike } from "react-icons/ai";
import { useEffect, useState } from "react";
import { toggleLikePost } from "@/api";
import { cn } from "@/lib/utils";
import useAuth from "@/contexts/useAuth";
import { Separator } from "./ui/separator";

interface postProps {
  post: Post;
  commentCount: number;
}

export default function PostDetails({ post, commentCount }: postProps) {
  const { user, checkTokenExpiration } = useAuth();
  const [likes, setLikes] = useState(post.likes.length);
  const [userLiked, setUserLiked] = useState(
    user ? post.likes.includes(user.userId) : false,
  ); // Check if user has liked

  const handleToggleLike = async () => {
    try {
      await checkTokenExpiration();
      const updatedPost = await toggleLikePost(post._id);
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
      <Separator />
      <div className="flex w-full justify-between p-4">
        <div className="flex select-none gap-8 text-muted-foreground">
          <span
            className={cn(
              "flex cursor-pointer items-center gap-1 leading-none hover:text-foreground",
              {
                "font-medium text-foreground": userLiked,
              },
            )}
          >
            <AiOutlineLike className="h-5 w-5" onClick={handleToggleLike} />
            <span className="">{likes}</span>
          </span>
          <a
            href="#comments"
            className="flex cursor-pointer items-center gap-1 leading-none hover:text-foreground"
          >
            <FaRegComment className="" />
            <span className="">{commentCount}</span>
          </a>
        </div>
        <div>
          <span className="space-x-2">
            {post.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </span>
        </div>
      </div>
      <Separator />
      <div
        className="post-content mt-8 text-lg tracking-tight"
        dangerouslySetInnerHTML={{ __html: post.content }}
      ></div>
    </>
  );
}
