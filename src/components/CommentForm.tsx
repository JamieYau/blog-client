import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

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
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => {
    // Delay to allow submit button click
    setTimeout(() => setIsFocused(false), 100);
  };

  const handleCancel = () => {
    setIsFocused(false); // Remove focus
  };
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
        className="min-h-8 border-none focus:h-20 focus-visible:ring-0 focus-visible:ring-offset-0"
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <div className="flex gap-2">
        {isFocused && (
          <Button
            variant={"ghost"}
            className="mb-2 mr-2"
            onClick={handleCancel}
          >
            Cancel
          </Button>
        )}
        <Button type="submit" className="mb-2 mr-2">
          Publish
        </Button>
      </div>
    </form>
  );
}
