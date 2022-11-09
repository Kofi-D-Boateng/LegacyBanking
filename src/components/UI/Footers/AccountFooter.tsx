import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { FC } from "react";

const AccountFooter: FC = () => {
  return (
    <Box
      style={{
        backgroundColor: "#8a2be2",
        padding: "40px 0",
        marginTop: "auto",
      }}
    >
      <footer>
        <Grid container>
          <Grid sx={{ margin: "auto" }} xs={10} md={10} item>
            <Typography variant="body1">
              Legacy Bank, N.A. and its affiliates offer investment products,
              which may include bank managed accounts and custody, as part of
              its trust and fiduciary services. Other investment products and
              services, such as brokerage and advisory accounts, are offered
              through Legacy Securities LLC (LS), a member of FINRA and SIPC.
            </Typography>
          </Grid>
        </Grid>
      </footer>
    </Box>
  );
};

export default AccountFooter;
