import { useState } from "react";

export default function ThemeButton() {
  const currentTheme = localStorage.getItem("theme") || "light";

  const [theme, setTheme] = useState(currentTheme);

  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  }

  const toggleTheme = () => {
    let newTheme = theme === "light" ? "dark" : "light";
    document.documentElement.classList.toggle("dark");
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <button className="theme-button" onClick={toggleTheme}>
      {theme === "light" ? "🌛" : "🌞"}
    </button>
  );
}
