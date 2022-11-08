import {
  FC,
  ChangeEvent,
  Dispatch,
  useCallback,
  useEffect,
  useState,
  memo,
} from "react";
import {
  NavigateFunction,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import MoneyTransfer from "../components/UI/Modals/MoneyTransfer/MoneyTransfer";
import { modalActions } from "../store/modals/modal-slice";
import { MockStatements } from "../assets/data/MockData";
import { Box, CircularProgress, SelectChangeEvent } from "@mui/material";
import { customerActions } from "../store/customer/customer-slice";
import classes from "../styles/Profile/ProfileStyles.module.css";
import MoneyTransferStyles from "../styles/Modals/Modals.module.css";
import Statement from "../components/UI/Modals/Statement/Statement";
import Paperless from "../components/UI/Modals/Paperless/Paperless";
import AccountNumbers from "../components/UI/Modals/AccountNumber/AccountNumbers";
import {
  ACCOUNTNUMBER,
  MAINPROFILE,
  MONEYTRANSFER,
  MonthMap,
  PAPERLESS,
  SECURITY,
  STATEMENT,
  SUMMARY,
} from "../components/UI/Constants/Constants";
import MainProfile from "../components/Account/MainProfile";
import Summary from "../components/Account/AccountDetails/Summary";
import { DateAmountType } from "../types/Maps";
import AccountSecurity from "../components/UI/Modals/AccountSecurity/AccountSecurity";
import { backdropDiv, overlayDiv } from "../components/UI/Layouts/RootElement";
import { notisActions } from "../store/notifications/notifications";
import {
  Account,
  CustomerDetails,
  Transaction,
} from "../types/CustomerDetails";

const Profile: FC<{
  Location: Location;
  mobile: boolean;
  API_VERSION: string | undefined;
  customer: CustomerDetails;
}> = ({ mobile, customer, Location, API_VERSION }) => {
  const urlParams = useSearchParams();
  const nav: NavigateFunction = useNavigate();
  const DateAmount: DateAmountType[] = [];

  const [view, setView] = useState<boolean>(false);
  const [termsOfChoice, setTermsOfChoice] = useState<string>("");
  const [withdrawals, setWithdrawals] = useState<number>(0);
  const [deposits, setDeposits] = useState<number>(0);
  const [period, setPeriod] = useState<{ year: number; month: number }>({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  });
  const dispatch = useDispatch<Dispatch<any>>();

  const urlParamDisplay = urlParams[0].get("display");
  const urlParamActions = urlParams[0].get("action");
  const urlParamAccount = urlParams[0].get("account");
  const urlParamProfileView = urlParams[0].get("view");
  const urlParamMonth = urlParams[0].get("month");
  const urlParamYear = urlParams[0].get("year");

  useEffect(() => {
    if (!customer.getInfo) return;
    const fetchAccount: (token: string | null) => void = async (token) => {
      await axios
        .get(
          `http://localhost:8081/${API_VERSION}/authentication/profile/info`,
          {
            headers: {
              authorization: token as string,
            },
          }
        )
        .then((response) => {
          const {
            fName,
            lName,
            email,
            country,
            zipCode,
            state,
            accounts,
            cards,
            transactions,
            notis,
          } = response.data;
          dispatch(
            customerActions.createCustomer({
              fName: fName,
              lName: lName,
              email: email,
              country: country,
              zipCode: zipCode,
              area: state,
              transactions: transactions,
              accounts: accounts,
              cards: cards,
            })
          );
          dispatch(notisActions.getNotis({ notis: notis ? notis : [] }));
          nav(
            `${fName}${lName}?display=${MAINPROFILE}&account=${
              accounts[0].id
            }&year=${period.year}&month=${MonthMap[period.month]}`
          );
        })
        .catch(() => {
          dispatch(customerActions.logout());
        });
    };
    fetchAccount(customer.token);
  }, [
    customer.token,
    customer.getInfo,
    period.year,
    period.month,
    nav,
    dispatch,
    API_VERSION,
  ]);

  const mainProfileURL = `${customer.fName}${customer.lName}?display=${MAINPROFILE}&account=${urlParamAccount}&year=${urlParamYear}&month=${urlParamMonth}`;
  const summaryURL = `${mainProfileURL}&view=${SUMMARY}`;

  const viewHandler = useCallback(
    (event: ChangeEvent<HTMLElement>) => {
      const { innerText } = event.target;
      nav(mainProfileURL + `&action=${innerText}`, {
        replace: false,
      });
    },
    [nav, mainProfileURL]
  );

  const exitHandler = useCallback(() => {
    nav(mainProfileURL, {
      replace: false,
    });
    if (termsOfChoice.trim().length > 0) {
      setTermsOfChoice("");
    }
    setView(false);
  }, [nav, mainProfileURL, termsOfChoice]);

  const choiceHandler = useCallback((event: SelectChangeEvent) => {
    const { value } = event.target;
    setTermsOfChoice(value);
    setView(true);
  }, []);

  const account: Account = customer.accounts.filter((acc) => {
    const id: number = parseInt(urlParamAccount as string);
    return acc.id === id;
  })[0];

  const nonVisibleAccounts: Account[] = customer.accounts.filter((acc) => {
    const id: number = parseInt(urlParamAccount as string);
    return acc.id !== id;
  });

  const transactions: Transaction[] = customer.transactions.filter((t) => {
    const year = +t.dateOfTransaction.substring(0, 4);
    const month = +t.dateOfTransaction.substring(5, 7);
    return (
      t.accountNumber === account.accountNumber &&
      MonthMap[month] === urlParamMonth &&
      year === period.year
    );
  });

  const modals: { key: number; modal: JSX.Element; type: string }[] = [
    {
      key: 1,
      type: MONEYTRANSFER,
      modal: (
        <MoneyTransfer
          Location={Location}
          API_VERSION={API_VERSION}
          token={customer.token}
          BACKDROPDIV={backdropDiv}
          OVERLAYDIV={overlayDiv}
          classes={MoneyTransferStyles}
          account={account}
          termsOfChoice={termsOfChoice}
          view={view}
          isMobile={mobile}
          axios={axios}
          dispatch={dispatch}
          Exit={exitHandler}
          onChoice={choiceHandler}
          setView={modalActions.setView}
          nav={nav}
          logout={customerActions.logout}
          urlParamDisplay={urlParamDisplay}
          urlParamAccount={urlParamAccount}
        />
      ),
    },
    {
      key: 2,
      type: STATEMENT,
      modal: (
        <Statement
          BACKDROPDIV={backdropDiv}
          OVERLAYDIV={overlayDiv}
          classes={MoneyTransferStyles}
          Exit={exitHandler}
          isMobile={mobile}
          MockStatements={MockStatements}
          nav={nav}
        />
      ),
    },
    {
      key: 3,
      type: PAPERLESS,
      modal: (
        <Paperless
          token={customer.token}
          API_VERSION={API_VERSION}
          axios={axios}
          BACKDROPDIV={backdropDiv}
          OVERLAYDIV={overlayDiv}
          classes={MoneyTransferStyles}
          Exit={exitHandler}
          isMobile={mobile}
          nav={nav}
        />
      ),
    },
    {
      key: 4,
      type: ACCOUNTNUMBER,
      modal: (
        <AccountNumbers
          param={urlParamAccount}
          accounts={customer.accounts}
          BACKDROPDIV={backdropDiv}
          OVERLAYDIV={overlayDiv}
          classes={MoneyTransferStyles}
          Exit={exitHandler}
          isMobile={mobile}
        />
      ),
    },
    {
      key: 5,
      type: SECURITY,
      modal: (
        <AccountSecurity
          Location={Location}
          isCardLocked={false}
          account={account}
          axios={axios}
          API_VERSION={API_VERSION}
          token={customer.token}
          Exit={exitHandler}
          classes={MoneyTransferStyles}
          isMobile={mobile}
          BACKDROPDIV={backdropDiv}
          OVERLAYDIV={overlayDiv}
          nav={nav}
        />
      ),
    },
  ];

  return (
    <>
      {(!urlParamDisplay || !urlParamAccount) && (
        <Box
          sx={{ position: "absolute", top: "50%", left: "50%", zIndex: "5" }}
        >
          <CircularProgress />
        </Box>
      )}
      {urlParamDisplay?.includes(MAINPROFILE) && !urlParamProfileView && (
        <MainProfile
          STATEMENT={STATEMENT}
          SECURITY={SECURITY}
          MONEYTRANSFER={MONEYTRANSFER}
          PAPERLESS={PAPERLESS}
          ACCOUNTNUMBER={ACCOUNTNUMBER}
          account={account}
          actionParam={urlParamActions}
          accountParam={urlParamAccount}
          classes={classes}
          deposits={deposits}
          fName={customer.fName}
          lName={customer.lName}
          year={urlParamYear}
          month={urlParamMonth}
          modals={modals}
          mobile={mobile}
          nonVisibleAccounts={nonVisibleAccounts}
          summaryURL={summaryURL}
          transactions={transactions}
          withdrawals={withdrawals}
          viewHandler={viewHandler}
          setDeposits={setDeposits}
          setWithdrawals={setWithdrawals}
          nav={nav}
        />
      )}
      {urlParamDisplay?.includes(MAINPROFILE) && urlParamProfileView && (
        <Summary
          isMobile={mobile}
          transactions={transactions}
          year={period.year}
          DateAmount={DateAmount}
          withdrawals={withdrawals}
        />
      )}
    </>
  );
};

export default memo(Profile);
