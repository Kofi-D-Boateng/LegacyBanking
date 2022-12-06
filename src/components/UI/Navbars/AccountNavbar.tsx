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

const AccountNavbar: FC<{
  mobile: boolean;
  options: { key: number; title: string; link: string }[];
  notificationDetails: NotificationDetails;
  token: string | null;
  axios: AxiosStatic;
  url: string;
  API_VERSION: string | undefined;
}> = ({ mobile, options, notificationDetails, token, axios, API_VERSION }) => {
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
        await axios
          .get(`${API_VERSION}/logout`, {
            headers: { authorization: token as string },
          })
          .catch(() => {
            dispatch(customerActions.logout());
          });
        dispatch(customerActions.logout());
      } else if (target?.title !== "Log out") {
        nav(target!.link, { replace: false });
      }

      setShowLinks(null);
      setShowNotis(null);
    },
    [dispatch, axios, API_VERSION, token, nav, options]
  );

  const markRead: (e: MouseEvent<HTMLButtonElement>) => void = async ({
    currentTarget,
  }) => {
    const { value } = currentTarget;
    await axios
      .put(
        `${API_VERSION}/authentication/notifications`,
        { msgID: value },
        { headers: { authorization: token as string } }
      )
      .then((response) => {
        const { notis } = response.data;
        dispatch(notisActions.getNotis({ notis: notis }));
      });
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
