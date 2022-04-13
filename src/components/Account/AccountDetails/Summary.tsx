import React, { Dispatch, useEffect, useState } from "react";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import styles from "../../../styles/BarGraphSVGStyles";
import BarChart from "./SVGs/BarChart";
import MainPanel from "./MainPanel/MainPanel";
import { DateAmount } from "../../../Interfaces/Maps";
import { useDispatch } from "react-redux";
import useConverter from "../../../hooks/useConverter";

const Summary: React.FC<{
  year: string;
  month: string;
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
  DateAmount: DateAmount[];
}> = ({ customer, month, year, DateAmount }) => {
  const dispatch = useDispatch<Dispatch<any>>();
  const [view, setView] = useState<number>(1);
  const [yearView, setYearView] = useState<string>(year);
  const [monthView, setMonthView] = useState<string>(month);
  const classes = styles();
  const { transactions } = customer;
  const test = useConverter(DateAmount[0].amount);
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
          month={monthView}
        />
      ),
    },
  ];

  return (
    <>
      <Grid className={classes.svgHolder} container>
        {SVGs.filter((s) => {
          return s.key === view;
        }).map((s) => {
          return (
            <Grid key={s.key} container>
              {s.svg}
            </Grid>
          );
        })}
        <MainPanel classes={classes} transactions={transactions} test={test} />
      </Grid>
    </>
  );
};

export default React.memo(Summary);
