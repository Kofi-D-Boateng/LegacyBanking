import React from "react";
import ReactDOM from "react-dom";
import Backdrop from "../Backdrops/Backdrop";
import {
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  ClassNameMap,
  Typography,
  IconButton,
  SelectChangeEvent,
  Button,
} from "@mui/material";
import { backdropDiv, overlayDiv } from "../Layouts/RootElement";
import CloseIcon from "@mui/icons-material/Close";

const Modal: React.FC<{
  classes: ClassNameMap<string>;
  isMobile: boolean;
  paperlessHandler: (event: SelectChangeEvent) => void;
  Exit: () => void;
}> = ({ classes, isMobile, Exit, paperlessHandler }) => {
  return (
    <Card className={!isMobile ? classes.card : classes.mobileCard}>
      <Grid
        sx={{
          backgroundColor: "purple",
          padding: "20px 0",
        }}
        container
      >
        <Typography
          sx={{
            flexGrow: "1",
            margin: "auto",
            textAlign: "center",
            color: "white",
          }}
          variant="h6"
        >
          Go Paperless with Legacy Push
        </Typography>
        <IconButton
          onClick={Exit}
          sx={{
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
        >
          <CloseIcon sx={{ color: "white" }} />
        </IconButton>
      </Grid>
      <CardContent>
        <Grid container>
          <Grid sx={{ margin: "auto", textAlign: "center" }} xs={6} md={6} item>
            Sign Up for paperless billing
          </Grid>
          <Grid sx={{ textAlign: "center" }} xs={6} md={6} item>
            <FormControl>
              <RadioGroup onChange={paperlessHandler} defaultValue="none">
                <FormControlLabel
                  value={true}
                  control={
                    <Radio
                      color="success"
                      sx={{
                        "&:hover": {
                          backgroundColor: "transparent",
                        },
                      }}
                    />
                  }
                  label="Yes"
                />
                <FormControlLabel
                  value={false}
                  control={
                    <Radio
                      color="success"
                      sx={{
                        "&:hover": {
                          backgroundColor: "transparent",
                        },
                      }}
                    />
                  }
                  label="No"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container>
          <Button
            className={classes.btn}
            onClick={Exit}
            size="small"
            variant="outlined"
            fullWidth
          >
            Submit
          </Button>
        </Grid>
      </CardContent>
    </Card>
  );
};

const Paperless: React.FC<{
  Exit: () => void;
  mobile: boolean;
  onChoice: (event: SelectChangeEvent) => void;
  classes: {
    readonly [key: string]: string;
  };
}> = ({ Exit, mobile, onChoice, classes }) => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop Exit={Exit} />, backdropDiv)}
      {ReactDOM.createPortal(
        <Modal
          classes={classes}
          Exit={Exit}
          paperlessHandler={onChoice}
          isMobile={mobile}
        />,
        overlayDiv
      )}
    </>
  );
};

export default Paperless;
