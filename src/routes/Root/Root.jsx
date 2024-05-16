import Nav from "../../components/Nav/Nav";
import { Outlet } from "react-router-dom";
import "./Root.css";

export default function Root() {
  return (
    <>
      <Nav />
      <main>
        <Outlet />
      </main>
    </>
  );
}
