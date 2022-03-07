import { Fragment } from "react";
import { PathMatch } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout: React.FC<{
  isMobile: boolean;
  auth: boolean;
  login: PathMatch<string> | null;
  signup: PathMatch<string> | null;
}> = ({ isMobile, auth, children, login, signup }) => {
  console.log(login);
  return (
    <Fragment>
      {signup?.pattern.end === undefined || login?.pattern.end === undefined ? (
        <Navbar isMobile={isMobile} auth={auth} />
      ) : null}
      <div>{children}</div>
      {!signup?.pattern.end || !login?.pattern.end ? <Footer /> : null}
    </Fragment>
  );
};

export default Layout;
