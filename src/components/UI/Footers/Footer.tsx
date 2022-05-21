import { Grid, IconButton, Typography } from "@mui/material";
import classes from "../../../styles/FooterStyles.module.css";
import { FC, ReactElement } from "react";
import { NavLink } from "react-router-dom";

const Footer: FC<{
  socials: {
    key: number;
    svg: ReactElement;
    link: string;
  }[];
  links: {
    key: number;
    title: string;
    link: string;
  }[];
  isMobile: boolean;
  YEAR: number;
}> = ({ socials, isMobile, links, YEAR }) => {
  return (
    <footer className={classes.footer}>
      <Grid sx={{ margin: isMobile ? "30px 0" : "70px 0" }} container>
        <Grid xs={4} md={4} item>
          <Typography className={classes.Logo} variant="h4">
            Legacy Bank
          </Typography>
        </Grid>
        <Grid xs={4} md={4} item>
          {links
            .filter((l) => {
              return l.key <= 3;
            })
            .map((l) => {
              return (
                <NavLink className={classes.footerLink} key={l.key} to={l.link}>
                  <Typography variant="body1" sx={{ fontSize: "1.2rem" }}>
                    {l.title}
                  </Typography>
                </NavLink>
              );
            })}
        </Grid>
        <Grid xs={4} md={4} item>
          {links
            .filter((l) => {
              return l.key >= 4;
            })
            .map((l) => {
              return (
                <NavLink className={classes.footerLink} key={l.key} to={l.link}>
                  <Typography variant="body1" sx={{ fontSize: "1.2rem" }}>
                    {l.title}
                  </Typography>
                </NavLink>
              );
            })}
        </Grid>
      </Grid>
      <Grid className={classes.footerSocialContainer} container>
        <Grid xs={12} md={6} item>
          {socials.map((s) => {
            return (
              <a href={s.link} key={s.key}>
                <IconButton
                  children={s.svg}
                  style={{
                    margin: "auto 30px",
                    textAlign: "center",
                  }}
                />
              </a>
            );
          })}
        </Grid>
        <Grid sx={isMobile ? { margin: "20px 0" } : null} xs={12} md={6} item>
          <Typography variant="h5">© {YEAR} Legacy Bank</Typography>
        </Grid>
      </Grid>
    </footer>
  );
};

export default Footer;
