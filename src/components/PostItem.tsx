import { Link } from "react-router-dom";
import { Post } from "@/types/models";
import placeholder from "/placeholder.jpg";
import { Badge } from "@/components/ui/badge";

interface PostItemProps {
  post: Post;
}

export default function PostItem({ post }: PostItemProps) {
  const formattedDate = new Date(post.createdAt).toLocaleDateString();

  return (
    <li className="pb-4">
      <Link to={`/posts/${post._id}`} className="flex flex-col gap-4 h-full">
        <img
          src={post.coverImageUrl || placeholder}
          className="aspect-[5/3] w-full object-cover md:aspect-[4/3]"
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
          <div className="flex justify-between items-end flex-1">
            <p className="color-muted-foreground text-sm">
              {formattedDate}
            </p>
            <span className="space-x-2">
              {post.tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
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
