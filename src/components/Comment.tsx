import { Comment } from "@/types/models";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import CommentDropdown from "./CommentDropdown";
import useAuth from "@/contexts/useAuth";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { toggleLikeComment } from "@/api";
import { Heart } from "lucide-react";

interface commentProps {
  comment: Comment;
  onUpdateComment: (updatedComment: Comment) => void;
  onDeleteComment: (comment: Comment) => void;
}

export default function CommentItem({
  onUpdateComment,
  onDeleteComment,
  comment,
}: commentProps) {
  const { user, checkTokenExpiration } = useAuth();
  const [likes, setLikes] = useState(comment.likes.length);
  const [userLiked, setUserLiked] = useState(
    user ? comment.likes.includes(user.userId) : false,
  ); // Check if user has liked

  const handleToggleLike = async () => {
    try {
      await checkTokenExpiration();
      const updatedComment = await toggleLikeComment(comment._id);
      setLikes(updatedComment.likes.length);
      setUserLiked(user ? updatedComment.likes.includes(user.userId) : false); // Update user like status
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  return (
    <li>
      <Card>
        <CardHeader className="pb-0">
          <div className="flex justify-between">
            <p className="text-base font-semibold leading-none">
              {comment.author}
            </p>
            {user?.userId === comment.authorId && (
              <CommentDropdown
                comment={comment}
                onUpdateComment={onUpdateComment}
                onDeleteComment={onDeleteComment}
              />
            )}
          </div>
          <p className="text-sm text-muted-foreground">
            {new Date(comment.createdAt).toLocaleDateString()}
          </p>
        </CardHeader>
        <CardContent>
          <p className="mt-1">{comment.content}</p>
        </CardContent>
        <CardFooter className="select-none text-muted-foreground">
          <span
            className={cn("flex items-center gap-1 leading-none", {
              "font-medium text-foreground": userLiked,
            })}
          >
            <Heart
              strokeWidth={1.4}
              className={cn("h-5 w-5", {
                "fill-red-500 text-red-500": userLiked,
              })}
              onClick={handleToggleLike}
            />
            <span className="cursor-default hover:text-foreground">
              {likes}
            </span>
          </span>
        </CardFooter>
      </Card>
    </li>
  );
}
