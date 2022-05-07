import { AxiosStatic } from "axios";
import { FC, ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { HOME, PROFILE } from "../Constants/Constants";
import { AccountFooter } from "../Footer";
import { AccountNavbar } from "../Navbars/AccountNavbar";

const AccountLayout: FC<{
  mobile: boolean;
  children: ReactNode;
  axios: AxiosStatic;
  URL: string;
}> = ({ children, mobile, axios, URL }) => {
  const notis = useSelector((state: RootState) => state.notis);
  const auth = useSelector((state: RootState) => state.auth);
  const options: { key: number; title: string; link: string }[] = [
    { key: 1, title: "Accounts", link: PROFILE.substring(0, 8) },
    { key: 3, title: "Sign out", link: HOME },
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
      <div>{children}</div>
      <AccountFooter />
    </div>
  );
};

export default AccountLayout;
