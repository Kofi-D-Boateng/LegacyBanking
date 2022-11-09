import {
  CardContentTypeMap,
  CardTypeMap,
  ExtendButtonBase,
  FormControlLabelProps,
  FormControlTypeMap,
  GridTypeMap,
  IconButtonTypeMap,
  RadioGroupProps,
  RadioProps,
  SvgIconTypeMap,
  TypographyTypeMap,
} from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { ChangeEvent, Dispatch, FC, SetStateAction } from "react";

const Modal: FC<{
  classes: {
    readonly [key: string]: string;
  };
  isMobile: boolean;
  Card: OverridableComponent<CardTypeMap<{}, "div">>;
  CardContent: OverridableComponent<CardContentTypeMap<{}, "div">>;
  Grid: OverridableComponent<GridTypeMap<{}, "div">>;
  Typography: OverridableComponent<TypographyTypeMap<{}, "span">>;
  IconButton: ExtendButtonBase<IconButtonTypeMap<{}, "button">>;
  CloseIcon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  FormControl: OverridableComponent<FormControlTypeMap<{}, "div">>;
  FormControlLabel: (props: FormControlLabelProps) => JSX.Element;
  RadioGroup: (props: RadioGroupProps) => JSX.Element;
  Radio: (props: RadioProps) => JSX.Element;
  setChoice: Dispatch<
    SetStateAction<{
      isSelected: boolean;
      choice: string;
    }>
  >;
  Exit: () => void;
}> = ({
  classes,
  isMobile,
  Exit,
  setChoice,
  Card,
  CloseIcon,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  Typography,
  CardContent,
}) => {
  return (
    <Card className={!isMobile ? classes.card : classes.mobileCard}>
      <Grid
        sx={{
          backgroundColor: "#8a2be2",
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
              <RadioGroup
                onChange={(e: ChangeEvent<any>) => {
                  setChoice({
                    isSelected: true,
                    choice: e.currentTarget.value,
                  });
                }}
                defaultValue="none"
              >
                <FormControlLabel
                  value="Yes"
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
                  value="No"
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
      </CardContent>
    </Card>
  );
};

export default Modal;
