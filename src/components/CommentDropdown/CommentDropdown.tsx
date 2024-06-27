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

interface commentProps {
  comment: Comment;
}

export default function CommentDropdown({ comment }: commentProps) {
  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <IoEllipsisVertical className="cursor-pointer" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DialogTrigger asChild>
            <DropdownMenuItem>Edit</DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuItem>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <EditCommentDialog comment={comment} />
    </Dialog>
  );
}
