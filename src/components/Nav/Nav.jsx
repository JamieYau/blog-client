import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthProvider";
import styles from "./Nav.module.css";
import logo from "../../assets/logo1lightcrop.png";

export default function Nav() {
  const { user, logout } = useAuth();
  const isLoggedIn = user !== null;
  const userInitial = isLoggedIn ? user.username.charAt(0).toUpperCase() : "";

  return (
    <nav className={styles.nav}>
      <Link to="/">
        <img className={styles.logo} src={logo} alt="<DevBlog/>" />
      </Link>
      <div className={styles.rightSection}>
        {isLoggedIn ? (
          <div className={styles.profileContainer} onClick={logout}>
            <div className={styles.profileIcon}>{userInitial}</div>
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
