import React from "react";
import { Card } from "@mui/material";

export default function CardCover({ children, hasShadow = true }) {
  return (
    <Card
      sx={{
        position:'relative',
        width: "100%",
        height: "100%",
        boxShadow: `${hasShadow ?  "rgba(0, 95, 115, 0.4) 5px 5px, rgba(0, 95, 115, 0.3) 10px 10px, rgba(0, 95, 115, 0.2) 15px 15px, rgba(0, 95, 115, 0.1) 20px 20px, rgba(0, 95, 115, 0.05) 25px 25px;" : ""}`,
      }}
    >
      {children}
    </Card>
  );
}
