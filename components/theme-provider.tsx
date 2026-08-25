"use client";

type Theme = "light" | "dark";

/**
 * The theme lives in one place: the `dark` class on <html>, set before first
 * paint by the inline script in the root layout. Keeping it out of React state
 * means no hydration mismatch and no flash, and the toggle button renders both
 * icons with CSS deciding which one shows.
 */
export const toggleTheme = () => {
  const root = document.documentElement;
  const next: Theme = root.classList.contains("dark") ? "light" : "dark";
  root.classList.toggle("dark", next === "dark");
  try {
    localStorage.setItem("theme", next);
  } catch {
    // Private mode or storage disabled. The toggle still works for this visit.
  }
};
