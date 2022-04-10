import { Grid, IconButton, Typography } from "@mui/material";
import styles from "../../styles/FooterStyles";
import { Box } from "@mui/system";
import React, { ReactElement } from "react";
import { NavLink } from "react-router-dom";

const AccountFooter: React.FC = () => {
  return (
    <Box style={{ backgroundColor: "purple", padding: "50px 0" }}>
      <footer>
        <Grid container>
          <Grid sx={{ margin: "auto" }} xs={10} md={10} item>
            <Typography variant="body1">
              Legacy Bank, N.A. and its affiliates offer investment products,
              which may include bank managed accounts and custody, as part of
              its trust and fiduciary services. Other investment products and
              services, such as brokerage and advisory accounts, are offered
              through Legacy Securities LLC (LS), a member of FINRA and SIPC.
            </Typography>
          </Grid>
        </Grid>
      </footer>
    </Box>
  );
};

const Footer: React.FC<{
  socials: {
    key: number;
    svg: ReactElement;
    link: string;
  }[];
  isMobile: boolean;
}> = ({ socials, isMobile }) => {
  const year = new Date().getFullYear();
  const classes = styles();
  return (
    <footer className={classes.footer}>
      <Grid sx={{ margin: "70px 0" }} container>
        <Grid xs={4} md={4} item>
          <Typography className={classes.Logo} variant="h4">
            Legacy Bank
          </Typography>
        </Grid>
        <Grid className={classes.footerLink} xs={4} md={4} item>
          <Typography variant="h5">Hello</Typography>
        </Grid>
        <Grid className={classes.footerLink} xs={4} md={4} item>
          <Typography variant="h5">Hello</Typography>
        </Grid>
      </Grid>
      <Grid className={classes.footerLink} sx={{ margin: "20px 0" }} container>
        <Grid xs={6} md={6} item>
          {socials.map((s) => {
            return (
              <NavLink
                style={{
                  margin: "auto 30px",
                  textAlign: "center",
                }}
                key={s.key}
                to={s.link}
              >
                <IconButton children={s.svg} />
              </NavLink>
            );
          })}
        </Grid>
        <Grid xs={6} md={6} item>
          <Typography variant="h5">© {year} Legacy Bank</Typography>
        </Grid>
      </Grid>
    </footer>
  );
};

export { Footer, AccountFooter };
