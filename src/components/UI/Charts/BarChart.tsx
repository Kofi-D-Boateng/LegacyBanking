import { FC, useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { Transaction } from "../../../types/CustomerDetails";
import { TransactionType } from "../../../enums/ProfileEnums";
import { MonthMap } from "../Constants/Constants";
import { BarColor, ChartType } from "../../../enums/Chart";
import { Box, CircularProgress } from "@mui/material";
const BarChart: FC<{
  transactions: Transaction[];
  year: number;
  classes: {
    readonly [key: string]: string;
  };
  isMobile: boolean;
}> = ({ transactions, year, classes, isMobile }) => {
  const [isReady, setIsReady] = useState<boolean>(false);
  const filteredTransactions = transactions.filter(
    (t) => year === +t.dateOfTransaction.substring(0, 4)
  );
  const dataArr: any[] = [];
  dataArr.push([
    "Month",
    "Expenses",
    { role: "tooltip", type: "string", p: { html: true } },
    "Deposit",
    { role: "tooltip", type: "string", p: { html: true } },
  ]);
  const options = {
    colors: [BarColor.Danger, BarColor.Okay],
    chart: {
      title: `Account Overview: ${year}`,
      subtitle: "January - December",
    },
    chartArea: {
      width: "100%",
      height: "100%",
      top: 50,
      left: 50,
    },
    hAxis: { title: "Month", viewWindow: { min: 10, max: 50 } },
    vAxis: { title: "Amount in $", viewWindow: { min: 10, max: 50 } },
  };
  dataArr.push(
    [
      "Januray",
      150.34,
      `-${(150.34).toLocaleString("en-us", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      500.0,
      `${(500.0).toLocaleString("en-us", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
    ],
    [
      "February",
      500.23,
      `${(500.23).toLocaleString("en-us", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      500.0,
      `${(500.0).toLocaleString("en-us", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
    ],
    [
      "March",
      5000.0,
      `${(5000.0).toLocaleString("en-us", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      500.0,
      `${(500.0).toLocaleString("en-us", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
    ],
    [
      "April",
      234.56,
      `${(234.56).toLocaleString("en-us", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      500.0,
      `${(500.0).toLocaleString("en-us", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
    ],
    [
      "May",
      15.2,
      `Deposits: ` +
        (15.2).toLocaleString("en-us", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }),
      500.0,
      `${(500.0).toLocaleString("en-us", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
    ]
  );
  useEffect(() => {
    if (filteredTransactions.length > 0) {
      const dataMap: Map<string, Map<string, number>> = new Map();
      filteredTransactions.forEach((t) => {
        const tMonth = +t.dateOfTransaction.substring(5, 7);
        if (!dataMap.has(MonthMap[tMonth])) {
          const newMap: Map<string, number> = new Map();
          newMap.set("Expenses", 0);
          newMap.set("Deposits", 0);
          dataMap.set(MonthMap[tMonth], newMap);
        } else {
          const map: Map<string, number> = dataMap.get(MonthMap[tMonth])!;
          const amountToSet: Map<string, number> =
            t.transactionType.includes(TransactionType.REFUND) ||
            t.transactionType.includes(TransactionType.DEPOSIT) ||
            t.transactionType.includes(TransactionType.TRANSFER)
              ? map.set("Deposits", map.get("Deposits")! + t.amount)
              : map.set("Expenses", map.get("Expenses")! - t.amount);
          dataMap.set(MonthMap[tMonth], amountToSet);
        }
      });
      dataMap.forEach((map: Map<string, number>) =>
        map.forEach((value: number, date: string) =>
          dataArr.push([date, value])
        )
      );
      setIsReady(true);
    }
  }, [filteredTransactions]);
  return (
    <>
      {dataArr.length <= 0 && null}
      {dataArr.length >= 1 && (
        <Chart
          loader={
            !isReady ? (
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  zIndex: "5",
                }}
              >
                <CircularProgress />
              </Box>
            ) : undefined
          }
          chartType={ChartType.Bar}
          className={!isMobile ? classes.chart : classes.chartMobile}
          options={options}
          data={dataArr}
        />
      )}
    </>
  );
};

export default BarChart;
