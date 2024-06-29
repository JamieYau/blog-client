import { Link, useNavigate } from "react-router-dom";
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
import { useState } from "react";
const bigLogo = "/logo1crop.png";
const logo = "/logo2crop.png";

export default function Nav() {
  const { user, logout } = useAuth();
  const isLoggedIn = user !== null;
  const userInitial = isLoggedIn ? user.username.charAt(0).toUpperCase() : "";
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/search?query=${searchQuery}`);
  };

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
          <form
            onSubmit={handleSearchSubmit}
            className="ml-4 hidden w-64 items-center rounded-full bg-muted sm:flex"
          >
            <Search className="mx-3 min-h-6 min-w-6 stroke-[1.5] text-muted-foreground" />
            <input
              type="text"
              placeholder="Search"
              className="w-full rounded border border-none bg-transparent px-5 py-[10px] pl-0 outline-none placeholder:text-muted-foreground"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
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
