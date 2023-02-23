import { GridTypeMap, SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { FC } from "react";

const False: FC<{
  isMobile: boolean;
  FAILED: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  Box: OverridableComponent<any>;
  Grid: OverridableComponent<GridTypeMap<{}, "div">>;
}> = ({ FAILED, Box, Grid, isMobile }) => {
  return (
    <>
      {!isMobile ? (
        <Box
          sx={{ position: "absolute", top: "40%", left: "30%", color: "black" }}
        >
          <Grid sx={{ margin: "auto" }} container>
            <FAILED
              style={{ margin: "auto", color: "red", fontSize: "5.3rem" }}
            />
          </Grid>
          <Grid sx={{ textAlign: "justify", fontSize: "1.3rem" }} container>
            <p>
              Verification for your account has failed. Please request a new
              link.
            </p>
          </Grid>
        </Box>
      ) : (
        <Grid
          sx={{
            width: "100%",
            height: "100vh",
            textAlign: "center",
            color: "black",
          }}
          container
        >
          <Grid sx={{ margin: "auto" }} container>
            <FAILED
              style={{ margin: "auto", color: "red", fontSize: "5.3rem" }}
            />
            <Grid sx={{ textAlign: "justify", fontSize: "1.3rem" }} item>
              <p style={{ margin: "auto", textAlign: "center" }}>
                Verification for your account has failed. Please request a new
                link.
              </p>
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default False;
