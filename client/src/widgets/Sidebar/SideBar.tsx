import React, { useState, useEffect, useMemo } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import {
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Collapse,
  AppBar,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Home as HomeIcon,
  Apartment as ApartmentIcon,
  DirectionsCar as CarIcon,
  Business as ServicesIcon,
  Add as AddIcon,
  Settings as SettingsIcon,
  KeyboardArrowDown as ArrowDownIcon,
  KeyboardArrowRight as ArrowRightIcon,
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Brightness4 as Brightness4Icon,
  Brightness7 as Brightness7Icon,
} from "@mui/icons-material";

const DRAWER_WIDTH = 280;
const MINI_DRAWER_WIDTH = 65;

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#1976d2",
//     },
//     background: {
//       default: "#f5f5f5",
//     },
//   },
// });

const NAVIGATION = [
  {
    kind: "header",
    title: "Главное меню",
  },
  {
    segment: "list",
    title: "Главная",
    icon: <HomeIcon />,
  },
  {
    segment: "form",
    title: "Разместить объявление",
    icon: <AddIcon />,
  },
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "Категории",
  },
  {
    segment: "categories",
    title: "Все категории",
    icon: <ApartmentIcon />,
    children: [
      {
        segment: "real-estate",
        title: "Недвижимость",
        icon: <ApartmentIcon />,
      },
      {
        segment: "auto",
        title: "Автомобили",
        icon: <CarIcon />,
      },
      {
        segment: "services",
        title: "Услуги",
        icon: <ServicesIcon />,
      },
    ],
  },
  {
    segment: "settings",
    title: "Настройки",
    icon: <SettingsIcon />,
  },
];

const DashboardRoot = styled("div")({
  display: "flex",
  minHeight: "100vh",
});

interface StyledAppBarProps {
  open?: boolean;
  collapsed?: boolean;
  isMobileView?: boolean;
}

const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) =>
    !["open", "collapsed", "isMobileView"].includes(prop as string),
})<StyledAppBarProps>(({ theme, open, collapsed, isMobileView }) => {
  const drawerWidth = collapsed ? MINI_DRAWER_WIDTH : DRAWER_WIDTH;

  return {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: "100%",
    ...(open &&
      !isMobileView && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      }),
  };
});

const StyledDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "open" && prop !== "collapsed",
})<{
  open?: boolean;
  collapsed?: boolean;
}>(({ theme, collapsed }) => ({
  width: collapsed ? MINI_DRAWER_WIDTH : DRAWER_WIDTH,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  "& .MuiDrawer-paper": {
    width: collapsed ? MINI_DRAWER_WIDTH : DRAWER_WIDTH,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
}));

const NavigationItem = ({
  item,
  level = 0,
  onNavigate,
  collapsed,
  isMobile,
  onItemClick,
}: {
  item: any;
  level?: number;
  onNavigate: (segment: string) => void;
  collapsed: boolean;
  isMobile?: boolean;
  onItemClick?: () => void;
}) => {
  const [open, setOpen] = useState(false);

  if (item.kind === "header") {
    return collapsed || isMobile ? null : (
      <Typography
        variant="overline"
        sx={{
          px: 3,
          py: 1.5,
          display: "block",
          color: "text.secondary",
        }}
      >
        {item.title}
      </Typography>
    );
  }

  if (item.kind === "divider") {
    return <Divider sx={{ my: 1 }} />;
  }

  const handleClick = () => {
    if (item.children && !collapsed) {
      setOpen(!open);
    } else {
      onNavigate(item.segment);
      if (isMobile && onItemClick) {
        onItemClick();
      }
    }
  };

  return (
    <>
      <ListItem disablePadding>
        <ListItemButton
          onClick={handleClick}
          sx={{
            px: collapsed ? 2.5 : 3,
            minHeight: 48,
            justifyContent: collapsed ? "center" : "initial",
          }}
        >
          <ListItemIcon sx={{ minWidth: collapsed ? 0 : 48 }}>
            {item.icon}
          </ListItemIcon>
          {!collapsed && (
            <>
              <ListItemText primary={item.title} />
              {item.children && (open ? <ArrowDownIcon /> : <ArrowRightIcon />)}
            </>
          )}
        </ListItemButton>
      </ListItem>
      {!collapsed && item.children && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List disablePadding>
            {item.children.map((child: any) => (
              <NavigationItem
                key={child.segment}
                item={child}
                level={level + 1}
                onNavigate={onNavigate}
                collapsed={collapsed}
                isMobile={isMobile}
                onItemClick={onItemClick}
              />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
};

export const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const navigate = useNavigate();
  //   const location = useLocation();

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

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(!isMobile);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

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

  const handleNavigate = (segment: string) => {
    navigate(`/${segment}`);
    if (isMobile) {
      setMobileOpen(false);
    }
  };
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
          <NavigationItem
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
