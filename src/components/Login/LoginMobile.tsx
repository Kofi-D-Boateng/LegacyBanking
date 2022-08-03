import {
  BoxTypeMap,
  CircularProgressProps,
  GridTypeMap,
  TypographyTypeMap,
} from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import {
  FC,
  FormEvent,
  ForwardRefExoticComponent,
  MutableRefObject,
  RefAttributes,
} from "react";
import { NavLinkProps } from "react-router-dom";

const LoginMobile: FC<{
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
  NavLink: ForwardRefExoticComponent<
    NavLinkProps & RefAttributes<HTMLAnchorElement>
  >;
  submitHandler: (event: FormEvent) => void;
  PASSWORD: MutableRefObject<HTMLInputElement | undefined>;
  EMAIL: MutableRefObject<HTMLInputElement | undefined>;
  LoginForm: FC<{
    isMobile: boolean;
    submit: (event: FormEvent) => void;
    password: MutableRefObject<HTMLInputElement | undefined>;
    email: MutableRefObject<HTMLInputElement | undefined>;
  }>;
}> = ({
  EMAIL,
  Grid,
  NavLink,
  PASSWORD,
  Typography,
  classes,
  submitHandler,
  LoginForm,
  invalid,
  isMobile,
  Box,
  Loader,
  loading,
}) => {
  return (
    <Grid
      sx={{ width: "100%", height: "100vh", textAlign: "center" }}
      container
    >
      {!loading ? (
        <Grid sx={{ margin: "auto" }} item>
          <Typography
            sx={{
              color: "purple",
              margin: "20px auto",
              padding: "20px 0",
              textAlign: "center",
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
        </Grid>
      ) : (
        <Box
          sx={{ position: "absolute", top: "50%", left: "50%", zIndex: "5" }}
        >
          <Loader />
        </Box>
      )}
    </Grid>
  );
};

export default LoginMobile;
