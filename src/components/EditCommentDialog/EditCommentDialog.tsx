import { DialogDescription } from "@radix-ui/react-dialog";
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";

export default function EditCommentDialog() {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit Comment</DialogTitle>
        <DialogDescription>
          This action cannot be undone. Are you sure you want to permanently
          delete this file from our servers?
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button type="submit">Confirm</Button>
      </DialogFooter>
    </DialogContent>
  );
}