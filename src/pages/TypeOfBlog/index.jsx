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
// import CreateIcon from "@mui/icons-material/Create";
// import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
// import toast from "react-hot-toast";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
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

  // const handleDeletePost = async (id) => {
  //   const res = await deleteDocument(id);
  //   if (res.success) {
  //     fetchBlogs();
  //     toast.success(res.message);
  //   } else {
  //     toast.error(res.message);
  //   }
  // };

  // const handleEditPost = (id) => {
  //   navigate(`/edit-post/${id}`);
  // };

  // const options = [
  //   { name: "Edit", icon: <CreateIcon />, action: handleEditPost },
  //   { name: "Delete", icon: <DeleteForeverIcon />, action: handleDeletePost },
  // ];

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
        width: "100%",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          left: "auto",
          top: "0%",
          right: "0%",
          width: "100%",
          maxWidth: "35%",
          maxHeight: "600px",
          height: "100%",
          minWidth: "300px",
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
        {/* {permit && <MenuComponent idPost={item.id} options={options} iconMenu={<MoreVertIcon />} />} */}
        <Carousel data={data} handleNavigate={handleNavigate} />
      </Grid2>
    </Grid2>
  );
}

export default HomePage;
