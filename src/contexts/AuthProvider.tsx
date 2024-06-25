import { createContext, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { login as apiLogin, refreshToken as apiRefreshToken } from "../api";
import { AuthContextType, AuthProviderProps } from "../types/auth";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<{ username: string; } | null>(
    JSON.parse(localStorage.getItem("user") as string) || null
  );
  const [accessToken, setAccessToken] = useState<string>(
    localStorage.getItem("accessToken") || ""
  );
  const navigate = useNavigate();

  const checkTokenExpiration = useCallback(async () => {
    if (accessToken) {
      const decodedToken: { exp: number; } = jwtDecode(accessToken);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        try {
          const response = await apiRefreshToken();
          setAccessToken(response.accessToken);
          localStorage.setItem("accessToken", response.accessToken);
        } catch (error) {
          console.error("Failed to refresh accessToken", error);
          alert("Session timed out");
          logout();
        }
      }
    }
  }, [accessToken]);

  useEffect(() => {
    const interval = setInterval(checkTokenExpiration, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [checkTokenExpiration]);

  const login = async (username: string, password: string) => {
    try {
      const response = await apiLogin(username, password);
      setUser({ username });
      setAccessToken(response.accessToken);
      localStorage.setItem("user", JSON.stringify({ username }));
      localStorage.setItem("accessToken", response.accessToken);
      if (window.history?.length && window.history.length > 1) {
        navigate(-1);
      } else {
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setAccessToken("");
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
