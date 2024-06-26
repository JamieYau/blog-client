import { Link } from "react-router-dom";
import { Post } from "../../types/models";
import placeholder from "/placeholder.jpg";
import { Badge } from "../ui/badge";

interface PostItemProps {
  post: Post;
}

export default function PostItem({ post }: PostItemProps) {
  const formattedDate = new Date(post.createdAt).toLocaleDateString();

  return (
    <li className="border-b pb-4">
      <Link
        to={`/posts/${post._id}`}
        className="flex flex-col gap-4 md:flex-row"
      >
        <img
          src={post.coverImageUrl || placeholder}
          className="aspect-[4/3] w-full max-w-lg object-cover"
        />
        <div className="flex min-h-full w-full flex-col text-muted-foreground">
          <h2 className="mb-2 text-2xl font-bold text-foreground">
            {post.title}
          </h2>
          <p className="color-muted-foreground mb-1 text-sm">{formattedDate}</p>
          <span className="mb-4 space-x-2">
            {post.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </span>
          <p className="mb-1 line-clamp-4 tracking-tight">
            {stripHtmlTags(post.content)}
          </p>
          <p className="flex w-full flex-1 items-end justify-end font-medium leading-none gap-1">
            <span>by </span>
            {post.author}
          </p>
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
