import { FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="flex items-center justify-center bg-muted p-4">
      <a
        className="flex items-center justify-center gap-4 text-base"
        href="https://github.com/JamieYau"
      >
        <FaGithub />
        <span>Jamie Yau</span>
      </a>
    </footer>
  );
}
