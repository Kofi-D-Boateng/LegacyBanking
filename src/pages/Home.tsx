import { ClassNameMap, Grid, Typography } from "@mui/material";
import React, { Fragment } from "react";
import cityscape from "../assets/videos/cityscape.mp4";
import Services from "../components/Homepage/Services";
import startUp from "../assets/photos/startup.jpg";
import biz from "../assets/photos/business.jpg";
import { NavigateFunction, NavLink, useNavigate } from "react-router-dom";
import styles from "../styles/HomeStyles";
import Banner from "../components/Homepage/Banner";
import Misc from "../components/Homepage/Misc";
import MailLetter from "../components/Homepage/MailLetter";

const Home: React.FC<{ mobile: boolean }> = ({ mobile }) => {
  const NAVIGATE: NavigateFunction = useNavigate();
  const classes: ClassNameMap<string> = styles();
  const info: {
    key: number;
    title: string;
    desc: string;
    css: string;
    src: string | undefined;
  }[] = [
    {
      key: 1,
      title:
        " Startups and small Small businesses: How we are empowering those to chase their dreams of having a small business.",
      desc: " We work with startups and small business around the world to allow their continued growth to be substainable.",
      css: classes.img,
      src: startUp ? startUp : undefined,
    },
    {
      key: 2,
      title: " Business Partners & Board Members",
      desc: "Meet a the people behind the scenes that we work with that helps us help your reach your goals.",
      css: classes.businessImg,
      src: biz ? biz : undefined,
    },
  ];

  return (
    <Fragment>
      <Banner
        classes={classes}
        cityscape={cityscape}
        isMobile={mobile}
        navigate={NAVIGATE}
      />
      <Grid sx={{ backgroundColor: "purple", padding: "80px 0" }} container>
        <Grid className={classes.aboutContainer} xs={12} md={12} item>
          <Typography variant="h4">Learn more about us</Typography>
          <Typography
            sx={{ width: "60%", margin: "10px auto", fontSize: "1.1rem" }}
            variant="body1"
          >
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis
            dolorem dolor necessitatibus accusantium at mollitia, laborum cum
            perferendis eligendi, sint voluptatum molestias officia beatae,
            reiciendis modi est nulla animi enim.
          </Typography>
          <NavLink to={"/about"} className={classes.link}>
            Learn about us
          </NavLink>
        </Grid>
      </Grid>
      <Grid className={classes.serviceContainer} container>
        <Services classes={classes} isMobile={mobile} />
        <Misc classes={classes} isMobile={mobile} info={info} />
      </Grid>
      <MailLetter classes={classes} />
    </Fragment>
  );
};

export default Home;
