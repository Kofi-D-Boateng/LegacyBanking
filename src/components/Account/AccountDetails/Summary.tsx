import React, { useState } from "react";
import { Grid } from "@mui/material";
import classes from "../../../styles/BarGraphSVGStyles.module.css";
import BarChart from "../../UI/SVGs/BarChart";
import MainPanel from "./MainPanel/MainPanel";
import { DateAmountType } from "../../../Interfaces/Maps";

const Summary: React.FC<{
  year: number;
  month: number;
  withdrawals: number;
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
  DateAmount: DateAmountType[];
  isMobile: boolean;
}> = ({ customer, month, year, DateAmount, isMobile, withdrawals }) => {
  const [view, setView] = useState<number>(1);
  // INITIAL STATE IS HELD BY CURRENTYEAR IN PROFILE.TSX
  const [yearView, setYearView] = useState<number>(year);
  const { transactions } = customer;
  const SVGs: { key: number; title: string; svg: JSX.Element }[] = [
    {
      key: 1,
      title: "bar-chart",
      svg: (
        <BarChart
          classes={classes}
          transactions={transactions}
          DateAmount={DateAmount}
          year={yearView}
          isMobile={isMobile}
        />
      ),
    },
  ];

  const yearHandler: (e: any) => void = () => {};

  return (
    <>
      <Grid className={classes.svgHolder} container>
        {SVGs.filter((s) => {
          return s.key === view;
        }).map((s) => {
          return (
            <Grid key={s.key} xs={12} md={12} item>
              {s.svg}
            </Grid>
          );
        })}
        <MainPanel
          changeYear={yearHandler}
          classes={classes}
          withdrawals={withdrawals}
        />
      </Grid>
    </>
  );
};

export default React.memo(Summary);
