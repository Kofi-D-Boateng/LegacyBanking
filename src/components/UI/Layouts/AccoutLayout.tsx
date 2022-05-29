import { AxiosStatic } from "axios";
import { FC, ReactNode } from "react";
import { useSelector } from "react-redux";
import { Customer } from "../../../Interfaces/Customer";
import { RootState } from "../../../store/store";
import { PROFILE, REDIRECT } from "../Constants/Constants";
import AccountFooter from "../Footers/AccountFooter";
import { AccountNavbar } from "../Navbars/AccountNavbar";

const AccountLayout: FC<{
  customer: Customer;
  DATE: Date;
  Location: Location;
  mobile: boolean;
  children: ReactNode;
  axios: AxiosStatic;
  DOMAIN: string | undefined;
  API_VERSION: string | undefined;
  BUFFER: number;
  Timer: FC<{
    isMobile: boolean;
    customer: Customer;
    location: Location;
  }>;
}> = ({
  children,
  mobile,
  axios,
  DOMAIN,
  Timer,
  Location,
  DATE,
  BUFFER,
  customer,
  API_VERSION,
}) => {
  const TIMER: number = customer.expiresIn - DATE.getTime();
  const notis = useSelector((state: RootState) => state.notis);
  const options: { key: number; title: string; link: string }[] = [
    { key: 1, title: "Accounts", link: PROFILE.substring(0, 8) },
    { key: 2, title: "Log out", link: REDIRECT },
  ];

  return (
    <div>
      <AccountNavbar
        DOMAIN={DOMAIN}
        API_VERSION={API_VERSION}
        axios={axios}
        token={customer.token}
        options={options}
        mobile={mobile}
        noti={notis}
      />
      {TIMER < BUFFER && customer.expiresIn !== 0 ? (
        <Timer isMobile={mobile} customer={customer} location={Location} />
      ) : null}
      <div>{children}</div>
      <AccountFooter />
    </div>
  );
};

export default AccountLayout;
