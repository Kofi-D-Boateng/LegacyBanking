import { Grid, MenuItem, TextField } from "@mui/material";
import { ChangeEvent, FC } from "react";

const YearForm: FC<{
  yearHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  isMobile: boolean;
}> = ({ yearHandler }) => {
  const yearArr: Array<number> = new Array(50).fill(new Date().getFullYear());
  return (
    <Grid sx={{ margin: "auto" }} sm={6} md={6} item>
      <TextField
        sx={{ width: 200 }}
        select
        size="small"
        label={"Select year"}
        onChange={yearHandler}
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
  );
};

export default YearForm;
