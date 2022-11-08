import { Card, CardContent, Grid, Typography } from "@mui/material";
import { FC } from "react";
import { NavigateFunction } from "react-router-dom";
import { Account } from "../../../types/CustomerDetails";
import { CREDIT, MAINPROFILE } from "../../UI/Constants/Constants";

const AccountVisual: FC<{
  fName: string;
  lName: string;
  nonVisibleAccounts: Account[];
  classes: {
    readonly [key: string]: string;
  };
  year: string | null;
  month: string | null;
  nav: NavigateFunction;
}> = ({ nonVisibleAccounts, classes, fName, lName, nav, month, year }) => {
  return (
    <>
      {nonVisibleAccounts.map((acc) => {
        const lengthOfAN = acc.accountNumber.length;
        const ANSubstring = acc.accountNumber.slice(lengthOfAN - 4, lengthOfAN);
        const url: string = `${fName}${lName}?display=${MAINPROFILE}&account=${acc.id}&year=${year}&month=${month}`;
        return (
          <Card
            key={acc.id}
            className={classes.accountCard}
            onClick={() =>
              nav(url, {
                replace: false,
              })
            }
          >
            <CardContent>
              <Grid className={classes.accountContainer} container>
                <Grid sm={12} md={12} item>
                  <Grid container>
                    <Typography variant="h5">
                      {acc.bankAccountType} ...{ANSubstring}
                    </Typography>
                  </Grid>
                  <Grid container>
                    <Typography variant="h5">
                      {acc.bankAccountType.includes(CREDIT)
                        ? acc.usedCredit.toLocaleString("en-us", {
                            style: "currency",
                            currency: "USD",
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })
                        : acc.capital.toLocaleString("en-us", {
                            style: "currency",
                            currency: "USD",
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                    </Typography>
                  </Grid>
                  <Grid container>
                    <Typography variant="h5">Current Balance</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        );
      })}
    </>
  );
};

export default AccountVisual;
