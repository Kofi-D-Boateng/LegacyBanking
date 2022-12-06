import axios from "axios";
import { FC, ReactNode } from "react";
import { useSelector } from "react-redux";
import { CustomerDetails } from "../../../types/CustomerDetails";
import { NotificationDetails } from "../../../types/Notification";
import { RootState } from "../../../store/store";
import AccountFooter from "../Footers/AccountFooter";
import { AccountNavbar } from "../Navbars/AccountNavbar";
import { useSearchParams } from "react-router-dom";
import AppRoute from "../../../enums/Route";
import { API_VERSION } from "../Constants/Constants";

const AccountLayout: FC<{
  customer: CustomerDetails;
  mobile: boolean;
  children: ReactNode;
  url: string;
}> = ({ children, mobile, url, customer }) => {
  const params = useSearchParams();
  const urlParamAccount = params[0].get("account");
  const urlParamDisplay = params[0].get("display");
  const urlParamMonth = params[0].get("month");
  const urlParamYear = params[0].get("year");
  const substring = AppRoute.PROFILE.slice(0, AppRoute.PROFILE.length - 1);
  const mainUrl = `${substring}${customer.fName}${customer.lName}?display=${AppRoute.MAINPROFILE}&account=${urlParamAccount}&year=${urlParamYear}&month=${urlParamMonth}`;
  const notis: NotificationDetails = useSelector(
    (state: RootState) => state.notis
  );
  const options: { key: number; title: string; link: string }[] = [
    { key: 1, title: "Accounts", link: mainUrl },
    { key: 2, title: "Log out", link: AppRoute.REDIRECT },
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
          <div>{children}</div>
          <AccountFooter />
        </>
      )}
    </>
  );
};

export default AccountLayout;
