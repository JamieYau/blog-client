import Post from "@/types/models"

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  errors?: string;
}

export interface PostsResponse {
  data: Post[];
  meta: {
    totalPosts: number;
    currentPage: number;
    totalPages: number;
  };
}

export interface LoginResponse {
  success: boolean;
  accessToken: string;
  userId: string;
  isAdmin: boolean;
  message?: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  message?: string;
}