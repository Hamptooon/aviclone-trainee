import { useState, useEffect } from "react";
import { useMediaQuery, useTheme } from "@mui/material";

export const useDrawerState = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(!isMobile);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setOpen(!isMobile);
  }, [isMobile]);

  const handleDrawerToggle = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setCollapsed(!collapsed);
    }
  };

  return {
    open,
    collapsed,
    mobileOpen,
    handleDrawerToggle,
    isMobile,
    setMobileOpen,
  };
};
