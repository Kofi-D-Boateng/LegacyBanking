import { Container, Grid } from "@mui/material";
import { ChangeEvent, Dispatch, FC, SetStateAction, useCallback } from "react";
import { NavigateFunction } from "react-router-dom";
import { Account, Card, Transaction } from "../../types/CustomerDetails";
import { CREDIT, MonthMap } from "../UI/Constants/Constants";
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
  card: Card;
  account: Account;
  nonVisibleAccounts: Account[];
  withdrawals: number;
  deposits: number;
  STATEMENT: string;
  SECURITY: string;
  MONEYTRANSFER: string;
  PAPERLESS: string;
  ACCOUNTNUMBER: string;
  setAccountActivityView: () => void;
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
  filterType: string | null;
  filterYear: string | null;
  filterMonth: string | null;
  activityParam: string | null;
  countParam: string | null;
  mainUrl: string;
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
  filterMonth,
  filterType,
  filterYear,
  activityParam,
  countParam,
  mainUrl,
  card,
  setAccountActivityView,
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

  const currentTransaction: Transaction[] = transactions.filter((t) => {
    const tYear = t.dateOfTransaction.substring(0, 4);
    const tMonth = +t.dateOfTransaction.substring(5, 7);
    return (
      t.accountNumber === account.accountNumber &&
      MonthMap[tMonth] === month &&
      tYear === year
    );
  });

  const filteredTransaction: Transaction[] =
    !filterMonth && !filterYear
      ? currentTransaction
      : transactions.filter((t) => {
          const tYear = t.dateOfTransaction.substring(0, 4);
          const tMonth = +t.dateOfTransaction.substring(5, 7);
          if (filterType?.includes("Year")) {
            return (
              t.accountNumber === account.accountNumber &&
              MonthMap[tMonth] === month &&
              tYear === filterYear
            );
          } else if (filterType?.includes("Month")) {
            return (
              t.accountNumber === account.accountNumber &&
              MonthMap[tMonth] === filterMonth &&
              tYear === year
            );
          } else if (filterType?.includes("Both")) {
            return (
              t.accountNumber === account.accountNumber &&
              MonthMap[tMonth] === filterMonth &&
              tYear === filterYear
            );
          }
          return t;
        });

  const setTransactionViewCount = useCallback(() => {
    const count: number = parseInt(countParam as string);
    if (count > transactions.length) {
      const newUri = mainUrl + `&activityView=active&count=10`;
      nav(newUri, { replace: false });
    } else {
      const newUri = mainUrl + `&activityView=active&count=${count + 5}`;
      nav(newUri, { replace: false });
    }
  }, [transactions.length, countParam, mainUrl, nav]);

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
                transactions={currentTransaction}
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
                transactions={filteredTransaction}
                filterParam={filterType}
                activityViewIsEnabled={activityParam}
                countParam={countParam}
                fName={fName}
                lName={lName}
                year={year}
                month={month}
                classes={classes}
                isMobile={mobile}
                filterType={filterType}
                filterYear={filterYear}
                filterMonth={filterMonth}
                setAccountActivityView={setAccountActivityView}
                setTransactionViewCount={setTransactionViewCount}
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
              transactions={currentTransaction}
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
              transactions={filteredTransaction}
              filterParam={filterType}
              activityViewIsEnabled={activityParam}
              countParam={countParam}
              classes={classes}
              fName={fName}
              lName={lName}
              year={year}
              month={month}
              isMobile={mobile}
              filterType={filterType}
              filterYear={filterYear}
              filterMonth={filterMonth}
              setAccountActivityView={setAccountActivityView}
              setTransactionViewCount={setTransactionViewCount}
              nav={nav}
            />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default MainProfile;
