import { Grid, Typography } from "@mui/material";
import { FC } from "react";
import { AccountType } from "../../../../enums/ProfileEnums";

const MonthlyExpenditure: FC<{
  details: { key: number; value: string; desc: string }[];
  accountType: string;
}> = ({ details, accountType }) => {
  const filtered = details.filter((p) => {
    return accountType.includes(AccountType.CREDIT)
      ? !p.desc.includes("Deposit")
      : p;
  });
  return (
    <>
      {filtered.map((d) => {
        return (
          <Grid key={d.key} md={4} item>
            <Grid container>
              <Grid xs={12} md={12} item>
                <Typography
                  sx={
                    parseInt(d.value) < 0 || d.value.substring(0, 1) === "-"
                      ? { color: "red" }
                      : { color: "green" }
                  }
                  variant="h6"
                >
                  {d.value}
                </Typography>
              </Grid>
              <Grid xs={12} md={12} item>
                <Typography variant="body1">{d.desc}</Typography>
              </Grid>
            </Grid>
          </Grid>
        );
      })}
    </>
  );
};

export default MonthlyExpenditure;
