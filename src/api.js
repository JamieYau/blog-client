const BASE_URL = import.meta.env.VITE_API_URL;

//helper function to format comments and projects with author
export async function formatWithAuthor(item) {
  try {
    const authorResponse = await fetch(`${BASE_URL}/users/${item.authorId}`);
    const authorData = await authorResponse.json();

    if (!authorData.success) {
      throw new Error("Failed to fetch author details: " + authorData.errors);
    }

    return {
      ...item,
      author: authorData.data.username,
    };
  } catch (error) {
    console.error("Error fetching author details:", error);
    throw error;
  }
}

export async function getPosts() {
  // Fetch the list of blog posts from your API
  try {
    const response = await fetch(`${BASE_URL}/posts`);
    const postsData = await response.json();
    if (!postsData.success) {
      throw new Error("Failed to fetch post: " + postsData.errors);
    }
    // Fetch the author's name for each post
    const postsWithAuthors = await Promise.all(
      postsData.data.map(formatWithAuthor)
    );
    return postsWithAuthors;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return null;
  }
}

// Function to fetch a single post by its postId
export async function getPost(postId) {
  try {
    // Fetch the post data from your API
    const response = await fetch(`${BASE_URL}/posts/${postId}`);
    const postData = await response.json();

    if (!postData.success) {
      throw new Error("Failed to fetch post: " + postData.errors);
    }
    // Use formatWithAuthor to fetch the author's name
    const postWithAuthor = await formatWithAuthor(postData.data);

    return postWithAuthor;
  } catch (error) {
    console.error("Error fetching post:", error);
    throw error; // Re-throw the error for the caller to handle
  }
}


// Function to get all comments for a post
export async function getPostComments(postId) {
  // Fetch the list of blog comments from your API
  try {
    const response = await fetch(`${BASE_URL}/posts/${postId}/comments`);
    const commentsData = await response.json();
    if (!commentsData.success) {
      throw new Error("Failed to fetch comments: " + commentsData.errors);
    }
    // Fetch the author's name for each comment
    const commentsWithAuthors = await Promise.all(
      commentsData.data.map(formatWithAuthor)
    );
    return commentsWithAuthors;
  } catch (error) {
    console.error("Error fetching comments:", error);
    return null;
  }
}

export async function login(username, password) {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    return data;
  } catch (error) {
    throw new Error(error.message || "An error occurred");
  }
}

export async function refreshToken() {
  try {
    const response = await fetch(`${BASE_URL}/auth/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Can't refresh Token");
    }
    return data;
  } catch (error) {
    throw new Error(error.message || "An error occurred");
  }
}

export async function postComment(postId, comment) {
  const accessToken = localStorage.getItem("accessToken");
  const response = await fetch(`${BASE_URL}/posts/${postId}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(comment),
  });
  return response.json();
}
