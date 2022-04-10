import React, { Dispatch, useEffect, useState } from "react";
import { Grid } from "@mui/material";
import styles from "../../../styles/BarGraphSVGStyles";
import BarChart from "./SVGs/BarChart";
import MainPanel from "./MainPanel/MainPanel";
import { DateAmountHash } from "../../../Interfaces/Maps";
import { useDispatch } from "react-redux";
import { customerActions } from "../../../store/customer/customer";

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
  DateAmount: DateAmountHash;
}> = ({ customer, month, year, DateAmount }) => {
  const dispatch = useDispatch<Dispatch<any>>();
  const [view, setView] = useState<number>(1);
  const [yearView, setYearView] = useState<string>(year);
  const [monthView, setMonthView] = useState<string>(month);
  const classes = styles();
  const { transactions } = customer;
  // const test: { id: number; date: string; amount: number }[] = [
  //   { id: 1, date: "Apr", amount: 1200000.45 },
  //   { id: 2, date: "May", amount: 1200000.65 },
  //   { id: 3, date: "Jun", amount: 5672319.45 },
  //   { id: 4, date: "Jul", amount: 9872340.45 },
  // ];
  useEffect(() => {
    const DateAmount: DateAmountHash = {};
    const Dates: {
      1: string;
      2: string;
      3: string;
      4: string;
      5: string;
      6: string;
      7: string;
      8: string;
      9: string;
      10: string;
      11: string;
      12: string;
    } = {
      1: "Jan",
      2: "Feb",
      3: "Mar",
      4: "Apr",
      5: "May",
      6: "Jun",
      7: "Jul",
      8: "Aug",
      9: "Sep",
      10: "Oct",
      11: "Nov",
      12: "Dec",
    };
    transactions
      .filter((t) => {
        return t.dateOfTransaction.substring(0, 4) === yearView;
      })
      .map((t) => {
        const i: number = +t.dateOfTransaction.substring(6, 7);
        const items: { date: string; amount: number } = {
          date: Dates[
            i as keyof {
              1: string;
              2: string;
              3: string;
              4: string;
              5: string;
              6: string;
              7: string;
              8: string;
              9: string;
              10: string;
              11: string;
              12: string;
            }
          ],
          amount: t.amount,
        };
        if (DateAmount[items.date]) {
          const newAmount: number = DateAmount[items.date] + items.amount;
          DateAmount[items.date] = parseFloat(newAmount.toFixed(2));
        } else {
          DateAmount[items.date] = parseFloat(items.amount.toFixed(2));
        }
        return true;
      });
  }, [transactions, yearView, monthView, dispatch]);
  console.log(DateAmount);
  const SVGs: { key: number; title: string; svg: JSX.Element }[] = [
    {
      key: 1,
      title: "bar-chart",
      svg: <BarChart transactions={transactions} DateAmount={DateAmount} />,
    },
  ];

  return (
    <Grid className={classes.svgHolder} container>
      <Grid sx={{ alignSelf: "center" }} xs={6} md={4} item>
        <MainPanel
          transactions={transactions}
          yearView={yearView}
          monthView={monthView}
          DateAmount={DateAmount}
        />
      </Grid>
      {SVGs.filter((s) => {
        return s.key === view;
      }).map((s) => {
        return (
          <Grid key={s.key} sx={{ margin: "auto auto" }} xs={6} md={8} item>
            {s.svg}
          </Grid>
        );
      })}
    </Grid>
  );
};

export default React.memo(Summary);
