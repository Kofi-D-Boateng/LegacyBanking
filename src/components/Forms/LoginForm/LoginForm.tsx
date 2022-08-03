import { FC, FormEvent, MutableRefObject } from "react";
import { Button, Grid, TextField } from "@mui/material";

const LoginForm: FC<{
  isMobile: boolean;
  submit: (event: FormEvent) => void;
  password: MutableRefObject<HTMLInputElement | undefined>;
  email: MutableRefObject<HTMLInputElement | undefined>;
}> = ({ submit, email, password, isMobile }) => {
  return (
    <form onSubmit={submit}>
      <Grid container>
        <TextField
          sx={{ width: !isMobile ? "70%" : "100%", margin: "20px 30px" }}
          variant="outlined"
          size="small"
          type="email"
          inputRef={email}
          placeholder="enter email"
          fullWidth
        />
      </Grid>
      <Grid container>
        <TextField
          sx={{ width: !isMobile ? "70%" : "100%", margin: "20px 30px" }}
          variant="outlined"
          size="small"
          type="password"
          inputRef={password}
          placeholder="enter password"
          fullWidth
        />
      </Grid>
      <Grid container>
        <Button
          sx={{
            width: !isMobile ? "30%" : "100%",
            margin: "20px 30px",
            borderColor: "green",
            color: "black",
            "&:hover": {
              backgroundColor: "green",
              color: "white",
              borderColor: "green",
            },
          }}
          variant="outlined"
          type="submit"
          fullWidth
        >
          Login
        </Button>
      </Grid>
    </form>
  );
};
export default LoginForm;
