import { Link } from "react-router-dom";
import { Post } from "@/types/models";
import placeholder from "/placeholder.jpg";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/utils/formatDate";
import { Heart } from "lucide-react";
import useAuth from "@/contexts/useAuth";
import { cn } from "@/lib/utils";

interface PostItemProps {
  post: Post;
}

export default function PostItem({ post }: PostItemProps) {
  const { user } = useAuth();
  const formattedDate = formatDate(post.createdAt);
  const userLiked = user ? post.likes.includes(user.userId) : false;

  return (
    <li className="col-span-2 pb-4 [&:nth-child(-n+2)]:col-span-3 [&:nth-child(-n+2)]:mb-8">
      <Link to={`/posts/${post._id}`} className="flex h-full flex-col gap-4">
        <img
          src={post.coverImageUrl || placeholder}
          className="aspect-[5/3] w-full rounded-sm object-cover md:aspect-[4/3]"
        />
        <div className="flex h-full w-full flex-col text-muted-foreground">
          <p className="my-4 flex w-full items-end gap-1 font-medium leading-none">
            <span>by </span>
            {post.author}
          </p>
          <h2 className="mb-2 text-2xl font-bold text-foreground">
            {post.title}
          </h2>
          <p className="mb-4 line-clamp-2 tracking-tight">
            {stripHtmlTags(post.content)}
          </p>
          <div className="flex flex-1 items-end justify-between text-sm">
            <div className="flex items-center gap-3">
              <p className="">{formattedDate}</p>
              <p className="flex items-center gap-1">
                <Heart
                  className={cn("h-4 w-4", {
                    "fill-red-500 text-red-500": userLiked,
                  })}
                />
                <span className="">{post.likes.length}</span>
              </p>
            </div>
            <span className="space-x-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant={"secondary"}>
                  {tag}
                </Badge>
              ))}
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
}

// Utility function to strip HTML tags and extract text content
const stripHtmlTags = (html: string) => {
  let formattedText = "";
  const doc = new DOMParser().parseFromString(html, "text/html");
  if (doc.body.textContent) {
    formattedText = doc.body.textContent.replace("/&nbsp;/g", "");
  }
  return formattedText;
};
