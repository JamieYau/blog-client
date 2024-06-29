import { Outlet } from "react-router-dom";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";

import Providers from "@/contexts/Providers";

// Define a functional component called Root
export default function Root() {
  return (
    <>
      <Providers>
        <Nav />
        <main className="m-auto flex h-full max-w-6xl flex-1 flex-col p-4 sm:p-8">
          <Outlet />
        </main>
        <Footer />
      </Providers>
    </>
  );
}
