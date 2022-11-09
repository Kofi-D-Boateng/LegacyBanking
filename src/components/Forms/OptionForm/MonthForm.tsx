import { Grid, MenuItem, TextField } from "@mui/material";
import { ChangeEvent, FC } from "react";
import { MonthMap } from "../../UI/Constants/Constants";

const MonthForm: FC<{
  monthHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  isMobile: boolean;
}> = ({ monthHandler }) => {
  const monthArr: Array<number> = new Array(12).fill(1);
  return (
    <Grid sx={{ margin: "auto" }} sm={6} md={6} item>
      <TextField
        sx={{ width: 200 }}
        select
        size="small"
        label={"Select month"}
        onChange={monthHandler}
        defaultValue=""
      >
        {monthArr.map((month, index) => {
          return (
            <MenuItem key={index} value={month + index}>
              {MonthMap[month + index]}
            </MenuItem>
          );
        })}
      </TextField>
    </Grid>
  );
};

export default MonthForm;
