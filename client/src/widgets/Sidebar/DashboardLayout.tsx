import React, { useState, useEffect } from "react";
import { styled, ThemeProvider } from "@mui/material/styles";
import { useNavigation } from "./lib/useNavigation";
import { useThemeMode } from "./lib/useThemeMode";
import { useDrawerState } from "./lib/useDrawerState";
import {
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  Typography,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Brightness4 as Brightness4Icon,
  Brightness7 as Brightness7Icon,
} from "@mui/icons-material";
import StyledAppBar from "./ui/StyledAppBar";
import StyledDrawer from "./ui/StyledDrawer";
import { MINI_DRAWER_WIDTH, DRAWER_WIDTH } from "./constants/constants";
import { NAVIGATION } from "./config/navigation";
import ToolbarNavigationItem from "./ui/ToolbarNavigationItem";

const DashboardRoot = styled("div")({
  display: "flex",
  minHeight: "100vh",
});

export const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { handleNavigate } = useNavigation();
  const { themeMode, toggleTheme, muiTheme } = useThemeMode();
  const {
    open,
    collapsed,
    mobileOpen,
    handleDrawerToggle,
    isMobile,
    setMobileOpen,
  } = useDrawerState();
  const drawer = (
    <>
      <Toolbar
        sx={{
          justifyContent: isMobile
            ? "flex-end"
            : collapsed
              ? "center"
              : "flex-end",
        }}
      >
        <IconButton onClick={handleDrawerToggle}>
          {isMobile ? (
            <ChevronLeftIcon />
          ) : collapsed ? (
            <MenuIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </Toolbar>
      <Divider />
      <List>
        {NAVIGATION.map((item, index) => (
          <ToolbarNavigationItem
            key={item.kind === "divider" ? `divider-${index}` : item.segment}
            item={item}
            onNavigate={handleNavigate}
            collapsed={!isMobile && collapsed}
            isMobile={isMobile}
            onItemClick={() => setMobileOpen(false)}
          />
        ))}
      </List>
    </>
  );

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <DashboardRoot>
        <StyledAppBar
          position="fixed"
          open={open}
          collapsed={collapsed}
          isMobileView={isMobile}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: isMobile ? "block" : "none" }}
            >
              {mobileOpen ? <MenuIcon /> : <ChevronRightIcon />}
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1 }}
            >
              AvitoClone
            </Typography>
            <IconButton color="inherit" onClick={toggleTheme}>
              {themeMode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Toolbar>
        </StyledAppBar>

        {isMobile ? (
          <Drawer
            variant="temporary"
            anchor="left"
            open={mobileOpen}
            onClose={() => setMobileOpen(false)}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                width: DRAWER_WIDTH,
                boxSizing: "border-box",
                zIndex: (theme) => theme.zIndex.appBar + 2,
              },
            }}
          >
            {drawer}
          </Drawer>
        ) : (
          <StyledDrawer variant="permanent" open={open} collapsed={collapsed}>
            {drawer}
          </StyledDrawer>
        )}

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: {
              xs: "100%",
              sm: `calc(100% - ${collapsed ? MINI_DRAWER_WIDTH : DRAWER_WIDTH}px)`,
            },
            marginTop: { xs: "56px", sm: "64px" },
          }}
        >
          {children}
        </Box>
      </DashboardRoot>
    </ThemeProvider>
  );
};

export default DashboardLayout;
