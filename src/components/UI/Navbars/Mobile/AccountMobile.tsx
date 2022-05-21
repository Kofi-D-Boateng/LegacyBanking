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
import { FC, MouseEvent } from "react";

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
  options: {
    key: number;
    title: string;
    link: string;
  }[];
  notis: {
    _id: string;
    sender: string;
    receiver: string;
    amount: number;
    date: string;
    read: boolean;
  }[];
  unread: number;
  showLinks: HTMLElement | null;
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
}) => {
  return (
    <>
      <IconButton
        size="small"
        aria-controls="menu-appbar"
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
            <Button
              key={o.key}
              variant="text"
              sx={{
                fontSize: "1.1rem",
                textTransform: "none",
                margin: "auto 20px",
                color: "purple",
                display: "block",
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
              onClick={handleClose}
            >
              {o.title}
            </Button>
          );
        })}
      </Menu>
      <IconButton
        size="small"
        aria-controls="menu-appbar"
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
        {notis.map((n, i) => {
          return (
            <Notis
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
