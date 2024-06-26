export interface AuthContextType {
  user: { username: string; userId: string } | null;
  accessToken: string;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  checkTokenExpiration: () => Promise<void>;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}
