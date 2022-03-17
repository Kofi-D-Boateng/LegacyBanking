import { Grid, Typography, Card, CardContent } from "@mui/material";
import { ClassNameMap } from "@mui/styles/withStyles";
import React from "react";

const AccountActivity: React.FC<{ classes: ClassNameMap<string> }> = ({
  classes,
}) => {
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="body1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
          numquam voluptatum placeat, magnam ad odit facilis harum iste sint
          libero tempore doloremque facere. Dolorem voluptate dolorum ducimus
          dignissimos nam quo.
        </Typography>
        <Typography variant="body1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
          numquam voluptatum placeat, magnam ad odit facilis harum iste sint
          libero tempore doloremque facere. Dolorem voluptate dolorum ducimus
          dignissimos nam quo.
        </Typography>
        <Typography variant="body1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
          numquam voluptatum placeat, magnam ad odit facilis harum iste sint
          libero tempore doloremque facere. Dolorem voluptate dolorum ducimus
          dignissimos nam quo.
        </Typography>
        <Typography variant="body1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
          numquam voluptatum placeat, magnam ad odit facilis harum iste sint
          libero tempore doloremque facere. Dolorem voluptate dolorum ducimus
          dignissimos nam quo.
        </Typography>
        <Typography variant="body1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
          numquam voluptatum placeat, magnam ad odit facilis harum iste sint
          libero tempore doloremque facere. Dolorem voluptate dolorum ducimus
          dignissimos nam quo.
        </Typography>
        <Typography variant="body1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
          numquam voluptatum placeat, magnam ad odit facilis harum iste sint
          libero tempore doloremque facere. Dolorem voluptate dolorum ducimus
          dignissimos nam quo.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default AccountActivity;
