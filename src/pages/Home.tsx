import {
  Button,
  ClassNameMap,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { Fragment } from "react";
import cityscape from "../assets/videos/cityscape.mp4";
import Services from "../components/Homepage/Services";
import startUp from "../assets/photos/startup.jpg";
import biz from "../assets/photos/business.jpg";
import { NavLink } from "react-router-dom";
import styles from "../styles/HomeStyles";

const Home: React.FC<{ mobile: boolean }> = ({ mobile }) => {
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
      <Grid className={classes.banner} container>
        <Grid className={classes.sloganContainer} container>
          <Grid className={classes.slogan} xs={12} md={12} lg={6} item>
            <Typography variant="h3">Leagacy Investments</Typography>
            <Typography variant="h5">
              Banking and Investing for the future in you.
            </Typography>
            <Button
              variant="outlined"
              sx={{
                maxWidth: "0 auto",
                margin: "10px 0",
                color: "white",
                borderColor: "white",
                "&:hover": {
                  backgroundColor: "white",
                  color: "black",
                  borderColor: "white",
                },
              }}
            >
              Find A Location
            </Button>
          </Grid>
        </Grid>
        <Grid className={classes.videoContainer} container>
          <Grid className={classes.vidOverlay} container />
          <video autoPlay muted loop>
            <source src={cityscape} type="video/mp4" />
          </video>
        </Grid>
      </Grid>
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
        <Services classes={classes} />
        <Grid className={classes.startUpContainer} container>
          <Grid xs={6} md={6} item>
            <img className={classes.img} src={startUp} alt="startup.jpg" />
          </Grid>
          <Grid sx={{ margin: "auto", textAlign: "left" }} xs={6} md={6} item>
            <Grid sx={{ margin: "auto", width: "70%" }} xs={12} md={12} item>
              <Typography variant="h4" sx={{ color: "black" }}>
                Startups and small Small businesses: How we are empowering those
                to chase their dreams of having a small business.
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  textAlign: "left",
                  margin: "20px 0",
                  color: "black",
                }}
              >
                We work with startups and small business around the world to
                allow their continued growth to be substainable.
              </Typography>
              <Button
                variant="outlined"
                sx={{
                  width: "30%",
                  color: "purple",
                  borderColor: "purple",
                  "&:hover": {
                    backgroundColor: "purple",
                    color: "white",
                    borderColor: "purple",
                  },
                }}
                fullWidth
              >
                Learn more
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid container>
          <Grid sx={{ margin: "auto", textAlign: "left" }} xs={6} md={6} item>
            <Grid sx={{ margin: "auto", width: "70%" }} xs={12} md={12} item>
              <Typography
                sx={{ color: "black", textAlign: "left" }}
                variant="h4"
              >
                Business Partners & Board Members
              </Typography>
              <Typography
                sx={{ color: "black", textAlign: "left", margin: "20px 0" }}
                variant="body1"
              >
                Meet a the people behind the scenes that we work with that helps
                us help your reach your goals.
              </Typography>
              <Button
                variant="outlined"
                sx={{
                  width: "30%",
                  color: "purple",
                  borderColor: "purple",
                  "&:hover": {
                    backgroundColor: "purple",
                    color: "white",
                    borderColor: "purple",
                  },
                }}
                fullWidth
              >
                Learn more
              </Button>
            </Grid>
          </Grid>
          <Grid xs={6} md={6} item>
            <img className={classes.businessImg} src={biz} alt="business.jpg" />
          </Grid>
        </Grid>
      </Grid>
      <Grid className={classes.mail} container>
        <Grid xs={12} md={12} item>
          <Typography variant="h4">Join our mail letters!</Typography>
          <Typography variant="body1">
            Stay up to date with the latest news from our business and global
            finances around the world!
          </Typography>
          <form>
            <TextField
              sx={{
                margin: "20px 0",
                width: "40%",
              }}
              InputProps={{
                className: classes.textfield,
              }}
              color="primary"
              variant="filled"
              type="email"
              placeholder="enter email"
              size="small"
              fullWidth
            />
          </form>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Home;
