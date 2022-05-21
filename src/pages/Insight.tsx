import { Grid, Typography } from "@mui/material";
import { FC } from "react";
import Banner from "../components/Insight/Banner";
import Info from "../components/Insight/Info";
import classes from "../styles/InsightStyles.module.css";
import SPM from "../assets/photos/supply_chain.jpg";
import money from "../assets/photos/money.jpg";
import Fed from "../assets/photos/Fed.jpg";

const Insight: FC<{ isMobile: boolean; YEAR: number }> = ({
  YEAR,
  isMobile,
}) => {
  const info: { key: number; title: string; info: string; img: string }[] = [
    {
      key: 1,
      title: "Supply Chain Climate",
      info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id facere nesciunt, quam nihil ullam asperiores deleniti provident aliquid placeat impedit sed enim. Nostrum, expedita molestiae. Quisquam quod fugiat rem expedita!",
      img: SPM,
    },
    {
      key: 2,
      title: "Overheated Market: Is the drawback near?",
      info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id facere nesciunt, quam nihil ullam asperiores deleniti provident aliquid placeat impedit sed enim. Nostrum, expedita molestiae. Quisquam quod fugiat rem expedita!",
      img: money,
    },
    {
      key: 3,
      title:
        "Double edge hedge: How we are staying one step ahead of a volitile market",
      info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id facere nesciunt, quam nihil ullam asperiores deleniti provident aliquid placeat impedit sed enim. Nostrum, expedita molestiae. Quisquam quod fugiat rem expedita!",
      img: Fed,
    },
  ];

  return (
    <>
      <Banner
        classes={classes}
        isMobile={isMobile}
        YEAR={YEAR}
        Grid={Grid}
        Typography={Typography}
      />
      <Info
        Grid={Grid}
        Typography={Typography}
        classes={classes}
        isMobile={isMobile}
        info={info}
      />
    </>
  );
};

export default Insight;
