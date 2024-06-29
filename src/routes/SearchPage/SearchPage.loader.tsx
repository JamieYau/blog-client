import { LoaderFunctionArgs } from "react-router-dom";
import { getPosts } from "@/api";

export async function searchPageLoader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const searchTerm = url.searchParams.get("searchTerm") || "";
  const posts = await getPosts({ searchTerm });
  return posts;
}
