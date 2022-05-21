import { CSSProperties, FC } from "react";
import { NavLink } from "react-router-dom";
import { CONTACT } from "../components/UI/Constants/Constants";

const WaitingPage: FC = () => {
  const STYLE: CSSProperties = {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: "1.3rem",
    color: "purple",
  };
  return (
    <div style={STYLE}>
      <h1>Please check your email</h1>
      <p>
        Your account is either disabled or locked. Please check your email for a
        link to activate your account. If you do not see a link, please give us
        a <NavLink to={CONTACT}>call or email.</NavLink>
      </p>
    </div>
  );
};

export default WaitingPage;
