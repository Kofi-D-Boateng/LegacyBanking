import { Button, Grid, Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import React, { Fragment } from "react";
import city from "../assets/photos/city.jpg";
import cityscape from "../assets/videos/cityscape.mp4";
import Services from "../components/Homepage/Services";
import stocks from "../assets/photos/stockEx.jpg";
import japan2 from "../assets/photos/japan2.jpg";
import china from "../assets/photos/china.jpg";

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
    height: "550px",
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
    height: "550px",
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
    height: "550px",
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
      <Grid className={classes.serviceContainer} container>
        <Services classes={classes} />
      </Grid>
    </Fragment>
  );
};

export default Home;
