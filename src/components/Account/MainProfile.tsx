import { Container, Grid, ClassNameMap } from "@mui/material";
import React, { ChangeEvent, useMemo } from "react";
import { DateAmountHash } from "../../Interfaces/Maps";
import AccountActivity from "./AccountActivity/AccountActivity";
import AccountInfo from "./AccountCard/AccountInfo";
import AccountCoupons from "./AccountCoupons/AccountCoupons";
import AccountDetails from "./AccountDetails/AccountDetails";
const MainProfile: React.FC<{
  modal: {
    view: string | undefined;
    paperless: boolean | undefined;
  };
  modals: {
    key: number;
    modal: JSX.Element;
    type: string;
  }[];
  classes: ClassNameMap<string>;
  mobile: boolean;
  currentYear: string;
  currentMonth: string;
  customer: {
    fName: string;
    lName: string;
    email: string;
    accountNum: string;
    routingNum: string;
    country: string | undefined;
    area: string | undefined;
    zipCode: string | undefined;
    funds: number;
    transactions: {
      id: number;
      type: string;
      dateOfTransaction: string;
      amount: number;
      location: string;
    }[];
  };
  viewHandler: (event: ChangeEvent<HTMLElement>) => void;
}> = ({
  modal,
  modals,
  classes,
  mobile,
  currentMonth,
  currentYear,
  customer,
  viewHandler,
}) => {
  return (
    <>
      {modal.view &&
        modals
          .filter((m) => {
            return m.type === modal.view;
          })
          .map((a) => {
            return <Container key={a.key}>{a.modal}</Container>;
          })}
      <Grid className={classes.profile} container>
        <Grid xs={12} md={7} item>
          <Grid container>
            <Grid xs={12} md={12} item>
              <AccountInfo
                YEAR={currentYear}
                MONTH={currentMonth}
                mobile={mobile}
                classes={classes}
                fName={customer.fName}
                lName={customer.lName}
                funds={customer.funds}
                transactions={customer.transactions}
                onSetView={viewHandler}
              />
            </Grid>
            <Grid xs={12} md={12} item>
              <AccountActivity
                YEAR={currentYear}
                MONTH={currentMonth}
                transactions={useMemo(
                  () => customer.transactions,
                  [customer.transactions]
                )}
                classes={classes}
              />
            </Grid>
          </Grid>
        </Grid>
        {!mobile && (
          <Grid xs={12} md={5} item>
            <Grid container>
              <Grid xs={12} md={12} item>
                <AccountDetails classes={classes} />
              </Grid>
              <Grid xs={12} md={12} item>
                <AccountCoupons classes={classes} />
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default MainProfile;
