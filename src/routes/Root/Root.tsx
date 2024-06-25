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
        <main>
          <Outlet />
        </main>
        <Footer />
      </AuthProvider>
    </>
  );
}
