import { Grid } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import React, { Dispatch, useEffect } from "react";
import AccountActivity from "../components/Account/AccountActivity/AccountActivity";
import AccountInfo from "../components/Account/AccountCard/AccountInfo";
import AccountDetails from "../components/Account/AccountDetails/AccountDetails";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { customerActions } from "../store/customer/customer";
import { RootState } from "../store/store";

const styles = makeStyles(() => ({
  profile: {
    backgroundColor: "rgb(235, 236, 237)",
    padding: "10px 0",
    width: "100%",
  },
  card: {
    width: "90%",
    margin: "20px auto",
  },
  linksContainer: {
    borderRight: "1px solid purple",
    textAlign: "center",
  },
  links: {
    color: "purple",
    textDecoration: "none",
    "&:hover": {
      color: "blue",
    },
  },
  details: {
    margin: "10px 0",
    textDecoration: "none",
    color: "black",
  },
  activityTitles: {
    textAlign: "center",
  },
  activities: {
    textAlign: "center",
  },
}));

const Profile: React.FC<{ token: string }> = ({ token }) => {
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
      }).then((response) => {
        console.log(response.status);
        if (response.status >= 400) {
          console.log("TRUE");
          return;
        }
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
      });
    };
    fetchAccount();
  }, [token, dispatch]);
  const classes = styles();
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
            />
          </Grid>
          <Grid xs={12} md={12} item>
            <AccountActivity classes={classes} />
          </Grid>
        </Grid>
      </Grid>
      <Grid xs={12} md={5} item>
        <Grid container>
          <Grid xs={12} md={12} item>
            <AccountDetails classes={classes} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Profile;
