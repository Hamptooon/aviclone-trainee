import React, { useState } from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Collapse,
} from "@mui/material";
import {
  KeyboardArrowDown as ArrowDownIcon,
  KeyboardArrowRight as ArrowRightIcon,
} from "@mui/icons-material";
import { NavigationItem } from "../model/types";

const ToolbarNavigationItem = ({
  item,
  level = 0,
  onNavigate,
  collapsed,
  isMobile,
  onItemClick,
}: {
  item: NavigationItem;
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
      if (item.segment) {
        onNavigate(item.segment);
      }

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
            {item.children.map((child: NavigationItem) => (
              <ToolbarNavigationItem
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

export default ToolbarNavigationItem;
