import { AttachMoney, Send } from "@mui/icons-material";
import { Grid, SvgIconTypeMap, Typography } from "@mui/material";
import { ReactElement, useState } from "react";

const Payment: React.FC<{
  isMobile: boolean;
  customer: {
    fName: string;
    lName: string;
    email: string;
    accountNum: string;
    routingNum: string;
    country: string | undefined;
    area: string | undefined;
    zipCode: string | undefined;
    funds: number;
    transactions: {
      id: number;
      type: string;
      dateOfTransaction: string;
      amount: number;
      location: string;
    }[];
  };
}> = () => {
  // const [view, setView] = useState<string>("");
  // const viewMap: {
  //   key: number;
  //   title: string;
  //   svg: ReactElement;
  // }[] = [
  //   { key: 1, title: "Send Money", svg: <Send /> },
  //   { key: 2, title: "Pay Bill", svg: <AttachMoney /> },
  // ];
  return <></>;
};

export default Payment;
