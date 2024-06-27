import { Comment } from "../../types/models";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import CommentDropdown from "../CommentDropdown/CommentDropdown";
import useAuth from "@/contexts/useAuth";

interface commentListProps {
  comments: Comment[];
}

export default function CommentsList({ comments }: commentListProps) {
  const { user } = useAuth();
  return (
    <ul className="flex flex-col gap-4 pt-4">
      {comments.map((comment) => (
        <li key={comment._id}>
          <Card>
            <CardHeader className="pb-0">
              <div className="flex justify-between">
                <p className="text-base font-semibold leading-none">
                  {comment.author}
                </p>
                {user?.userId === comment.authorId && <CommentDropdown comment={comment}/>}
              </div>
              <p className="text-sm text-muted-foreground">
                {new Date(comment.createdAt).toLocaleDateString()}
              </p>
            </CardHeader>
            <CardContent>
              <p className="mt-1">{comment.content}</p>
            </CardContent>
          </Card>
        </li>
      ))}
    </ul>
  );
}
