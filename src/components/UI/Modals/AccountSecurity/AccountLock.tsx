import {
  FormControlLabelProps,
  FormControlTypeMap,
  GridTypeMap,
  RadioGroupProps,
  RadioProps,
} from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { LOCKEDACCOUNT } from "../../Constants/Constants";

const AccountLock: React.FC<{
  setView: React.Dispatch<React.SetStateAction<string>>;
  Grid: OverridableComponent<GridTypeMap<{}, "div">>;
  FormControl: OverridableComponent<FormControlTypeMap<{}, "div">>;
  RadioGroup: (props: RadioGroupProps) => JSX.Element;
  Radio: (props: RadioProps) => JSX.Element;
  FormControlLabel: (props: FormControlLabelProps) => JSX.Element;
  setChoice: React.Dispatch<
    React.SetStateAction<{
      choice: boolean;
      item: string;
    }>
  >;
}> = ({
  Grid,
  setView,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  setChoice,
}) => {
  const changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void = ({
    currentTarget,
  }) => {
    const { value } = currentTarget;
    if (value.includes("true")) {
      setChoice({ choice: true, item: LOCKEDACCOUNT });
      setView("");
    }
  };
  return (
    <>
      <Grid container>
        <Grid sx={{ margin: "auto", textAlign: "center" }} xs={6} md={6} item>
          Lock your account due to identity theft or lost card?
        </Grid>
        <Grid sx={{ textAlign: "center" }} xs={6} md={6} item>
          <FormControl>
            <RadioGroup onChange={changeHandler} defaultValue="none">
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
