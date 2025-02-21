import loading from "../../assets/image/loading.gif";
import { Grid2, Typography } from "@mui/material";

export default function Loading() {
  return (
    <Grid2
      xs={12}
      md={12}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <img src={loading} alt="loading" style={{ height: "100px" }} />
      <Typography>Xin chờ 1 xíu !!</Typography>
    </Grid2>
  );
}
