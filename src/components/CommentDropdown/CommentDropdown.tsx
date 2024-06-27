import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoEllipsisVertical } from "react-icons/io5";
import { Dialog, DialogTrigger } from "../ui/dialog";
import EditCommentDialog from "../EditCommentDialog/EditCommentDialog";
import { Comment } from "@/types/models";
import { useState } from "react";

interface commentProps {
  comment: Comment;
  onUpdateComment: (updatedComment: Comment) => void;
}

export default function CommentDropdown({
  comment,
  onUpdateComment,
}: commentProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleClose = () => setIsDialogOpen(false);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <IoEllipsisVertical className="cursor-pointer" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DialogTrigger asChild>
            <DropdownMenuItem onSelect={() => setIsDialogOpen(true)}>
              Edit
            </DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuItem>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <EditCommentDialog
        comment={comment}
        onUpdateComment={onUpdateComment}
        onClose={handleClose}
      />
    </Dialog>
  );
}
