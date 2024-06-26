import { getPosts } from "../../api";

export default async function homePageLoader() {
  try {
    const posts = await getPosts();
    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
}
