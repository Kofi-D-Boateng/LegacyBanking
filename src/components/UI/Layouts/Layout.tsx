import { FC, ReactNode, Fragment, ReactElement } from "react";
import { Footer } from "../Footer";
import { Navbar } from "../Navbars/Navbar";
import { Twitter, Facebook, Instagram, LinkedIn } from "@mui/icons-material";
import { PathMatch } from "react-router-dom";

const Layout: FC<{
  mobile: boolean;
  login: PathMatch<string> | null;
  signup: PathMatch<string> | null;
  error: PathMatch<string> | null;
  children: ReactNode;
  auth: boolean;
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
}) => {
  console.log(error);
  const Links: { key: number; title: string; link: string }[] = [
    { key: 1, title: "About Us", link: ABOUT },
    { key: 2, title: "Locations", link: LOCATIONS },
    { key: 3, title: "Contact", link: CONTACT },
    { key: 4, title: "Insight", link: INSIGHT },
    { key: 5, title: "Startups", link: STARTUPS },
  ];

  const authLinks: { key: number; title: string; link: string }[] = [
    { key: 1, title: "Profile", link: PROFILE },
    { key: 2, title: "Logout", link: REDIRECT },
    { key: 3, title: "Login", link: LOGIN },
  ];

  const Socials: { key: number; svg: ReactElement; link: string }[] = [
    { key: 1, svg: <Twitter />, link: TWITTER },
    { key: 2, svg: <Facebook />, link: FACEBOOK },
    { key: 3, svg: <Instagram />, link: INSTAGRAM },
    { key: 4, svg: <LinkedIn />, link: LINKEDIN },
  ];

  return (
    <Fragment>
      {signup?.pattern.end ||
      login?.pattern.end ||
      error?.pattern.end ? null : (
        <Navbar
          isMobile={mobile}
          auth={auth}
          links={Links}
          authLinks={authLinks}
        />
      )}
      <div style={{ width: "100%" }}>{children}</div>
      {signup?.pattern.end ||
      login?.pattern.end ||
      error?.pattern.end ? null : (
        <Footer socials={Socials} links={Links} isMobile={mobile} YEAR={YEAR} />
      )}
    </Fragment>
  );
};

export default Layout;
