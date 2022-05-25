import {
  ButtonTypeMap,
  CardContentTypeMap,
  CardTypeMap,
  CircularProgressProps,
  ExtendButtonBase,
  GridTypeMap,
  TypographyTypeMap,
} from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { FC, MouseEvent } from "react";

const Modal: FC<{
  loading: boolean;
  isMobile: boolean;
  classes: {
    readonly [key: string]: string;
  };
  GRT: (e: MouseEvent<HTMLButtonElement>) => void;
  Grid: OverridableComponent<GridTypeMap<{}, "div">>;
  Typography: OverridableComponent<TypographyTypeMap<{}, "span">>;
  Button: ExtendButtonBase<ButtonTypeMap<{}, "button">>;
  Card: OverridableComponent<CardTypeMap<{}, "div">>;
  CardContent: OverridableComponent<CardContentTypeMap<{}, "div">>;
  Loader: (props: CircularProgressProps) => JSX.Element;
}> = ({
  Button,
  GRT,
  Grid,
  Typography,
  Card,
  CardContent,
  isMobile,
  classes,
  Loader,
  loading,
}) => {
  const YESBTNSX = {
    width: "70%",
    color: "green",
    borderColor: "green",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "green",
      color: "white",
      borderColor: "green",
    },
  };
  const NOBTNSX = {
    width: "70%",
    color: "red",
    borderColor: "red",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "red",
      color: "white",
      borderColor: "red",
    },
  };

  return (
    <Card className={!isMobile ? classes.card : classes.mobileCard}>
      <CardContent>
        {loading ? (
          <Grid
            sx={{
              padding: "50px 0",
              position: "relative",
              textAlign: "center",
            }}
          >
            <Loader />
          </Grid>
        ) : (
          <>
            <Grid className={classes.titleContainer} container>
              <Typography variant="h5">Do you need time?</Typography>
            </Grid>
            <Grid className={classes.bodyContainer} container>
              <Typography paragraph={true}>
                The time limit for your session is almost up. Do you need more
                time? Click "yes" to extend session.
              </Typography>
            </Grid>
            <Grid className={classes.buttonContainer} container>
              <Grid xs={6} md={6} item>
                <Button
                  variant="outlined"
                  sx={YESBTNSX}
                  onClick={GRT}
                  fullWidth
                >
                  Yes
                </Button>
              </Grid>
              <Grid xs={6} md={6} item>
                <Button variant="outlined" sx={NOBTNSX} onClick={GRT} fullWidth>
                  No
                </Button>
              </Grid>
            </Grid>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default Modal;
