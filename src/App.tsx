import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import {
  matchPath,
  Navigate,
  PathMatch,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import useTheme from "@mui/material/styles/useTheme";
import { Theme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import AccountLayout from "./components/UI/Layouts/AccoutLayout";
import { RootState } from "./store/store";
import Layout from "./components/UI/Layouts/Layout";
import Home from "./pages/Home";
import {
  ABOUT,
  CONTACT,
  HOME,
  INVESTMENTS,
  LOCATIONS,
  LOGIN,
  PROFILE,
  REDIRECT,
  SIGNUP,
} from "./components/UI/Constants/Constants";
const About = React.lazy(() => import("./pages/About"));
const Contact = React.lazy(() => import("./pages/Contact"));
const International = React.lazy(() => import("./pages/International"));
const Investment = React.lazy(() => import("./pages/Investments"));
const Loans = React.lazy(() => import("./pages/Loans"));
const Locations = React.lazy(() => import("./pages/Locations"));
const Login = React.lazy(() => import("./pages/Login"));
const Signup = React.lazy(() => import("./pages/Signup"));
const Profile = React.lazy(() => import("./pages/Profile"));

const App: React.FC = () => {
  const theme = useTheme<Theme>();
  const mobile: boolean = useMediaQuery<unknown>(theme.breakpoints.down("md"));
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
    "/profile/*",
    pathname
  );

  return (
    <Suspense
      fallback={
        <div>
          <h1>....Loading</h1>
        </div>
      }
    >
      {profile?.pattern.end ? (
        <AccountLayout mobile={mobile} login={null} signup={null} auth={false}>
          <Routes>
            <Route path={HOME} element={<Home mobile={mobile} />} />
            <Route path={ABOUT} element={<About />} />
            <Route path={LOCATIONS} element={<Locations isMobile={mobile} />} />
            <Route path={INVESTMENTS} element={<Investment />} />
            <Route path={CONTACT} element={<Contact />} />
            <Route path={LOGIN} element={<Login isMobile={mobile} />} />
            <Route path={SIGNUP} element={<Signup />} />
            {auth.authenticated && (
              <Route
                path={PROFILE}
                element={<Profile token={auth.token} mobile={mobile} />}
              />
            )}
            <Route path={REDIRECT} element={<Navigate replace to={HOME} />} />
          </Routes>
        </AccountLayout>
      ) : (
        <Layout
          mobile={mobile}
          auth={auth.authenticated}
          login={login}
          signup={signup}
        >
          <Routes>
            <Route path={HOME} element={<Home mobile={mobile} />} />
            <Route path={ABOUT} element={<About />} />
            <Route path={LOCATIONS} element={<Locations isMobile={mobile} />} />
            <Route path={INVESTMENTS} element={<Investment />} />
            <Route path={CONTACT} element={<Contact />} />
            <Route path={LOGIN} element={<Login isMobile={mobile} />} />
            <Route path={SIGNUP} element={<Signup />} />
            {auth.authenticated && (
              <Route
                path={PROFILE}
                element={<Profile token={auth.token} mobile={mobile} />}
              />
            )}
            <Route path={REDIRECT} element={<Navigate replace to={HOME} />} />
          </Routes>
        </Layout>
      )}
    </Suspense>
  );
};

export default App;
