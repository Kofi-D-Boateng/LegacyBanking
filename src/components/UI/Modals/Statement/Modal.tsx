import {
  CardContentTypeMap,
  CardTypeMap,
  ExtendButtonBase,
  GridTypeMap,
  IconButtonTypeMap,
  SvgIconTypeMap,
  TypographyTypeMap,
} from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { FC } from "react";

const Modal: FC<{
  classes: {
    readonly [key: string]: string;
  };
  Exit: () => void;
  isMobile: boolean;
  MockStatements: {
    key: number;
    date: string;
    amount: number;
    amountPaid: number;
  }[];
  Card: OverridableComponent<CardTypeMap<{}, "div">>;
  Grid: OverridableComponent<GridTypeMap<{}, "div">>;
  Typography: OverridableComponent<TypographyTypeMap<{}, "span">>;
  IconButton: ExtendButtonBase<IconButtonTypeMap<{}, "button">>;
  CardContent: OverridableComponent<CardContentTypeMap<{}, "div">>;
  Close: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  MockStatementsTitles: {
    key: number;
    title: string;
  }[];
}> = ({
  classes,
  Exit,
  isMobile,
  Card,
  Grid,
  IconButton,
  MockStatements,
  Typography,
  CardContent,
  Close,
  MockStatementsTitles,
}) => {
  return (
    <Card className={!isMobile ? classes.card : classes.mobileCard}>
      <Grid
        sx={{
          backgroundColor: "#8a2be2",
          padding: "20px 0",
        }}
        container
      >
        <Typography
          sx={{
            flexGrow: "1",
            margin: "auto",
            textAlign: "center",
            color: "white",
          }}
          variant="h6"
        >
          Account Statements
        </Typography>
        <IconButton
          onClick={Exit}
          sx={{
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
        >
          <Close sx={{ color: "white" }} />
        </IconButton>
      </Grid>
      <CardContent>
        <>
          <Grid sx={{ textAlign: "center", padding: "20px 0" }} container>
            {MockStatementsTitles.map((T) => {
              return (
                <Grid
                  key={T.key}
                  xs={12 / MockStatementsTitles.length}
                  md={12 / MockStatementsTitles.length}
                  item
                >
                  <Typography variant="body1">{T.title}</Typography>
                </Grid>
              );
            })}
          </Grid>
          {MockStatements.map((S) => {
            return (
              <Grid key={S.key} sx={{ textAlign: "center" }} container>
                <Grid
                  sx={{ margin: "auto" }}
                  xs={12 / MockStatements.length}
                  md={12 / MockStatements.length}
                  item
                >
                  <Typography variant="body1">{S.date}</Typography>
                </Grid>
                <Grid
                  sx={{ margin: "auto" }}
                  xs={12 / MockStatements.length}
                  md={12 / MockStatements.length}
                  item
                >
                  <Typography variant="body1">${S.amount}</Typography>
                </Grid>
                <Grid
                  sx={{ margin: "auto" }}
                  xs={12 / MockStatements.length}
                  md={12 / MockStatements.length}
                  item
                >
                  <Typography variant="body1">${S.amountPaid}</Typography>
                </Grid>
                <div
                  style={{
                    borderBottom: "0.5px solid black",
                    width: "100%",
                  }}
                ></div>
              </Grid>
            );
          })}
        </>
      </CardContent>
    </Card>
  );
};

export default Modal;
