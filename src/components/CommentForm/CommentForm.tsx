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
    <form
      onSubmit={handlePostComment}
      className="flex w-full flex-col items-end gap-2 rounded-md border ring-offset-background has-[:focus]:ring-2 has-[:focus]:ring-ring has-[:focus]:ring-offset-0"
    >
      <Textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        required
        placeholder="Add a comment..."
        className="border-none focus-visible:ring-0 focus-visible:ring-offset-0 min-h-10 focus:h-20"
      />
      <Button type="submit" className="mb-2 mr-2">
        Post Comment
      </Button>
    </form>
  );
}
