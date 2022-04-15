import { Grid, Typography } from "@mui/material";
import React from "react";

const MonthlyExpenditure: React.FC<{
  details: { key: number; value: string; desc: string }[];
}> = ({ details }) => {
  return (
    <>
      {details.map((d) => {
        return (
          <Grid key={d.key} md={4} item>
            <Grid container>
              <Grid xs={12} md={12} item>
                <Typography
                  sx={
                    parseInt(d.value) < 0 || d.value.substring(0, 1) === "-"
                      ? { color: "red" }
                      : { color: "green" }
                  }
                  variant="h6"
                >
                  {d.value}
                </Typography>
              </Grid>
              <Grid xs={12} md={12} item>
                <Typography variant="body1">{d.desc}</Typography>
              </Grid>
            </Grid>
          </Grid>
        );
      })}
    </>
  );
};

export default MonthlyExpenditure;
