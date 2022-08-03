import { Card, CardContent, Grid, Typography } from "@mui/material";
import { FC } from "react";

const MainPanel: FC<{
  classes: {
    readonly [key: string]: string;
  };
  withdrawals: number;
}> = ({ classes, withdrawals }) => {
  return (
    <Grid container>
      <Card className={classes.card}>
        <CardContent>
          <Grid container>
            <Typography variant="h5">Account Summary</Typography>
          </Grid>
          <Grid
            sx={{
              backgroundColor: "lightgray",
              borderRadius: "5px",
              margin: "10px 0",
            }}
            container
          >
            <Typography sx={{ margin: "0 10px" }} variant="h5">
              {`You have spent ${withdrawals.toLocaleString("en-us", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })} this month`}
            </Typography>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default MainPanel;
