import { SelectChangeEvent } from "@mui/material";
import { FC } from "react";

const MonthAndYearForm: FC<{
  monthAndYearHandler: (e: SelectChangeEvent<string>) => void;
  yearRef: React.MutableRefObject<HTMLSelectElement | undefined>;
  monthRef: React.MutableRefObject<HTMLSelectElement | undefined>;
}> = () => {
  return <></>;
};

export default MonthAndYearForm;
