import { Grid, Typography } from "@mui/material";
import { FC, Fragment, useState } from "react";
import cityscape from "../assets/videos/cityscape.mp4";
import Services from "../components/Homepage/Services";
import startUp from "../assets/photos/startup.jpg";
import biz from "../assets/photos/business.jpg";
import { NavigateFunction, NavLink, useNavigate } from "react-router-dom";
import classes from "../styles/Home/HomeStyles.module.css";
import Banner from "../components/Homepage/Banner";
import Misc from "../components/Homepage/Misc";
import MailLetter from "../components/Homepage/MailLetter";
import {
  BACKWARD,
  FORWARD,
  STARTUPS,
  INSIGHT,
  LOCATIONS,
} from "../components/UI/Constants/Constants";
import { AxiosStatic } from "axios";

const Home: FC<{
  mobile: boolean;
  axios: AxiosStatic;
  DOMAIN: string | undefined;
  API_VERSION: string | undefined;
}> = ({ mobile, API_VERSION, DOMAIN, axios }) => {
  const NAVIGATE: NavigateFunction = useNavigate();
  const year = new Date().getFullYear();
  const [view, setView] = useState<number>(0);
  const info: {
    key: number;
    title: string;
    desc: string;
    css: string;
    src: string | undefined;
    link: string;
  }[] = [
    {
      key: 1,
      title:
        " Startups and Small businesses: How we are empowering those to chase their dreams of having a small business.",
      desc: " We work with startups and small business around the world to allow their continued growth to be substainable.",
      css: classes.img,
      src: startUp ? startUp : undefined,
      link: STARTUPS,
    },
    {
      key: 2,
      title: " Business Partners & Board Members",
      desc: "Meet a the people behind the scenes that we work with that helps us help your reach your goals.",
      css: classes.img,
      src: biz ? biz : undefined,
      link: "/about#partners",
    },
  ];

  const cards = [
    {
      key: 1,
      title: "International",
      description:
        "A deep dive into our foreign strategies and relations with around the world.",
      css: !mobile ? classes.international : classes.mobInternational,
      css2: classes.cardDescription,
      link: LOCATIONS + "#map",
    },
    {
      key: 2,
      title: "Insight",
      description: `A look at our ${year} organizational plans.`,
      css: !mobile ? classes.insight : classes.mobInsight,
      css2: classes.cardDescription,
      link: INSIGHT,
    },
    // {
    //   key: 3,
    //   title: "Investor Relations",
    //   description: "Engage with our team on our monetary strategies.",
    //   css: !mobile ? classes.investments : classes.mobInvestments,
    //   css2: classes.cardDescription,
    //   link: INSIGHT + "#",
    // },
  ];

  const viewHandler: (e: React.MouseEvent<HTMLButtonElement>) => void = ({
    currentTarget,
  }) => {
    const { value } = currentTarget;

    if (value.includes(FORWARD) && view < cards.length - 1) {
      setView(view + 1);
      return;
    }

    if (value.includes(BACKWARD) && view > 0) {
      setView(view - 1);
      return;
    }
  };

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
        <Services
          classes={classes}
          isMobile={mobile}
          view={view}
          cards={cards}
          setView={viewHandler}
          FORWARD={FORWARD}
          BACKWARD={BACKWARD}
        />
        <Misc isMobile={mobile} info={info} navigate={NAVIGATE} />
      </Grid>
      <MailLetter
        classes={classes}
        isMobile={mobile}
        axios={axios}
        DOMAIN={DOMAIN}
        API_VERSION={API_VERSION}
      />
    </Fragment>
  );
};

export default Home;
