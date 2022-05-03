import React, { Fragment, ReactElement } from "react";
import { Footer } from "../Footer";
import { Navbar } from "../Navbar";
import { Twitter, Facebook, Instagram, LinkedIn } from "@mui/icons-material";
import { GlobalLayouts } from "../../../GlobalTypes/types";

const Layout: React.FC<GlobalLayouts> = ({
  mobile,
  auth,
  children,
  login,
  signup,
}) => {
  const Links: { key: number; title: string; link: string }[] = [
    { key: 1, title: "About Us", link: "/about" },
    { key: 2, title: "Locations", link: "/locations" },
    { key: 3, title: "Contact", link: "/contact" },
  ];

  const authLinks: { key: number; title: string; link: string }[] = [
    { key: 1, title: "Profile", link: "/profile" },
    { key: 2, title: "Logout", link: "*" },
    { key: 3, title: "Login", link: "/login" },
  ];

  const Socials: { key: number; svg: ReactElement; link: string }[] = [
    { key: 1, svg: <Twitter />, link: "about" },
    { key: 2, svg: <Facebook />, link: "/locations" },
    { key: 3, svg: <Instagram />, link: "/investments/*" },
    { key: 4, svg: <LinkedIn />, link: "/loans/*" },
  ];

  return (
    <Fragment>
      {signup?.pattern.end || login?.pattern.end ? null : (
        <Navbar
          isMobile={mobile}
          auth={auth}
          links={Links}
          authLinks={authLinks}
        />
      )}
      <div style={{ width: "100%" }}>{children}</div>
      {signup?.pattern.end || login?.pattern.end ? null : (
        <Footer socials={Socials} links={Links} isMobile={mobile} />
      )}
    </Fragment>
  );
};

export default Layout;
