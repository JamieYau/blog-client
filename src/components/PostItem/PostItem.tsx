import { Link } from "react-router-dom";
import { Post } from "../../types/models";

interface PostItemProps {
  post: Post;
}

// Utility function to strip HTML tags and extract text content
const stripHtmlTags = (html: string) => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};

export default function PostItem({ post }: PostItemProps) {
  const formattedDate = new Date(post.createdAt).toLocaleDateString();
  const truncatedContent =
    stripHtmlTags(post.content).length > 100
      ? stripHtmlTags(post.content).substring(0, 100) + "..."
      : stripHtmlTags(post.content);

  return (
    <li className="rounded-md border bg-secondary p-4">
      <Link to={`/posts/${post._id}`}>
        <h3 className="mb-2 text-2xl">{post.title}</h3>
        <p className="">{truncatedContent}</p>
        <p className="mb-4 italic">
          <span>by </span>
          {post.author}
        </p>
        <p className="color-muted-foreground text-xs">{formattedDate}</p>
      </Link>
    </li>
  );
}
