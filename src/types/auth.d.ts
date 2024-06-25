export interface AuthContextType {
  user: { username: string } | null;
  accessToken: string;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}
