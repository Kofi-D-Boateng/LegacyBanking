import { Fragment } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = (props: any) => {
  return (
    <Fragment>
      <Navbar />
      <div>{props.children}</div>
      <Footer />
    </Fragment>
  );
};

export default Layout;
