import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import FavoriteContext from "../../store/FavoritesContext";
import ThemeContext from "../../store/ThemeContext";

const navItems = [
  { to: "/", label: "All Meetups" },
  { to: "/new-meetup", label: "New Meetup" },
  { to: "/favorites", label: "Favorites" },
];

export default function MainNavigation() {
  const favoriteContext = useContext(FavoriteContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const currentPath =
    typeof window !== "undefined" ? window.location.pathname : "/";

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-lg font-semibold text-white">
            M
          </span>
          <div>
            <p className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
              Modern Meetups
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Discover. Save. Pin.
            </p>
          </div>
        </div>
        <nav className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-2 py-1 text-sm font-medium text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 transition ${
                  isActive
                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                    : "hover:bg-slate-100 dark:hover:bg-slate-800"
                }`
              }
            >
              {item.label}
              {item.to === "/favorites" && (
                <span className="ml-2 inline-flex h-6 min-w-[1.5rem] items-center justify-center rounded-full bg-brand-500/10 px-2 text-xs font-semibold text-brand-600 dark:bg-brand-500/20 dark:text-brand-300">
                  {favoriteContext.totalFavorites}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364 6.364-1.414-1.414M7.05 7.05 5.636 5.636m12.728 0-1.414 1.414M7.05 16.95l-1.414 1.414M16.243 7.757a4.5 4.5 0 1 1-6.364 6.364 4.5 4.5 0 0 1 6.364-6.364Z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M21.752 15.002A9.718 9.718 0 0 1 12 21.75a9.75 9.75 0 0 1 0-19.5 9.72 9.72 0 0 1 6.21 2.256.75.75 0 0 1-.421 1.323 6.25 6.25 0 0 0 3.964 10.174.75.75 0 0 1-.001 1.5Z" />
              </svg>
            )}
          </button>
          <div className="flex md:hidden">
            <select
              className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
              onChange={(event) => {
                if (typeof window !== "undefined") {
                  window.location.href = event.target.value;
                }
              }}
              value={currentPath}
            >
              {navItems.map((item) => (
                <option key={item.to} value={item.to}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </header>
  );
}
