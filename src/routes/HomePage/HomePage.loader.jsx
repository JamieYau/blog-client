import { getPosts } from "../../api";

export default async function homePageLoader() {
  const posts = await getPosts(); // Fetch posts data from your API
  return posts;
}
