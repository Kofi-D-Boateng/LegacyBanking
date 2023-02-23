import { GridTypeMap, SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { FC } from "react";

const True: FC<{
  isMobile: boolean;
  Box: OverridableComponent<any>;
  PASSED: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  Grid: OverridableComponent<GridTypeMap<{}, "div">>;
}> = ({ Box, PASSED, Grid, isMobile }) => {
  return (
    <>
      {!isMobile ? (
        <Box
          sx={{ position: "absolute", top: "40%", left: "45%", color: "black" }}
        >
          <Grid sx={{ margin: "auto" }} container>
            <PASSED
              style={{ margin: "auto", color: "green", fontSize: "5.3rem" }}
            />
          </Grid>
          <Grid sx={{ textAlign: "justify", fontSize: "1.3rem" }} container>
            <p>Success!</p>
          </Grid>
        </Box>
      ) : (
        <Grid
          sx={{
            width: "100%",
            height: "100vh",
            color: "black",
          }}
          container
        >
          <Grid sx={{ margin: "auto", textAlign: "center" }} container>
            <PASSED
              style={{ margin: "auto", color: "green", fontSize: "5.3rem" }}
            />
            <Grid sx={{ margin: "auto", fontSize: "1.3rem" }} container>
              <p style={{ margin: "auto", textAlign: "center" }}>Success!</p>
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default True;
