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
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import MoneyTransfer from "../components/UI/Modals/MoneyTransfer/MoneyTransfer";
import { modalActions } from "../store/modals/modal-slice";
import { MockStatements } from "../assets/data/MockData";
import { SelectChangeEvent } from "@mui/material";
import { customerActions } from "../store/customer/customer-slice";
import classes from "../styles/Profile/ProfileStyles.module.css";
import MoneyTransferStyles from "../styles/Modals/Modals.module.css";
import Statement from "../components/UI/Modals/Statement/Statement";
import Paperless from "../components/UI/Modals/Paperless/Paperless";
import AccountNumbers from "../components/UI/Modals/AccountNumber/AccountNumbers";
import {
  ACCOUNTNUMBER,
  DEBITTRASFER,
  MAINPROFILE,
  MONEYTRANSFER,
  PAPERLESS,
  SECURITY,
  STATEMENT,
  SUMMARY,
} from "../components/UI/Constants/Constants";
import MainProfile from "../components/Account/MainProfile";
import Summary from "../components/Account/AccountDetails/Summary";
import { DateAmountType } from "../interfaces/Maps";
import AccountSecurity from "../components/UI/Modals/AccountSecurity/AccountSecurity";
import { backdropDiv, overlayDiv } from "../components/UI/Layouts/RootElement";
import { notisActions } from "../store/notifications/notifications";

const Profile: FC<{
  Location: Location;
  token: string | null;
  mobile: boolean;
  param: URLSearchParams;
  API_VERSION: string | undefined;
  customer: {
    fName: string;
    lName: string;
    email: string;
    accountNum: string;
    routingNum: string;
    country: string | undefined;
    area: string | undefined;
    zipCode: string | undefined;
    isLocked: boolean;
    isEnabled: boolean;
    funds: number;
    transactions: {
      id: number;
      type: string;
      dateOfTransaction: string;
      amount: number;
      location: string;
    }[];
    accountTransfer: {
      email: string | undefined;
      amount: number;
      accountNumber: string;
      type: string;
      phoneNumber: string | undefined;
    };
  };
}> = ({ token, mobile, customer, Location, API_VERSION, param }) => {
  const nav: NavigateFunction = useNavigate();
  const DateAmount: DateAmountType[] = [];
  const PARAMS = useParams<string>();
  const currentYear: number = new Date().getFullYear();
  const currentMonth: number = new Date().getMonth() + 1;
  const [view, setView] = useState<boolean>(false);
  const [termsOfChoice, setTermsOfChoice] = useState<string>("");
  const [withdrawals, setWithdrawals] = useState<number>(0);
  const [deposits, setDeposits] = useState<number>(0);
  const dispatch = useDispatch<Dispatch<any>>();

  useEffect(() => {
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
            funds,
            accountNum,
            routingNum,
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
              funds: funds,
              accountingNum: accountNum,
              routingNum: routingNum,
              transactions: transactions,
            })
          );
          dispatch(notisActions.getNotis({ notis: notis }));
        })
        .catch(() => {
          dispatch(customerActions.logout());
        });
    };
    fetchAccount(token);
  }, [token, dispatch, API_VERSION]);

  const viewHandler = useCallback(
    (event: ChangeEvent<HTMLElement>) => {
      const VIEW = event.target.innerText;
      nav(`?action=${VIEW}`, { replace: false });
    },
    [nav]
  );

  const exitHandler = useCallback(() => {
    nav("/profile", { replace: false });
    setTermsOfChoice("");
    setView(false);
  }, [nav]);

  const choiceHandler = useCallback((event: SelectChangeEvent) => {
    const { value } = event.target;
    setTermsOfChoice(value);
    setView(true);
  }, []);

  const modals: { key: number; modal: JSX.Element; type: string }[] = [
    {
      key: 1,
      type: MONEYTRANSFER,
      modal: (
        <MoneyTransfer
          Location={Location}
          API_VERSION={API_VERSION}
          token={token}
          BACKDROPDIV={backdropDiv}
          OVERLAYDIV={overlayDiv}
          classes={MoneyTransferStyles}
          accountNum={customer.accountNum}
          accountTransfer={customer.accountTransfer}
          DEBITTRANSFER={DEBITTRASFER}
          termsOfChoice={termsOfChoice}
          view={view}
          isMobile={mobile}
          axios={axios}
          dispatch={dispatch}
          Exit={exitHandler}
          onChoice={choiceHandler}
          CreateTransfer={customerActions.createTransfer}
          setView={modalActions.setView}
          nav={nav}
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
          token={token}
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
          BACKDROPDIV={backdropDiv}
          OVERLAYDIV={overlayDiv}
          classes={MoneyTransferStyles}
          accountNum={customer.accountNum}
          routingNum={customer.routingNum}
          Exit={exitHandler}
          isMobile={mobile}
          nav={nav}
        />
      ),
    },
    {
      key: 5,
      type: SECURITY,
      modal: (
        <AccountSecurity
          Location={Location}
          isCardLocked={customer.isLocked}
          accountNumber={customer.accountNum}
          axios={axios}
          API_VERSION={API_VERSION}
          token={token}
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

  const ProfileView: { key: number; view: JSX.Element; link: string }[] = [
    {
      key: 1,
      view: (
        <MainProfile
          STATEMENT={STATEMENT}
          SECURITY={SECURITY}
          MONEYTRANSFER={MONEYTRANSFER}
          PAPERLESS={PAPERLESS}
          ACCOUNTNUMBER={ACCOUNTNUMBER}
          viewHandler={viewHandler}
          customer={customer}
          currentYear={currentYear}
          currentMonth={currentMonth}
          modals={modals}
          classes={classes}
          mobile={mobile}
          withdrawals={withdrawals}
          setWithdrawals={setWithdrawals}
          deposits={deposits}
          setDeposits={setDeposits}
          param={param}
        />
      ),
      link: MAINPROFILE,
    },
    {
      key: 2,
      view: (
        <Summary
          isMobile={mobile}
          customer={customer}
          year={currentYear}
          DateAmount={DateAmount}
          withdrawals={withdrawals}
        />
      ),
      link: SUMMARY,
    },
  ];

  return (
    <>
      {ProfileView.filter((v) => {
        return v.link.trim() === PARAMS["*"];
      }).map((v) => {
        return (
          <Routes key={v.key}>
            <Route path={v.link} element={v.view} />
          </Routes>
        );
      })}
    </>
  );
};

export default memo(Profile);
