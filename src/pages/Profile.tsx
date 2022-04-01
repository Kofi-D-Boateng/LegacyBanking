import { Container, Grid, SelectChangeEvent } from "@mui/material";
import React, { ChangeEvent, Dispatch, useEffect, useState } from "react";
import AccountActivity from "../components/Account/AccountActivity/AccountActivity";
import AccountInfo from "../components/Account/AccountCard/AccountInfo";
import AccountDetails from "../components/Account/AccountDetails/AccountDetails";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { customerActions } from "../store/customer/customer";
import { RootState } from "../store/store";
import { authActions } from "../store/authentication/auth-slice";
import styles from "../styles/ProfileStyles";
import AccountCoupons from "../components/Account/AccountCoupons/AccountCoupons";
import MoneyTransfer from "../components/UI/Modals/MoneyTransfer";
import Statement from "../components/UI/Modals/Statement";
import Paperless from "../components/UI/Modals/Paperless";
import { modalActions } from "../store/modals/modal-slice";

const Profile: React.FC<{ token: string; mobile: boolean }> = ({
  token,
  mobile,
}) => {
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
      await axios({
        method: "POST",
        url: "http://localhost:8081/api/v1/authentication/profile/info",
        data: accountTransfer,
        headers: {
          authorization: token,
        },
      })
        .then((response) => {
          if (response.status >= 200 && response.status <= 299) {
            dispatch(
              customerActions.createTransfer({
                accountNumber: undefined,
                amount: 0,
                email: undefined,
                location: "",
                phoneNumber: undefined,
                type: "",
              })
            );
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    if (
      customer.accountTransfer.amount > 0 &&
      customer.accountTransfer.accountNumber &&
      customer.accountTransfer.email
    ) {
      fetchTransfer(customer.accountTransfer);
      return;
    }
    fetchAccount();
  }, [token, dispatch, customer.accountTransfer]);

  const classes = styles();
  const viewHandler = (event: ChangeEvent<HTMLElement>) => {
    const VIEW = event.target.innerText;
    dispatch(modalActions.setView({ view: VIEW }));
  };
  const exitHandler = () => {
    dispatch(modalActions.setView({ view: undefined }));
    setTermsOfChoice("");
    setView(false);
  };

  const transferHandler = (data: {
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
  };

  const paperlessHandler = (event: SelectChangeEvent<string | boolean>) => {
    const { value } = event.target;
    console.log(typeof value);
    if (value === "true") {
      dispatch(modalActions.setPaperless({ paperless: true }));
      return;
    }
    dispatch(modalActions.setPaperless({ paperless: false }));
  };

  const choiceHandler = (event: SelectChangeEvent) => {
    const { value } = event.target;
    console.log(value);
    setTermsOfChoice(value);
    setView(true);
  };

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
        <Grid xs={12} lg={7} item>
          <Grid container>
            <Grid xs={12} md={12} item>
              <AccountInfo
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
                transactions={customer.transactions}
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

export default Profile;
