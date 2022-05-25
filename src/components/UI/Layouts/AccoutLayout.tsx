import { AxiosStatic } from "axios";
import { FC, ReactNode } from "react";
import { useSelector } from "react-redux";
import { Auth } from "../../../Interfaces/Auth";
import { RootState } from "../../../store/store";
import { PROFILE, REDIRECT } from "../Constants/Constants";
import AccountFooter from "../Footers/AccountFooter";
import { AccountNavbar } from "../Navbars/AccountNavbar";

const AccountLayout: FC<{
  auth: Auth;
  DATE: Date;
  Location: Location;
  mobile: boolean;
  children: ReactNode;
  axios: AxiosStatic;
  URL: string | undefined;
  BUFFER: number;
  Timer: FC<{
    isMobile: boolean;
    auth: Auth;
    location: Location;
  }>;
}> = ({
  children,
  mobile,
  axios,
  URL,
  Timer,
  Location,
  DATE,
  BUFFER,
  auth,
}) => {
  const TIMER: number = auth.expiresIn - DATE.getTime();
  const notis = useSelector((state: RootState) => state.notis);
  const options: { key: number; title: string; link: string }[] = [
    { key: 1, title: "Accounts", link: PROFILE.substring(0, 8) },
    { key: 2, title: "Log out", link: REDIRECT },
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
      {TIMER < BUFFER && auth.expiresIn !== 0 ? (
        <Timer isMobile={mobile} auth={auth} location={Location} />
      ) : null}
      <div>{children}</div>
      <AccountFooter />
    </div>
  );
};

export default AccountLayout;
