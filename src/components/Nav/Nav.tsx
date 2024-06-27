import { Link } from "react-router-dom";
import useAuth from "../../contexts/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
const bigLogo = "/logo1crop.png";
const logo = "/logo2crop.png";

export default function Nav() {
  const { user, logout } = useAuth();
  const isLoggedIn = user !== null;
  const userInitial = isLoggedIn ? user.username.charAt(0).toUpperCase() : "";

  return (
    <header className="flex w-full justify-center shadow-sm">
      <nav className="m-auto flex w-full items-center justify-between p-4 sm:px-8">
        <Link to="/" className="flex">
          <img
            src={bigLogo}
            alt="<DevBlog/>"
            className="hidden h-10 sm:block"
          />
          <img src={logo} alt="</>" className="h-10 sm:hidden" />
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
            <Link
              to="/login"
              className={buttonVariants({ variant: "default" })}
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
