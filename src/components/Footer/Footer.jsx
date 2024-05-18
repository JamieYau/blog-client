import styles from "./Footer.module.css";
import { FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <a className={styles.footerLink} href="https://github.com/JamieYau">
        <FaGithub />
        <span className={styles.footerText}>Jamie Yau</span>
      </a>
    </footer>
  );
}
