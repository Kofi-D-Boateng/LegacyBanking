import useTheme from "@mui/material/styles/useTheme";
import { Theme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import React from "react";
import { useSelector } from "react-redux";
import {
  matchPath,
  Navigate,
  PathMatch,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import AccountLayout from "./components/UI/AccoutLayout";
import Layout from "./components/UI/Layout";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import International from "./pages/International";
import Investment from "./pages/Investments";
import Loans from "./pages/Loans";
import Locations from "./pages/Locations";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import { RootState } from "./store/store";

const App: React.FC = () => {
  const theme = useTheme<Theme>();
  const mobile: boolean = useMediaQuery<unknown>(theme.breakpoints.down("sm"));
  const auth: {
    token: string;
    authenticated: boolean;
  } = useSelector((state: RootState) => state.auth);
  const { pathname } = useLocation();
  const login: PathMatch<string> | null = matchPath<string, string>(
    "/login",
    pathname
  );
  const signup: PathMatch<string> | null = matchPath<string, string>(
    "/signup",
    pathname
  );
  const profile: PathMatch<string> | null = matchPath<string, string>(
    "/profile",
    pathname
  );
  return (
    <>
      {profile?.pattern.end ? (
        <AccountLayout mobile={mobile}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/locations" element={<Locations />} />
            <Route path="/investment" element={<Investment />} />
            <Route path="/loans" element={<Loans />} />
            <Route path="/international" element={<International />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login isMobile={mobile} />} />
            <Route path="/signup" element={<Signup />} />
            {auth.authenticated && (
              <Route path="/profile" element={<Profile token={auth.token} />} />
            )}
            <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
        </AccountLayout>
      ) : (
        <Layout
          isMobile={mobile}
          auth={auth.authenticated}
          login={login}
          signup={signup}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/locations" element={<Locations />} />
            <Route path="/investment" element={<Investment />} />
            <Route path="/loans" element={<Loans />} />
            <Route path="/international" element={<International />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login isMobile={mobile} />} />
            <Route path="/signup" element={<Signup />} />
            {auth.authenticated && (
              <Route path="/profile" element={<Profile token={auth.token} />} />
            )}
            <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
        </Layout>
      )}
    </>
  );
};

export default App;
