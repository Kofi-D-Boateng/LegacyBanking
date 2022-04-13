import { Grid } from "@mui/material";

const Results: React.FC<{
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
  param: {
    state: string | undefined;
    zipcode: string | undefined;
    country: string | undefined;
  };
}> = ({ bank, param }) => {
  console.log(param);
  return (
    <>
      <Grid container>
        {bank.branches
          .filter((b) => {
            if (param.country) {
              return b.country === param.country;
            }
            if (param.state) {
              return b.area === param.state;
            }
            return b.zipcode === param.zipcode;
          })
          .map((b) => {
            console.log(b);
          })}
      </Grid>
    </>
  );
};

export default Results;
