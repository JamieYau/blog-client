import { LoaderFunctionArgs } from "react-router-dom";
import { getPosts } from "@/api";

export async function searchPageLoader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const searchTerm = url.searchParams.get("searchTerm") || "";
  const limit = url.searchParams.get("limit") || "8";
  const page = url.searchParams.get("page") || "1";
  const order = url.searchParams.get("order") || "desc";
  const response = await getPosts({
    searchTerm,
    limit,
    page,
    order,
  });

  return response;
}
