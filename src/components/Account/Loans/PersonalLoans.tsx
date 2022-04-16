import React from "react";

const PersonalLoans: React.FC<{
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
}> = ({ isMobile, customer }) => {
  return <h1>PERSONAL LOAN</h1>;
};

export default PersonalLoans;
