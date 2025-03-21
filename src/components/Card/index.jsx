import React from "react";
import { Card } from "@mui/material";

export default function CardCover({ children, hasShadow = true }) {
  return (
    <Card
      sx={{
        position:'relative',
        width: "100%",
        height: "100%",
        borderRadius: "15px",
        boxShadow: `${hasShadow ?  " rgba(255,255,255, 0.1) 0px 8px 32px, rgba(255,255,255, 0.1) 0px 16px 56px, rgba(255,255,255, 0.1) 0px 24px 80px" : ""}`,
      }}
    >
      {children}
    </Card>
  );
}

