import { FC, ReactNode, Fragment, ReactElement } from "react";
import Footer from "../Footers/Footer";
import { Navbar } from "../Navbars/Navbar";
import { Twitter, Facebook, Instagram, LinkedIn } from "@mui/icons-material";
import { PathMatch } from "react-router-dom";
import { AxiosStatic } from "axios";
import { Customer } from "../../../Interfaces/Customer";

const Layout: FC<{
  DATE: Date;
  Timer: FC<{
    isMobile: boolean;
    customer: Customer;
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
  verification: PathMatch<string> | null;
  children: ReactNode;
  customer: Customer;
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
  customer,
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
  verification,
}) => {
  const TIMER: number = customer.expiresIn - DATE.getTime();
  const Links: { key: number; title: string; link: string }[] = [
    { key: 1, title: "About Us", link: ABOUT },
    { key: 2, title: "Locations", link: LOCATIONS },
    { key: 3, title: "Contact", link: CONTACT },
    { key: 4, title: "Insight", link: INSIGHT },
    { key: 5, title: "Startups", link: STARTUPS },
  ];

  const authLinks: { key: number; title: string; link: string }[] = [
    { key: 1, title: "Profile", link: PROFILE.substring(0, 8) },
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
      error?.pattern.end ||
      verification?.pattern.end ? null : (
        <Navbar
          URL={URL}
          axios={axios}
          isMobile={mobile}
          customer={customer}
          links={Links}
          authLinks={authLinks}
        />
      )}
      {TIMER < BUFFER && customer.expiresIn !== 0 ? (
        <Timer isMobile={mobile} customer={customer} location={Location} />
      ) : null}
      <div style={{ width: "100%" }}>{children}</div>
      {signup?.pattern.end ||
      login?.pattern.end ||
      error?.pattern.end ||
      verification?.pattern.end ? null : (
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
