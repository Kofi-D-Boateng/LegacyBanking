import {
  ButtonTypeMap,
  ExtendButtonBase,
  GridTypeMap,
  TypographyTypeMap,
} from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { FC, MouseEvent } from "react";
import { Notification } from "../../../types/Notification";

const Notis: FC<{
  n: Notification;
  index: number;
  length: number;
  markRead: (e: MouseEvent<HTMLButtonElement>) => void;
  Grid: OverridableComponent<GridTypeMap<{}, "div">>;
  Typography: OverridableComponent<TypographyTypeMap<{}, "span">>;
  Button: ExtendButtonBase<ButtonTypeMap<{}, "button">>;
}> = ({ n, markRead, Grid, Typography, Button, index, length }) => {
  const DATE = new Date(n.date).toLocaleDateString();
  const TEMPLATE: string = `A transaction of ${n.amount.toLocaleString(
    "en-us",
    {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }
  )} was sent to ${n.receiver} from ${n.sender}.`;
  return (
    <>
      <Grid key={n._id} sx={{ overflow: "hidden" }} container>
        <Button
          variant="text"
          value={n._id}
          sx={{ color: n.read ? "lightgray" : "blue", textTransform: "none" }}
          onClick={markRead}
          disabled={n.read ? true : false}
        >
          <Grid container>
            <Grid xs={3} md={2} item>
              <Typography variant="body1">{DATE}</Typography>
            </Grid>
            <Grid sm={9} md={10} item>
              <Typography variant="body1">{TEMPLATE}</Typography>
            </Grid>
          </Grid>
        </Button>
      </Grid>
      {index !== length - 1 && <hr />}
    </>
  );
};

export default Notis;
