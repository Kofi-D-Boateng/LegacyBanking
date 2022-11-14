import { AxiosStatic } from "axios";
import { FC, ReactNode } from "react";
import { useSelector } from "react-redux";
import { CustomerDetails } from "../../../types/CustomerDetails";
import { NotificationDetails } from "../../../types/Notification";
import { RootState } from "../../../store/store";
import { MAINPROFILE, PROFILE, REDIRECT } from "../Constants/Constants";
import AccountFooter from "../Footers/AccountFooter";
import { AccountNavbar } from "../Navbars/AccountNavbar";
import { useSearchParams } from "react-router-dom";

const AccountLayout: FC<{
  customer: CustomerDetails;
  DATE: Date;
  Location: Location;
  mobile: boolean;
  children: ReactNode;
  axios: AxiosStatic;
  url: string;
  API_VERSION: string | undefined;
  BUFFER: number;
  Timer: FC<{
    isMobile: boolean;
    customer: CustomerDetails;
    location: Location;
  }>;
}> = ({
  children,
  mobile,
  axios,
  Timer,
  DATE,
  BUFFER,
  url,
  customer,
  API_VERSION,
  Location,
}) => {
  const TIMER: number = customer.expiresIn - DATE.getTime();
  const params = useSearchParams();
  const urlParamAccount = params[0].get("account");
  const urlParamDisplay = params[0].get("display");
  const urlParamMonth = params[0].get("month");
  const urlParamYear = params[0].get("year");
  const substring = PROFILE.slice(0, PROFILE.length - 1);
  const mainUrl = `${substring}${customer.fName}${customer.lName}?display=${MAINPROFILE}&account=${urlParamAccount}&year=${urlParamYear}&month=${urlParamMonth}`;
  const notis: NotificationDetails = useSelector(
    (state: RootState) => state.notis
  );
  const options: { key: number; title: string; link: string }[] = [
    { key: 1, title: "Accounts", link: mainUrl },
    { key: 2, title: "Log out", link: REDIRECT },
  ];

  return (
    <>
      {!urlParamAccount || !urlParamDisplay ? (
        <div>{children}</div>
      ) : (
        <>
          <AccountNavbar
            API_VERSION={API_VERSION}
            axios={axios}
            token={customer.token}
            options={options}
            mobile={mobile}
            notificationDetails={notis}
            url={url}
          />
          {TIMER < BUFFER && customer.expiresIn !== 0 ? (
            <Timer isMobile={mobile} customer={customer} location={Location} />
          ) : null}
          <div>{children}</div>
          <AccountFooter />
        </>
      )}
    </>
  );
};

export default AccountLayout;
