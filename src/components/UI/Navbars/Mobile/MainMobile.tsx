import {
  ExtendButtonBase,
  IconButtonTypeMap,
  MenuItemTypeMap,
  MenuProps,
  SvgIconTypeMap,
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

const MainMobile: FC<{
  auth: boolean;
  handleMenu: (event: MouseEvent<any>) => void;
  handleClose: (event: MouseEvent<HTMLElement>) => void;
  IconButton: ExtendButtonBase<IconButtonTypeMap<{}, "button">>;
  Menu: (props: MenuProps) => JSX.Element;
  MenuItem: ExtendButtonBase<MenuItemTypeMap<{}, "li">>;
  MenuIcon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  NavLink: ForwardRefExoticComponent<
    NavLinkProps & RefAttributes<HTMLAnchorElement>
  >;
  links: Link[];
  authLinks: Link[];
  classes: {
    readonly [key: string]: string;
  };
  anchorEl: any;
}> = ({
  IconButton,
  Menu,
  MenuIcon,
  links,
  MenuItem,
  authLinks,
  NavLink,
  classes,
  anchorEl,
  handleClose,
  handleMenu,
  auth,
}) => {
  return (
    <>
      <IconButton
        size="small"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <MenuIcon fontSize="large" sx={{ color: "black" }} />
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
        {links.map((l) => {
          return (
            <MenuItem key={l.key} onClick={handleClose}>
              <NavLink className={classes.menuLink} to={l.link} replace={false}>
                {l.title}
              </NavLink>
            </MenuItem>
          );
        })}
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
                key={l.key}
                sx={{
                  "&:hover": {
                    backgroundColor: "black",
                  },
                }}
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
  );
};

export default MainMobile;
