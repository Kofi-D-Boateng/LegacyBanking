import { Grid, MenuItem, TextField } from "@mui/material";
import { ChangeEvent, FC } from "react";
import { MonthMap } from "../../UI/Constants/Constants";

const MonthAndYearForm: FC<{
  monthAndYearHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  isMobile: boolean;
}> = ({ monthAndYearHandler, isMobile }) => {
  const yearArr: Array<number> = new Array(50).fill(new Date().getFullYear());
  const monthArr: Array<number> = new Array(12).fill(1);
  return (
    <>
      <Grid sx={{ margin: "auto" }} sm={6} md={4} item>
        <TextField
          sx={{ width: !isMobile ? 130 : 120 }}
          select
          size="small"
          label={"Select year"}
          name="year"
          onChange={monthAndYearHandler}
          defaultValue=""
        >
          {yearArr.map((year, index) => {
            return (
              <MenuItem key={index} value={year - index}>
                {year - index}
              </MenuItem>
            );
          })}
        </TextField>
      </Grid>
      <Grid sx={{ margin: "auto" }} sm={6} md={4} item>
        <TextField
          sx={{ width: !isMobile ? 130 : 120 }}
          select
          size="small"
          label={"Select month"}
          name="month"
          onChange={monthAndYearHandler}
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
    </>
  );
};

export default MonthAndYearForm;
