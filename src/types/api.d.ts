export interface ApiResponse<T> {
  success: boolean;
  data: T;
  errors?: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  message?: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  message?: string;
}