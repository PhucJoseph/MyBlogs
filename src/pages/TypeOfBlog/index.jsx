import React from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllBlogs,
  // deleteDocument,
  getBlogByTab,
} from "../../firebase/Blogs/blogs";
import { Grid2, Box } from "@mui/material";
// import { isMoreThanThreeDaysAgo } from "../../utils/helper";
// import usePermission from "../../hooks/usePermission";
// import MenuComponent from "../../components/Menu";

// import toast from "react-hot-toast";
// import { TAG_COLORS } from "../../constants/const";
import { useParams } from "react-router-dom";

import Carousel from "../../components/Carousel";

const tab = {
  "home-page": "home",
  sharing: "Sharing",
  cooking: "Cooking",
  health: "Health",
  traveling: "Traveling",
};

function HomePage() {
  const [data, setData] = React.useState([]);
  // const permit = usePermission();
  let navigate = useNavigate();

  const tabName = useParams();
  const param = tab[tabName.type];

  const fetchBlogs = React.useCallback(async () => {
    if (param !== "home") {
      const data = await getBlogByTab(param);
      setData(data);
    } else {
      const resData = await getAllBlogs();
      setData(resData);
    }
  }, [param]);

  React.useEffect(() => {
    fetchBlogs();
  }, [tabName, fetchBlogs]);

  const handleNavigate = (type, id) => {
    let path = "";
    path = "/" + String(type).toLowerCase() + "/" + id;
    navigate(path);
  };

  return (
    <Grid2
      container
      md={12}
      xs={12}
      sx={{
        height: "calc(100vh - 116px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          left: "auto",
          top: "0%",
          right: "0%",
          width: "35vw",
          maxWidth: "35%",
          maxHeight: "600px",
          height: "60vh",
          minWidth: "100px",
          zIndex: -1,
          backgroundColor: "#fff5ef",
        }}
      ></Box>
      <Grid2
        container
        xs={12}
        md={12}
        sx={{
          width: "77vw",
          minWidth: "400px",
          height: "calc(100vh - 116px)",
          flexWrap: "wrap",
          padding: "20px",
          paddingTop: "116px",
          paddingBottom: "50px",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          gap: 4,
        }}
      >
        <Carousel data={data} handleNavigate={handleNavigate} />
      </Grid2>
    </Grid2>
  );
}

export default HomePage;
