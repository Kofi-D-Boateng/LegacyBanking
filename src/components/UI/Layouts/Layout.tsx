import { FC, ReactNode, Fragment, ReactElement } from "react";
import Footer from "../Footers/Footer";
import { Navbar } from "../Navbars/Navbar";
import { Twitter, Facebook, Instagram, LinkedIn } from "@mui/icons-material";
import { PathMatch } from "react-router-dom";
import { CustomerDetails } from "../../../types/CustomerDetails";
import classes from "../../../styles/Main/LayoutStyles.module.css";
import AppRoute from "../../../enums/Route";
import { SocialMediaLink } from "../../../enums/SocialLink";

const Layout: FC<{
  isMobile: boolean;
  login: PathMatch<string> | null;
  signup: PathMatch<string> | null;
  error: PathMatch<string> | null;
  verification: PathMatch<string> | null;
  children: ReactNode;
  customer: CustomerDetails;
  YEAR: number;
}> = ({
  isMobile,
  customer,
  children,
  login,
  signup,
  YEAR,
  error,
  verification,
}) => {
  const Links: { key: number; title: string; link: string }[] = [
    { key: 1, title: "About Us", link: AppRoute.ABOUT },
    { key: 2, title: "Locations", link: AppRoute.LOCATIONS },
    { key: 3, title: "Contact", link: AppRoute.CONTACT },
    { key: 4, title: "Insight", link: AppRoute.INSIGHT },
    { key: 5, title: "Startups", link: AppRoute.STARTUPS },
  ];

  const authLinks: { key: number; title: string; link: string }[] = [
    { key: 1, title: "Profile", link: AppRoute.PROFILE.substring(0, 8) },
    { key: 2, title: "Log out", link: AppRoute.REDIRECT },
    { key: 3, title: "Login", link: AppRoute.LOGIN },
  ];

  const Socials: {
    key: number;
    title: string;
    svg: ReactElement;
    link: string;
  }[] = [
    {
      key: 1,
      title: "twitter",
      svg: <Twitter />,
      link: SocialMediaLink.TWITTER,
    },
    {
      key: 2,
      title: "facebook",
      svg: <Facebook />,
      link: SocialMediaLink.FACEBOOK,
    },
    {
      key: 3,
      title: "instagram",
      svg: <Instagram />,
      link: SocialMediaLink.INSTAGRAM,
    },
    {
      key: 4,
      title: "linkedin",
      svg: <LinkedIn />,
      link: SocialMediaLink.LINKEDIN,
    },
  ];
  return (
    <Fragment>
      {signup?.pattern.end ||
      login?.pattern.end ||
      error?.pattern.end ||
      verification?.pattern.end ? null : (
        <Navbar
          isMobile={isMobile}
          customer={customer}
          links={Links}
          authLinks={authLinks}
        />
      )}
      <div className={classes.main}>{children}</div>
      {signup?.pattern.end ||
      login?.pattern.end ||
      error?.pattern.end ||
      verification?.pattern.end ? null : (
        <Footer
          socials={Socials}
          links={Links}
          isMobile={isMobile}
          YEAR={YEAR}
        />
      )}
    </Fragment>
  );
};

export default Layout;
