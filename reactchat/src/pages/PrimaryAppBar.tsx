import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
  Link,
  Divider,
  Avatar,
  Button,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import ChatIcon from "@mui/icons-material/Chat";
import InfoIcon from "@mui/icons-material/Info";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

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
  const location = useLocation();

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
          <ListItemButton
            key={item.text}
            component={Link}
            href={item.href}
            selected={location.pathname === item.href}
            sx={{
              borderRadius: 1,
              mx: 1,
              my: 0.5,
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar
      position="sticky"
      elevation={2}
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
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {!isLargeScreen && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={toggleDrawer(true)}
              sx={{ mr: 1 }}
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
              sx={{ fontWeight: 800, letterSpacing: "-0.5px" }}
            >
              React Chat
            </Typography>
          </Link>
        </Box>
        {isLargeScreen && (
          <Box sx={{ display: "flex", gap: 1 }}>
            {menuItems.map((item) => (
              <Button
                key={item.text}
                href={item.href}
                startIcon={item.icon}
                variant={location.pathname === item.href ? "contained" : "text"}
                color={location.pathname === item.href ? "primary" : "inherit"}
                sx={{
                  borderRadius: 2,
                  fontWeight: 600,
                  textTransform: "none",
                  background:
                    location.pathname === item.href
                      ? theme.palette.action.selected
                      : "none",
                  "&:hover": {
                    background:
                      location.pathname === item.href
                        ? theme.palette.action.selected
                        : theme.palette.action.hover,
                  },
                }}
              >
                {item.text}
              </Button>
            ))}
          </Box>
        )}
        <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
          <Avatar
            sx={{ width: 32, height: 32, bgcolor: theme.palette.primary.main }}
          >
            U
          </Avatar>
        </Box>
      </Toolbar>
      <Drawer anchor="left" open={sideMenu} onClose={toggleDrawer(false)}>
        {drawerContent}
      </Drawer>
    </AppBar>
  );
};

export default PrimaryAppBar;
