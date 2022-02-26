import { Fragment } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout: React.FC<{ isMobile: boolean; auth: boolean }> = ({
  isMobile,
  auth,
  children,
}) => {
  return (
    <Fragment>
      <Navbar isMobile={isMobile} auth={auth} />
      <div>{children}</div>
      <Footer />
    </Fragment>
  );
};

export default Layout;
