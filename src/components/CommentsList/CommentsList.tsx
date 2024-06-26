import { Comment } from "../../types/models";

interface commentListProps {
  comments: Comment[];
}

export default function CommentsList({ comments }: commentListProps) {
  return (
    <ul className="flex flex-col gap-4 pt-4">
      {comments.map((comment) => (
        <li key={comment._id} className="rounded-md bg-secondary p-4 border">
          <p className="text-base font-bold leading-none">{comment.author}</p>
          <p className="text-sm">
            {new Date(comment.createdAt).toLocaleDateString()}
          </p>
          <p className="mt-1">{comment.content}</p>
        </li>
      ))}
    </ul>
  );
}
