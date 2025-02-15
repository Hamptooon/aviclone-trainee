import React, { useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

export const useThemeMode = () => {
  const [themeMode, setThemeMode] = useState<"light" | "dark">("light");
  const muiTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: themeMode,
          primary: {
            main: "#1976d2",
          },
        },
      }),
    [themeMode]
  );

  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };
  return { themeMode, toggleTheme, muiTheme };
};
