import React from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";

const AccountLayout: React.FC<{ mobile: boolean }> = ({ children, mobile }) => {
  const options: { key: number; title: string }[] = [
    { key: 1, title: "Accounts" },
    { key: 2, title: "Pay & Transfer" },
    { key: 3, title: "Security & Privacy" },
    { key: 4, title: "Sign out" },
  ];

  return (
    <>
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
                  return (
                    <Button
                      variant={o.key !== options.length ? "text" : "outlined"}
                      sx={
                        o.key !== options.length
                          ? {
                              display: "inline-flex",
                              color: "white",
                              textTransform: "none",
                              marginRight: "1%",
                            }
                          : {
                              display: "inline-flex",
                              color: "white",
                              textTransform: "none",
                              marginLeft: "60%",
                            }
                      }
                    >
                      <Typography key={o.key} variant="h6">
                        {o.title}
                      </Typography>
                    </Button>
                  );
                })}
              </Grid>
            ) : (
              <>
                <IconButton
                  size="small"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                >
                  <MenuIcon fontSize="large" sx={{ color: "white" }} />
                </IconButton>
              </>
            )}
          </Toolbar>
        </AppBar>
      </Box>
      <div style={{ width: "100%", height: "100vh" }}>{children}</div>
    </>
  );
};

export default AccountLayout;
