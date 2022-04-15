import { ClassNameMap, makeStyles } from "@mui/material";
import stocks from "../assets/photos/stockEx.jpg";
import japan2 from "../assets/photos/japan2.jpg";
import city from "../assets/photos/city.jpg";
import { keyframes } from "@emotion/react";

const slide = keyframes`
  from{
    opacity:0,
    transform: translateX(0)
  }
  to{
    opacity:1,
    transform: translateX(100%)
  }
`;

const styles: () => ClassNameMap<string> = makeStyles(() => ({
  "@keyframse fadeIn": {
    "0%": {
      opacity: 0,
      transform: "translateY(0)",
    },
    "100%": {
      opacity: 1,
      transform: "translateX(100%)",
    },
  },
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
    animation: "$fadeIn 2s ease-in-out",
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
    color: "white",
    maxWidth: "80%",
    margin: "30px auto",
    padding: "5px 0",
  },
  aboutContainer: {
    textAlign: "center",
    margin: "90px 0",
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
    width: "100%",
  },
  businessImg: {
    width: "100%",
  },
  mail: {
    backgroundColor: "purple",
    textAlign: "center",
    padding: "100px 0",
    color: "white",
  },
  textfield: {
    color: "white",
  },
}));

export default styles;
