import { Fragment } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout: React.FC<{ isMobile: boolean }> = ({ isMobile, children }) => {
  return (
    <Fragment>
      <Navbar isMobile={isMobile} />
      <div>{children}</div>
      <Footer />
    </Fragment>
  );
};

export default Layout;
