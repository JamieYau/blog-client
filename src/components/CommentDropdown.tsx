import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { IoEllipsisVertical } from "react-icons/io5";
import EditCommentDialog from "./EditCommentDialog";
import { Comment } from "@/types/models";
import { useState } from "react";
import DeleteCommentDialog from "./DeleteCommentDialog";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface commentProps {
  comment: Comment;
  onUpdateComment: (updatedComment: Comment) => void;
  onDeleteComment: (comment: Comment) => void;
}

export default function CommentDropdown({
  comment,
  onUpdateComment,
  onDeleteComment,
}: commentProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const handleEditClose = () => setIsEditDialogOpen(false);

  return (
    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
      <AlertDialog>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <IoEllipsisVertical className="cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DialogTrigger asChild>
              <DropdownMenuItem onSelect={() => setIsEditDialogOpen(true)}>
                Edit
              </DropdownMenuItem>
            </DialogTrigger>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>
        <EditCommentDialog
          comment={comment}
          onUpdateComment={onUpdateComment}
          onClose={handleEditClose}
        />
        <DeleteCommentDialog
          comment={comment}
          onDeleteComment={onDeleteComment}
        />
      </AlertDialog>
    </Dialog>
  );
}
