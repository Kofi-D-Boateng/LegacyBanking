import { FC, memo } from "react";
import { Grid } from "@mui/material";
import classes from "../../../styles/Charts/Chart.module.css";
import BarChart from "../../UI/Charts/BarChart";
import MainPanel from "./MainPanel/MainPanel";
import { Transaction } from "../../../types/CustomerDetails";
import PieChart from "../../UI/Charts/PieChart";
import { ChartType } from "../../../enums/Chart";

const Summary: FC<{
  chartTypeParam: string | null;
  isMobile: boolean;
  summaryUrl: string;
  transactions: Transaction[];
  withdrawlAmount: number;
  year: number;
}> = ({ transactions, year, isMobile, withdrawlAmount, chartTypeParam }) => {
  const charts: { key: number; typeOfChart: string; chart: JSX.Element }[] = [
    {
      key: 1,
      typeOfChart: ChartType.Bar,
      chart: (
        <BarChart
          classes={classes}
          transactions={transactions}
          year={year}
          isMobile={isMobile}
        />
      ),
    },
    {
      key: 2,
      typeOfChart: ChartType.Pie,
      chart: (
        <PieChart isMobile={isMobile} transactions={transactions} year={year} />
      ),
    },
  ];

  const filteredView = charts.find(
    (chart) => chart.typeOfChart === (chartTypeParam as string)
  );

  return (
    <Grid className={classes.chartContainer} container>
      <Grid xs={12} md={12} item>
        {filteredView?.chart}
      </Grid>
      <Grid xs={12} md={12} item>
        <MainPanel classes={classes} withdrawlAmount={withdrawlAmount} />
      </Grid>
    </Grid>
  );
};

export default memo(Summary);
