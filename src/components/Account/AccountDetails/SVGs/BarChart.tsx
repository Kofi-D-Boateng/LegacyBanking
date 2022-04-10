import React, { useEffect, useRef } from "react";
import {
  select,
  max,
  scaleBand,
  axisBottom,
  axisLeft,
  scaleLinear,
  NumberValue,
} from "d3";
import { DateAmountHash } from "../../../../Interfaces/Maps";
const BarChart: React.FC<{
  transactions: {
    id: number;
    type: string;
    dateOfTransaction: string;
    amount: number;
    location: string;
  }[];
  DateAmount: DateAmountHash;
}> = ({ transactions, DateAmount }) => {
  const svgRef: React.LegacyRef<SVGSVGElement> | undefined = useRef<any>();
  const margin: { top: number; bottom: number } = { top: 20, bottom: 20 };
  const CHART_HEIGHT: number = 300;
  const CHART_WIDTH: number = 500;
  useEffect(() => {
    const svg = select(svgRef.current)
      .style("background-color", "white")
      .style("overflow", "visible")
      .attr("width", CHART_WIDTH)
      .attr("height", CHART_HEIGHT);
    const x = scaleBand()
      .domain(transactions.map((d) => d.dateOfTransaction))
      .rangeRound([0, CHART_WIDTH])
      .padding(0.6);
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
  }, [transactions]);
  return <svg ref={svgRef} />;
};

export default BarChart;
