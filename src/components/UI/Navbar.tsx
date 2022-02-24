import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { NavLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import makeStyles from "@mui/styles/makeStyles";
import React, { useState } from "react";
import { useTheme } from "@mui/styles";
import { useMediaQuery } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";

const styles = makeStyles(() => ({
  navbar: {
    backgroundColor: "transparent",
  },
  logo: {
    color: "#00bbff",
    flexGrow: 1,
    textDecoration: "none",
  },
  navLink: {
    textDecoration: "none",
    margin: "0 20px",
    color: "black",
    "&.active": {
      borderBottomStyle: "solid",
      borderColor: "#00bbff",
      borderWidth: "1px",
    },
  },
  lastLink: {
    flexGrow: 1,
  },
  menuLink: {
    textDecoration: "none",
    color: "#00bbff",
    "&.active": {
      borderBottomStyle: "solid",
      borderColor: "#00bbff",
      borderWidth: "1px",
    },
  },
}));

const Navbar: React.FC = (props) => {
  const classes = styles();
  console.log(classes);
  const theme = useTheme();
  // console.log(theme.components);

  //   const isMobile = useMediaQuery(theme.breakpoints.values("md"));
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event: any) => {
    if (event.target.innerText === "Logout") {
    }
    setAnchorEl(null);
  };

  return (
    <Box>
      <AppBar
        className={classes.navbar}
        color="secondary"
        position="static"
        elevation={0}
      >
        <Toolbar>
          <Typography variant="h6">
            <NavLink className={classes.logo} to="/">
              Legacy
            </NavLink>
          </Typography>
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
          <Typography variant="h6">
            <NavLink className={classes.navLink} to="/contact">
              Contact
            </NavLink>
          </Typography>
          <IconButton
            sx={{ float: "right" }}
            size="small"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
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
            <MenuItem className={classes.menuLink} onClick={handleClose}>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
