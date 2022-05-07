import { FC } from "react";
import Banner from "../components/About/Banner";
import classes from "../styles/AboutStyles.module.css";
import Info from "../components/About/Info";
import { Grid, Typography } from "@mui/material";
import groupPhoto from "../assets/photos/group.jpg";
import holderImg from "../assets/photos/holderphoto.jpg";
import googleLogo from "../assets/photos/partnerLogos/google.jpg";
import fordLogo from "../assets/photos/partnerLogos/ford.png";
import homedepotLogo from "../assets/photos/partnerLogos/home-depot.png";
import Toyota from "../assets/photos/partnerLogos/Toyota.png";
import Aetna from "../assets/photos/partnerLogos/aetna.png";
import AmericanAirline from "../assets/photos/partnerLogos/AA.png";

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
        group={groupPhoto}
        holder={holderImg}
        google={googleLogo}
        homeDepot={homedepotLogo}
        ford={fordLogo}
        toyota={Toyota}
        AA={AmericanAirline}
        aetna={Aetna}
        classes={classes}
        isMobile={isMobile}
        Grid={Grid}
        Typography={Typography}
      />
    </>
  );
};

export default About;
