import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import DashboardIcon from "@mui/icons-material/Dashboard";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import EmailIcon from "@mui/icons-material/Email";
import GroupIcon from "@mui/icons-material/Group";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

interface DashboardSidebarProps {
  isOpen: boolean;
  drawerWidth: number;
  handleSidebarToggle: (isOpen: boolean) => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  isOpen,
  drawerWidth,
  handleSidebarToggle,
}) => {
  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      handleSidebarToggle(open);
    };

  const list = (
    <Box
      sx={{ width: drawerWidth }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {["Dashboard", "Starred", "Send email", "Members"].map(
          (text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index === 0 ? (
                    <DashboardIcon />
                  ) : index === 1 ? (
                    <StarBorderIcon />
                  ) : index === 2 ? (
                    <EmailIcon />
                  ) : (
                    <GroupIcon />
                  )}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          )
        )}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <EmailIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <IconButton onClick={toggleDrawer(!isOpen)}>
        {isOpen ? <ArrowBackIcon /> : <ArrowForwardIcon />}
      </IconButton>
      <Drawer
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        anchor="left"
        open={isOpen}
        onClose={toggleDrawer(false)}
        variant="persistent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        {list}
      </Drawer>
    </Box>
  );
};

export default DashboardSidebar;
