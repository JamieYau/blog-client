import { DialogDescription } from "@radix-ui/react-dialog";
import { DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Comment } from "@/types/models";
import { updateComment } from "@/api";
import { redirect } from "react-router-dom";
import useAuth from "@/contexts/useAuth";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "../ui/textarea";

interface commentProps {
  comment: Comment;
  onUpdateComment: (updatedComment: Comment) => void;
  onClose: () => void;
}

const formSchema = z.object({
  comment: z.string().min(2, {
    message: "message must be at least 2 characters",
  }),
});

export default function EditCommentDialog({
  comment,
  onUpdateComment,
  onClose,
}: commentProps) {
  const { checkTokenExpiration } = useAuth();
  const accessToken = localStorage.getItem("accessToken");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: comment.content,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!accessToken) {
      return redirect("/login");
    }
    await checkTokenExpiration();
    try {
      const updatedComment = await updateComment(comment._id, {
        content: values.comment,
      });
      onUpdateComment(updatedComment);
      onClose();
    } catch (error) {
      console.error("Error posting comment", error);
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit Comment</DialogTitle>
        <DialogDescription>
          Make changes to your comment here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex w-full justify-end">
            <Button type="submit">Save</Button>
          </div>
        </form>
      </Form>
    </DialogContent>
  );
}
