import { Link } from "react-router-dom";
import { Post } from "../../types/models";
import placeholder from "/placeholder.jpg";
import { Badge } from "../ui/badge";

interface PostItemProps {
  post: Post;
}

export default function PostItem({ post }: PostItemProps) {
  const formattedDate = new Date(post.createdAt).toLocaleDateString();
  const truncatedContent =
    stripHtmlTags(post.content).length > 100
      ? stripHtmlTags(post.content).substring(0, 100) + "..."
      : stripHtmlTags(post.content);

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
        <div className="flex min-h-full w-full flex-col">
          <h2 className="mb-2 text-2xl font-bold">{post.title}</h2>
          <p className="color-muted-foreground text-sm mb-1">{formattedDate}</p>
          <span className="mb-4 space-x-2">
            {post.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </span>
          <p className="mb-1 flex-1 tracking-tight">{truncatedContent}</p>
          <p className="w-full text-end font-medium leading-none">
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
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};
