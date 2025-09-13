import { Box, CssBaseline } from "@mui/material";
import PrimaryAppBar from "./PrimaryAppBar";
import PrimaryDraw from "./PrimaryDraw";
import SecondaryDraw from "./templates/SecondaryDraw";
import Main from "./Main";

const Home = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <PrimaryAppBar />
      <PrimaryDraw />
      <SecondaryDraw />
      <Main />
    </Box>
  );
};

export default Home;
