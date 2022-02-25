import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/UI/Layout";
import Home from "./pages/Home";

const App: React.FC = () => {
  const theme = useTheme();
  const mobile: boolean = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Layout isMobile={mobile}>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Layout>
  );
};

export default App;
