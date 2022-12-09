import { Container, Grid } from "@mui/material";
import { ChangeEvent, Dispatch, FC, SetStateAction, useCallback } from "react";
import { NavigateFunction } from "react-router-dom";
import { AccountType } from "../../enums/ProfileEnums";
import { Account, Transaction } from "../../types/CustomerDetails";
import { MonthMap } from "../UI/Constants/Constants";
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
  statementTag: string;
  securityTag: string;
  moneyTransferTag: string;
  paperlessTag: string;
  accountNumberTag: string;
  setAccountActivityView: () => void;
  setWithdrawls: Dispatch<SetStateAction<number>>;
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
  accountNumberTag,
  moneyTransferTag,
  paperlessTag,
  securityTag,
  statementTag,
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
  setAccountActivityView,
  nav,
  setDeposits,
  setWithdrawls,
  viewHandler,
}) => {
  const myName = fName + " " + lName;
  const view = modals.filter((m) => {
    return m.type.includes(actionParam as string);
  });
  const links: { key: number; title: string }[] = [
    { key: 1, title: statementTag },
    { key: 2, title: paperlessTag },
    { key: 3, title: moneyTransferTag },
    { key: 4, title: securityTag },
  ];
  const filteredLinks = links.filter((l) => {
    if (account && account.bankAccountType.includes(AccountType.CREDIT)) {
      return l.title !== moneyTransferTag;
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
                accountNumberTag={accountNumberTag}
                account={account}
                myName={myName}
                transactions={currentTransaction}
                classes={classes}
                links={filteredLinks}
                withdrawals={withdrawals}
                setWithdrawals={setWithdrawls}
                deposits={deposits}
                setDeposits={setDeposits}
                onSetView={viewHandler}
              />
              <AccountVisual
                classes={classes}
                fName={fName}
                lName={lName}
                nonVisibleAccounts={nonVisibleAccounts}
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
              accountNumberTag={accountNumberTag}
              account={account}
              classes={classes}
              links={filteredLinks}
              onSetView={viewHandler}
              myName={myName}
              transactions={currentTransaction}
              withdrawals={withdrawals}
              setWithdrawals={setWithdrawls}
              deposits={deposits}
              setDeposits={setDeposits}
            />
          </Grid>
          <Grid container>
            <AccountVisual
              classes={classes}
              fName={fName}
              lName={lName}
              nonVisibleAccounts={nonVisibleAccounts}
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
