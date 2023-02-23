import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Card, Grid, IconButton, Typography } from "@mui/material";
import { Dispatch, FC, SetStateAction } from "react";
import { NavLink } from "react-router-dom";
import AppRoute from "../../enums/Route";

const Services: FC<{
  classes: {
    readonly [key: string]: string;
  };
  isMobile: boolean;
  view: number;
  FORWARD: string;
  BACKWARD: string;
  setView: Dispatch<SetStateAction<number>>;
}> = ({ isMobile, view, classes, setView, BACKWARD, FORWARD }) => {
  const cards = [
    {
      key: 1,
      title: "International",
      description:
        "A deep dive into our foreign strategies and relations with around the world.",
      css: !isMobile ? classes.international : classes.mobInternational,
      css2: classes.cardDescription,
      link: AppRoute.LOCATIONS + "#map",
    },
    {
      key: 2,
      title: "Insight",
      description: `A look at our ${new Date().getFullYear()} organizational plans.`,
      css: !isMobile ? classes.insight : classes.mobInsight,
      css2: classes.cardDescription,
      link: AppRoute.INSIGHT,
    },
  ];

  const viewHandler: (e: React.MouseEvent<HTMLButtonElement>) => void = ({
    currentTarget,
  }) => {
    const { value } = currentTarget;

    if (value.includes(FORWARD) && view < cards.length - 1) {
      setView((prev) => prev + 1);
      return;
    }

    if (value.includes(BACKWARD) && view > 0) {
      setView((prev) => (prev > 0 ? prev - 1 : 0));
      return;
    }
  };

  return (
    <Grid container>
      {!isMobile ? (
        <>
          {cards.map((c) => {
            return (
              <Grid key={c?.key} xs={12} md={12 / cards.length} item>
                <NavLink to={c.link} style={{ textDecoration: "none" }}>
                  <Card className={c.css || undefined}>
                    <Grid className={c.css2} container>
                      <Grid container>
                        <Typography variant="h5">{c?.title}</Typography>
                      </Grid>
                      <Grid container>
                        <Typography
                          variant="body1"
                          sx={{ fontSize: "1.3rem", color: "white" }}
                        >
                          {c?.description}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Card>
                </NavLink>
              </Grid>
            );
          })}
        </>
      ) : (
        <>
          {cards
            .filter((_c, i) => {
              return i === view;
            })
            .map((c) => {
              return (
                <Grid key={c?.key} xs={12} md={4} item>
                  <NavLink to={c.link} style={{ textDecoration: "none" }}>
                    <Card className={c.css || undefined}>
                      <Grid className={c.css2} container>
                        <Typography variant="h5">{c?.title}</Typography>
                        <Typography
                          variant="body1"
                          sx={{ fontSize: "1.3rem", color: "white" }}
                        >
                          {c?.description}
                        </Typography>
                      </Grid>
                    </Card>
                  </NavLink>
                  <Grid sx={{ textAlign: "center" }} container>
                    <Grid xs={6} item>
                      <IconButton
                        value={BACKWARD}
                        children={<ArrowBack />}
                        onClick={viewHandler}
                      />
                    </Grid>
                    <Grid xs={6} item>
                      <IconButton
                        value={FORWARD}
                        children={<ArrowForward />}
                        onClick={viewHandler}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              );
            })}
        </>
      )}
    </Grid>
  );
};

export default Services;
