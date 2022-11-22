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
import { Theme, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import AccountLayout from "./components/UI/Layouts/AccoutLayout";
import { RootState } from "./store/store";
import Layout from "./components/UI/Layouts/Layout";
import Home from "./pages/Home";
import { BUFFERTIME, API_VERSION } from "./components/UI/Constants/Constants";
import axios from "axios";
import LoadingSpinner from "./components/UI/Modals/LoadingSpinner/LoadingSpinner";
import Timer from "./components/UI/Modals/Timer/Timer";
import VerifyAccount from "./pages/VerifyAccount";
import AppRoute from "./enums/Route";
import { SocialMediaLink } from "./enums/SocialLink";
const Startups = lazy(() => import("./pages/Startups"));
const Insight = lazy(() => import("./pages/Insight"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Locations = lazy(() => import("./pages/Locations"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Profile = lazy(() => import("./pages/Profile"));
const WaitingPage = lazy(() => import("./pages/WaitingPage"));

const App: FC = () => {
  const DATE: Date = new Date();
  const YEAR: number = DATE.getFullYear();
  const customer = useSelector((state: RootState) => state.cust);
  const theme = useTheme<Theme>();
  const mobile: boolean = useMediaQuery<unknown>(theme.breakpoints.down("md"));
  const { pathname } = useLocation();
  const Location: Location = window.location;
  const login: PathMatch<string> | null = matchPath<string, string>(
    AppRoute.LOGIN,
    pathname
  );
  const signup: PathMatch<string> | null = matchPath<string, string>(
    AppRoute.SIGNUP,
    pathname
  );
  const profile: PathMatch<string> | null = matchPath<string, string>(
    AppRoute.PROFILE,
    pathname
  );
  const error: PathMatch<string> | null = matchPath<string, string>(
    AppRoute.DISABLED,
    pathname
  );

  const verification: PathMatch<string> | null = matchPath<string, string>(
    AppRoute.VERIFYACCOUNT,
    pathname
  );

  return (
    <Suspense fallback={<LoadingSpinner />}>
      {profile?.pattern.end ? (
        <AccountLayout
          BUFFER={BUFFERTIME}
          url={pathname}
          DATE={DATE}
          Location={Location}
          Timer={Timer}
          customer={customer}
          mobile={mobile}
          axios={axios}
          API_VERSION={API_VERSION}
        >
          <Routes>
            {customer.authenticated && (
              <Route
                path={AppRoute.PROFILE}
                element={
                  customer.isActivated ? (
                    <Profile
                      customer={customer}
                      API_VERSION={API_VERSION}
                      mobile={mobile}
                    />
                  ) : (
                    <Navigate replace to={AppRoute.DISABLED} />
                  )
                }
              />
            )}
            <Route
              path={AppRoute.REDIRECT}
              element={<Navigate replace to={AppRoute.HOME} />}
            />
          </Routes>
        </AccountLayout>
      ) : (
        <Layout
          verification={verification}
          DATE={DATE}
          BUFFER={BUFFERTIME}
          Timer={Timer}
          Location={Location}
          API_VERSION={API_VERSION}
          axios={axios}
          mobile={mobile}
          customer={customer}
          login={login}
          signup={signup}
          error={error}
          YEAR={YEAR}
          ABOUT={AppRoute.ABOUT}
          LOCATIONS={AppRoute.LOCATIONS}
          CONTACT={AppRoute.CONTACT}
          INSIGHT={AppRoute.INSIGHT}
          STARTUPS={AppRoute.STARTUPS}
          PROFILE={AppRoute.PROFILE}
          REDIRECT={AppRoute.REDIRECT}
          LOGIN={AppRoute.LOGIN}
          TWITTER={SocialMediaLink.TWITTER}
          FACEBOOK={SocialMediaLink.FACEBOOK}
          INSTAGRAM={SocialMediaLink.INSTAGRAM}
          LINKEDIN={SocialMediaLink.LINKEDIN}
        >
          <Routes>
            <Route
              path={AppRoute.HOME}
              element={
                <Home mobile={mobile} axios={axios} API_VERSION={API_VERSION} />
              }
            />
            <Route
              path={AppRoute.ABOUT}
              element={<About isMobile={mobile} />}
            />
            <Route
              path={AppRoute.LOCATIONS}
              element={
                <Locations API_VERSION={API_VERSION} isMobile={mobile} />
              }
            />
            <Route
              path={AppRoute.CONTACT}
              element={<Contact isMobile={mobile} />}
            />
            <Route
              path={AppRoute.STARTUPS}
              element={<Startups isMobile={mobile} />}
            />
            <Route
              path={AppRoute.INSIGHT}
              element={<Insight isMobile={mobile} YEAR={YEAR} />}
            />
            <Route
              path={AppRoute.LOGIN}
              element={<Login isMobile={mobile} />}
            />
            <Route
              path={AppRoute.SIGNUP}
              element={<Signup API_VERSION={API_VERSION} isMobile={mobile} />}
            />
            <Route
              path={AppRoute.DISABLED}
              element={
                <WaitingPage
                  customer={customer}
                  isMobile={mobile}
                  axios={axios}
                  API_VERSION={API_VERSION}
                />
              }
            />
            <Route
              path={AppRoute.VERIFYACCOUNT}
              element={
                <VerifyAccount
                  isMobile={mobile}
                  axios={axios}
                  API_VERSION={API_VERSION}
                  LoadingSpinner={LoadingSpinner}
                />
              }
            />
            <Route
              path={AppRoute.REDIRECT}
              element={<Navigate replace to={AppRoute.HOME} />}
            />
          </Routes>
        </Layout>
      )}
    </Suspense>
  );
};

export default App;
