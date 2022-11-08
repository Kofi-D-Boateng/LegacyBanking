import { Container, Grid } from "@mui/material";
import { ChangeEvent, Dispatch, FC, SetStateAction } from "react";
import { NavigateFunction } from "react-router-dom";
import { Account, Transaction } from "../../types/CustomerDetails";
import { CREDIT } from "../UI/Constants/Constants";
import AccountActivity from "./AccountActivity/AccountActivity";
import AccountInfo from "./AccountCard/AccountInfo";
import AccountCoupons from "./AccountCoupons/AccountCoupons";
import AccountDetails from "./AccountDetails/AccountDetails";
import AccountVisual from "./AccountVisual/AccountVisual";
const MainProfile: FC<{
  modals: {
    key: number;
    modal: JSX.Element;
    type: string;
  }[];
  classes: {
    readonly [key: string]: string;
  };
  mobile: boolean;
  transactions: Transaction[];
  account: Account;
  nonVisibleAccounts: Account[];
  withdrawals: number;
  deposits: number;
  STATEMENT: string;
  SECURITY: string;
  MONEYTRANSFER: string;
  PAPERLESS: string;
  ACCOUNTNUMBER: string;
  setWithdrawals: Dispatch<SetStateAction<number>>;
  setDeposits: Dispatch<SetStateAction<number>>;
  viewHandler: (event: ChangeEvent<HTMLElement>) => void;
  nav: NavigateFunction;
  actionParam: string | null;
  accountParam: string | null;
  summaryURL: string;
  fName: string;
  lName: string;
  year: string | null;
  month: string | null;
}> = ({
  modals,
  classes,
  mobile,
  deposits,
  withdrawals,
  ACCOUNTNUMBER,
  MONEYTRANSFER,
  PAPERLESS,
  SECURITY,
  STATEMENT,
  summaryURL,
  actionParam,
  accountParam,
  account,
  transactions,
  nonVisibleAccounts,
  fName,
  lName,
  month,
  year,
  nav,
  setDeposits,
  setWithdrawals,
  viewHandler,
}) => {
  const myName = fName + " " + lName;
  const view = modals.filter((m) => {
    return m.type.includes(actionParam as string);
  });
  const links: { key: number; title: string }[] = [
    { key: 1, title: STATEMENT },
    { key: 2, title: PAPERLESS },
    { key: 3, title: MONEYTRANSFER },
    { key: 4, title: SECURITY },
  ];
  const filteredLinks = links.filter((l) => {
    if (account && account.bankAccountType.includes(CREDIT)) {
      return l.title !== MONEYTRANSFER;
    } else {
      return l;
    }
  });

  return (
    <>
      {actionParam &&
        view.map((a) => {
          return <Container key={a.key}>{a.modal}</Container>;
        })}

      {!mobile ? (
        <Grid className={classes.profile} container>
          <Grid xs={12} md={7} item>
            <Grid container>
              <AccountInfo
                ACCOUNTNUMBER={ACCOUNTNUMBER}
                myName={myName}
                transactions={transactions}
                mobile={mobile}
                classes={classes}
                links={filteredLinks}
                withdrawals={withdrawals}
                setWithdrawals={setWithdrawals}
                deposits={deposits}
                setDeposits={setDeposits}
                onSetView={viewHandler}
              />
              <AccountVisual
                fName={fName}
                lName={lName}
                nonVisibleAccounts={nonVisibleAccounts}
                classes={classes}
                year={year}
                month={month}
                nav={nav}
              />
              <AccountActivity
                accountParam={accountParam}
                transactions={transactions}
                fName={fName}
                lName={lName}
                year={year}
                month={month}
                classes={classes}
                nav={nav}
              />
            </Grid>
          </Grid>
          <Grid xs={12} md={5} item>
            <Grid container>
              <AccountDetails classes={classes} summaryURL={summaryURL} />
              <AccountCoupons classes={classes} isMobile={mobile} />
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Grid className={classes.profile} container>
          <Grid container>
            <AccountInfo
              ACCOUNTNUMBER={ACCOUNTNUMBER}
              mobile={mobile}
              classes={classes}
              links={filteredLinks}
              onSetView={viewHandler}
              myName={myName}
              transactions={transactions}
              withdrawals={withdrawals}
              setWithdrawals={setWithdrawals}
              deposits={deposits}
              setDeposits={setDeposits}
            />
          </Grid>
          <Grid container>
            <AccountVisual
              fName={fName}
              lName={lName}
              nonVisibleAccounts={nonVisibleAccounts}
              classes={classes}
              year={year}
              month={month}
              nav={nav}
            />
          </Grid>
          <Grid container>
            <AccountDetails classes={classes} summaryURL={summaryURL} />
          </Grid>
          <Grid container>
            <AccountCoupons classes={classes} isMobile={mobile} />
          </Grid>
          <Grid container></Grid>
          <Grid container>
            <AccountActivity
              accountParam={accountParam}
              transactions={transactions}
              classes={classes}
              fName={fName}
              lName={lName}
              year={year}
              month={month}
              nav={nav}
            />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default MainProfile;
