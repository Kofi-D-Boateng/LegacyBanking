import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { FC, useRef, useState } from "react";
import { NavigateFunction } from "react-router-dom";
import MonthAndYearForm from "../../Forms/OptionForm/MonthAndYearForm";
import MonthForm from "../../Forms/OptionForm/MonthForm";
import YearForm from "../../Forms/OptionForm/YearForm";
import { MAINPROFILE } from "../../UI/Constants/Constants";

const Options: FC<{
  accountParam: string | null;
  nav: NavigateFunction;
  fName: string;
  lName: string;
  year: string | null;
  month: string | null;
}> = ({ nav, fName, lName, month, year, accountParam }) => {
  const [view, setView] = useState<string>("");
  const optionFilterHandler: (e: SelectChangeEvent<string>) => void = (e) => {
    setView(e.target.value);
  };
  const monthRef = useRef<HTMLSelectElement>();
  const yearRef = useRef<HTMLSelectElement>();

  const yearChange: (e: SelectChangeEvent<string>) => void = (e) => {
    const newYear = e.target.value;
    const mainProfileURL = `${fName}${lName}?display=${MAINPROFILE}&account=${accountParam}&year=${newYear}&month=${month}`;
  };
  const monthChange: (e: SelectChangeEvent<string>) => void = (e) => {
    const newMonth = e.target.value;
    const mainProfileURL = `${fName}${lName}?display=${MAINPROFILE}&account=${accountParam}&year=${year}&month=${newMonth}`;
  };
  const monthAndYearChange: (e: SelectChangeEvent<string>) => void = (e) => {
    const mainProfileURL = `${fName}${lName}?display=${MAINPROFILE}&account=${accountParam}&year=${yearRef.current?.value}&month=${monthRef.current?.value}`;
  };
  return (
    <>
      <Grid sm={6} md={6} item>
        <FormControl
          sx={{ width: "50%", margin: "10px auto" }}
          size="small"
          fullWidth
        >
          <InputLabel id="choice">Filter</InputLabel>
          <Select
            labelId="choice"
            label="Filter"
            value={view}
            onChange={optionFilterHandler}
          >
            <MenuItem value={"Year"}>Year</MenuItem>
            <MenuItem value={"Month"}>Month</MenuItem>
            <MenuItem value={"MonthAndYear"}>Year and Month</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      {view.includes("Year") && <YearForm yearHandler={yearChange} />}
      {view.includes("Month") && <MonthForm monthHandler={monthChange} />}
      {view.includes("Both") && (
        <MonthAndYearForm
          monthAndYearHandler={monthAndYearChange}
          yearRef={yearRef}
          monthRef={monthRef}
        />
      )}
    </>
  );
};

export default Options;
