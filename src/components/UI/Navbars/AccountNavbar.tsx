import { NavLink } from "react-router-dom";
import {
  FC,
  Dispatch,
  useCallback,
  useState,
  MouseEvent,
  useEffect,
} from "react";
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
import { authActions } from "../../../store/authentication/auth-slice";
import Notis from "../Notifications/Notis";
import { AxiosStatic } from "axios";
import { notisActions } from "../../../store/notifications/notifications";
import AccountMobile from "./Mobile/AccountMobile";
import AccountWeb from "./Web/AccountWeb";

const AccountNavbar: FC<{
  mobile: boolean;
  options: { key: number; title: string; link: string }[];
  noti: {
    notis: {
      _id: string;
      sender: string;
      receiver: string;
      amount: number;
      date: string;
      read: boolean;
    }[];
    unread: number;
  };
  token: string | null;
  axios: AxiosStatic;
  URL: string | undefined;
}> = ({ mobile, options, noti, token, axios, URL }) => {
  const { notis, unread } = noti;
  const dispatch = useDispatch<Dispatch<any>>();
  const [showLinks, setShowLinks] = useState<HTMLElement | null>(null);
  const [readMsg, setReadMsg] = useState<{ token: string | null; _id: string }>(
    {
      _id: "",
      token: "",
    }
  );

  useEffect(() => {
    if (readMsg._id.trim().length <= 0) {
      return;
    }
    const fetchMarkMessage: (readMsg: {
      _id: string;
      token: string | null;
    }) => void = async ({ _id, token }) => {
      await axios
        .post(
          `${URL}/authentication/notifications`,
          { msgID: _id },
          { headers: { authorization: token as string } }
        )
        .then((response) => {
          const { notis } = response.data;
          dispatch(notisActions.getNotis({ notis: notis }));
        })
        .catch((error) => {
          console.log(error);
          dispatch(authActions.logout());
        });
    };
    fetchMarkMessage(readMsg);
  }, [readMsg, URL, axios, dispatch]);

  const markRead: (e: MouseEvent<HTMLButtonElement>) => void = ({
    currentTarget,
  }) => {
    const { value } = currentTarget;
    if (value) {
      setReadMsg({ _id: value, token: token });
    }
  };

  const handleMenu = useCallback((event: React.MouseEvent<any>) => {
    if (event.currentTarget) {
      setShowLinks(event.currentTarget);
    }
  }, []);
  const handleClose = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      const { innerText } = event.currentTarget;
      if (innerText === "Log out") {
        await axios
          .get(`${URL}/logout`, {
            headers: { authorization: token as string },
          })
          .catch(() => {
            dispatch(authActions.logout());
          });
        dispatch(authActions.logout());
      }
      setShowLinks(null);
    },
    [dispatch, axios, URL, token]
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        elevation={0}
        style={{ backgroundColor: "purple" }}
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
              unread={unread}
              showLinks={showLinks}
              handleMenu={handleMenu}
              handleClose={handleClose}
              notis={notis}
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
              notis={notis}
              unread={unread}
              showLinks={showLinks}
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
