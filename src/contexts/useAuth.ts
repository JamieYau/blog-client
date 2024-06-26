import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { AuthContextType } from "../types/auth";

export default function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
