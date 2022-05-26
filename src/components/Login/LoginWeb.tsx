import {
  BoxTypeMap,
  CircularProgressProps,
  GridTypeMap,
  TypographyTypeMap,
} from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { FC, MutableRefObject } from "react";
import { NavLinkProps } from "react-router-dom";

const LoginWeb: FC<{
  Box: OverridableComponent<BoxTypeMap<{}, "div">>;
  Loader: (props: CircularProgressProps) => JSX.Element;
  loading: boolean;
  isMobile: boolean;
  invalid: boolean;
  Grid: OverridableComponent<GridTypeMap<{}, "div">>;
  classes: {
    readonly [key: string]: string;
  };
  Typography: OverridableComponent<TypographyTypeMap<{}, "span">>;
  NavLink: React.ForwardRefExoticComponent<
    NavLinkProps & React.RefAttributes<HTMLAnchorElement>
  >;
  submitHandler: (event: React.FormEvent) => void;
  PASSWORD: React.MutableRefObject<HTMLInputElement | undefined>;
  EMAIL: React.MutableRefObject<HTMLInputElement | undefined>;
  LoginForm: React.FC<{
    isMobile: boolean;
    submit: (event: React.FormEvent) => void;
    password: MutableRefObject<HTMLInputElement | undefined>;
    email: MutableRefObject<HTMLInputElement | undefined>;
  }>;
}> = ({
  EMAIL,
  Grid,
  LoginForm,
  NavLink,
  PASSWORD,
  Typography,
  classes,
  submitHandler,
  invalid,
  isMobile,
  loading,
  Box,
  Loader,
}) => {
  return (
    <Grid className={classes.loginContainer} container>
      <Grid sx={{ margin: "auto" }} xs={6} md={6} item>
        {!loading ? (
          <>
            <Typography
              sx={{
                color: "purple",
                margin: "20px 30px",
                padding: "20px 0",
                textAlign: "justify",
              }}
              variant="h4"
            >
              Please Login
            </Typography>
            {invalid && (
              <Grid className={classes.invalid}>
                <Typography variant="h6">Invalid email or password</Typography>
              </Grid>
            )}
            <LoginForm
              isMobile={isMobile}
              submit={submitHandler}
              password={PASSWORD}
              email={EMAIL}
            />
            <NavLink
              style={{
                textDecoration: "none",
                margin: "0 30px",
                width: "50%",
              }}
              to={"/signup"}
            >
              <Typography
                sx={{ margin: "0 30px", fontSize: "1.2rem", color: "green" }}
                variant="body1"
              >
                Open an account
              </Typography>
            </NavLink>
          </>
        ) : (
          <Box sx={{ textAlign: "center" }}>
            <Loader />
          </Box>
        )}
      </Grid>
      <Grid className={classes.imgContainer} xs={6} md={6} item />
    </Grid>
  );
};

export default LoginWeb;
