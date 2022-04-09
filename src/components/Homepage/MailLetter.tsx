import { ClassNameMap, Grid, TextField, Typography } from "@mui/material";

const MailLetter: React.FC<{ classes: ClassNameMap<string> }> = ({
  classes,
}) => {
  return (
    <Grid className={classes.mail} container>
      <Grid xs={12} md={12} item>
        <Typography variant="h4">Join our mail letters!</Typography>
        <Typography variant="body1">
          Stay up to date with the latest news from our business and global
          finances around the world!
        </Typography>
        <form>
          <TextField
            sx={{
              margin: "20px 0",
              width: "40%",
            }}
            InputProps={{
              className: classes.textfield,
            }}
            color="primary"
            variant="filled"
            type="email"
            placeholder="enter email"
            size="small"
            fullWidth
          />
        </form>
      </Grid>
    </Grid>
  );
};

export default MailLetter;
