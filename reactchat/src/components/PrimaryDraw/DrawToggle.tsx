import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";

type Props = {
  open: boolean;
  handleDrawerClose: () => void;
  handleDrawerOpen: () => void;
};

const DrawToggle: React.FC<Props> = ({
  open,
  handleDrawerClose,
  handleDrawerOpen,
}) => {
  return (
    <Box
      sx={{
        height: "50px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* <IconButton onClick={open? handleDrawerClose : handleDrawerOpen}>
                {open ? <ChevronLeft /> : <ChevronRight />}
            </IconButton> */}
    </Box>
  );
};

export default DrawToggle;
