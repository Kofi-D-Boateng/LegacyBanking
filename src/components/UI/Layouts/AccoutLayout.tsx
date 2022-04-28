import React from "react";
import { GlobalLayouts } from "../../../GlobalTypes/types";
import { HOME, PROFILE } from "../Constants/Constants";
import { AccountFooter } from "../Footer";
import { AccountNavbar } from "../Navbar";

const AccountLayout: React.FC<GlobalLayouts> = ({ children, mobile }) => {
  const options: { key: number; title: string; link: string }[] = [
    { key: 1, title: "Accounts", link: PROFILE.substring(0, 8) },
    { key: 3, title: "Sign out", link: HOME },
  ];

  return (
    <div>
      <AccountNavbar options={options} mobile={mobile} />
      <div>{children}</div>
      <AccountFooter />
    </div>
  );
};

export default AccountLayout;
