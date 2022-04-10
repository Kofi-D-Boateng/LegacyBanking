import { Card, CardContent, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { DateAmountHash } from "../../../../Interfaces/Maps";

const MainPanel: React.FC<{
  transactions: {
    id: number;
    type: string;
    dateOfTransaction: string;
    amount: number;
    location: string;
  }[];
  yearView: string;
  monthView: string;
  DateAmount: DateAmountHash;
}> = ({ transactions, monthView, yearView, DateAmount }) => {
  return (
    <Card
      sx={{
        textAlign: "center",
        width: "90%",
        margin: "20px auto",
        border: "0.5px solid black",
      }}
    >
      <CardContent>
        <Grid container>
          <Typography variant="h5">{yearView} Spending History</Typography>
        </Grid>
        <Grid container>
          <Typography variant="h5">
            {monthView + ": " + Object.keys(DateAmount)}
          </Typography>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default MainPanel;
