import { useEffect, useState } from "react";
import { Link, redirect } from "react-router-dom";
import styles from "./Nav.module.css";
import logo from "../../assets/logo1lightcrop.png";

export default function Nav() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInitial, setUserInitial] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        setIsLoggedIn(true);
        setUserInitial(user.username.charAt(0).toUpperCase());
      }
    }
  }, []);

  const handleLogout = () => {
    // Handle logout logic
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    redirect("/login");
  };

  return (
    <nav className={styles.nav}>
      <Link to="/">
        <img className={styles.logo} src={logo} alt="<DevBlog/>" />
      </Link>
      <div className={styles.rightSection}>
        {isLoggedIn ? (
          <div className={styles.profileContainer} onClick={handleLogout}>
            <div className={styles.profileIcon}>
              <span className={styles.userInitial}>{userInitial}</span>
            </div>
            <span className={styles.logoutText}>Logout</span>
          </div>
        ) : (
          <Link to="/login" className={styles.loginLink}>
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
