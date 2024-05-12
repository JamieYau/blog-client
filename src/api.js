export async function getPosts() {
  let posts;
  // Fetch the list of blog posts from your API
  try {
    const response = await fetch("http://localhost:3000/api/posts");
    const postsData = await response.json();
    if (!postsData.success) {
      throw new Error("Failed to fetch post: " + postsData.errors);
    }
    posts = postsData.data;

    // Fetch the author's name for each post
    const postsWithAuthors = await Promise.all(
      posts.map(async (post) => {
        const authorResponse = await fetch(
          `http://localhost:3000/api/users/${post.authorId}`
        );
        const authorData = await authorResponse.json();

        if (!authorData.success) {
          throw new Error(
            "Failed to fetch author details for post: " + authorData.errors
          );
        }

        return {
          ...post,
          author: authorData.data.username,
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
    // Fetch the post data from your API
    const response = await fetch(`http://localhost:3000/api/posts/${postId}`);
    const postData = await response.json();

    if (!postData.success) {
      throw new Error("Failed to fetch post: " + postData.errors);
    }

    const post = postData.data;

    // Fetch the author's name for the post
    const authorResponse = await fetch(
      `http://localhost:3000/api/users/${post.authorId}`
    );
    const authorData = await authorResponse.json();

    if (!authorData.success) {
      throw new Error(
        "Failed to fetch author details for post: " + authorData.errors
      );
    }

    const authorName = authorData.data.username;

    // Add the author's name to the post data
    return {
      ...post,
      author: authorName,
    };
  } catch (error) {
    console.error("Error fetching post:", error);
    throw error; // Re-throw the error for the caller to handle
  }
}

// Function to get all comments for a post
export async function getPostComments(postId) {
    let comments;
    // Fetch the list of blog comments from your API
    try {
      const response = await fetch(`http://localhost:3000/api/posts/${postId}/comments`);
      const commentsData = await response.json();
      if (!commentsData.success) {
        throw new Error("Failed to fetch comments: " + commentsData.errors);
      }
      comments = commentsData.data;

      // Fetch the author's name for each comment
      const commentsWithAuthors = await Promise.all(
        comments.map(async (comment) => {
          const authorResponse = await fetch(
            `http://localhost:3000/api/users/${comment.authorId}`
          );
          const authorData = await authorResponse.json();

          if (!authorData.success) {
            throw new Error(
              "Failed to fetch author details for post: " + authorData.errors
            );
          }

          return {
            ...comment,
            author: authorData.data.username,
          };
        })
      );
      comments = commentsWithAuthors;
    } catch (error) {
      console.error("Error fetching comments:", error);
      return null;
    }
    return comments;
}
