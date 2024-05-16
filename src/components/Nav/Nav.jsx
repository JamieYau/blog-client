import styles from "./Nav.module.css"
import { Link } from "react-router-dom";
import logo from "../../assets/logo1lightcrop.png"

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <Link to="/">
            <img className={styles.logo} src={logo} alt="<DevBlog/>" />
          </Link>
        </li>
      </ul>
    </nav>
  );
}
