import { Post } from "../../types/models";

interface postProps {
  post: Post;
}

export default function PostDetails({ post }: postProps) {
  return (
    <>
      <h2 className="text-5xl">{post.title}</h2>
      <div className="flex font-medium text-muted-foreground mb-4">
        <p className="pr-4 border-r">{post.author}</p>
        <p className="pl-4">
          {new Date(post.createdAt).toLocaleDateString()}
        </p>
      </div>
      <div
        className="bg-secondary px-8 py-4 border rounded-md"
        dangerouslySetInnerHTML={{ __html: post.content }}
      ></div>
    </>
  );
}
