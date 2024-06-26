import { Comment } from "../../types/models";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";

interface commentListProps {
  comments: Comment[];
}

export default function CommentsList({ comments }: commentListProps) {
  return (
    <ul className="flex flex-col gap-4 pt-4">
      {comments.map((comment) => (
        <li key={comment._id}>
          <Card>
            <CardHeader className="pb-0">
              <p className="text-base font-semibold leading-none">
                {comment.author}
              </p>
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
