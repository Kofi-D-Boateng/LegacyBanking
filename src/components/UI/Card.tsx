import { Card } from "@mui/material";
import { FC, ReactNode } from "react";

const Kard: FC<{ children: ReactNode }> = ({ children }) => {
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
