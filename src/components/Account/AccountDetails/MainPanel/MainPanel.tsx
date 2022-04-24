import { Card, CardContent, Grid, Typography } from "@mui/material";

const MainPanel: React.FC<{
  classes: {
    readonly [key: string]: string;
  };
  withdrawals: number;
  changeYear: (e: any) => void;
}> = ({ classes, changeYear, withdrawals }) => {
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
              {`You have spent $${withdrawals.toLocaleString(
                "en-us"
              )} this month`}
            </Typography>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default MainPanel;
