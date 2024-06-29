import { Link } from "react-router-dom";
import useAuth from "@/contexts/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Search } from "lucide-react";
import SearchBar from "@/components/SearchBar";
const bigLogo = "/logo1crop.png";
const logo = "/logo2crop.png";

export default function Nav() {
  const { user, logout } = useAuth();
  const isLoggedIn = user !== null;
  const userInitial = isLoggedIn ? user.username.charAt(0).toUpperCase() : "";

  return (
    <header className="flex w-full justify-center shadow-sm">
      <nav className="m-auto flex w-full items-center justify-between p-4 sm:px-8">
        <Link to="/" className="flex flex-shrink-0">
          <img
            src={bigLogo}
            alt="<DevBlog/>"
            className="hidden h-10 sm:block"
          />
          <img src={logo} alt="</>" className="h-10 sm:hidden" />
        </Link>
        <div className="flex w-full items-center justify-end gap-6 sm:justify-between">
          <SearchBar
            formClassName="ml-4 hidden w-64 items-center bg-muted sm:flex"
            svgClassName="text-muted-foreground"
          />
          <Link to="/search" className="sm:hidden">
            <Search className="stroke-[1.5] text-muted-foreground" />
          </Link>

          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage />
                  <AvatarFallback>{userInitial}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem onSelect={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
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
