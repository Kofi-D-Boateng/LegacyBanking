import { Grid, Typography } from "@mui/material";
import { select } from "d3";
import React, { useEffect, useRef } from "react";

const WorldMap: React.FC<{
  location: (e: React.MouseEvent<HTMLImageElement>) => void;
  Map: string;
  bank: {
    name: string;
    country: string;
    area: string;
    zipcode: string;
    totalHoldings: number;
    branches: {
      name: string;
      country: string;
      area: string;
      zipcode: string;
      totalHoldings: number;
    }[];
  };
}> = ({ location, Map, bank }) => {
  const svgRef: React.LegacyRef<SVGSVGElement> | undefined = useRef<any>();
  const WIDTH: string = "100vw";
  const HEIGHT: string = "90vh";
  const IMGX: string = "0";
  const IMGY: string = "0";
  const IMGWIDTH: string = "100%";
  const IMGHEIGHT: string = "100%";

  useEffect(() => {
    const SVG = select(svgRef.current)
      .attr("width", WIDTH)
      .attr("height", HEIGHT);

    SVG.append("image")
      .attr("href", Map)
      .attr("width", IMGWIDTH)
      .attr("height", IMGHEIGHT)
      .attr("x", IMGX)
      .attr("y", IMGY)
      .on("mouseover", location);
  });

  return (
    <Grid style={{ margin: "auto", backgroundColor: "red" }} container>
      <Typography variant="h5">HELLO</Typography>
      <svg ref={svgRef} />
    </Grid>
  );
};

export default WorldMap;
