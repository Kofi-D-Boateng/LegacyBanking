import React from "react";
import { Button, ClassNameMap, Grid, TextField } from "@mui/material";

const LoginForm: React.FC<{
  classes: ClassNameMap<string>;
  submit: (event: React.FormEvent) => void;
  password: React.MutableRefObject<HTMLInputElement | undefined>;
  email: React.MutableRefObject<HTMLInputElement | undefined>;
}> = ({ submit, email, password }) => {
  return (
    <form onSubmit={submit}>
      <Grid container>
        <TextField
          sx={{ width: "70%", margin: "20px 30px" }}
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
          sx={{ width: "70%", margin: "20px 30px" }}
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
            width: "30%",
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
