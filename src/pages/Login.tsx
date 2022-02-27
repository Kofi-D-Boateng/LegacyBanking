import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import React, { Fragment } from "react";
import makeStyles from "@mui/styles/makeStyles";
import classes from "./Login.module.scss";

const styles = makeStyles(() => ({
  card: {
    border: "1px solid rgba($color: black, $alpha: 1)",
    borderRadius: "20px",
    margin: "50px auto",
    maxWidth: "70%",
    textAlign: "center",
  },
  cardTitle: {
    backgroundColor: "lightgray",
    padding: "20px 0",
  },
  inputField: {
    margin: "20px 0",
  },
  btn: {
    borderColor: "green",
    color: "black",
    "&:hover": {
      backgroundColor: "green",
      color: "white",
      borderColor: "green",
    },
  },
  invalid: {
    backgroundColor: "red",
    color: "white",
    padding: "20px 0",
  },
}));

const Login: React.FC = () => {
  // const classes = styles();
  return (
    <Container>
      <Card className={classes.card}>
        <Typography className={classes.cardTitle} variant="h4">
          Please Login
        </Typography>
        <Grid className={classes.invalid}>
          <Typography variant="h6">Invalid email or password</Typography>
        </Grid>
        <CardContent>
          <form>
            <Grid container>
              <Grid sx={{ margin: "auto" }} xs={4} lg={4} item>
                <Typography variant="h6">Email: </Typography>
              </Grid>
              <Grid xs={8} lg={8} item>
                <TextField
                  className={classes.inputField}
                  variant="outlined"
                  size="small"
                  type="email"
                  placeholder="enter email"
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid container>
              <Grid sx={{ margin: "auto" }} xs={4} lg={4} item>
                <Typography variant="h6">Password: </Typography>
              </Grid>
              <Grid xs={8} lg={8} item>
                <TextField
                  className={classes.inputField}
                  variant="outlined"
                  size="small"
                  type="email"
                  placeholder="enter password"
                  fullWidth
                />
              </Grid>
            </Grid>
            <Button
              className={classes.btn}
              variant="outlined"
              type="submit"
              fullWidth
            >
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Login;
