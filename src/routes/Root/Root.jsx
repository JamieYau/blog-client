import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer";
import { Outlet } from "react-router-dom";
import "./Root.css";

import AuthProvider from "../../contexts/AuthProvider";

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
