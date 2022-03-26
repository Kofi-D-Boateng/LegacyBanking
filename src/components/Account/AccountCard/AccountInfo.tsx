import { Grid, Typography, Card, CardContent, Button } from "@mui/material";
import { ClassNameMap } from "@mui/styles/withStyles";
import React from "react";
import { NavLink } from "react-router-dom";
import useConverter from "../../../hooks/useConverter";

const AccountInfo: React.FC<{
  classes: ClassNameMap<string>;
  fName: string;
  lName: string;
  funds: number;
}> = ({ classes, fName, lName, funds }) => {
  const details: { key: number; value: string | undefined; desc: string }[] = [
    { key: 1, value: `$${useConverter(funds)}`, desc: "Available balance" },
    {
      key: 2,
      value: `+$${useConverter(150000.12)}`,
      desc: "Deposits this month",
    },
    {
      key: 3,
      value: `-$${useConverter(6000.12)}`,
      desc: "Withdrawls this month",
    },
  ];

  const links: { key: number; title: string; link: string }[] = [
    { key: 1, title: "Statement", link: "/" },
    { key: 2, title: "Paperless", link: "/" },
    { key: 3, title: "Transfer Money", link: "/" },
    { key: 4, title: "More", link: "/" },
  ];
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography sx={{ margin: "10px 0" }} variant="h6">
          {fName} {lName}'s account |{" "}
          <Button sx={{ color: "blue" }} variant="text">
            See full account number
          </Button>
        </Typography>
        <Grid sx={{ margin: "10px 0" }} container>
          {details.map((d) => {
            return (
              <Grid key={d.key} md={4} item>
                <Grid container>
                  <Grid xs={12} md={12} item>
                    <Typography variant="h6">{d.value}</Typography>
                  </Grid>
                  <Grid xs={12} md={12} item>
                    <Typography variant="body1">{d.desc}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            );
          })}
        </Grid>
        <hr style={{ backgroundColor: "black", padding: "0.5px 0" }} />
        <Grid container>
          {links.map((l) => {
            return (
              <Grid
                key={l.key}
                className={l.key !== 4 ? classes.linksContainer : ""}
                sx={l.key === 4 ? { textAlign: "center" } : null}
                xs={12 / links.length}
                md={12 / links.length}
                item
              >
                <NavLink className={classes.links} to={l.link}>
                  {l.title}
                </NavLink>
              </Grid>
            );
          })}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default AccountInfo;
