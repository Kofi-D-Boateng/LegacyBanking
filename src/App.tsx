import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/UI/Layout";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import International from "./pages/International";
import Investment from "./pages/Investments";
import Loans from "./pages/Loans";
import Locations from "./pages/Locations";
import Profile from "./pages/Profile";
import { RootState } from "./store/store";

const App: React.FC = () => {
  const theme = useTheme();
  const mobile: boolean = useMediaQuery(theme.breakpoints.down("sm"));
  const auth = useSelector((state: RootState) => state.auth);
  return (
    <Layout isMobile={mobile} auth={auth.authenticated}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/about" element={<Locations />} />
        <Route path="/about" element={<Investment />} />
        <Route path="/about" element={<Loans />} />
        <Route path="/about" element={<International />} />
        <Route path="/about" element={<Contact />} />
        {auth.authenticated && <Route path="/about" element={<Profile />} />}
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </Layout>
  );
};

export default App;
