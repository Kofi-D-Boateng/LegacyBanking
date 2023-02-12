import {  Container, Grid } from "@mui/material";
import { ChangeEvent, Dispatch, FC, SetStateAction, useCallback } from "react";
import { NavigateFunction, useSearchParams } from "react-router-dom";
import { AccountType } from "../../enums/ProfileEnums";
import { Account,Transaction } from "../../types/CustomerDetails";
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
  myName: string
  account: Account
  otherAccounts: Account[]
  transactions: Transaction[]
  summaryURL: string;
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
  account,
  myName,
  otherAccounts,
  transactions,
  mainUrl,
  setAccountActivityView,
  nav,
  setDeposits,
  setWithdrawls,
  viewHandler,
}) => {
  const urlParams = useSearchParams();
  const urlParamActivityView = urlParams[0].get("activityView");
  const urlParamAccount = urlParams[0].get("account");
  const urlParamActions = urlParams[0].get("action");
  const urlParamActivityViewCount = urlParams[0].get("count");
  const urlParamFilter = urlParams[0].get("filter");
  const urlParamMonth = urlParams[0].get("month");
  const urlParamYear = urlParams[0].get("year");
  const urlParamFilterYear = urlParams[0].get("filterYear");
  const urlParamFilterMonth = urlParams[0].get("filterMonth");


  const view = modals.filter((m) => {
    return m.type.includes(urlParamActions as string);
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
      MonthMap[tMonth] === urlParamMonth as string &&
      tYear === urlParamYear as string
    );
  });

  const filteredTransaction: Transaction[] =
    !urlParamFilterMonth && !urlParamFilterYear
      ? currentTransaction
      : transactions.filter((t) => {
          const tYear = t.dateOfTransaction.substring(0, 4);
          const tMonth = +t.dateOfTransaction.substring(5, 7);
          if (urlParamFilter?.includes("Year")) {
            return (
              t.accountNumber === account.accountNumber &&
              MonthMap[tMonth] === urlParamMonth as string &&
              tYear === urlParamFilterYear as string
            );
          } else if (urlParamFilter?.includes("Month")) {
            return (
              t.accountNumber === account.accountNumber &&
              MonthMap[tMonth] === urlParamFilterMonth &&
              tYear === urlParamYear
            );
          } else if (urlParamFilter?.includes("Both")) {
            return (
              t.accountNumber === account.accountNumber &&
              MonthMap[tMonth] === urlParamFilterMonth &&
              tYear === urlParamFilterYear
            );
          }
          return t;
        });

  const setTransactionViewCount = useCallback(() => {
    const count: number = parseInt(urlParamActivityViewCount as string);
    if (count > transactions.length) {
      const newUri = mainUrl + `&activityView=active&count=10`;
      nav(newUri, { replace: false });
    } else {
      const newUri = mainUrl + `&activityView=active&count=${count + 5}`;
      nav(newUri, { replace: false });
    }
  }, [transactions.length, urlParamActivityViewCount, mainUrl, nav]);

  return (
    <>
      {urlParamActions &&
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
                myName={myName}
                nonVisibleAccounts={otherAccounts}
                year={urlParamYear}
                month={urlParamMonth}
                nav={nav}
              />
              <AccountActivity
                accountParam={urlParamAccount}
                transactions={filteredTransaction}
                filterParam={urlParamFilter}
                activityViewIsEnabled={urlParamActivityView}
                countParam={urlParamActivityViewCount}
                myName={myName}
                year={urlParamYear}
                month={urlParamMonth}
                classes={classes}
                isMobile={mobile}
                filterYear={urlParamFilterYear}
                filterMonth={urlParamFilterMonth}
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
              myName={myName}
              nonVisibleAccounts={otherAccounts}
              year={urlParamYear}
              month={urlParamMonth}
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
              accountParam={urlParamAccount}
              transactions={filteredTransaction}
              filterParam={urlParamFilter}
              activityViewIsEnabled={urlParamActivityView}
              countParam={urlParamActivityViewCount}
              classes={classes}
              myName={myName}
              year={urlParamYear}
              month={urlParamMonth}
              isMobile={mobile}
              filterYear={urlParamFilterYear}
              filterMonth={urlParamFilterMonth}
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
