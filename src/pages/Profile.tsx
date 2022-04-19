import React, {
  ChangeEvent,
  Dispatch,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  NavigateFunction,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../store/modals/modal-slice";
import { MockStatements } from "../assets/data/MockData";
import { SelectChangeEvent } from "@mui/material";
import { customerActions } from "../store/customer/customer";
import { RootState } from "../store/store";
import { authActions } from "../store/authentication/auth-slice";
import classes from "../styles/ProfileStyles.module.css";
import MoneyTransfer from "../components/UI/Modals/MoneyTransfer";
import MoneyTransferStyles from "../styles/MoneyTransfer.module.css";
import Statement from "../components/UI/Modals/Statement";
import Paperless from "../components/UI/Modals/Paperless";
import AccountNumbers from "../components/UI/Modals/AccountNumbers";
import {
  CREDITSCORE,
  DEBITTRASFER,
  LOANS,
  MAINPROFILE,
  PAYMENT,
  REDIRECT,
  SUMMARY,
} from "../components/UI/Constants/Constants";
import MainProfile from "../components/Account/MainProfile";
import CreditScore from "../components/Account/CreditScore/CreditScore";
import PersonalLoans from "../components/Account/Loans/PersonalLoans";
import Summary from "../components/Account/AccountDetails/Summary";
import { DateAmountType } from "../Interfaces/Maps";
import Payment from "../components/Account/Payments/Payment";

const Profile: React.FC<{
  token: string;
  mobile: boolean;
}> = ({ token, mobile }) => {
  const DateAmount: DateAmountType[] = [];
  const PARAMS = useParams<string>();
  const currentYear: number = new Date().getFullYear();
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth() + 1
  );
  const [view, setView] = useState<boolean>(false);
  const [termsOfChoice, setTermsOfChoice] = useState<string>("");
  const [withdrawals, setWithdrawals] = useState<number>(0);
  const [deposits, setDeposits] = useState<number>(0);
  const modal = useSelector((state: RootState) => state.view);
  const customer = useSelector((state: RootState) => state.cust);
  const dispatch = useDispatch<Dispatch<any>>();
  const navigate: NavigateFunction = useNavigate();
  useEffect(() => {
    const fetchAccount = async () => {
      await axios({
        method: "GET",
        url: "http://localhost:8081/api/v1/authentication/profile/info",
        headers: {
          authorization: token,
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
            isEnabled,
            isLocked,
          } = response.data;
          if (isEnabled && !isLocked) {
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
            return;
          }
          navigate(REDIRECT, { replace: true });
        })
        .catch(() => {
          dispatch(authActions.logout());
        });
    };

    const fetchTransfer = async (accountTransfer: {
      email: string | undefined;
      amount: number;
      accountNumber: string | undefined;
      type: string;
      phoneNumber: string | undefined;
    }) => {
      await axios
        .post(
          "http://localhost:8081/api/v1/authentication/transaction",
          accountTransfer,
          { headers: { authorization: token } }
        )
        .then((response) => {
          if (response.status >= 200 && response.status <= 299) {
            dispatch(
              customerActions.createTransfer({
                accountNumber: "",
                amount: 0,
                email: undefined,
                phoneNumber: undefined,
                type: "",
              })
            );
          }
          dispatch(modalActions.setView({ view: undefined }));
        })
        .catch((error) => {
          console.log(error);
        });
    };
    if (
      (customer.accountTransfer.amount > 0 &&
        customer.accountTransfer.accountNumber &&
        customer.accountTransfer.email) ||
      customer.accountTransfer.phoneNumber
    ) {
      fetchTransfer(customer.accountTransfer);
      return;
    }
    fetchAccount();
  }, [token, dispatch, customer.accountTransfer, navigate]);

  const viewHandler = useCallback(
    (event: ChangeEvent<HTMLElement>) => {
      const VIEW = event.target.innerText;
      dispatch(modalActions.setView({ view: VIEW }));
    },
    [dispatch]
  );

  const exitHandler = useCallback(() => {
    dispatch(modalActions.setView({ view: undefined }));
    setTermsOfChoice("");
    setView(false);
  }, [dispatch]);

  const transferHandler = useCallback(
    (data: {
      email: string | undefined;
      phoneNumber: string | undefined;
      amount: number;
    }) => {
      dispatch(
        customerActions.createTransfer({
          email: data.email,
          accountNumber: customer.accountNum,
          amount: data.amount,
          type: DEBITTRASFER,
          phoneNumber: data.phoneNumber,
        })
      );
    },
    [customer.accountNum, dispatch]
  );

  const paperlessHandler = useCallback(
    (event: SelectChangeEvent<string | boolean>) => {
      const { value } = event.target;
      if (value === "true") {
        dispatch(modalActions.setPaperless({ paperless: true }));
        return;
      }
      dispatch(modalActions.setPaperless({ paperless: false }));
    },
    [dispatch]
  );

  const choiceHandler = useCallback((event: SelectChangeEvent) => {
    const { value } = event.target;
    console.log(value);
    setTermsOfChoice(value);
    setView(true);
  }, []);

  const modals: { key: number; modal: JSX.Element; type: string }[] = [
    {
      key: 1,
      type: "Transfer Money",
      modal: (
        <MoneyTransfer
          classes={MoneyTransferStyles}
          onTransfer={transferHandler}
          Exit={exitHandler}
          onChoice={choiceHandler}
          termsOfChoice={termsOfChoice}
          view={view}
          isMobile={mobile}
        />
      ),
    },
    {
      key: 2,
      type: "Statement",
      modal: (
        <Statement
          classes={MoneyTransferStyles}
          Exit={exitHandler}
          isMobile={mobile}
          MockStatements={MockStatements}
        />
      ),
    },
    {
      key: 3,
      type: "Paperless",
      modal: (
        <Paperless
          classes={MoneyTransferStyles}
          Exit={exitHandler}
          onChoice={paperlessHandler}
          isMobile={mobile}
        />
      ),
    },
    {
      key: 4,
      type: "Full account numbers",
      modal: (
        <AccountNumbers
          classes={MoneyTransferStyles}
          accountNum={customer.accountNum}
          routingNum={customer.routingNum}
          Exit={exitHandler}
          isMobile={mobile}
        />
      ),
    },
  ];

  const ProfileView: { key: number; view: JSX.Element; link: string }[] = [
    {
      key: 1,
      view: (
        <MainProfile
          setCurrentMonth={setCurrentMonth}
          viewHandler={viewHandler}
          customer={customer}
          currentYear={currentYear}
          currentMonth={currentMonth}
          modal={modal}
          modals={modals}
          classes={classes}
          mobile={mobile}
          withdrawals={withdrawals}
          setWithdrawals={setWithdrawals}
          deposits={deposits}
          setDeposits={setDeposits}
        />
      ),
      link: MAINPROFILE,
    },
    {
      key: 2,
      view: <CreditScore customer={customer} isMobile={mobile} />,
      link: CREDITSCORE,
    },
    {
      key: 3,
      view: <PersonalLoans customer={customer} isMobile={mobile} />,
      link: LOANS,
    },
    {
      key: 4,
      view: (
        <Summary
          isMobile={mobile}
          customer={customer}
          year={currentYear}
          month={currentMonth}
          DateAmount={DateAmount}
          withdrawals={withdrawals}
        />
      ),
      link: SUMMARY,
    },
    {
      key: 5,
      view: <Payment customer={customer} isMobile={mobile} />,
      link: PAYMENT,
    },
  ];

  return (
    <>
      {ProfileView.filter((v) => {
        console.log(PARAMS);
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

export default React.memo(Profile);
