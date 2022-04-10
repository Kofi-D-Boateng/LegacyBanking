import { Grid, Typography } from "@mui/material";

const BankInfo: React.FC<{
  bank: {
    name: string;
    country: string;
    area: string;
    zipcode: string;
    totalHoldings: number;
    branches: {
      name: string;
      country: string;
      zipcode: string;
      totalHoldings: number;
    }[];
  };
}> = ({ bank }) => {
  return (
    <>
      <Grid container>
        <Grid xs={12} md={12} item>
          <Grid container>
            <Typography sx={{ color: "black" }} variant="h4">
              Bank with Legacy around the world
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default BankInfo;
