import { Outlet } from "react-router-dom";
import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer";

import AuthProvider from "../../contexts/AuthProvider";

// Define a functional component called Root
export default function Root() {
  return (
    <>
      <AuthProvider>
        <Nav />
        <main className="flex h-full max-w-6xl flex-1 flex-col p-4 sm:p-8 m-auto">
          <Outlet />
        </main>
        <Footer />
      </AuthProvider>
    </>
  );
}
