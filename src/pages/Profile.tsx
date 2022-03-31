import { Grid } from "@mui/material";
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

const Profile: React.FC<{ token: string; mobile: boolean }> = ({
  token,
  mobile,
}) => {
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
  return (
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
  );
};

export default Profile;
