import { Suspense, lazy, FC } from "react";
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
  FRONTEND_DOMAIN,
  CONTACT,
  HOME,
  INSIGHT,
  LOCATIONS,
  LOGIN,
  PROFILE,
  REDIRECT,
  SIGNUP,
  STARTUPS,
} from "./components/UI/Constants/Constants";
import axios from "axios";
const Startups = lazy(() => import("./pages/Startups"));
const Insight = lazy(() => import("./pages/Insight"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Locations = lazy(() => import("./pages/Locations"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Profile = lazy(() => import("./pages/Profile"));

const App: FC = () => {
  const YEAR: number = new Date().getFullYear();
  const customer = useSelector((state: RootState) => state.cust);
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
        <AccountLayout mobile={mobile} axios={axios} URL={FRONTEND_DOMAIN}>
          <Routes>
            {auth.authenticated && (
              <Route
                path={PROFILE}
                element={
                  customer.isEnabled ? (
                    <Profile
                      customer={customer}
                      URL={FRONTEND_DOMAIN}
                      token={auth.token}
                      mobile={mobile}
                    />
                  ) : (
                    <h1>IT WORKED</h1>
                  )
                }
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
          YEAR={YEAR}
        >
          <Routes>
            <Route path={HOME} element={<Home mobile={mobile} />} />
            <Route path={ABOUT} element={<About isMobile={mobile} />} />
            <Route
              path={LOCATIONS}
              element={<Locations URL={FRONTEND_DOMAIN} isMobile={mobile} />}
            />
            <Route
              path={CONTACT}
              element={<Contact isMobile={mobile} axios={axios} />}
            />
            <Route path={STARTUPS} element={<Startups isMobile={mobile} />} />
            <Route
              path={INSIGHT}
              element={<Insight isMobile={mobile} YEAR={YEAR} />}
            />
            <Route
              path={LOGIN}
              element={<Login URL={FRONTEND_DOMAIN} isMobile={mobile} />}
            />
            <Route path={SIGNUP} element={<Signup URL={FRONTEND_DOMAIN} />} />
            <Route path={REDIRECT} element={<Navigate replace to={HOME} />} />
          </Routes>
        </Layout>
      )}
    </Suspense>
  );
};

export default App;
