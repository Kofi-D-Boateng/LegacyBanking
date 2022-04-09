import { Button, ClassNameMap, Grid, Typography } from "@mui/material";

const Misc: React.FC<{
  classes: ClassNameMap<string>;
  isMobile: boolean;
  info: {
    key: number;
    title: string;
    desc: string;
    css: string;
    src: string | undefined;
  }[];
}> = ({ classes, isMobile, info }) => {
  return (
    <>
      {!isMobile && (
        <>
          {info.map((i) => {
            if (i.key % 2 !== 0) {
              return (
                <Grid sx={{ margin: "30px 0" }} container>
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
            } else {
              return (
                <Grid sx={{ margin: "30px 0" }} container>
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
      )}
    </>
  );
};

export default Misc;
