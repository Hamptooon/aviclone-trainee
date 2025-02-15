import { styled } from "@mui/material/styles";
import { AppBar } from "@mui/material";
import { MINI_DRAWER_WIDTH, DRAWER_WIDTH } from "../constants/constants";
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

export default StyledAppBar;
