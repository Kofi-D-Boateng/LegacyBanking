import { Grid } from "@mui/material";
import Toronto from "../../assets/photos/Toronto.jpg";
import Seoul from "../../assets/photos/Seoul.jpg";
import NewYork from "../../assets/photos/New_York.jpg";
import Japan from "../../assets/photos/japan.jpg";
import { useEffect, useState } from "react";

const Banner: React.FC = () => {
  const [position, setPosition] = useState<number>(2);
  const CAROUSEL: { key: number; img: string; alt: string }[] = [
    { key: 1, img: Toronto, alt: "Toronto.jpg" },
    { key: 2, img: Seoul, alt: "Seoul.jpg" },
    { key: 3, img: NewYork, alt: "NewYork.jpg" },
    { key: 4, img: Japan, alt: "Japan.jpg" },
  ];
  // useEffect(() => {
  //   const INTERVAL = setInterval(() => {
  //     if (position >= 3) {
  //       setPosition(0);
  //       return;
  //     }
  //     setPosition((prevState) => prevState + 1);
  //   }, 3000);
  //   return () => clearInterval(INTERVAL);
  // }, []);

  return (
    <>
      <Grid container>
        <img
          style={{ width: "100%", height: "90vh" }}
          src={CAROUSEL[position].img}
          alt={CAROUSEL[position].alt}
        />
      </Grid>
    </>
  );
};

export default Banner;
