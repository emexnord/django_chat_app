import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
  Link,
  Divider,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import ChatIcon from "@mui/icons-material/Chat";
import InfoIcon from "@mui/icons-material/Info";
import { useState, useEffect } from "react";

const drawerWidth = 240;

const menuItems = [
  { text: "Home", icon: <HomeIcon />, href: "/" },
  { text: "Chats", icon: <ChatIcon />, href: "/chats" },
  { text: "About", icon: <InfoIcon />, href: "/about" },
];

const PrimaryAppBar = () => {
  const [sideMenu, setSideMenu] = useState(false);
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("sm"));

  useEffect(() => {
    if (isLargeScreen && sideMenu) {
      setSideMenu(false);
    }
  }, [isLargeScreen, sideMenu]);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setSideMenu(open);
    };

  const drawerContent = (
    <Box
      sx={{
        width: drawerWidth,
        pt: 2,
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Typography variant="h6" sx={{ px: 2, pb: 1, fontWeight: 700 }}>
        Menu
      </Typography>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            component={Link}
            href={item.href}
            underline="none"
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar
      position="sticky"
      elevation={1}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 2,
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar
        variant="dense"
        sx={{
          height: theme.primaryAppBar?.height || 56,
          minHeight: theme.primaryAppBar?.height || 56,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {!isLargeScreen && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={toggleDrawer(true)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Link
            href="/"
            underline="none"
            color="inherit"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ fontWeight: 700, letterSpacing: "-0.5px" }}
            >
              React Chat
            </Typography>
          </Link>
        </Box>
        {isLargeScreen && (
          <Box sx={{ display: "flex", gap: 2 }}>
            {menuItems.map((item) => (
              <Link
                key={item.text}
                href={item.href}
                underline="none"
                color="inherit"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 1,
                  transition: "background 0.2s",
                  "&:hover": {
                    background: theme.palette.action.hover,
                  },
                }}
              >
                {item.icon}
                <Typography variant="body1" sx={{ ml: 1 }}>
                  {item.text}
                </Typography>
              </Link>
            ))}
          </Box>
        )}
      </Toolbar>
      <Drawer anchor="left" open={sideMenu} onClose={toggleDrawer(false)}>
        {drawerContent}
      </Drawer>
    </AppBar>
  );
};

export default PrimaryAppBar;
