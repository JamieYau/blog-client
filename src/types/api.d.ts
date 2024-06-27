export interface ApiResponse<T> {
  success: boolean;
  data: T;
  errors?: string;
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