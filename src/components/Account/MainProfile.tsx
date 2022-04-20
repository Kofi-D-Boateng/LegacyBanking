import { Container, Grid } from "@mui/material";
import React, { ChangeEvent } from "react";
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
  classes: {
    readonly [key: string]: string;
  };
  mobile: boolean;
  currentYear: number;
  currentMonth: number;
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
  withdrawals: number;
  deposits: number;
  setWithdrawals: React.Dispatch<React.SetStateAction<number>>;
  setDeposits: React.Dispatch<React.SetStateAction<number>>;
  viewHandler: (event: ChangeEvent<HTMLElement>) => void;
}> = ({
  modal,
  modals,
  classes,
  mobile,
  currentMonth,
  currentYear,
  customer,
  deposits,
  withdrawals,
  setDeposits,
  setWithdrawals,
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
        {!mobile ? (
          <>
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
                    withdrawals={withdrawals}
                    setWithdrawals={setWithdrawals}
                    deposits={deposits}
                    setDeposits={setDeposits}
                    onSetView={viewHandler}
                  />
                </Grid>
                <Grid xs={12} md={12} item>
                  <AccountActivity
                    YEAR={currentYear}
                    transactions={customer.transactions}
                    classes={classes}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid xs={12} md={5} item>
              <Grid container>
                <Grid xs={12} md={12} item>
                  <AccountDetails classes={classes} />
                </Grid>
                <Grid xs={12} md={12} item>
                  <AccountCoupons classes={classes} isMobile={mobile} />
                </Grid>
              </Grid>
            </Grid>
          </>
        ) : (
          <>
            <Grid xs={12} item>
              <Grid container>
                <Grid xs={12} item>
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
                    withdrawals={withdrawals}
                    setWithdrawals={setWithdrawals}
                    deposits={deposits}
                    setDeposits={setDeposits}
                  />
                </Grid>
                <Grid xs={12} item>
                  <Grid container>
                    <Grid xs={12} item>
                      <AccountDetails classes={classes} />
                    </Grid>
                    <Grid xs={12} item>
                      <AccountCoupons classes={classes} isMobile={mobile} />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid xs={12} item>
              <AccountActivity
                YEAR={currentYear}
                transactions={customer.transactions}
                classes={classes}
              />
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
};

export default MainProfile;
