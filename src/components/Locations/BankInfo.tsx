import { Grid, Typography } from "@mui/material";
import { FC } from "react";

const BankInfo: FC<{
  photoOne: string;
  photoTwo: string;
  classes: {
    readonly [key: string]: string;
  };
  isMobile: boolean;
}> = ({ photoOne, photoTwo, classes, isMobile }) => {
  const info: {
    key: number;
    title: string;
    desc: string;
    imgCss: string;
    img: string;
  }[] = [
    {
      key: 1,
      title: "Banking with legacy",
      desc: "Legacy has many strategical positions around the world. Our goal is to aid give strategical advise and opportunities to our global community.",
      imgCss: classes.img,
      img: photoOne,
    },
    {
      key: 2,
      title: "International Locations",
      desc: "Legacy has locations ranging from The United States, to China, to Africa. Placing ourselves in strategics area to allow foreign investment to be easily obtained within these communities.",
      imgCss: classes.img,
      img: photoTwo,
    },
  ];

  return (
    <>
      <Grid sx={{ padding: "200px 0", textAlign: "center" }} container>
        {info.map((i) => {
          if (i.key % 2 !== 0) {
            return (
              <Grid key={i.key} className={classes.infoTitle} container>
                <Grid sx={{ margin: "auto" }} xs={12} md={6} item>
                  <Grid sx={{ margin: "auto" }} xs={12} md={12} item>
                    <Typography variant="h3" sx={{ color: "purple" }}>
                      {i.title}
                    </Typography>
                  </Grid>
                  <Grid
                    sx={{ margin: "auto", width: "90%" }}
                    xs={12}
                    md={9}
                    item
                  >
                    <Typography
                      variant="body1"
                      sx={{ color: "purple", fontSize: "1.3rem" }}
                    >
                      {i.desc}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid sx={{ margin: "auto" }} xs={12} md={6} item>
                  <img
                    className={i.imgCss}
                    src={i.img}
                    alt="business-man.jpg"
                  />
                </Grid>
              </Grid>
            );
          }
          return (
            <Grid key={i.key} className={classes.infoTitle} container>
              {!isMobile && (
                <>
                  <Grid sx={{ margin: "auto" }} xs={12} md={6} item>
                    <img
                      className={i.imgCss}
                      src={i.img}
                      alt="business-man.jpg"
                    />
                  </Grid>
                </>
              )}
              <Grid sx={{ margin: "auto" }} xs={12} md={6} item>
                <Grid sx={{ margin: "auto" }} xs={12} md={12} item>
                  <Typography variant="h3" sx={{ color: "purple" }}>
                    {i.title}
                  </Typography>
                </Grid>
                <Grid
                  sx={{ margin: " auto", width: "90%" }}
                  xs={12}
                  md={9}
                  item
                >
                  <Typography
                    variant="body1"
                    sx={{ color: "purple", fontSize: "1.3rem" }}
                  >
                    {i.desc}
                  </Typography>
                </Grid>
              </Grid>
              {isMobile && (
                <>
                  <Grid sx={{ margin: "auto" }} xs={12} md={6} item>
                    <img
                      className={i.imgCss}
                      src={i.img}
                      alt="business-man.jpg"
                    />
                  </Grid>
                </>
              )}
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default BankInfo;
