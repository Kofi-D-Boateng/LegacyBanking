import {
  Button,
  Card,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import Results from "./Results";

const BankSearch: React.FC<{
  bank: {
    name: string;
    country: string;
    area: string;
    zipcode: string;
    totalHoldings: number;
    branches: {
      name: string;
      country: string;
      area: string;
      zipcode: string;
      totalHoldings: number;
    }[];
  };
  param: {
    state: string | undefined;
    zipcode: string | undefined;
    country: string | undefined;
  };
  onParam: React.Dispatch<
    React.SetStateAction<{
      state: string | undefined;
      zipcode: string | undefined;
      country: string | undefined;
    }>
  >;
}> = ({ bank, onParam, param }) => {
  const textRef = useRef<HTMLInputElement | undefined>();
  const [isSelected, setIsSelected] = useState<{
    selection: string;
    isSelected: boolean;
  }>({ isSelected: false, selection: "" });

  const selectionHandler: (e: SelectChangeEvent) => void = ({ target }) => {
    const { value } = target;
    value && setIsSelected({ isSelected: true, selection: value });
    return;
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (!isSelected.isSelected) {
      return;
    }
    onParam({
      country:
        isSelected.selection === "country" ? textRef.current?.value : undefined,
      state:
        isSelected.selection === "state" ? textRef.current?.value : undefined,
      zipcode:
        isSelected.selection === "zipcode" ? textRef.current?.value : undefined,
    });
  };

  return (
    <>
      <Grid container>
        <Paper
          sx={{
            border: "0.5px solid black",
            width: "90%",
            margin: "auto",
          }}
        >
          <Typography
            sx={{ textAlign: "center", padding: "20px 0" }}
            variant="h5"
          >
            Find a location near you
          </Typography>
          <form onSubmit={submitHandler}>
            <Grid
              sx={{
                margin: "auto",
                width: "100%",
                border: "0.2px solid lightgray",
              }}
              container
            >
              <Grid
                sx={{ padding: "10px 0", margin: "auto" }}
                xs={isSelected.isSelected ? 4 : 6}
                md={isSelected.isSelected ? 4 : 6}
                item
              >
                <Button
                  type="submit"
                  variant="outlined"
                  sx={{
                    textTransform: "none",
                    margin: "auto",
                    width: "50%",
                    borderColor: "purple",
                    color: "purple",
                    "&:hover": {
                      backgroundColor: "purple",
                      color: "white",
                      borderColor: "purple",
                    },
                  }}
                  fullWidth
                >
                  Submit
                </Button>
              </Grid>
              {isSelected.isSelected && (
                <Grid
                  sx={{ margin: "auto" }}
                  xs={isSelected.isSelected ? 4 : 6}
                  md={isSelected.isSelected ? 4 : 6}
                  item
                >
                  <TextField
                    sx={{ width: "70%" }}
                    variant="outlined"
                    size="small"
                    inputRef={textRef}
                    fullWidth
                  />
                </Grid>
              )}
              <Grid sx={{ margin: "auto" }} xs={4} md={4} item>
                <FormControl size="small" variant="outlined" fullWidth>
                  <InputLabel id="label">Select By</InputLabel>
                  <Select
                    label="select"
                    value={isSelected.selection}
                    onChange={selectionHandler}
                  >
                    <MenuItem value={"state"}>State</MenuItem>
                    <MenuItem value={"country"}>Country</MenuItem>
                    <MenuItem value={"zipcode"}>Zipcode</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </form>
          <Grid container>
            <Results bank={bank} param={param} />
          </Grid>
        </Paper>
      </Grid>
    </>
  );
};

export default BankSearch;
