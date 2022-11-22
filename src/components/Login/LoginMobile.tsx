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
  actionParam: string | null;
  statusParam: string | null;
  isMobile: boolean;
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
  NavLink,
  PASSWORD,
  LoginForm,
  isMobile,
  classes,
  actionParam,
  statusParam,
  Grid,
  Typography,
  submitHandler,
  Box,
  Loader,
}) => {
  return (
    <Grid
      sx={{ width: "100%", height: "100vh", textAlign: "center" }}
      container
    >
      {!actionParam ? (
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
          {statusParam?.includes("invalid") && (
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
