import { Button, Grid, Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import React, { Fragment } from "react";
import city from "../assets/photos/city.jpg";
import cityscape from "../assets/videos/cityscape.mp4";
import Services from "../components/Homepage/Services";
import stocks from "../assets/photos/stockEx.jpg";
import japan2 from "../assets/photos/japan2.jpg";
import startUp from "../assets/photos/startup.jpg";
import { NavLink } from "react-router-dom";

const styles = makeStyles(() => ({
  banner: {
    position: "relative",
    width: "100%",
    height: "600px",
    display: "flex",
    overflow: "hidden",
  },
  slogan: {
    textAlign: "center",
  },

  sloganContainer: {
    position: "relative",
    zIndex: 2,
    color: "white",
    margin: "auto 40px",
  },
  btn: {
    maxWidth: "0 auto",
    margin: "10px 0",
    color: "white",
    borderColor: "white",
    "&:hover": {
      backgroundColor: "white",
      color: "black",
      borderColor: "white",
    },
  },
  videoContainer: {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    overflow: "hidden",
    "& video": {
      maxWidth: "100%",
      position: "absolute",
      top: "60%",
      left: "50%",
      transform: "translate(-50%,-50%)",
    },
  },
  vidOverlay: {
    position: "absolute",
    top: "0",
    left: "0",
    backgroundColor: "black",
    width: "100%",
    height: "100vh",
    opacity: "0.6",
    zIndex: 1,
  },
  serviceContainer: {
    backgroundColor: "rgb(235, 236, 237)",
    padding: "30px 0",
  },
  international: {
    background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.3)), url(${japan2})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    color: "white",
    height: "80vh",
    maxWidth: "95%",
    margin: "auto",
    position: "relative",
    "&:hover": {
      boxShadow: " 5px 10px 18px #888888",
    },
  },
  investments: {
    background: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${stocks})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    color: "white",
    height: "80vh",
    maxWidth: "95%",
    margin: "auto",
    position: "relative",
    "&:hover": {
      boxShadow: " 5px 10px 18px #888888",
    },
  },
  insight: {
    background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${city})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    color: "white",
    height: "80vh",
    maxWidth: "95%",
    margin: "auto",
    position: "relative",
    "&:hover": {
      boxShadow: " 5px 10px 18px #888888",
    },
  },
  cardDescription: {
    maxWidth: "80%",
    margin: "30px auto",
    padding: "5px 0",
  },
  aboutContainer: {
    textAlign: "center",
    margin: "90px 0",
  },
  startUpContainer: {
    margin: "150px auto",
    textAlign: "center",
  },
  link: {
    textDecoration: "none",
    color: "white",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  btn2: {
    color: "white",
    backgroundColor: "violet",
    padding: "30px 0",
    margin: "30px 0",
  },
  img: {
    width: "80%",
  },
}));

const Home: React.FC = () => {
  const classes = styles();
  return (
    <Fragment>
      <Grid className={classes.banner} container>
        <Grid className={classes.sloganContainer} container>
          <Grid className={classes.slogan} xs={12} md={12} lg={6} item>
            <Typography variant="h3">Leagacy Investments</Typography>
            <Typography variant="h5">
              Banking and Investing for the future in you.
            </Typography>
            <Button variant="outlined" className={classes.btn}>
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
      <Grid sx={{ backgroundColor: "purple", padding: "30px 0" }} container>
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
            <img className={classes.img} src={startUp} />
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
      </Grid>
    </Fragment>
  );
};

export default Home;
