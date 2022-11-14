import { ChangeEvent, FC, useRef } from "react";
import { Grid, MenuItem, TextField } from "@mui/material";
import { NavigateFunction } from "react-router-dom";
import MonthAndYearForm from "../../Forms/OptionForm/MonthAndYearForm";
import MonthForm from "../../Forms/OptionForm/MonthForm";
import YearForm from "../../Forms/OptionForm/YearForm";
import { MAINPROFILE, MonthMap } from "../../UI/Constants/Constants";

const Options: FC<{
  accountParam: string | null;
  filterParam: string | null;
  nav: NavigateFunction;
  fName: string;
  lName: string;
  year: string | null;
  month: string | null;
  isMobile: boolean;
}> = ({
  nav,
  fName,
  lName,
  month,
  year,
  accountParam,
  isMobile,
  filterParam,
}) => {
  const optionFilterHandler: (e: ChangeEvent<HTMLInputElement>) => void = (
    e
  ) => {
    const { value } = e.target;
    const url = `${fName}${lName}?display=${MAINPROFILE}&account=${accountParam}&year=${year}&month=${month}&filter=${value}`;
    nav(url, { replace: false });
  };

  const yearRef = useRef<string | undefined>(undefined);
  const monthRef = useRef<string | undefined>(undefined);

  const selection: Array<{ value: string; option: string }> = [
    { value: "Year", option: "Year" },
    { value: "Month", option: "Month" },
    { value: "Both", option: "Month And Year" },
    { value: "Remove", option: "Remove filter" },
  ];

  const yearChange: (e: ChangeEvent<HTMLInputElement>) => void = (e) => {
    const newYear = e.target.value;
    const mainProfileURL = `${fName}${lName}?display=${MAINPROFILE}&account=${accountParam}&year=${year}&month=${month}&filter=${filterParam}&filterYear=${newYear}`;
    nav(mainProfileURL, { replace: false });
  };
  const monthChange: (e: ChangeEvent<HTMLInputElement>) => void = (e) => {
    const newMonth: number = parseInt(e.target.value);
    const mainProfileURL = `${fName}${lName}?display=${MAINPROFILE}&account=${accountParam}&year=${year}&month=${month}&filter=${filterParam}&filterMonth=${MonthMap[newMonth]}`;
    nav(mainProfileURL, { replace: false });
  };
  const monthAndYearChange: (e: ChangeEvent<HTMLInputElement>) => void = (
    e
  ) => {
    const { value, name } = e.target;
    if (name.includes("month")) monthRef.current = value;
    if (name.includes("year")) yearRef.current = value;
    if (!monthRef.current || !yearRef.current) return;
    const newMonth = parseInt(monthRef.current);
    const mainProfileURL = `${fName}${lName}?display=${MAINPROFILE}&account=${accountParam}&year=${year}&month=${month}&filter=${filterParam}&filterYear=${yearRef.current}&filterMonth=${MonthMap[newMonth]}`;
    nav(mainProfileURL, { replace: false });
  };

  return (
    <>
      <Grid sm={3} md={4} item>
        <TextField
          select
          size="small"
          sx={{
            width: !isMobile ? 130 : 120,
            margin: "10px auto",
          }}
          label={"Filter"}
          onChange={optionFilterHandler}
          defaultValue=""
        >
          {selection.map((s, i) => {
            return (
              <MenuItem key={i} value={s.value}>
                {s.option}
              </MenuItem>
            );
          })}
        </TextField>
      </Grid>
      {filterParam?.includes("Year") && (
        <YearForm yearHandler={yearChange} isMobile={isMobile} />
      )}
      {filterParam?.includes("Month") && (
        <MonthForm monthHandler={monthChange} isMobile={isMobile} />
      )}
      {filterParam?.includes("Both") && (
        <MonthAndYearForm
          monthAndYearHandler={monthAndYearChange}
          isMobile={isMobile}
        />
      )}
    </>
  );
};

export default Options;
