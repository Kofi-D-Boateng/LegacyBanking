import {
  BadgeTypeMap,
  ButtonTypeMap,
  ExtendButtonBase,
  GridTypeMap,
  IconButtonTypeMap,
  MenuProps,
  SvgIconTypeMap,
  TypographyTypeMap,
} from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { FC, Fragment, MouseEvent } from "react";
import { NavLink } from "react-router-dom";
import { Link } from "../../../../types/Link";
import { Notification } from "../../../../types/Notification";

const AccountMobile: FC<{
  Grid: OverridableComponent<GridTypeMap<{}, "div">>;
  Typography: OverridableComponent<TypographyTypeMap<{}, "span">>;
  IconButton: ExtendButtonBase<IconButtonTypeMap<{}, "button">>;
  Menu: (props: MenuProps) => JSX.Element;
  Badge: OverridableComponent<BadgeTypeMap<"span", {}>>;
  MenuIcon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  Notifications: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  Button: ExtendButtonBase<ButtonTypeMap<{}, "button">>;
  options: Link[];
  notis: Notification[];
  unread: number;
  showLinks: HTMLElement | null;
  showNotis: HTMLElement | null;
  handleMenu: (event: React.MouseEvent<any>) => void;
  handleClose: (event: MouseEvent<HTMLElement>) => void;
  markRead: (event: MouseEvent<HTMLButtonElement>) => void;
  Notis: FC<{
    n: {
      _id: string;
      sender: string;
      receiver: string;
      amount: number;
      date: string;
      read: boolean;
    };
    index: number;
    length: number;
    markRead: (e: MouseEvent<HTMLButtonElement>) => void;
    Grid: OverridableComponent<GridTypeMap<{}, "div">>;
    Typography: OverridableComponent<TypographyTypeMap<{}, "span">>;
    Button: ExtendButtonBase<ButtonTypeMap<{}, "button">>;
  }>;
}> = ({
  Button,
  IconButton,
  Menu,
  MenuIcon,
  options,
  notis,
  unread,
  showLinks,
  handleMenu,
  Badge,
  Notifications,
  handleClose,
  Grid,
  Typography,
  markRead,
  Notis,
  showNotis,
}) => {
  return (
    <>
      <IconButton
        size="small"
        aria-controls="menu-appbar"
        aria-label="menu-links"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <MenuIcon fontSize="large" sx={{ color: "white" }} />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={showLinks}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(showLinks)}
        onClose={handleClose}
      >
        {options.map((o) => {
          return (
            <NavLink
              key={o.key}
              to={o.link}
              style={{
                fontSize: "1.1rem",
                textDecoration: "none",
                margin: "10px 20px",
                display: "block",
                color: "#8a2be2",
              }}
              onClick={handleClose}
            >
              <Typography variant="h6">{o.title}</Typography>
            </NavLink>
          );
        })}
      </Menu>
      <IconButton
        size="small"
        aria-controls="menu-appbar"
        aria-label="notifications"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <Badge badgeContent={unread} color="info">
          <Notifications fontSize="medium" sx={{ color: "white" }} />
        </Badge>
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={showNotis}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(showNotis)}
        sx={{ height: "30vh" }}
        onClose={handleClose}
      >
        {notis.map((n, i) => {
          return (
            <Notis
              key={n._id}
              n={n}
              index={i}
              length={notis.length}
              markRead={markRead}
              Grid={Grid}
              Typography={Typography}
              Button={Button}
            />
          );
        })}
      </Menu>
    </>
  );
};

export default AccountMobile;
