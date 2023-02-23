import { FC } from "react";
import Banner from "../components/Startups/Banner";
import { Grid, Typography } from "@mui/material";
import classes from "../styles/Startup/StartupStyles.module.css";
import Info from "../components/Startups/Info";
import HANDSHAKE from "../assets/photos/handshake.jpg";
import BS from "../assets/photos/business_shop.jpg";
import PHONE from "../assets/photos/phone.jpg";
import { Title } from "../enums/Title";

const Startups: FC<{ isMobile: boolean }> = ({ isMobile }) => {
  document.getElementById("title")!.innerText = Title.STARTUPS;
  const INFO: { key: number; title: string; info: string; img: string }[] = [
    {
      key: 1,
      title: "Who we work with",
      info: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea ratione veniam magni voluptates at temporibus laboriosam, est id provident quo ullam dignissimos nostrum quibusdam, praesentium veritatis officia iure consequatur culpa.",
      img: BS,
    },
    {
      key: 2,
      title: "How we invest in small businesses",
      info: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea ratione veniam magni voluptates at temporibus laboriosam, est id provident quo ullam dignissimos nostrum quibusdam, praesentium veritatis officia iure consequatur culpa.",
      img: HANDSHAKE,
    },
    {
      key: 3,
      title: "How to get in touch",
      info: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea ratione veniam magni voluptates at temporibus laboriosam, est id provident quo ullam dignissimos nostrum quibusdam, praesentium veritatis officia iure consequatur culpa.",
      img: PHONE,
    },
  ];

  return (
    <>
      <Banner
        classes={classes}
        Grid={Grid}
        Typography={Typography}
        isMobile={isMobile}
      />
      <Info classes={classes} Grid={Grid} Typography={Typography} INFO={INFO} />
    </>
  );
};

export default Startups;
