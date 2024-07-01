import { getPosts } from "@/api";

export default async function homePageLoader() {
  try {
    const response = await getPosts();
    return response;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
}
