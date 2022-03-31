import { Fragment } from "react";
import { PathMatch } from "react-router-dom";
import Footer from "../Footer";
import Navbar from "../Navbar";

const Layout: React.FC<{
  isMobile: boolean;
  auth: boolean;
  login: PathMatch<string> | null;
  signup: PathMatch<string> | null;
}> = ({ isMobile, auth, children, login, signup }) => {
  console.log(login?.pattern.end);
  return (
    <Fragment>
      {signup?.pattern.end || login?.pattern.end ? null : (
        <Navbar isMobile={isMobile} auth={auth} />
      )}
      <div style={{ width: "100%" }}>{children}</div>
      {signup?.pattern.end || login?.pattern.end ? null : <Footer />}
    </Fragment>
  );
};

export default Layout;
