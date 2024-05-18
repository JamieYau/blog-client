import { useState } from "react";
import { useAuth } from "../../contexts/AuthProvider";
import styles from "./LoginPage.module.css";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors
    try {
      await login(username, password);
    } catch (error) {
      setError(error.message); // Set the error message
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginContainer}>
        <h2 className={styles.loginTitle}>Login</h2>
        <form onSubmit={handleLogin} className={styles.loginForm}>
          <div className={styles.formField}>
            <label htmlFor={styles["username"]}>Username:</label>
            <input
              id={styles["username"]}
              type="text"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className={styles.formField}>
            <label htmlFor={styles["password"]}>Password:</label>
            <input
              id={styles["password"]}
              type="password"
              value={password}
              required
              minLength={8}
              maxLength={32}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <button className={styles.loginButton} type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
