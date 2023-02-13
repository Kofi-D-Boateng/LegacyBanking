import { NavLink } from "react-router-dom";
import { Dispatch, FC, useCallback, useState, MouseEvent } from "react";
import { useDispatch } from "react-redux";
import {
  Typography,
  Box,
  IconButton,
  MenuItem,
  Menu,
  AppBar,
  Toolbar,
} from "@mui/material/";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import classes from "../../../styles/Navbar/NavbarStyles.module.css";
import MainMobile from "./Mobile/MainMobile";
import MainWeb from "./Web/MainWeb";
import { customerActions } from "../../../store/customer/customer-slice";
import { CustomerDetails } from "../../../types/CustomerDetails";
import { Link } from "../../../types/Link";
import axios from "axios";
import { API_VERSION } from "../Constants/Constants";

const Navbar: FC<{
  isMobile: boolean;
  customer: CustomerDetails;
  links: Link[];
  authLinks: Link[];
}> = ({ customer, isMobile, links, authLinks }) => {
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const dispatch = useDispatch<Dispatch<any>>();

  const handleMenu = useCallback((event: MouseEvent<any>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(
    async (event: MouseEvent<HTMLElement>) => {
      const { innerText } = event.currentTarget;
      if (innerText === "Log out") {
        await axios
          .get(`${API_VERSION}/customer/logout`, {
            headers: { authorization: localStorage.getItem("token") as string },
            params:{apiKey: localStorage.getItem("apiKey") as string}
          })
          .catch(() => dispatch(customerActions.logout()));
        dispatch(customerActions.logout());
      }
      setAnchorEl(null);
    },
    [dispatch]
  );

  return (
    <Box sx={{ flexGrow: 1, borderBottom: "0.1px solid lightgray" }}>
      <AppBar
        className={classes.navbar}
        color="transparent"
        position="static"
        elevation={0}
      >
        <Toolbar variant="dense">
          <Typography className={classes.logoDiv} variant="h6">
            <NavLink style={{ textDecoration: "none" }} to="/">
              Legacy
            </NavLink>
          </Typography>
          {isMobile ? (
            <MainMobile
              auth={customer.authenticated}
              classes={classes}
              handleClose={handleClose}
              handleMenu={handleMenu}
              anchorEl={anchorEl}
              IconButton={IconButton}
              Menu={Menu}
              MenuItem={MenuItem}
              NavLink={NavLink}
              authLinks={authLinks}
              MenuIcon={MenuIcon}
              links={links}
            />
          ) : (
            <MainWeb
              auth={customer.authenticated}
              classes={classes}
              handleClose={handleClose}
              handleMenu={handleMenu}
              anchorEl={anchorEl}
              Typography={Typography}
              IconButton={IconButton}
              Menu={Menu}
              MenuItem={MenuItem}
              NavLink={NavLink}
              AccountCircle={AccountCircle}
              authLinks={authLinks}
              links={links}
            />
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export { Navbar };
