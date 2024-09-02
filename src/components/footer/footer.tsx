import styles from "./footer.module.css";
import GitHubIcon from "@mui/icons-material/GitHub";

export default function Footer() {
  return (
    <div className={styles.container}>
      <a
        href="https://github.com/faizi-7/tcs-tracker"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.githubLink}
      >
        Available @ <GitHubIcon fontSize="small" />
      </a>
      <h3>TCS Application Tracker | 2024</h3>
      <p className={styles.creator}>
        Created by{" "}
        <a href="https://ifaiz.xyz" target="_blank" rel="noopener noreferrer" className={styles.portfolio}>
          Faiz Iqbal
        </a>{" "}
        😎
      </p>
    </div>
  );
}
