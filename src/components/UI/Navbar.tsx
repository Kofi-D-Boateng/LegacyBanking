import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { NavLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import React, { Dispatch, Fragment, useState } from "react";
import { AccountCircle } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/authentication/auth-slice";
import styles from "../../styles/NavbarStyles";

const Navbar: React.FC<{ isMobile: boolean; auth: boolean }> = ({
  auth,
  isMobile,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch<Dispatch<any>>();
  const logoutHandler = () => {
    dispatch(authActions.logout());
  };

  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event: any) => {
    if (event.target.innerText === "Logout") {
      console.log("true");
    }
    setAnchorEl(null);
  };
  const classes = styles();

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
                <MenuItem onClick={handleClose}>
                  <NavLink className={classes.menuLink} to="/locations">
                    Locations
                  </NavLink>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <NavLink className={classes.menuLink} to="/investments/*">
                    Investments
                  </NavLink>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <NavLink className={classes.menuLink} to="/loans/*">
                    Loans
                  </NavLink>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <NavLink className={classes.menuLink} to="/international/*">
                    International
                  </NavLink>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <NavLink className={classes.menuLink} to="/contact">
                    Contact
                  </NavLink>
                </MenuItem>
                {auth ? (
                  <div>
                    <MenuItem onClick={handleClose}>
                      <NavLink className={classes.menuLink} to={`/profile`}>
                        Profile
                      </NavLink>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <Button
                        sx={{
                          textTransform: "none",
                          textAlign: "center",
                          color: "purple",
                          fontSize: "1.0rem",
                          "&:hover": {
                            textDecoration: "underline",
                            backgroundColor: "transparent",
                          },
                        }}
                        className={classes.menuLink}
                        onClick={logoutHandler}
                      >
                        Logout
                      </Button>
                    </MenuItem>
                  </div>
                ) : (
                  <MenuItem onClick={handleClose}>
                    <NavLink className={classes.menuLink} to={`/login`}>
                      Login
                    </NavLink>
                  </MenuItem>
                )}
              </Menu>
            </Fragment>
          ) : (
            <Fragment>
              <Typography variant="h6">
                <NavLink className={classes.navLink} to="/about">
                  About Us
                </NavLink>
              </Typography>
              <Typography variant="h6">
                <NavLink className={classes.navLink} to="/locations">
                  Locations
                </NavLink>
              </Typography>
              <Typography variant="h6">
                <NavLink className={classes.navLink} to="/investments/*">
                  Investments
                </NavLink>
              </Typography>
              <Typography variant="h6">
                <NavLink className={classes.navLink} to="/loans/*">
                  Loans
                </NavLink>
              </Typography>
              <Typography variant="h6">
                <NavLink className={classes.navLink} to="/international/*">
                  International
                </NavLink>
              </Typography>
              <Typography sx={{ flexGrow: 1 }} variant="h6">
                <NavLink className={classes.navLink} to="/contact">
                  Contact
                </NavLink>
              </Typography>
              {auth ? (
                <Fragment>
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
                    <MenuItem onClick={handleClose}>
                      <NavLink className={classes.menuLink} to={`/profile`}>
                        Profile
                      </NavLink>
                    </MenuItem>
                    <MenuItem
                      className={classes.menuLink}
                      onClick={handleClose}
                    >
                      <Button
                        sx={{
                          textTransform: "none",
                          textAlign: "center",
                          color: "purple",
                          fontSize: "1.0rem",
                          "&:hover": {
                            textDecoration: "underline",
                            backgroundColor: "transparent",
                          },
                        }}
                        onClick={logoutHandler}
                        fullWidth
                      >
                        Logout
                      </Button>
                    </MenuItem>
                  </Menu>
                </Fragment>
              ) : (
                <Fragment>
                  <NavLink className={classes.menuLink} to={`/login`}>
                    Login
                  </NavLink>
                </Fragment>
              )}
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
