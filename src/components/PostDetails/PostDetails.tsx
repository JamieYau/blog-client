import { Post } from "../../types/models";
import { FaRegComment } from "react-icons/fa";
import { Badge } from "../ui/badge";
import Prism from "prismjs";
import { useEffect } from "react";

interface postProps {
  post: Post;
  commentCount: number;
}

export default function PostDetails({ post, commentCount }: postProps) {
   useEffect(() => {
     Prism.highlightAll();
   }, [post.content]);

  return (
    <>
    <img src={post.coverImageUrl} alt="" />
      <h1 className="my-8 text-5xl font-bold">{post.title}</h1>
      <div className="flex pb-8 font-medium text-muted-foreground">
        <p className="border-r pr-4">{post.author}</p>
        <p className="pl-4">{new Date(post.createdAt).toLocaleDateString()}</p>
      </div>
      <div className="flex w-full justify-between border-y py-4">
        <span className="flex items-center gap-1 leading-none text-muted-foreground">
          <FaRegComment />
          {commentCount}
        </span>
        <span className="space-x-2">
          {post.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </span>
      </div>
      <div
        className="post-content mt-8 text-lg tracking-tight"
        dangerouslySetInnerHTML={{ __html: post.content }}
      ></div>
    </>
  );
}
