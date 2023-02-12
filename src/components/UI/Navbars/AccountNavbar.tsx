import { NavigateFunction, NavLink, useNavigate } from "react-router-dom";
import { FC, Dispatch, useCallback, useState, MouseEvent } from "react";
import { useDispatch } from "react-redux";
import {
  Typography,
  Box,
  IconButton,
  Menu,
  AppBar,
  Toolbar,
  Button,
  Grid,
  Badge,
} from "@mui/material/";
import MenuIcon from "@mui/icons-material/Menu";
import Notifications from "@mui/icons-material/Notifications";
import Notis from "../Notifications/Notis";
import { AxiosStatic } from "axios";
import { notisActions } from "../../../store/notifications/notifications";
import AccountMobile from "./Mobile/AccountMobile";
import AccountWeb from "./Web/AccountWeb";
import { customerActions } from "../../../store/customer/customer-slice";
import { NotificationDetails } from "../../../types/Notification";
import { API_VERSION } from "../Constants/Constants";

const AccountNavbar: FC<{
  mobile: boolean;
  options: { key: number; title: string; link: string }[];
  notificationDetails: NotificationDetails;
  axios: AxiosStatic;
  url: string;
}> = ({ mobile, options, notificationDetails, axios }) => {
  const { notifications, numberOfUnreadNotifications } = notificationDetails;
  const nav: NavigateFunction = useNavigate();
  const dispatch = useDispatch<Dispatch<any>>();

  const [showLinks, setShowLinks] = useState<HTMLElement | null>(null);
  const [showNotis, setShowNotis] = useState<HTMLElement | null>(null);

  const handleMenu = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    const { ariaLabel } = event.currentTarget;

    if (ariaLabel?.includes("notifications")) {
      setShowNotis(event.currentTarget);
      return;
    }
    if (ariaLabel?.includes("menu-links")) {
      setShowLinks(event.currentTarget);
    }
  }, []);
  const handleClose = useCallback(
    async (event: MouseEvent<HTMLElement>) => {
      const { innerText } = event.currentTarget;
      if (!innerText) {
        setShowLinks(null);
        setShowNotis(null);
        return;
      }
      const target = options.find((o) => o.title === innerText);
      if (target?.title === "Log out") {
        axios
          .delete(`http://localhost:8081/${API_VERSION}/auth/logout`, {
            headers: { authorization: localStorage.getItem("token") as string },
            params:{"apiKey":localStorage.getItem("apiKey") as string}
          })
          .then(()=> dispatch(customerActions.logout()))
          .catch(() => dispatch(customerActions.logout()));
      } else if (target?.title !== "Log out") {
        nav(target!.link, { replace: false });
      }

      setShowLinks(null);
      setShowNotis(null);
    },
    [dispatch, axios, nav, options]
  );

  const markRead: (e: MouseEvent<HTMLButtonElement>) => void = async ({
    currentTarget,
  }) => {
    const { value } = currentTarget;
    await axios
      .put(
        `http://localhost:8081/${API_VERSION}/notifications/update-notification`,
        { msgId: value, apiKey: localStorage.getItem("apiKey") as string },
        { headers: { authorization: localStorage.getItem("token") as string } }
      )
      .then((response) => dispatch(customerActions.resetInfo())).catch(()=>dispatch(customerActions.resetInfo()));
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        elevation={0}
        style={{ backgroundColor: "#8a2be2" }}
      >
        <Toolbar>
          {!mobile ? (
            <AccountWeb
              NavLink={NavLink}
              Grid={Grid}
              Typography={Typography}
              IconButton={IconButton}
              Notifications={Notifications}
              dispatch={dispatch}
              options={options}
              Button={Button}
              Badge={Badge}
              Menu={Menu}
              unread={numberOfUnreadNotifications}
              showNotis={showNotis}
              handleMenu={handleMenu}
              handleClose={handleClose}
              notis={notifications}
              Notis={Notis}
              markRead={markRead}
            />
          ) : (
            <AccountMobile
              Grid={Grid}
              Typography={Typography}
              IconButton={IconButton}
              Menu={Menu}
              MenuIcon={MenuIcon}
              options={options}
              Button={Button}
              Badge={Badge}
              Notifications={Notifications}
              notis={notifications}
              unread={numberOfUnreadNotifications}
              showLinks={showLinks}
              showNotis={showNotis}
              handleMenu={handleMenu}
              handleClose={handleClose}
              markRead={markRead}
              Notis={Notis}
            />
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export { AccountNavbar };
