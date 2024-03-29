import {
  CircularProgressProps,
  GridTypeMap,
  TypographyTypeMap,
} from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { FC, FormEvent, MutableRefObject } from "react";

const LoginWeb: FC<{
  Box: OverridableComponent<any>;
  Loader: (props: CircularProgressProps) => JSX.Element;
  isMobile: boolean;
  actionParam: string | null;
  statusParam: string | null;
  Grid: OverridableComponent<GridTypeMap<{}, "div">>;
  classes: {
    readonly [key: string]: string;
  };
  Typography: OverridableComponent<TypographyTypeMap<{}, "span">>;
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
  LoginForm,
  PASSWORD,
  Typography,
  classes,
  submitHandler,
  isMobile,
  actionParam,
  statusParam,
  Box,
  Loader,
}) => {
  return (
    <Grid className={classes.loginContainer} container>
      <Grid sx={{ margin: "auto" }} xs={6} md={6} item>
        {!actionParam ? (
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
