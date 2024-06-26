import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

interface CommentFormProps {
  newComment: string;
  setNewComment: React.Dispatch<React.SetStateAction<string>>;
  handlePostComment: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function CommentForm({
  newComment,
  setNewComment,
  handlePostComment,
}: CommentFormProps) {
  return (
    <form onSubmit={handlePostComment} className="flex flex-col items-end gap-2 pb-4 border-b w-full">
      <Textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        required
        placeholder="Add a comment..."
      />
      <Button type="submit">
        Post Comment
      </Button>
    </form>
  );
}
