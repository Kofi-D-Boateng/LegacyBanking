import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { DateAmountType, MonthsMap } from "../../../interfaces/Maps";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import {
  ACHDEBIT,
  DEBITTRASFER,
  TRANSFER,
  WITHDRAWAL,
} from "../Constants/Constants";
const BarChart: React.FC<{
  transactions: {
    id: number;
    type: string;
    dateOfTransaction: string;
    amount: number;
    location: string;
  }[];
  DateAmount: DateAmountType[];
  year: number;
  classes: {
    readonly [key: string]: string;
  };
  isMobile: boolean;
}> = ({ transactions, DateAmount, year, classes, isMobile }) => {
  const svgRef: React.LegacyRef<SVGSVGElement> | undefined = useRef<any>();
  useEffect(() => {
    const MARGIN: {
      top: number;
      bottom: number;
      left: number;
      right: number;
    } = {
      top: 30,
      bottom: 30,
      left: 20,
      right: 20,
    };
    const CHART_HEIGHT: number = 600 - MARGIN.top - MARGIN.bottom;
    const CHART_WIDTH: number = 800 - MARGIN.left - MARGIN.right;
    let count = 0;
    const Dates: MonthsMap = {
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
        return +t.dateOfTransaction.substring(0, 4) === year;
      })
      .forEach((t) => {
        const i: number = +t.dateOfTransaction.substring(6, 7);
        const items: DateAmountType = {
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
          type: t.type,
        };
        if (!DateAmount[0]) {
          DateAmount.push({
            date: items.date,
            amount: +items.amount.toFixed(2),
            type: items.type,
          });
        } else if (items.date === DateAmount[count].date) {
          const newAmount = DateAmount[count].amount + items.amount;
          DateAmount[count].amount = +newAmount.toFixed(2);
        } else {
          DateAmount.push({
            date: items.date,
            amount: +items.amount.toFixed(2),
            type: items.type,
          });
          count++;
        }
      });
    // SELECTS THE SVG
    const svg = d3
      .select(svgRef.current)
      .style("background-color", "white")
      .style("overflow", "visible")
      .attr("width", CHART_WIDTH)
      .attr("height", CHART_HEIGHT);

    // X-BAND FOR X-AXIS
    const x = d3
      .scaleBand()
      .domain(DateAmount.map((d) => d.date))
      .rangeRound([0, CHART_WIDTH])
      .padding(0.8);

    // YSCALE FOR AMOUNTS
    const y = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(
          DateAmount.filter((d) => {
            return (
              d.type.includes(DEBITTRASFER) ||
              d.type.includes(TRANSFER) ||
              d.type.includes(WITHDRAWAL) ||
              d.type.includes(ACHDEBIT)
            );
          }).map((d) => d.amount)
        ),
      ] as Iterable<Number>)
      .range([CHART_HEIGHT, 0]);

    svg
      .append("g")
      .style("color", "black")
      .attr("transform", `translate(0,${CHART_HEIGHT})`)
      .style("overflow", "visibile")
      .call(d3.axisBottom(x).tickSizeOuter(0));
    svg
      .append("g")
      .style("color", "black")
      .style("transform", `translate(${CHART_HEIGHT},0)`)
      .style("overflow", "visibile")
      .call(
        d3.axisLeft(y).ticks(5).tickSizeOuter(0).tickFormat(d3.format("$,.2r"))
      );

    const RECT = svg.selectAll(".bar").data(DateAmount);

    RECT.exit().remove();
    RECT.join("rect")
      .style("fill", "green")
      .attr("width", x.bandwidth())
      .attr("height", (data: { amount: any }) => CHART_HEIGHT - y(data.amount))
      .attr("x", (data: { date: any }) => x(data.date) as string | number)
      .attr("y", (data: { amount: any }) => y(data.amount))
      .on("mouseover", (e: any, d: { date: any; amount: any }) => {
        RECT.append("div").text(`${d.date}:  $${d.amount}`);
      });
  });
  return (
    <>
      <Card className={!isMobile ? classes.card : classes.mobileCard}>
        <Grid
          sx={{ width: "80%", margin: "auto", padding: "30px 0" }}
          container
        >
          <Typography variant="h5" sx={{ color: "purple" }}>
            Account Summary
          </Typography>
        </Grid>
        <CardContent sx={{ margin: "auto" }}>
          <svg ref={svgRef} />
        </CardContent>
      </Card>
    </>
  );
};

export default BarChart;
