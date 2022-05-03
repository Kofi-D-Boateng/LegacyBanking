import { Card } from "@mui/material";
import React from "react";
import { GlobalLayouts } from "../../GlobalTypes/types";

const Kard: React.FC<GlobalLayouts> = ({ children }) => {
  return (
    <Card
      sx={{
        border: "1px solid rgba(0,0,0,1)",
        borderRadius: "20px",
        margin: "50px auto",
        maxWidth: "70%",
        textAlign: "center",
      }}
    >
      {children}
    </Card>
  );
};

export default Kard;
