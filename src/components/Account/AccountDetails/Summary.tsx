import { FC, memo } from "react";
import { Grid } from "@mui/material";
import classes from "../../../styles/SVG/BarGraphSVGStyles.module.css";
import BarChart from "../../UI/SVGs/BarChart";
import MainPanel from "./MainPanel/MainPanel";
import { CustomerDetails } from "../../../types/CustomerDetails";
import { DateAmountType } from "../../../types/Maps";

const Summary: FC<{
  year: number;
  withdrawals: number;
  customer: CustomerDetails;
  DateAmount: DateAmountType[];
  isMobile: boolean;
}> = ({ customer, year, DateAmount, isMobile, withdrawals }) => {
  const view: number = 1;
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
          year={year}
          isMobile={isMobile}
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
            <Grid key={s.key} xs={12} md={12} item>
              {s.svg}
            </Grid>
          );
        })}
        <MainPanel classes={classes} withdrawals={withdrawals} />
      </Grid>
    </>
  );
};

export default memo(Summary);
