import { Box, CircularProgress } from "@mui/material";
import { FC } from "react";

const ChartLoader: FC<{
  classes: {
    readonly [key: string]: string;
  };
}> = ({ classes }) => {
  return (
    <Box className={classes.box}>
      <CircularProgress />
    </Box>
  );
};

export default ChartLoader;
