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
import { useDispatch, useSelector } from "react-redux";
import MoneyTransfer from "../components/UI/Modals/MoneyTransfer/MoneyTransfer";
import { Box, CircularProgress } from "@mui/material";
import { customerActions } from "../store/customer/customer-slice";
import classes from "../styles/Profile/ProfileStyles.module.css";
import Statement from "../components/UI/Modals/Statement/Statement";
import Paperless from "../components/UI/Modals/Paperless/Paperless";
import AccountNumbers from "../components/UI/Modals/AccountNumber/AccountNumbers";
import { API_VERSION, MonthMap } from "../components/UI/Constants/Constants";
import MainProfile from "../components/Account/MainProfile";
import AccountSecurity from "../components/UI/Modals/AccountSecurity/AccountSecurity";
import { notisActions } from "../store/notifications/notifications";
import { Account, Card, CustomerDetails } from "../types/CustomerDetails";
import { AccountType, ProfileModal } from "../enums/ProfileEnums";
import AppRoute from "../enums/Route";
import { RootState } from "../store/store";
import { Title } from "../enums/Title";

const Profile: FC<{
  mobile: boolean;
}> = ({ mobile }) => {
  const customer: CustomerDetails = useSelector(
    (state: RootState) => state.cust
  );

  !customer.getInfo
    ? (document.getElementById("title")!.innerText = Title.PROFILE)
    : (document.getElementById("title")!.innerText = Title.SEARCHING);
  const urlParams = useSearchParams();
  const date = new Date();
  const nav: NavigateFunction = useNavigate();
  const [withdrawls, setWithdrawls] = useState<number>(0);
  const [deposits, setDeposits] = useState<number>(0);
  const dispatch = useDispatch<Dispatch<any>>();
  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth() + 1;

  const urlParamActivityView = urlParams[0].get("activityView");
  const urlParamATransferStatus = urlParams[0].get("status");
  const urlParamActions = urlParams[0].get("action");
  const urlParamAccount = urlParams[0].get("account");
  const urlParamDisplay = urlParams[0].get("display");
  const urlParamItemToLock = urlParams[0].get("itemToLock");
  const urlParamMonth = urlParams[0].get("month");
  const urlParamProfileView = urlParams[0].get("view");
  const urlParamTransferBy = urlParams[0].get("transferBy");
  const urlParamYear = urlParams[0].get("year");

  useEffect(() => {
    const fetchAccount: () => void = async () => {
      await axios
        .get(`${API_VERSION}/customer/profile`, {
          headers: {
            authorization: localStorage.getItem("token") as string,
          },
          params: { apiKey: localStorage.getItem("apiKey") as string },
        })
        .then((response) => {
          const {
            firstName,
            lastName,
            email,
            country,
            zipcode,
            state,
            accounts,
            cards,
            transactions,
            notifications,
          } = response.data;
          console.log(response.data);
          dispatch(
            customerActions.createCustomer({
              fName: firstName,
              lName: lastName,
              email: email,
              country: country,
              zipCode: zipcode,
              area: state,
              transactions: transactions,
              accounts: accounts,
              cards: cards,
            })
          );
          dispatch(
            notisActions.setNotifications({
              notis: notifications ? notifications : [],
            })
          );
          nav(
            `${firstName}${lastName}?display=${AppRoute.MAINPROFILE}&account=${accounts[0].id}&year=${currentYear}&month=${MonthMap[currentMonth]}`,
            { replace: true }
          );
        })
        .catch((err) => {
          dispatch(customerActions.logout());
        });
    };
    if (!customer.getInfo) {
      return;
    } else {
      fetchAccount();
    }
  }, [customer.getInfo, nav, dispatch, currentMonth, currentYear]);

  const account: Account = customer.accounts.filter((acc) => {
    const id: number = parseInt(urlParamAccount as string);
    return acc.id === id;
  })[0];

  const nonVisibleAccounts: Account[] = customer.accounts.filter((acc) => {
    const id: number = parseInt(urlParamAccount as string);
    return acc.id !== id;
  });

  const cards: Card | undefined = account.bankAccountType
    ? customer.cards.find((card) => {
        if (account.bankAccountType?.includes(AccountType.CREDIT)) {
          return card.creditType === account.creditType;
        } else {
          return card;
        }
      })
    : undefined;

  const mainProfileURL = `${customer.fName}${customer.lName}?display=${AppRoute.MAINPROFILE}&account=${urlParamAccount}&year=${urlParamYear}&month=${urlParamMonth}`;

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

  const modals: { key: number; modal: JSX.Element; type: string }[] = [
    {
      key: 1,
      type: ProfileModal.MONEYTRANSFER,
      modal: (
        <MoneyTransfer
          myEmail={customer.email}
          account={account}
          isMobile={mobile}
          mainUrl={mainProfileURL}
          Exit={exitHandler}
          onChoice={choiceHandler}
          urlParamDisplay={urlParamDisplay}
          urlParamAccount={urlParamAccount}
          urlParamTransferBy={urlParamTransferBy}
          setTransferStatus={setTransferStatus}
          status={urlParamATransferStatus}
        />
      ),
    },
    {
      key: 2,
      type: ProfileModal.STATEMENT,
      modal: <Statement Exit={exitHandler} isMobile={mobile} />,
    },
    {
      key: 3,
      type: ProfileModal.PAPERLESS,
      modal: <Paperless Exit={exitHandler} isMobile={mobile} />,
    },
    {
      key: 4,
      type: ProfileModal.ACCOUNTNUMBER,
      modal: (
        <AccountNumbers
          param={urlParamAccount}
          accounts={customer.accounts}
          Exit={exitHandler}
          isMobile={mobile}
        />
      ),
    },
    {
      key: 5,
      type: ProfileModal.SECURITY,
      modal: (
        <AccountSecurity
          card={cards as Card}
          account={account}
          Exit={exitHandler}
          isMobile={mobile}
          setAccountSecurityView={setAccountSecrutiyType}
          securityView={urlParamItemToLock}
        />
      ),
    },
  ];

  return (
    <>
      {(!urlParamDisplay ||
        !urlParamAccount ||
        customer.accounts.length <= 0) && (
        <Box
          sx={{ position: "absolute", top: "50%", left: "50%", zIndex: "5" }}
        >
          <CircularProgress />
        </Box>
      )}
      {urlParamDisplay?.includes(AppRoute.MAINPROFILE) &&
        !urlParamProfileView &&
        customer.accounts.length > 0 && (
          <MainProfile
            statementTag={ProfileModal.STATEMENT}
            securityTag={ProfileModal.SECURITY}
            moneyTransferTag={ProfileModal.MONEYTRANSFER}
            paperlessTag={ProfileModal.PAPERLESS}
            accountNumberTag={ProfileModal.ACCOUNTNUMBER}
            account={account}
            otherAccounts={nonVisibleAccounts}
            transactions={customer.transactions}
            classes={classes}
            deposits={deposits}
            mainUrl={mainProfileURL}
            modals={modals}
            mobile={mobile}
            myName={`${customer.fName} ${customer.lName}`}
            withdrawls={withdrawls}
            setAccountActivityView={setAccountActivityView}
            viewHandler={viewHandler}
            setDeposits={setDeposits}
            setWithdrawls={setWithdrawls}
            nav={nav}
          />
        )}
    </>
  );
};

export default memo(Profile);
