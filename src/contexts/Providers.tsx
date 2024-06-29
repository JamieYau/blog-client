import React from "react";
import AuthProvider from "./AuthProvider";
import { SearchProvider } from "./SearchProvider";

type ProviderProps = {
  children: React.ReactNode;
};

export default function Providers({ children }: ProviderProps) {
  return (
    <AuthProvider>
      <SearchProvider>{children}</SearchProvider>
    </AuthProvider>
  );
}
