import React, {
  ChangeEvent,
  Dispatch,
  useCallback,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { SelectChangeEvent } from "@mui/material";
import { customerActions } from "../store/customer/customer";
import { RootState } from "../store/store";
import { authActions } from "../store/authentication/auth-slice";
import styles from "../styles/ProfileStyles";
import MoneyTransfer from "../components/UI/Modals/MoneyTransfer";
import Statement from "../components/UI/Modals/Statement";
import Paperless from "../components/UI/Modals/Paperless";
import { modalActions } from "../store/modals/modal-slice";
import AccountNumbers from "../components/UI/Modals/AccountNumbers";
import {
  CREDITSCORE,
  DEBITTRASFER,
  LOANS,
  SUMMARY,
} from "../components/UI/Constants/Constants";
import MainProfile from "../components/Account/MainProfile";
import {
  NavigateFunction,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";
import CreditScore from "../components/Account/AccountDetails/CreditScore";
import PersonalLoans from "../components/Account/AccountDetails/PersonalLoans";
import Summary from "../components/Account/AccountDetails/Summary";

const Profile: React.FC<{
  token: string;
  mobile: boolean;
}> = ({ token, mobile }) => {
  const PARAMS = useParams<string>();
  const navigate: NavigateFunction = useNavigate();
  const currentMonth: string = (new Date().getMonth() + 1).toString();
  const currentYear: string = new Date().getFullYear().toString();
  const [tracker, setTracker] = useState<number>(0);
  const [view, setView] = useState<boolean>(false);
  const [termsOfChoice, setTermsOfChoice] = useState<string>("");
  const modal = useSelector((state: RootState) => state.view);
  const customer = useSelector((state: RootState) => state.cust);
  const dispatch = useDispatch<Dispatch<any>>();
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
    console.log("Running UseEffect");
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
  }, [token, dispatch, customer.accountTransfer]);

  const classes = styles();

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
          onTransfer={transferHandler}
          Exit={exitHandler}
          onChoice={choiceHandler}
          termsOfChoice={termsOfChoice}
          view={view}
          mobile={mobile}
        />
      ),
    },
    {
      key: 2,
      type: "Statement",
      modal: <Statement />,
    },
    {
      key: 3,
      type: "Paperless",
      modal: (
        <Paperless
          Exit={exitHandler}
          onChoice={paperlessHandler}
          mobile={mobile}
        />
      ),
    },
    {
      key: 4,
      type: "Full account numbers",
      modal: (
        <AccountNumbers
          accountNum={customer.accountNum}
          routingNum={customer.routingNum}
          Exit={exitHandler}
          mobile={mobile}
        />
      ),
    },
  ];

  const ProfileView: { key: number; view: JSX.Element; link: string }[] = [
    {
      key: 1,
      view: (
        <MainProfile
          viewHandler={viewHandler}
          customer={customer}
          currentYear={currentYear}
          currentMonth={currentMonth}
          modal={modal}
          modals={modals}
          classes={classes}
          mobile={mobile}
        />
      ),
      link: "",
    },
    {
      key: 2,
      view: <CreditScore />,
      link: CREDITSCORE,
    },
    {
      key: 3,
      view: <PersonalLoans />,
      link: LOANS,
    },
    {
      key: 4,
      view: (
        <Summary customer={customer} year={currentYear} month={currentMonth} />
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

export default React.memo(Profile);
