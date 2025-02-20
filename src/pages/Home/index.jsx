import React from "react";
import { useNavigate } from "react-router-dom";
import { getAllBlogs } from "../../firebase/Blogs/blogs";
import CardCover from "../../components/Card";
import { Grid2, Stack, Typography, Divider, Chip } from "@mui/material";
import { isMoreThanThreeDaysAgo } from "../../utils/helper";

function HomePage() {
  const [data, setData] = React.useState([]);
  let navigate = useNavigate();
  const fetchBlogs = async () => {
    const resData = await getAllBlogs();
    setData(resData);
  };
  React.useEffect(() => {
    fetchBlogs();
  }, []);

  const handleNavigate = (type, id) => {
    let path = "";
    if (type === "Daily life") {
      path = "/daily-life/" + id;
    }
    path = "/" + String(type).toLowerCase() + "/" + id;

    navigate(path);
  };

  return (
    <Grid2
      container
      md={12}
      xs={12}
      sx={{
        height: "calc(100vh - 70px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Grid2
        container
        xs={12}
        md={12}
        sx={{
          width: "77vw",
          minWidth: "400px",
          height: "calc(100vh - 70px)",
          flexWrap: "wrap",
          padding: "20px",
          paddingTop: "40px",
          paddingBottom: "50px",
          display: "flex",
          justifyContent: "flex-start;",
          alignItems: "flex-start",
          gap: 4,
        }}
      >
        {data.map((item) => (
          <Grid2
            key={item.id}
            onClick={() => handleNavigate(item.type, item.id)}
            item
            xs={3}
            md={3}
            sx={{ height: "240px", width: "350px", cursor: "pointer" }}
          >
            <CardCover>
              {isMoreThanThreeDaysAgo(item.date.seconds) && (
                <Chip
                  label="Mới"
                  sx={{
                    position: "absolute",
                    backgroundColor: "var(--toast-error-text)",
                    color: "white",
                    right:'1%',
                    top:'3%',
                  }}
                />
              )}
              <Stack
                sx={{
                  padding: "10px",
                  display: "flex",
                  gap: "2px",
                }}
              >
                <img
                  alt="thumbnail blog"
                  src={item.thumbnail}
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "contain",
                    backgroundColor: "var(--text-color)",
                  }}
                />
                <Divider sx={{ marginBottom: "5px" }} />
                <Typography
                  sx={{ fontFamily: "Merienda", textDecoration: "underline" }}
                >
                  {item.title}
                </Typography>
                <Chip
                  sx={{
                    fontFamily: "Merienda",
                    width: "100px",
                    flexGrow: 0,
                    backgroundColor: "var(--text-color)",
                    color: "var(--white)",
                  }}
                  label={`${item.type}`}
                />
              </Stack>
            </CardCover>
          </Grid2>
        ))}
      </Grid2>
    </Grid2>
  );
}

export default HomePage;
