import { AxiosStatic } from "axios";
import { FC, ReactNode } from "react";
import { useSelector } from "react-redux";
import { Auth } from "../../../Interfaces/Auth";
import { RootState } from "../../../store/store";
import { HOME, PROFILE } from "../Constants/Constants";
import AccountFooter from "../Footers/AccountFooter";
import { AccountNavbar } from "../Navbars/AccountNavbar";

const AccountLayout: FC<{
  Location: Location;
  mobile: boolean;
  children: ReactNode;
  axios: AxiosStatic;
  URL: string | undefined;
  isTimeUp: boolean;
  Timer: FC<{
    isMobile: boolean;
    auth: Auth;
    location: Location;
  }>;
}> = ({ children, mobile, axios, URL, isTimeUp, Timer, Location }) => {
  const notis = useSelector((state: RootState) => state.notis);
  const auth = useSelector((state: RootState) => state.auth);
  const options: { key: number; title: string; link: string }[] = [
    { key: 1, title: "Accounts", link: PROFILE.substring(0, 8) },
    { key: 3, title: "Log out", link: HOME },
  ];

  return (
    <div>
      <AccountNavbar
        URL={URL}
        axios={axios}
        token={auth.token}
        options={options}
        mobile={mobile}
        noti={notis}
      />
      {isTimeUp && auth.expiresIn !== 0 ? (
        <Timer isMobile={mobile} auth={auth} location={Location} />
      ) : null}
      <div>{children}</div>
      <AccountFooter />
    </div>
  );
};

export default AccountLayout;
