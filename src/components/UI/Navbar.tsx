import { NavigateFunction, NavLink, useNavigate } from "react-router-dom";
import React, { Dispatch, Fragment, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Typography,
  Box,
  IconButton,
  MenuItem,
  Menu,
  AppBar,
  Toolbar,
  Button,
  Grid,
} from "@mui/material/";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { authActions } from "../../store/authentication/auth-slice";
import classes from "../../styles/NavbarStyles.module.css";

const AccountNavbar: React.FC<{
  mobile: boolean;
  options: { key: number; title: string; link: string }[];
}> = ({ mobile, options }) => {
  const dispatch = useDispatch<Dispatch<any>>();
  const navigate: NavigateFunction = useNavigate();
  const [showLinks, setShowLinks] = useState<HTMLElement | null>(null);
  const handleMenu = useCallback((event: React.MouseEvent<any>) => {
    if (event.currentTarget) {
      setShowLinks(event.currentTarget);
    }
  }, []);
  const handleClose = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      const { innerText } = event.currentTarget;
      if (innerText === "Logout") {
        dispatch(authActions.logout());
      }
      setShowLinks(null);
    },
    [dispatch]
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
            <Grid container>
              {options.map((o) => {
                if (o.key !== options.length) {
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
                    <Button
                      key={o.key}
                      variant="outlined"
                      sx={{
                        borderColor: "white",
                        display: "inline-flex",
                        color: "white",
                        float: "right",
                        marginLeft: "60%",
                        textTransform: "none",

                        "&:hover": {
                          backgroundColor: "white",
                          color: "purple",
                          borderColor: "purple",
                        },
                      }}
                      onClick={() => {
                        dispatch(authActions.logout());
                      }}
                    >
                      <Typography key={o.key} variant="h6">
                        {o.title}
                      </Typography>
                    </Button>
                  );
                }
              })}
            </Grid>
          ) : (
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
                      onClick={() => {
                        if (!o.title.includes("Sign out")) {
                          navigate(o.link, { replace: true });
                          return;
                        } else {
                          dispatch(authActions.logout());
                        }
                      }}
                    >
                      {o.title}
                    </Button>
                  );
                })}
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

const Navbar: React.FC<{
  isMobile: boolean;
  auth: boolean;
  links: { key: number; title: string; link: string }[];
  authLinks: { key: number; title: string; link: string }[];
}> = ({ auth, isMobile, links, authLinks }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch<Dispatch<any>>();

  const handleMenu = useCallback((event: React.MouseEvent<any>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      const { innerText } = event.currentTarget;
      if (innerText === "Logout") {
        dispatch(authActions.logout());
      }
      setAnchorEl(null);
    },
    [dispatch]
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        className={classes.navbar}
        color="transparent"
        position="static"
        elevation={0}
      >
        <Toolbar>
          <Typography className={classes.logoDiv} variant="h6">
            <NavLink style={{ textDecoration: "none" }} to="/">
              Legacy
            </NavLink>
          </Typography>
          {isMobile ? (
            <Fragment>
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
                      <NavLink className={classes.menuLink} to={l.link}>
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
                        <NavLink className={classes.menuLink} to={l.link}>
                          {l.title}
                        </NavLink>
                      </MenuItem>
                    );
                  })}
              </Menu>
            </Fragment>
          ) : (
            <Fragment>
              {links.map((l) => {
                return (
                  <Typography
                    key={l.key}
                    sx={l.key === links.length ? { flexGrow: 1 } : undefined}
                    variant="h6"
                  >
                    <NavLink className={classes.navLink} to={l.link}>
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
                            <NavLink className={classes.menuLink} to={l.link}>
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
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export { Navbar, AccountNavbar };
