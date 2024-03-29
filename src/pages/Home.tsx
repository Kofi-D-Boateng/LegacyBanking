import { Grid, Typography } from "@mui/material";
import {
  FC,
  Fragment,
  useState,
  useRef,
  useEffect,
  MutableRefObject,
} from "react";
import Services from "../components/Homepage/Services";
import startUp from "../assets/photos/startup.jpg";
import biz from "../assets/photos/business.jpg";
import { NavigateFunction, NavLink, useNavigate } from "react-router-dom";
import classes from "../styles/Home/HomeStyles.module.css";
import Banner from "../components/Homepage/Banner";
import Misc from "../components/Homepage/Misc";
import MailLetter from "../components/Homepage/MailLetter";
import { BACKWARD, FORWARD } from "../components/UI/Constants/Constants";
import AppRoute from "../enums/Route";
import axios from "axios";
import { Title } from "../enums/Title";

const Home: FC<{
  mobile: boolean;
}> = ({ mobile }) => {
  document.getElementById("title")!.innerText = Title.HOME;
  const nav: NavigateFunction = useNavigate();
  const [view, setView] = useState<number>(0);
  const [serviceView, setServiceView] = useState<boolean>();
  const serviceRef: MutableRefObject<any> = useRef();

  useEffect(() => {
    const oberserver: IntersectionObserver = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        const entry = entries[0];
        if (entry.target.id === "services" && entry.isIntersecting) {
          setServiceView(entry.isIntersecting);
        }
      }
    );
    oberserver.observe(serviceRef.current);
  }, []);

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
      link: AppRoute.STARTUPS,
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

  return (
    <Fragment>
      <Banner classes={classes} isMobile={mobile} navigate={nav} />
      <Grid sx={{ backgroundColor: "#8a2be2", padding: "80px 0" }} container>
        <Grid className={classes.aboutContainer} xs={12} md={12} item>
          <Typography variant="h4">Learn more about us</Typography>
          <Typography
            sx={{ width: "60%", margin: "30px auto", fontSize: "1.1rem" }}
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
      <div className={classes.serviceContainer} ref={serviceRef} id="services">
        {serviceView && (
          <Services
            classes={classes}
            isMobile={mobile}
            view={view}
            setView={setView}
            FORWARD={FORWARD}
            BACKWARD={BACKWARD}
          />
        )}
        <div className={classes.miscContainer}>
          <Misc isMobile={mobile} info={info} navigate={nav} />
        </div>
      </div>
      <MailLetter classes={classes} isMobile={mobile} axios={axios} />
    </Fragment>
  );
};

export default Home;
