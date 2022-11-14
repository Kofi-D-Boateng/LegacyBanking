import {
  FormControlLabelProps,
  FormControlTypeMap,
  GridTypeMap,
  RadioGroupProps,
  RadioProps,
} from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { FC, ChangeEvent } from "react";

const AccountLock: FC<{
  Grid: OverridableComponent<GridTypeMap<{}, "div">>;
  FormControl: OverridableComponent<FormControlTypeMap<{}, "div">>;
  RadioGroup: (props: RadioGroupProps) => JSX.Element;
  Radio: (props: RadioProps) => JSX.Element;
  FormControlLabel: (props: FormControlLabelProps) => JSX.Element;
  setLockedItem: (e: ChangeEvent<HTMLInputElement>) => void;
}> = ({
  Grid,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  setLockedItem,
}) => {
  return (
    <>
      <Grid container>
        <Grid sx={{ margin: "auto", textAlign: "center" }} xs={6} md={6} item>
          Lock your account due to identity theft or lost card?
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
      </Grid>
    </>
  );
};

export default AccountLock;
