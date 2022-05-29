import { Suspense, lazy, FC } from "react";
import { useSelector } from "react-redux";
import {
  matchPath,
  Navigate,
  PathMatch,
  Route,
  Routes,
  useLocation,
  useSearchParams,
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
  LB_AUTH_DOMAIN,
  CONTACT,
  HOME,
  INSIGHT,
  LOCATIONS,
  LOGIN,
  PROFILE,
  REDIRECT,
  SIGNUP,
  STARTUPS,
  DISABLED,
  TWITTER,
  FACEBOOK,
  INSTAGRAM,
  LINKEDIN,
  BUFFERTIME,
  VERIFYACCOUNT,
  API_VERSION,
} from "./components/UI/Constants/Constants";
import axios from "axios";
import LoadingSpinner from "./components/UI/Modals/LoadingSpinner/LoadingSpinner";
import Timer from "./components/UI/Modals/Timer/Timer";
import VerifyAccount from "./pages/VerifyAccount";
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
  const [searchParams] = useSearchParams();
  const login: PathMatch<string> | null = matchPath<string, string>(
    LOGIN,
    pathname
  );
  const signup: PathMatch<string> | null = matchPath<string, string>(
    SIGNUP,
    pathname
  );
  const profile: PathMatch<string> | null = matchPath<string, string>(
    PROFILE,
    pathname
  );
  const error: PathMatch<string> | null = matchPath<string, string>(
    DISABLED,
    pathname
  );

  const verification: PathMatch<string> | null = matchPath<string, string>(
    VERIFYACCOUNT,
    pathname
  );

  return (
    <Suspense fallback={<LoadingSpinner />}>
      {profile?.pattern.end ? (
        <AccountLayout
          BUFFER={BUFFERTIME}
          DATE={DATE}
          Location={Location}
          Timer={Timer}
          customer={customer}
          mobile={mobile}
          axios={axios}
          DOMAIN={LB_AUTH_DOMAIN}
          API_VERSION={API_VERSION}
        >
          <Routes>
            {customer.authenticated && (
              <Route
                path={PROFILE}
                element={
                  customer.isEnabled ? (
                    <Profile
                      Location={Location}
                      customer={customer}
                      DOMAIN={LB_AUTH_DOMAIN}
                      API_VERSION={API_VERSION}
                      token={customer.token}
                      mobile={mobile}
                    />
                  ) : (
                    <Navigate replace to={DISABLED} />
                  )
                }
              />
            )}
            <Route path={REDIRECT} element={<Navigate replace to={HOME} />} />
          </Routes>
        </AccountLayout>
      ) : (
        <Layout
          verification={verification}
          DATE={DATE}
          BUFFER={BUFFERTIME}
          Timer={Timer}
          Location={Location}
          DOMAIN={LB_AUTH_DOMAIN}
          API_VERSION={API_VERSION}
          axios={axios}
          mobile={mobile}
          customer={customer}
          login={login}
          signup={signup}
          error={error}
          YEAR={YEAR}
          ABOUT={ABOUT}
          LOCATIONS={LOCATIONS}
          CONTACT={CONTACT}
          INSIGHT={INSIGHT}
          STARTUPS={STARTUPS}
          PROFILE={PROFILE}
          REDIRECT={REDIRECT}
          LOGIN={LOGIN}
          TWITTER={TWITTER}
          FACEBOOK={FACEBOOK}
          INSTAGRAM={INSTAGRAM}
          LINKEDIN={LINKEDIN}
        >
          <Routes>
            <Route path={HOME} element={<Home mobile={mobile} />} />
            <Route path={ABOUT} element={<About isMobile={mobile} />} />
            <Route
              path={LOCATIONS}
              element={
                <Locations
                  DOMAIN={LB_AUTH_DOMAIN}
                  API_VERSION={API_VERSION}
                  isMobile={mobile}
                />
              }
            />
            <Route
              path={CONTACT}
              element={
                <Contact
                  isMobile={mobile}
                  axios={axios}
                  DOMAIN={LB_AUTH_DOMAIN}
                  API_VERSION={API_VERSION}
                />
              }
            />
            <Route path={STARTUPS} element={<Startups isMobile={mobile} />} />
            <Route
              path={INSIGHT}
              element={<Insight isMobile={mobile} YEAR={YEAR} />}
            />
            <Route
              path={LOGIN}
              element={
                <Login
                  DOMAIN={LB_AUTH_DOMAIN}
                  API_VERSION={API_VERSION}
                  isMobile={mobile}
                />
              }
            />
            <Route
              path={SIGNUP}
              element={
                <Signup DOMAIN={LB_AUTH_DOMAIN} API_VERSION={API_VERSION} />
              }
            />
            <Route
              path={DISABLED}
              element={
                <WaitingPage
                  customer={customer}
                  isMobile={mobile}
                  axios={axios}
                  DOMAIN={LB_AUTH_DOMAIN}
                  API_VERSION={API_VERSION}
                />
              }
            />
            <Route
              path={VERIFYACCOUNT}
              element={
                <VerifyAccount
                  isMobile={mobile}
                  axios={axios}
                  searchParams={searchParams}
                  DOMAIN={LB_AUTH_DOMAIN}
                  API_VERSION={API_VERSION}
                  LoadingSpinner={LoadingSpinner}
                />
              }
            />
            <Route path={REDIRECT} element={<Navigate replace to={HOME} />} />
          </Routes>
        </Layout>
      )}
    </Suspense>
  );
};

export default App;
