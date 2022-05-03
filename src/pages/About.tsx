import { FC } from "react";
import Banner from "../components/About/Banner";
import classes from "../styles/AboutStyles.module.css";
import Info from "../components/About/Info";
import { Grid, Typography } from "@mui/material";

const About: FC<{ isMobile: boolean }> = ({ isMobile }) => {
  return (
    <>
      <Banner
        classes={classes}
        isMobile={isMobile}
        Grid={Grid}
        Typography={Typography}
      />
      <Info
        classes={classes}
        isMobile={isMobile}
        Grid={Grid}
        Typography={Typography}
      />
    </>
  );
};

export default About;
