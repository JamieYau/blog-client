import { getPost, getPostComments } from "../../api";
import type { Params } from "react-router-dom";

export default async function postLoader({
  params,
}: {
  params: Params<"postId">;
}) {
  if (!params || !params.postId) {
    throw new Error("postId is undefined or null");
  }
  const post = await getPost(params.postId); // Fetch posts data from your API
  const comments = await getPostComments(params.postId);
  return { post, comments };
}
