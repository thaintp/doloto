import { useState, useEffect } from "react";

const useDarkMode = () => {
  const preferDarkQuery = "(prefers-color-scheme: dark)";

  const [mode, setMode] = useState<string>(
    () =>
      window.localStorage.getItem("mode") ||
      (window.matchMedia(preferDarkQuery).matches ? "dark" : "light")
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(preferDarkQuery);

    const handleChange = () => setMode(mediaQuery.matches ? "dark" : "light");

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("mode", mode);
  }, [mode]);

  return [mode, setMode] as const;
};

export default useDarkMode;
