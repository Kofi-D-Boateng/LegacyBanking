import {
  ExtendButtonBase,
  IconButtonTypeMap,
  MenuItemTypeMap,
  MenuProps,
  SvgIconTypeMap,
  TypographyTypeMap,
} from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import {
  FC,
  ForwardRefExoticComponent,
  RefAttributes,
  MouseEvent,
} from "react";
import { NavLinkProps } from "react-router-dom";
import { Link } from "../../../../types/Link";

const MainWeb: FC<{
  auth: boolean;
  handleMenu: (event: MouseEvent<any>) => void;
  handleClose: (event: MouseEvent<HTMLElement>) => void;
  IconButton: ExtendButtonBase<IconButtonTypeMap<{}, "button">>;
  Menu: (props: MenuProps) => JSX.Element;
  MenuItem: ExtendButtonBase<MenuItemTypeMap<{}, "li">>;
  AccountCircle: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  NavLink: ForwardRefExoticComponent<
    NavLinkProps & RefAttributes<HTMLAnchorElement>
  >;
  Typography: OverridableComponent<TypographyTypeMap<{}, "span">>;
  links: Link[];
  authLinks: Link[];
  classes: {
    readonly [key: string]: string;
  };
  anchorEl: any;
}> = ({
  IconButton,
  Menu,
  MenuItem,
  NavLink,
  anchorEl,
  auth,
  authLinks,
  classes,
  handleClose,
  handleMenu,
  links,
  AccountCircle,
  Typography,
}) => {
  return (
    <>
      {links.map((l) => {
        return (
          <Typography
            key={l.key}
            sx={l.key === links.length ? { flexGrow: 1 } : undefined}
            variant="h6"
          >
            <NavLink className={classes.navLink} to={l.link} replace={false}>
              {l.title}
            </NavLink>
          </Typography>
        );
      })}
      {auth ? (
        <>
          <IconButton
            size="small"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle fontSize="large" sx={{ color: "black" }} />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {authLinks
              .filter((l) => {
                if (auth) {
                  return l.key < 3;
                }
                return l.key === 3;
              })
              .map((l) => {
                return (
                  <MenuItem
                    sx={{
                      "&:hover": {
                        backgroundColor: "transparent",
                      },
                    }}
                    key={l.key}
                    onClick={handleClose}
                  >
                    <NavLink
                      className={classes.menuLink}
                      to={l.link}
                      replace={false}
                    >
                      {l.title}
                    </NavLink>
                  </MenuItem>
                );
              })}
          </Menu>
        </>
      ) : (
        <>
          {authLinks
            .filter((l) => {
              if (auth) {
                return l.key < 3;
              }
              return l.key === 3;
            })
            .map((l) => {
              return (
                <MenuItem
                  sx={{
                    "&:hover": {
                      backgroundColor: "transparent",
                    },
                  }}
                  key={l.key}
                  onClick={handleClose}
                >
                  <NavLink className={classes.menuLink} to={l.link}>
                    {l.title}
                  </NavLink>
                </MenuItem>
              );
            })}
        </>
      )}
    </>
  );
};

export default MainWeb;
