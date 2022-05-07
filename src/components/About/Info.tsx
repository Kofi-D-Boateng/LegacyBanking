import { GridTypeMap, TypographyTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { FC } from "react";
import Leadership from "./Leadership";
import Partners from "./Partners";

const Info: FC<{
  classes: {
    readonly [key: string]: string;
  };
  isMobile: boolean;
  Grid: OverridableComponent<GridTypeMap<{}, "div">>;
  Typography: OverridableComponent<TypographyTypeMap<{}, "span">>;
  group: string;
  holder: string;
  google: string;
  ford: string;
  homeDepot: string;
  toyota: string;
  AA: string;
  aetna: string;
}> = ({
  classes,
  isMobile,
  Grid,
  Typography,
  group,
  holder,
  ford,
  google,
  homeDepot,
  AA,
  aetna,
  toyota,
}) => {
  const DESC_SX: { width: string; margin: string } = {
    margin: "auto",
    width: "60%",
  };
  const PARTNERS: { key: number; img: string }[] = [
    { key: 1, img: google },
    { key: 2, img: ford },
    { key: 3, img: homeDepot },
    { key: 4, img: toyota },
    { key: 5, img: AA },
    { key: 6, img: aetna },
  ];
  const LEADERSHIP: {
    key: number;
    name: string;
    position: string;
    bio: string;
  }[] = [
    {
      key: 1,
      name: "Kofi Boateng",
      position: "Chief Executive Officer",
      bio: " Lorem ipsum, dolor sit amet consectetur adipisicing elit.Officia ex libero, explicabo soluta omnis quibusdam fugiat? Possimus, culpa reprehenderit. Qui, aut. Nisi, veniam. Quidem laboriosam unde veniam recusandae et enim. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia ex libero, explicabo soluta omnis quibusdam fugiat? Possimus, culpa reprehenderit. Qui, aut. Nisi, veniam. Quidem laboriosam unde veniam recusandae et enim.",
    },
    {
      key: 2,
      name: "John Lewis",
      position: "Vice President",
      bio: " Lorem ipsum, dolor sit amet consectetur adipisicing elit.Officia ex libero, explicabo soluta omnis quibusdam fugiat? Possimus, culpa reprehenderit. Qui, aut. Nisi, veniam. Quidem laboriosam unde veniam recusandae et enim. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia ex libero, explicabo soluta omnis quibusdam fugiat? Possimus, culpa reprehenderit. Qui, aut. Nisi, veniam. Quidem laboriosam unde veniam recusandae et enim.",
    },
    {
      key: 3,
      name: "Wang Da Yu",
      position: "Chief Information Officer",
      bio: " Lorem ipsum, dolor sit amet consectetur adipisicing elit.Officia ex libero, explicabo soluta omnis quibusdam fugiat? Possimus, culpa reprehenderit. Qui, aut. Nisi, veniam. Quidem laboriosam unde veniam recusandae et enim. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia ex libero, explicabo soluta omnis quibusdam fugiat? Possimus, culpa reprehenderit. Qui, aut. Nisi, veniam. Quidem laboriosam unde veniam recusandae et enim.",
    },
    {
      key: 4,
      name: "Muira Shouta",
      position: "Chief Financial Officer",
      bio: " Lorem ipsum, dolor sit amet consectetur adipisicing elit.Officia ex libero, explicabo soluta omnis quibusdam fugiat? Possimus, culpa reprehenderit. Qui, aut. Nisi, veniam. Quidem laboriosam unde veniam recusandae et enim. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia ex libero, explicabo soluta omnis quibusdam fugiat? Possimus, culpa reprehenderit. Qui, aut. Nisi, veniam. Quidem laboriosam unde veniam recusandae et enim.",
    },
    {
      key: 5,
      name: "Marissa Gutierrez",
      position: "Chief Officer of International Relations",
      bio: " Lorem ipsum, dolor sit amet consectetur adipisicing elit.Officia ex libero, explicabo soluta omnis quibusdam fugiat? Possimus, culpa reprehenderit. Qui, aut. Nisi, veniam. Quidem laboriosam unde veniam recusandae et enim. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia ex libero, explicabo soluta omnis quibusdam fugiat? Possimus, culpa reprehenderit. Qui, aut. Nisi, veniam. Quidem laboriosam unde veniam recusandae et enim.",
    },
    {
      key: 6,
      name: "Lisa Campbell",
      position: "Recruiting Director",
      bio: " Lorem ipsum, dolor sit amet consectetur adipisicing elit.Officia ex libero, explicabo soluta omnis quibusdam fugiat? Possimus, culpa reprehenderit. Qui, aut. Nisi, veniam. Quidem laboriosam unde veniam recusandae et enim. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia ex libero, explicabo soluta omnis quibusdam fugiat? Possimus, culpa reprehenderit. Qui, aut. Nisi, veniam. Quidem laboriosam unde veniam recusandae et enim.",
    },
  ];

  return (
    <>
      <Grid className={classes.infoContainer} container>
        <Grid className={classes.infoBox} container>
          <Grid className={classes.title} container>
            <Typography variant="h5">Who we are</Typography>
          </Grid>
          <Grid sx={DESC_SX} container>
            <Typography variant="body1">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia
              ex libero, explicabo soluta omnis quibusdam fugiat? Possimus,
              culpa reprehenderit. Qui, aut. Nisi, veniam. Quidem laboriosam
              unde veniam recusandae et enim. Lorem ipsum, dolor sit amet
              consectetur adipisicing elit. Officia ex libero, explicabo soluta
              omnis quibusdam fugiat? Possimus, culpa reprehenderit. Qui, aut.
              Nisi, veniam. Quidem laboriosam unde veniam recusandae et enim.
            </Typography>
          </Grid>
          <Grid container>
            <img src={group} className={classes.groupImg} alt="group.jpg" />
          </Grid>
        </Grid>
        <Grid className={classes.infoBox} container>
          <Grid className={classes.title} container>
            <Typography variant="h5">Purpose and values</Typography>
          </Grid>
          <Grid sx={DESC_SX} container>
            <Typography variant="body1">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia
              ex libero, explicabo soluta omnis quibusdam fugiat? Possimus,
              culpa reprehenderit. Qui, aut. Nisi, veniam. Quidem laboriosam
              unde veniam recusandae et enim. Lorem ipsum, dolor sit amet
              consectetur adipisicing elit. Officia ex libero, explicabo soluta
              omnis quibusdam fugiat? Possimus, culpa reprehenderit. Qui, aut.
              Nisi, veniam. Quidem laboriosam unde veniam recusandae et enim.
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia
              ex libero, explicabo soluta omnis quibusdam fugiat? Possimus,
              culpa reprehenderit. Qui, aut. Nisi, veniam. Quidem laboriosam
              unde veniam recusandae et enim.
            </Typography>
          </Grid>
        </Grid>
        <Grid className={classes.infoBox} container>
          <Grid className={classes.title} container>
            <Typography variant="h5">Leadership and Partners</Typography>
          </Grid>
          <Grid sx={DESC_SX} container>
            <Typography variant="body1">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia
              ex libero, explicabo soluta omnis quibusdam fugiat? Possimus,
              culpa reprehenderit. Qui, aut. Nisi, veniam. Quidem laboriosam
              unde veniam recusandae et enim. Lorem ipsum, dolor sit amet
              consectetur adipisicing elit. Officia ex libero, explicabo soluta
              omnis quibusdam fugiat? Possimus, culpa reprehenderit. Qui, aut.
              Nisi, veniam. Quidem laboriosam unde veniam recusandae et enim.
            </Typography>
          </Grid>
          <Leadership
            isMobile={isMobile}
            Grid={Grid}
            Typography={Typography}
            LEADERSHIP={LEADERSHIP}
            classes={classes}
            photo={holder}
          />
          <Partners
            classes={classes}
            PARTNERS={PARTNERS}
            Grid={Grid}
            Typography={Typography}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Info;
