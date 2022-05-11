import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Card, Grid, IconButton, Typography } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";

const Services: React.FC<{
  classes: {
    readonly [key: string]: string;
  };
  isMobile: boolean;
  view: number;
  cards: {
    key: number;
    title: string;
    description: string;
    css: string;
    css2: string;
    link: string;
  }[];
  FORWARD: string;
  BACKWARD: string;
  setView: (e: React.MouseEvent<HTMLButtonElement>) => void;
}> = ({ classes, isMobile, view, cards, setView, BACKWARD, FORWARD }) => {
  return (
    <Grid className={classes?.serviceContainer} container>
      {!isMobile ? (
        <>
          {cards.map((c) => {
            return (
              <Grid key={c?.key} xs={12} md={12 / cards.length} item>
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
                        onClick={setView}
                      />
                    </Grid>
                    <Grid xs={6} item>
                      <IconButton
                        value={FORWARD}
                        children={<ArrowForward />}
                        onClick={setView}
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
