import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useMemo,
} from "react";
import { ThemeProvider as CustomProvider } from "styled-components/macro";
import theme from "theme";

const ThemeContext = createContext<{
  darkMode: boolean;
  toggleDarkMode: () => void;
} | null>(null);

const setDefaulThemeMode = () => {
  const userDefinedMode = localStorage.getItem("user-dark-mode");
  // Set default mode to dark if none previously set by user;
  if (!userDefinedMode) return true;

  return userDefinedMode === "true";
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [darkMode, setDarkMode] = useState<boolean>(setDefaulThemeMode());

  useEffect(() => {
    localStorage.setItem("user-dark-mode", darkMode.toString());
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const activeTheme = useMemo(() => theme(darkMode), [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <CustomProvider theme={activeTheme}>{children}</CustomProvider>
    </ThemeContext.Provider>
  );
};

export const useDarkMode = () => {
  const context = useContext(ThemeContext);

  if (!context) throw new Error("Missing theme context");

  const { darkMode, toggleDarkMode } = context;

  return { darkMode, toggleDarkMode };
};
