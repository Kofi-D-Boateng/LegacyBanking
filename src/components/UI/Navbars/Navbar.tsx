import { NavLink } from "react-router-dom";
import React, { Dispatch, useCallback, useState } from "react";
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
import { authActions } from "../../../store/authentication/auth-slice";
import classes from "../../../styles/NavbarStyles.module.css";
import MainMobile from "./Mobile/MainMobile";
import MainWeb from "./Web/MainWeb";
import { Auth } from "../../../Interfaces/Auth";
import { AxiosStatic } from "axios";

const Navbar: React.FC<{
  URL: string;
  axios: AxiosStatic;
  isMobile: boolean;
  auth: Auth;
  links: { key: number; title: string; link: string }[];
  authLinks: { key: number; title: string; link: string }[];
}> = ({ auth, isMobile, links, authLinks, axios, URL }) => {
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const dispatch = useDispatch<Dispatch<any>>();

  const handleMenu = useCallback((event: React.MouseEvent<any>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      const { innerText } = event.currentTarget;
      console.log(innerText);
      if (innerText === "Log out") {
        await axios
          .get(`${URL}/logout`, {
            headers: { authorization: auth.token as string },
          })
          .catch(() => dispatch(authActions.logout()));
        dispatch(authActions.logout());
      }
      setAnchorEl(null);
    },
    [dispatch, axios, auth.token, URL]
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
              auth={auth.authenticated}
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
              auth={auth.authenticated}
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
