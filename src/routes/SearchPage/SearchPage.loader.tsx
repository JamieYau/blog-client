import { LoaderFunctionArgs } from "react-router-dom";
import { getPosts } from "@/api";

export async function searchPageLoader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const searchTerm = url.searchParams.get("searchTerm") || "";
  const order = url.searchParams.get("order") || "desc";
  const posts = await getPosts({ searchTerm, order });
  return posts;
}
