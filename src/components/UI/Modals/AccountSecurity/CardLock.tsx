import {
  FormControlLabelProps,
  FormControlTypeMap,
  GridTypeMap,
  RadioGroupProps,
  RadioProps,
} from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { ChangeEvent, Dispatch, FC, SetStateAction } from "react";
import { LOCKEDCARD } from "../../Constants/Constants";

const CardLock: FC<{
  setView: Dispatch<SetStateAction<string>>;
  Grid: OverridableComponent<GridTypeMap<{}, "div">>;
  FormControl: OverridableComponent<FormControlTypeMap<{}, "div">>;
  RadioGroup: (props: RadioGroupProps) => JSX.Element;
  Radio: (props: RadioProps) => JSX.Element;
  FormControlLabel: (props: FormControlLabelProps) => JSX.Element;
  setChoice: Dispatch<
    SetStateAction<{
      choice: boolean;
      item: string;
    }>
  >;
  isCardLocked: boolean;
  LOCKEDCARDMSG: string;
}> = ({
  Grid,
  setView,
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
  setChoice,
  isCardLocked,
  LOCKEDCARDMSG,
}) => {
  const changeHandler: (e: ChangeEvent<HTMLInputElement>) => void = ({
    currentTarget,
  }) => {
    const { value } = currentTarget;
    if (value.includes("true")) {
      setChoice({ choice: true, item: LOCKEDCARD });
      setView("");
    }
  };

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
          </>
        )}
      </Grid>
    </>
  );
};

export default CardLock;
