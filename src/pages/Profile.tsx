import { Container, Grid } from "@mui/material";
import React, { Dispatch, useEffect, useState } from "react";
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

const Profile: React.FC<{ token: string; mobile: boolean }> = ({
  token,
  mobile,
}) => {
  const [accountTransfer, setAccountTransfer] = useState<{
    email: string | undefined;
    dateOfTransaction: number;
    amount: number;
    location: string;
    accountNumber: string | undefined;
    type: string;
  }>({
    email: "",
    dateOfTransaction: 0,
    amount: 0,
    location: "",
    accountNumber: "",
    type: "",
  });
  const [infoView, setInfoView] = useState<string | undefined>(undefined);
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
          console.log(response.data);
        })
        .catch(() => {
          dispatch(authActions.logout());
        });
    };
    fetchAccount();
  }, [token, dispatch]);

  const classes = styles();
  const viewHandler = (event: any) => {
    const VIEW = event.target.innerText;
    setInfoView(VIEW);
  };
  const exitHandler = () => {
    setInfoView(undefined);
  };

  const transferHandler = (data: {
    email: string | undefined;
    phoneNumber: string | undefined;
    amount: number;
  }) => {
    const date: Date = new Date();
    setAccountTransfer({
      email: data.email,
      amount: data.amount,
      dateOfTransaction: date.getUTCDate(),
      location: "Account transfer",
      type: "transfer",
      accountNumber: customer.accountNum,
    });
  };

  const modals: { key: number; modal: JSX.Element; type: string }[] = [
    {
      key: 1,
      type: "Transfer Money",
      modal: <MoneyTransfer onTransfer={transferHandler} Exit={exitHandler} />,
    },
    {
      key: 2,
      type: "Statement",
      modal: <Statement />,
    },
    {
      key: 3,
      type: "Paperless",
      modal: <Paperless />,
    },
  ];

  return (
    <>
      {infoView &&
        modals
          .filter((m) => {
            return m.type === infoView;
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
