import { FC, ReactNode, Fragment, ReactElement } from "react";
import Footer from "../Footers/Footer";
import { Navbar } from "../Navbars/Navbar";
import { Twitter, Facebook, Instagram, LinkedIn } from "@mui/icons-material";
import { PathMatch } from "react-router-dom";
import { Auth } from "../../../Interfaces/Auth";
import { AxiosStatic } from "axios";

const Layout: FC<{
  DATE: Date;
  Timer: FC<{
    isMobile: boolean;
    auth: Auth;
    location: Location;
  }>;
  Location: Location;
  BUFFER: number;
  URL: string;
  axios: AxiosStatic;
  mobile: boolean;
  login: PathMatch<string> | null;
  signup: PathMatch<string> | null;
  error: PathMatch<string> | null;
  children: ReactNode;
  auth: Auth;
  YEAR: number;
  ABOUT: string;
  LOCATIONS: string;
  CONTACT: string;
  INSIGHT: string;
  STARTUPS: string;
  PROFILE: string;
  REDIRECT: string;
  LOGIN: string;
  TWITTER: string;
  FACEBOOK: string;
  INSTAGRAM: string;
  LINKEDIN: string;
}> = ({
  mobile,
  auth,
  children,
  login,
  signup,
  YEAR,
  error,
  ABOUT,
  CONTACT,
  INSIGHT,
  LOCATIONS,
  LOGIN,
  PROFILE,
  REDIRECT,
  STARTUPS,
  FACEBOOK,
  INSTAGRAM,
  LINKEDIN,
  TWITTER,
  axios,
  URL,
  Location,
  Timer,
  BUFFER,
  DATE,
}) => {
  const TIMER: number = auth.expiresIn - DATE.getTime();
  const Links: { key: number; title: string; link: string }[] = [
    { key: 1, title: "About Us", link: ABOUT },
    { key: 2, title: "Locations", link: LOCATIONS },
    { key: 3, title: "Contact", link: CONTACT },
    { key: 4, title: "Insight", link: INSIGHT },
    { key: 5, title: "Startups", link: STARTUPS },
  ];

  const authLinks: { key: number; title: string; link: string }[] = [
    { key: 1, title: "Profile", link: PROFILE },
    { key: 2, title: "Log out", link: REDIRECT },
    { key: 3, title: "Login", link: LOGIN },
  ];

  const Socials: {
    key: number;
    title: string;
    svg: ReactElement;
    link: string;
  }[] = [
    { key: 1, title: "twitter", svg: <Twitter />, link: TWITTER },
    { key: 2, title: "facebook", svg: <Facebook />, link: FACEBOOK },
    { key: 3, title: "instagram", svg: <Instagram />, link: INSTAGRAM },
    { key: 4, title: "linkedin", svg: <LinkedIn />, link: LINKEDIN },
  ];
  return (
    <Fragment>
      {signup?.pattern.end ||
      login?.pattern.end ||
      error?.pattern.end ? null : (
        <Navbar
          URL={URL}
          axios={axios}
          isMobile={mobile}
          auth={auth}
          links={Links}
          authLinks={authLinks}
        />
      )}
      {TIMER < BUFFER && auth.expiresIn !== 0 ? (
        <Timer isMobile={mobile} auth={auth} location={Location} />
      ) : null}
      <div style={{ width: "100%" }}>{children}</div>
      {signup?.pattern.end ||
      login?.pattern.end ||
      error?.pattern.end ? null : (
        <Footer
          socials={Socials}
          links={Links}
          isMobile={mobile}
          YEAR={YEAR}
          Location={Location}
        />
      )}
    </Fragment>
  );
};

export default Layout;
