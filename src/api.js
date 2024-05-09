export async function getPosts() {
  let posts;
  // Fetch the list of blog posts from your API
  try {
    const response = await fetch("http://localhost:3000/api/posts");
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }
    const data = await response.json();
    posts = data.data; // Assuming the response contains an array of posts

    // Fetch the author's name for each post
    const postsWithAuthors = await Promise.all(
      data.data.map(async (post) => {
        const authorResponse = await fetch(
          `http://localhost:3000/api/users/${post.authorId}`
        );
        if (!authorResponse.ok) {
          throw new Error("Failed to fetch author details");
        }
        const authorData = await authorResponse.json();
        return {
          ...post,
          author: authorData.data.username, // Assuming the response contains the author's username
        };
      })
    );
    posts = postsWithAuthors;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return null;
  }
  return posts;
}

// Function to fetch a single post by its postId
export async function getPost(postId) {
  try {
    const response = await fetch(`http://localhost:3000/api/posts/${postId}`);
    const data = await response.json();
    const post = data.data;
    if (data.success) {
      return post; // Return the post data if successful
    } else {
      throw new Error("Failed to fetch post: " + data.error);
    }
  } catch (error) {
    console.error("Error fetching post:", error);
    throw error; // Re-throw the error for the caller to handle
  }
}
