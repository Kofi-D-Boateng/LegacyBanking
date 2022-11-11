import {
  FormControlLabelProps,
  FormControlTypeMap,
  GridTypeMap,
  RadioGroupProps,
  RadioProps,
} from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { ChangeEvent, FC } from "react";

const CardLock: FC<{
  setLockedItem: (e: ChangeEvent<HTMLInputElement>) => void;
  Grid: OverridableComponent<GridTypeMap<{}, "div">>;
  FormControl: OverridableComponent<FormControlTypeMap<{}, "div">>;
  RadioGroup: (props: RadioGroupProps) => JSX.Element;
  Radio: (props: RadioProps) => JSX.Element;
  FormControlLabel: (props: FormControlLabelProps) => JSX.Element;
  isCardLocked: boolean;
  LOCKEDCARDMSG: string;
}> = ({
  Grid,
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
  setLockedItem,
  isCardLocked,
  LOCKEDCARDMSG,
}) => {
  return (
    <>
      <Grid container>
        {isCardLocked ? (
          LOCKEDCARDMSG
        ) : (
          <>
            <Grid
              sx={{ margin: "auto", textAlign: "center" }}
              xs={6}
              md={6}
              item
            >
              Lock card due to theft or lost card
            </Grid>
            <Grid sx={{ textAlign: "center" }} xs={6} md={6} item>
              <FormControl>
                <RadioGroup onChange={setLockedItem} defaultValue="none">
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
                </RadioGroup>
              </FormControl>
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
};

export default CardLock;
