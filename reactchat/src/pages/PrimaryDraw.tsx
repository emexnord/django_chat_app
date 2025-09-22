import {
  Box,
  styled,
  Typography,
  useMediaQuery,
  useTheme,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
} from "@mui/material";
import { useEffect, useState } from "react";
import MuiDrawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const PrimaryDraw = () => {
  const theme = useTheme();
  const below600 = useMediaQuery("(max-width:600px)");
  const [open, setOpen] = useState(!below600);

  const openedMixin = () => ({
    width: theme.primaryDraw.width,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
  });

  const closedMixin = () => ({
    width: theme.primaryDraw.closed,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
  });

  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    width: theme.primaryDraw.width,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
      ...openedMixin(),
      "& .MuiDrawer-paper": openedMixin(),
    }),
    ...(!open && {
      ...closedMixin(),
      "& .MuiDrawer-paper": closedMixin(),
    }),
  }));

  useEffect(() => {
    setOpen(!below600);
  }, [below600]);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  return (
    <Drawer
      open={open}
      variant={below600 ? "temporary" : "permanent"}
      PaperProps={{
        sx: {
          mt: `${theme.primaryAppBar.height}px`,
          height: `calc(100vh - ${theme.primaryAppBar.height}px)`,
          boxShadow: 3,
          borderRight: `1px solid ${theme.palette.divider}`,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: open ? "space-between" : "center",
          px: 2,
          py: 1,
          minHeight: 56,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        {open && (
          <Typography variant="h6" noWrap>
            Menu
          </Typography>
        )}
        <IconButton
          onClick={open ? handleDrawerClose : handleDrawerOpen}
          size="small"
        >
          {open ? <ChevronLeftIcon /> : <MenuIcon />}
        </IconButton>
      </Box>
      <Divider />
      <Box sx={{ overflowY: "auto", flex: 1 }}>
        <List>
          {[...Array(20)].map((_, i) => (
            <ListItem button key={i}>
              <ListItemText primary={`Item ${i + 1}`} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default PrimaryDraw;
