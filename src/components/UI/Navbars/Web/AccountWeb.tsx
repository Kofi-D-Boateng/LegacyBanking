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
import {
  Dispatch,
  FC,
  ForwardRefExoticComponent,
  RefAttributes,
  MouseEvent,
} from "react";
import { NavLinkProps } from "react-router-dom";

const AccountWeb: FC<{
  NavLink: ForwardRefExoticComponent<
    NavLinkProps & RefAttributes<HTMLAnchorElement>
  >;
  Grid: OverridableComponent<GridTypeMap<{}, "div">>;
  Typography: OverridableComponent<TypographyTypeMap<{}, "span">>;
  IconButton: ExtendButtonBase<IconButtonTypeMap<{}, "button">>;
  Button: ExtendButtonBase<ButtonTypeMap<{}, "button">>;
  Menu: (props: MenuProps) => JSX.Element;
  Badge: OverridableComponent<BadgeTypeMap<"span", {}>>;
  Notifications: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  dispatch: Dispatch<any>;
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
  Grid,
  IconButton,
  NavLink,
  Typography,
  options,
  Button,
  Badge,
  Menu,
  Notifications,
  handleClose,
  handleMenu,
  markRead,
  notis,
  showLinks,
  unread,
  Notis,
}) => {
  return (
    <Grid container>
      {options.map((o) => {
        if (!o.title.includes("Sign out")) {
          return (
            <NavLink
              key={o.key}
              to={o.link}
              style={{
                fontSize: "1.1rem",
                textDecoration: "none",
                margin: "auto 20px",
                display: "inline-flex",
                color: "white",
              }}
            >
              {o.title}
            </NavLink>
          );
        } else {
          return (
            <>
              <Button
                key={o.key}
                variant="text"
                sx={{
                  borderColor: "white",
                  display: "inline-flex",
                  color: "white",
                  float: "right",
                  textTransform: "none",

                  "&:hover": {
                    backgroundColor: "white",
                    color: "purple",
                    borderColor: "purple",
                  },
                }}
                onClick={handleClose}
              >
                <Typography key={o.key} variant="h6">
                  {o.title}
                </Typography>
              </Button>
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
                    <>
                      <Notis
                        n={n}
                        index={i}
                        length={notis.length}
                        markRead={markRead}
                        Grid={Grid}
                        Typography={Typography}
                        Button={Button}
                      />
                    </>
                  );
                })}
              </Menu>
            </>
          );
        }
      })}
    </Grid>
  );
};

export default AccountWeb;
