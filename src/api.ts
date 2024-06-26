const BASE_URL = import.meta.env.VITE_API_URL;
import { ApiResponse, LoginResponse, PostsResponse, RefreshTokenResponse } from "./types/api";
import { Post, Comment } from "./types/models";

function isPost(item: Post | Comment): item is Post {
  return (item as Post).title !== undefined;
}

//helper function to format comments and projects with author
export async function formatWithAuthor(
  item: Post | Comment,
): Promise<Post | Comment> {
  try {
    const authorResponse = await fetch(`${BASE_URL}/users/${item.authorId}`);
    const authorData = await authorResponse.json();

    if (!authorData.success) {
      throw new Error("Failed to fetch author details: " + authorData.errors);
    }

    if (isPost(item)) {
      return {
        ...item,
        author: authorData.data.username,
      } as Post;
    } else {
      return {
        ...item,
        author: authorData.data.username,
      } as Comment;
    }
  } catch (error) {
    console.error("Error fetching author details:", error);
    throw error;
  }
}

export async function getPosts(searchParams?: {
  [key: string]: string;
}): Promise<PostsResponse> {
  try {
    const url = new URL(`${BASE_URL}/posts`);
    if (searchParams) {
      Object.keys(searchParams).forEach((key) =>
        url.searchParams.append(key, searchParams[key]),
      );
    }

    const response = await fetch(url.toString());
    const postsData = await response.json();

    if (!postsData.success) {
      throw new Error("Failed to fetch posts: " + postsData.errors);
    }

    // Destructure data and meta from postsData.data
    const { data, meta } = postsData;

    // Fetch the author's name for each post
    const postsWithAuthors = await Promise.all(data.map(formatWithAuthor));

    return {
      data: postsWithAuthors as Post[],
      meta,
    };
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
}

// Function to fetch a single post by its postId
export async function getPost(postId: string): Promise<Post> {
  try {
    // Fetch the post data from your API
    const response = await fetch(`${BASE_URL}/posts/${postId}`);
    const postData: ApiResponse<Post> = await response.json();

    if (!postData.success) {
      throw new Error("Failed to fetch post: " + postData.errors);
    }
    // Use formatWithAuthor to fetch the author's name
    const postWithAuthor = await formatWithAuthor(postData.data);

    return postWithAuthor as Post;
  } catch (error) {
    console.error("Error fetching post:", error);
    throw error; // Re-throw the error for the caller to handle
  }
}

// Function to get all comments for a post
export async function getPostComments(
  postId: string,
): Promise<Comment[] | null> {
  // Fetch the list of blog comments from your API
  try {
    const response = await fetch(`${BASE_URL}/posts/${postId}/comments`);
    const commentsData: ApiResponse<Comment[]> = await response.json();
    if (!commentsData.success) {
      throw new Error("Failed to fetch comments: " + commentsData.errors);
    }
    // Fetch the author's name for each comment
    const commentsWithAuthors = await Promise.all(
      commentsData.data.map(formatWithAuthor),
    );
    return commentsWithAuthors as Comment[];
  } catch (error) {
    console.error("Error fetching comments:", error);
    return null;
  }
}

export async function login(
  username: string,
  password: string,
): Promise<LoginResponse> {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ username, password }),
    });
    const data: LoginResponse = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    return data;
  } catch (error) {
    throw new Error((error as Error).message || "An error occurred");
  }
}

export async function refreshToken(): Promise<RefreshTokenResponse> {
  try {
    const response = await fetch(`${BASE_URL}/auth/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data: RefreshTokenResponse = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Can't refresh Token");
    }
    return data;
  } catch (error) {
    throw new Error((error as Error).message || "An error occurred");
  }
}

export async function postComment(
  postId: string,
  comment: Partial<Comment>,
): Promise<Comment> {
  const accessToken = localStorage.getItem("accessToken");
  const response = await fetch(`${BASE_URL}/posts/${postId}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(comment),
  });
  const data: ApiResponse<Comment> = await response.json();
  return data.data;
}

export async function updateComment(
  commentId: string,
  content: Partial<Comment>,
): Promise<Comment> {
  const accessToken = localStorage.getItem("accessToken");
  try {
    const response = await fetch(`${BASE_URL}/comments/${commentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(content),
    });
    const data: ApiResponse<Comment> = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error Updating comment:", error);
    throw error;
  }
}

export async function deleteComment(commentId: string) {
  const accessToken = localStorage.getItem("accessToken");
  try {
    const response = await fetch(`${BASE_URL}/comments/${commentId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (response.status === 204) {
      return true;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.error);
    }
  } catch (error) {
    console.error("Error deleting comment:", error);
  }
}

export async function toggleLikePost(postId: string): Promise<Post> {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(`${BASE_URL}/posts/${postId}/toggle-like`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to toggle like");
  }

  const updatedPost: ApiResponse<Post> = await response.json();
  return updatedPost.data;
}

export async function toggleLikeComment(commentId: string): Promise<Comment> {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(
    `${BASE_URL}/comments/${commentId}/toggle-like`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to toggle like");
  }

  const updatedComment: ApiResponse<Comment> = await response.json();
  return updatedComment.data;
}
