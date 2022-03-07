import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { NavLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import React, { Fragment, useState } from "react";
import { AccountCircle } from "@mui/icons-material";
import classes from "./Navbar.module.scss";

const Navbar: React.FC<{ isMobile: boolean; auth: boolean }> = ({
  auth,
  isMobile,
  children,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event: any) => {
    if (event.target.innerText === "Logout") {
      console.log("true");
    }
    setAnchorEl(null);
  };

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
                  <>
                    <MenuItem onClick={handleClose}>
                      <NavLink className={classes.menuLink} to={`/profile`}>
                        Profile
                      </NavLink>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <NavLink className={classes.menuLink} to={`*`}>
                        Logout
                      </NavLink>
                    </MenuItem>
                  </>
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
                    <MenuItem onClick={handleClose}>
                      <NavLink className={classes.menuLink} to={`*`}>
                        Logout
                      </NavLink>
                    </MenuItem>
                  </Menu>
                </Fragment>
              ) : (
                <Fragment>
                  <MenuItem onClick={handleClose}>
                    <NavLink className={classes.menuLink} to={`/login`}>
                      Login
                    </NavLink>
                  </MenuItem>
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
