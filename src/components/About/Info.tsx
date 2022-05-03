import { GridTypeMap, TypographyTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { FC } from "react";
import Leadership from "./Leadership";
import Partners from "./Partners";
import holderImg from "../../assets/photos/holderphoto.jpg";

const Info: FC<{
  classes: {
    readonly [key: string]: string;
  };
  isMobile: boolean;
  Grid: OverridableComponent<GridTypeMap<{}, "div">>;
  Typography: OverridableComponent<TypographyTypeMap<{}, "span">>;
}> = ({ classes, isMobile, Grid, Typography }) => {
  const DESC_SX: { width: string; margin: string } = {
    margin: "auto",
    width: "60%",
  };
  const TITLE_SX: { margin: string; justifyContent: string } = {
    margin: "30px 0",
    justifyContent: "center",
  };
  const PARTNERS: { key: number; img: string }[] = [];
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
          <Grid sx={TITLE_SX} container>
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
        </Grid>
        <Grid className={classes.infoBox} container>
          <Grid sx={TITLE_SX} container>
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
          <Grid sx={TITLE_SX} container>
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
            Grid={Grid}
            Typography={Typography}
            LEADERSHIP={LEADERSHIP}
            classes={classes}
            photo={holderImg}
          />
          <Partners classes={classes} PARTNERS={PARTNERS} />
        </Grid>
      </Grid>
    </>
  );
};

export default Info;
