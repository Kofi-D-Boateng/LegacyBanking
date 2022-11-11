import {
  FC,
  ChangeEvent,
  Dispatch,
  useCallback,
  useEffect,
  useState,
  memo,
  MouseEvent,
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
import { Box, CircularProgress } from "@mui/material";
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
import { Account, CustomerDetails } from "../types/CustomerDetails";

const Profile: FC<{
  Location: Location;
  mobile: boolean;
  API_VERSION: string | undefined;
  customer: CustomerDetails;
}> = ({ mobile, customer, Location, API_VERSION }) => {
  const urlParams = useSearchParams();
  const date = new Date();
  const nav: NavigateFunction = useNavigate();
  const DateAmount: DateAmountType[] = [];

  const [withdrawals, setWithdrawals] = useState<number>(0);
  const [deposits, setDeposits] = useState<number>(0);
  const dispatch = useDispatch<Dispatch<any>>();
  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth() + 1;

  const urlParamDisplay = urlParams[0].get("display");
  const urlParamActions = urlParams[0].get("action");
  const urlParamAccount = urlParams[0].get("account");
  const urlParamProfileView = urlParams[0].get("view");
  const urlParamMonth = urlParams[0].get("month");
  const urlParamYear = urlParams[0].get("year");
  const urlParamFilter = urlParams[0].get("filter");
  const urlParamFilterYear = urlParams[0].get("filterYear");
  const urlParamFilterMonth = urlParams[0].get("filterMonth");
  const urlParamTransferBy = urlParams[0].get("transferBy");
  const urlParamActivityView = urlParams[0].get("activityView");
  const urlParamActivityViewCount = urlParams[0].get("count");
  const urlParamATransferStatus = urlParams[0].get("status");
  const urlParamItemToLock = urlParams[0].get("itemToLock");

  useEffect(() => {
    if (!customer.getInfo) return;
    const fetchAccount: (token: string | null) => void = async (token) => {
      await axios
        .get(`${API_VERSION}/authentication/profile/info`, {
          headers: {
            authorization: token as string,
          },
        })
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
            `${fName}${lName}?display=${MAINPROFILE}&account=${accounts[0].id}&year=${currentYear}&month=${MonthMap[currentMonth]}`
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
    nav,
    dispatch,
    API_VERSION,
    currentMonth,
    currentYear,
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
  }, [nav, mainProfileURL]);

  const choiceHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      const url =
        mainProfileURL + `&action=${urlParamActions}&transferBy=${value}`;
      nav(url, { replace: false });
    },
    [mainProfileURL, nav, urlParamActions]
  );

  const resetInfo = useCallback(() => {
    nav(mainProfileURL, { replace: true });
  }, [nav, mainProfileURL]);

  const setTransferStatus = useCallback(
    (param: string) => {
      const newUrl = mainProfileURL.concat(
        `&action=${urlParamActions}&transferBy=${urlParamTransferBy}&status=${param}`
      );
      nav(newUrl, { replace: true });
    },
    [nav, mainProfileURL, urlParamActions, urlParamTransferBy]
  );

  const setAccountSecrutiyType = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      const param = e.currentTarget.value;
      const newUrl = mainProfileURL.concat(
        `&action=${urlParamActions}&itemToLock=${param}`
      );
      nav(newUrl, { replace: false });
    },
    [nav, urlParamActions, mainProfileURL]
  );

  const setAccountActivityView = () => {
    if (urlParamActivityView?.includes("active")) {
      nav(mainProfileURL, { replace: false });
    } else {
      nav(mainProfileURL + `&activityView=active&count=10`, { replace: false });
    }
  };

  const account: Account = customer.accounts.filter((acc) => {
    const id: number = parseInt(urlParamAccount as string);
    return acc.id === id;
  })[0];

  const nonVisibleAccounts: Account[] = customer.accounts.filter((acc) => {
    const id: number = parseInt(urlParamAccount as string);
    return acc.id !== id;
  });

  const modals: { key: number; modal: JSX.Element; type: string }[] = [
    {
      key: 1,
      type: MONEYTRANSFER,
      modal: (
        <MoneyTransfer
          Location={Location}
          API_VERSION={API_VERSION}
          myEmail={customer.email}
          token={customer.token}
          BACKDROPDIV={backdropDiv}
          OVERLAYDIV={overlayDiv}
          classes={MoneyTransferStyles}
          account={account}
          isMobile={mobile}
          axios={axios}
          dispatch={dispatch}
          Exit={exitHandler}
          onChoice={choiceHandler}
          setView={modalActions.setView}
          logout={customerActions.logout}
          urlParamDisplay={urlParamDisplay}
          urlParamAccount={urlParamAccount}
          urlParamTransferBy={urlParamTransferBy}
          resetInfo={resetInfo}
          setTransferStatus={setTransferStatus}
          status={urlParamATransferStatus}
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
          setAccountSecurityView={setAccountSecrutiyType}
          securityView={urlParamItemToLock}
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
          activityParam={urlParamActivityView}
          countParam={urlParamActivityViewCount}
          classes={classes}
          deposits={deposits}
          fName={customer.fName}
          lName={customer.lName}
          year={urlParamYear}
          month={urlParamMonth}
          filterType={urlParamFilter}
          filterYear={urlParamFilterYear}
          filterMonth={urlParamFilterMonth}
          mainUrl={mainProfileURL}
          modals={modals}
          mobile={mobile}
          nonVisibleAccounts={nonVisibleAccounts}
          summaryURL={summaryURL}
          transactions={customer.transactions}
          withdrawals={withdrawals}
          setAccountActivityView={setAccountActivityView}
          viewHandler={viewHandler}
          setDeposits={setDeposits}
          setWithdrawals={setWithdrawals}
          nav={nav}
        />
      )}
      {urlParamDisplay?.includes(MAINPROFILE) && urlParamProfileView && (
        <Summary
          isMobile={mobile}
          transactions={customer.transactions}
          year={parseInt(urlParamYear as string)}
          DateAmount={DateAmount}
          withdrawals={withdrawals}
        />
      )}
    </>
  );
};

export default memo(Profile);
