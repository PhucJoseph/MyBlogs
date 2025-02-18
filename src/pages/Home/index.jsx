import React from "react";
import { useNavigate } from "react-router-dom";
import { getAllBlogs } from "../../firebase/Blogs/blogs";
import CardCover from "../../components/Card";
import { Grid2, Stack, Typography, Divider } from "@mui/material";

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
          paddingBottom:'50px',
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
            sx={{ height: "220px", width: "350px", cursor: "pointer" }}
          >
            <CardCover>
              <Stack
                sx={{
                  padding: "10px",
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
                <Typography sx={{ fontFamily: "Merienda" }}>
                  {item.title}
                </Typography>
                <Typography sx={{ fontFamily: "Merienda" }}>
                  {item.type}
                </Typography>
              </Stack>
            </CardCover>
          </Grid2>
        ))}
      </Grid2>
    </Grid2>
  );
}

export default HomePage;
