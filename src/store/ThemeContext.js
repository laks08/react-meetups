import { createContext, useEffect, useState } from "react";

const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
});

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") {
      return "light";
    }
    return localStorage.getItem("meetups-theme") || "light";
  });

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }
    const isDark = theme === "dark";
    document.documentElement.classList.toggle("dark", isDark);
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("meetups-theme", theme);
    }
  }, [theme]);

  function toggleTheme() {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeContext;
