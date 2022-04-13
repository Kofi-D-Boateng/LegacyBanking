import { Card, CardContent, Grid, Typography } from "@mui/material";
import { ClassNameMap } from "@mui/styles/withStyles";
import { useEffect } from "react";
import { DateAmount } from "../../../../Interfaces/Maps";

const MainPanel: React.FC<{
  transactions: {
    id: number;
    type: string;
    dateOfTransaction: string;
    amount: number;
    location: string;
  }[];
  test: string;
  classes: ClassNameMap<string>;
}> = ({ transactions, classes, test }) => {
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
              {`You have spent $${test} this month`}
            </Typography>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default MainPanel;
