import { Link } from "react-router-dom";
import useAuth from "../../contexts/useAuth";
import logo from "../../assets/logo1crop.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";

export default function Nav() {
  const { user, logout } = useAuth();
  const isLoggedIn = user !== null;
  const userInitial = isLoggedIn ? user.username.charAt(0).toUpperCase() : "";

  return (
    <nav className="flex items-center justify-between px-16 py-4 shadow-sm">
      <Link to="/" className="flex">
        <img className="h-10" src={logo} alt="<DevBlog/>" />
      </Link>
      <div className="flex items-center">
        {isLoggedIn ? (
          <div className="flex cursor-pointer items-center gap-4">
            <Avatar>
              <AvatarImage />
              <AvatarFallback>{userInitial}</AvatarFallback>
            </Avatar>
            <span
              className={buttonVariants({ variant: "default" })}
              onClick={logout}
            >
              Logout
            </span>
          </div>
        ) : (
          <Link to="/login" className={buttonVariants({ variant: "default" })}>
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
