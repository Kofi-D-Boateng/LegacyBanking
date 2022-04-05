import React, {
  ChangeEvent,
  Dispatch,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Container, Grid, SelectChangeEvent } from "@mui/material";
import AccountActivity from "../components/Account/AccountActivity/AccountActivity";
import AccountInfo from "../components/Account/AccountCard/AccountInfo";
import AccountDetails from "../components/Account/AccountDetails/AccountDetails";
import { customerActions } from "../store/customer/customer";
import { RootState } from "../store/store";
import { authActions } from "../store/authentication/auth-slice";
import styles from "../styles/ProfileStyles";
import AccountCoupons from "../components/Account/AccountCoupons/AccountCoupons";
import MoneyTransfer from "../components/UI/Modals/MoneyTransfer";
import Statement from "../components/UI/Modals/Statement";
import Paperless from "../components/UI/Modals/Paperless";
import { modalActions } from "../store/modals/modal-slice";
import AccountNumbers from "../components/UI/Modals/AccountNumbers";

const Profile: React.FC<{ token: string; mobile: boolean }> = ({
  token,
  mobile,
}) => {
  const currentMonth: string = (new Date().getMonth() + 1).toString();
  const currentYear: string = new Date().getFullYear().toString();
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
      location: string;
      accountNumber: string | undefined;
      type: string;
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
                location: "",
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
          location: "Account transfer",
          type: "transfer",
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

  return (
    <>
      {modal.view &&
        modals
          .filter((m) => {
            return m.type === modal.view;
          })
          .map((a) => {
            return <Container key={a.key}>{a.modal}</Container>;
          })}
      <Grid className={classes.profile} container>
        <Grid xs={12} md={7} item>
          <Grid container>
            <Grid xs={12} md={12} item>
              <AccountInfo
                YEAR={currentYear}
                MONTH={currentMonth}
                mobile={mobile}
                classes={classes}
                fName={customer.fName}
                lName={customer.lName}
                funds={customer.funds}
                transactions={customer.transactions}
                onSetView={viewHandler}
              />
            </Grid>
            <Grid xs={12} md={12} item>
              <AccountActivity
                YEAR={currentYear}
                MONTH={currentMonth}
                transactions={useMemo(
                  () => customer.transactions,
                  [customer.transactions]
                )}
                classes={classes}
              />
            </Grid>
          </Grid>
        </Grid>
        {!mobile && (
          <Grid xs={12} md={5} item>
            <Grid container>
              <Grid xs={12} md={12} item>
                <AccountDetails classes={classes} />
              </Grid>
              <Grid xs={12} md={12} item>
                <AccountCoupons classes={classes} />
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default React.memo(Profile);
