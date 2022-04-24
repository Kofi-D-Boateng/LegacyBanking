import React from "react";

const CreditScore: React.FC<{
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
}> = ({ customer, isMobile }) => {
  return <h1>CREDIT SCORE IS HERE</h1>;
};

export default CreditScore;
