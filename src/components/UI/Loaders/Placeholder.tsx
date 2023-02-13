import { Card, CardContent, Typography } from "@mui/material";
import { FC } from "react";

const Placeholder: FC<{
  classes: {
    readonly [key: string]: string;
  };
  isMobile: boolean;
}> = ({ classes, isMobile }) => {
  return (
    <Card className={!isMobile ? classes.card : classes.mobCard}>
      <CardContent>
        <Typography variant="h5">No data to represent</Typography>
      </CardContent>
    </Card>
  );
};

export default Placeholder;
