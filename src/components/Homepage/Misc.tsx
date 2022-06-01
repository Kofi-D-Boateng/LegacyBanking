import { Button, Grid, Typography } from "@mui/material";
import { NavigateFunction } from "react-router-dom";

const Misc: React.FC<{
  isMobile: boolean;
  info: {
    key: number;
    title: string;
    desc: string;
    css: string;
    src: string | undefined;
    link: string;
  }[];
  navigate: NavigateFunction;
}> = ({ isMobile, info, navigate }) => {
  return (
    <>
      {!isMobile ? (
        <>
          {info.map((i) => {
            if (i.key % 2 !== 0) {
              return (
                <Grid key={i.key} sx={{ margin: "30px 0" }} container>
                  <Grid xs={6} md={6} item>
                    <Grid sx={{ maxWidth: "90%", margin: "auto" }} container>
                      <img className={i.css} src={i.src} alt="startup.jpg" />
                    </Grid>
                  </Grid>
                  <Grid
                    sx={{ margin: "auto", textAlign: "left" }}
                    xs={6}
                    md={6}
                    item
                  >
                    <Grid
                      sx={{ margin: "auto", width: "70%" }}
                      xs={12}
                      md={12}
                      item
                    >
                      <Typography variant="h4" sx={{ color: "black" }}>
                        {i.title}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          textAlign: "left",
                          margin: "20px 0",
                          color: "black",
                        }}
                      >
                        {i.desc}
                      </Typography>
                      <Button
                        variant="outlined"
                        sx={{
                          width: "30%",
                          color: "purple",
                          borderColor: "purple",
                          transitionDuration: "500ms",
                          transitionProperty: "background, color",
                          "&:hover": {
                            backgroundColor: "purple",
                            color: "white",
                            borderColor: "purple",
                          },
                        }}
                        onClick={() => {
                          navigate(i.link, { replace: false });
                        }}
                        fullWidth
                      >
                        Learn more
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              );
            } else {
              return (
                <Grid key={i.key} sx={{ margin: "30px 0" }} container>
                  <Grid
                    sx={{ margin: "auto", textAlign: "left" }}
                    xs={6}
                    md={6}
                    item
                  >
                    <Grid
                      sx={{ margin: "auto", width: "70%" }}
                      xs={12}
                      md={12}
                      item
                    >
                      <Typography
                        sx={{ color: "black", textAlign: "left" }}
                        variant="h4"
                      >
                        {i.title}
                      </Typography>
                      <Typography
                        sx={{
                          color: "black",
                          textAlign: "left",
                          margin: "20px 0",
                        }}
                        variant="body1"
                      >
                        {i.desc}
                      </Typography>
                      <Button
                        variant="outlined"
                        sx={{
                          width: "30%",
                          color: "purple",
                          borderColor: "purple",
                          transitionDuration: "500ms",
                          transitionProperty: "background, color",
                          "&:hover": {
                            backgroundColor: "purple",
                            color: "white",
                            borderColor: "purple",
                          },
                        }}
                        onClick={() => {
                          navigate(i.link, { replace: false });
                        }}
                        fullWidth
                      >
                        Learn more
                      </Button>
                    </Grid>
                  </Grid>
                  <Grid xs={6} md={6} item>
                    <Grid sx={{ maxWidth: "90%", margin: "auto" }} container>
                      <img className={i.css} src={i.src} alt="business.jpg" />
                    </Grid>
                  </Grid>
                </Grid>
              );
            }
          })}
        </>
      ) : (
        <>
          {info.map((i) => {
            return (
              <Grid key={i.key} sx={{ margin: "30px 0" }} container>
                <Grid sx={{ margin: "30px 0" }} xs={12} item>
                  <Grid sx={{ maxWidth: "90%", margin: "auto" }} container>
                    <img className={i.css} src={i.src} alt="startup.jpg" />
                  </Grid>
                </Grid>
                <Grid sx={{ margin: "auto", textAlign: "center" }} xs={12} item>
                  <Grid
                    sx={{ margin: " 20px auto", width: "70%" }}
                    xs={12}
                    item
                  >
                    <Typography variant="h5" sx={{ color: "black" }}>
                      {i.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        textAlign: "center",
                        margin: "20px 0",
                        color: "black",
                      }}
                    >
                      {i.desc}
                    </Typography>
                    <Button
                      variant="outlined"
                      sx={{
                        color: "purple",
                        borderColor: "purple",
                        "&:hover": {
                          backgroundColor: "purple",
                          color: "white",
                          borderColor: "purple",
                        },
                      }}
                      fullWidth
                    >
                      Learn more
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            );
          })}
        </>
      )}
    </>
  );
};

export default Misc;
