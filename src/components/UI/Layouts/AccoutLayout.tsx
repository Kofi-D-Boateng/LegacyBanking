import React from "react";
import { AccountFooter } from "../Footer";
import { AccountNavbar } from "../Navbar";

const AccountLayout: React.FC<{ mobile: boolean }> = ({ children, mobile }) => {
  const options: { key: number; title: string; link: string }[] = [
    { key: 1, title: "Accounts", link: "/profile" },
    { key: 2, title: "Payments", link: "payments" },
    { key: 3, title: "Security & Privacy", link: "/" },
    { key: 4, title: "Sign out", link: "/" },
  ];

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <AccountNavbar options={options} mobile={mobile} />
      <div style={{ width: "100%" }}>{children}</div>
      <AccountFooter />
    </div>
  );
};

export default AccountLayout;
