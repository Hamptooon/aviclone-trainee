import React from "react";
import { styled } from "@mui/material/styles";
import { Drawer } from "@mui/material";

import { MINI_DRAWER_WIDTH, DRAWER_WIDTH } from "../constants/constants";
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

export default StyledDrawer;
