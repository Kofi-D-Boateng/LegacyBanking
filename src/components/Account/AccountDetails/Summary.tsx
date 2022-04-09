import React, { useEffect, useRef, useState } from "react";
import {
  select,
  min,
  max,
  scaleBand,
  axisBottom,
  axisLeft,
  scaleTime,
  extent,
  scaleLinear,
  axisRight,
  NumberValue,
} from "d3";
import { Grid } from "@mui/material";
import styles from "../../../styles/BarGraphSVGStyles";

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
}> = ({ customer, month, year }) => {
  const [view, setView] = useState<number>(0);
  const [yearView, setYearView] = useState<string>(year);
  const [monthView, setMonthView] = useState<string>(month);
  const margin: { top: number; bottom: number } = { top: 20, bottom: 20 };
  const CHART_HEIGHT: number = 400;
  const CHART_WIDTH: number = 600;
  const { transactions } = customer;
  const test: { id: number; date: string; amount: number }[] = [
    { id: 1, date: "Apr", amount: 1200000.45 },
    { id: 2, date: "May", amount: 1200000.65 },
    { id: 3, date: "Jun", amount: 5672319.45 },
    { id: 4, date: "Jul", amount: 9872340.45 },
  ];
  const classes = styles();
  const svgRef: React.LegacyRef<SVGSVGElement> | undefined = useRef<any>();
  useEffect(() => {
    const DateAmount = new Map();
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
        return (
          t.dateOfTransaction.substring(0, 4) === yearView &&
          t.dateOfTransaction.substring(6, 7) === monthView
        );
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
        if (DateAmount.has(items.date)) {
          const newAmount: number = DateAmount.get(items.date) + items.amount;
          DateAmount.delete(items.date);
          DateAmount.set(items.date, parseFloat(newAmount.toFixed(2)));
        } else {
          DateAmount.set(items.date, items.amount);
        }
        return true;
      });

    const svg = select(svgRef.current)
      .style("background-color", "white")
      .style("overflow", "visible")
      .style("margin", "0 300px")
      .attr("width", CHART_WIDTH)
      .attr("height", CHART_HEIGHT);
    const x = scaleBand()
      .domain(transactions.map((d) => d.dateOfTransaction))
      .rangeRound([0, CHART_WIDTH])
      .padding(0.5);
    const y = scaleLinear()
      .domain([0, max(transactions, (t) => t.amount)] as Iterable<NumberValue>)
      .range([CHART_HEIGHT, 0]);
    svg
      .append("g")
      .style("color", "black")
      .style("transform", "translate(0,100%)")
      .style("overflow", "visibile")
      .call(axisBottom(x));
    svg
      .append("g")
      .style("color", "black")
      .style("transform", "translate(100%,0)")
      .style("overflow", "visibile")
      .call(axisLeft(y));
    svg
      .selectAll(".bar")
      .data(transactions)
      .join("rect")
      .style("fill", "red")
      .attr("width", x.bandwidth())
      .attr("height", (data) => CHART_HEIGHT - y(data.amount))
      .attr("x", (data) => x(data.dateOfTransaction) as string | number)
      .attr("y", (data) => y(data.amount));
  }, [transactions, yearView, monthView]);

  return (
    <Grid className={classes.svgHolder} container>
      <Grid sx={{ margin: "auto auto" }} xs={12} md={12} item>
        <svg ref={svgRef} />
      </Grid>
    </Grid>
  );
};

export default Summary;
