import {
  Card,
  ClassNameMap,
  Grid,
  Pagination,
  PaginationItem,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";

const Services: React.FC<{
  classes: ClassNameMap<string> | any;
  isMobile: boolean;
}> = ({ classes, isMobile }) => {
  const year = new Date().getFullYear();
  const cards = [
    {
      key: 1,
      title: "International",
      description:
        "A deep dive into our foreign strategies and relations with around the world.",
      css: classes?.international,
      css2: classes?.cardDescription,
      link: "/international",
    },
    {
      key: 2,
      title: "Insight",
      description: `A look at our ${year} organizational plans.`,
      css: classes?.insight,
      css2: classes?.cardDescription,
      link: "/Insight",
    },
    {
      key: 3,
      title: "Investor Relations",
      description: "Engage with our team on our monetary strategies.",
      css: classes?.investments,
      css2: classes?.cardDescription,
      link: "/investments",
    },
  ];

  return (
    <Grid className={classes?.serviceContainer} container>
      {!isMobile && (
        <>
          {cards.map((c) => {
            return (
              <Grid key={c?.key} xs={12} md={4} item>
                <NavLink to={c.link} style={{ textDecoration: "none" }}>
                  <Card className={c?.css || undefined}>
                    <Grid className={c?.css2} container>
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
      )}
    </Grid>
  );
};

export default Services;
