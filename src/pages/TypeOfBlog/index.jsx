import React from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllBlogs,
  deleteDocument,
  getBlogByTab,
} from "../../firebase/Blogs/blogs";
import CardCover from "../../components/Card";
import { Grid2, Stack, Typography, Divider, Chip } from "@mui/material";
import { isMoreThanThreeDaysAgo } from "../../utils/helper";
import usePermission from "../../hooks/usePermission";
import MenuComponent from "../../components/Menu";
import CreateIcon from "@mui/icons-material/Create";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const tab = {
  "home-page": "home",
  sharing: "Sharing",
  cooking: "Cooking",
  health: "Health",
  "daily-life": "Daily life",
};

function HomePage() {
  const [data, setData] = React.useState([]);
  const permit = usePermission();
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
    if (type === "Daily life") {
      path = "/daily-life/" + id;
    } else {
      path = "/" + String(type).toLowerCase() + "/" + id;
    }
    navigate(path);
  };

  const handleDeletePost = async (id) => {
    const res = await deleteDocument(id);
    if (res.success) {
      fetchBlogs();
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };

  const handleEditPost = (id) => {
    navigate(`/edit-post/${id}`);
  };

  const options = [
    { name: "Chỉnh sửa", icon: <CreateIcon />, action: handleEditPost },
    { name: "Xóa", icon: <DeleteForeverIcon />, action: handleDeletePost },
  ];

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
          justifyContent: "flex-start",
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
              {permit && <MenuComponent idPost={item.id} options={options} />}
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
                  sx={{
                    fontFamily: "Merienda",
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  {item.title}
                  {isMoreThanThreeDaysAgo(item.date.seconds) && (
                    <Chip
                      label="Mới"
                      sx={{
                        backgroundColor: "var(--toast-error-text)",
                        color: "white",
                        textDecoration: "none",
                      }}
                    />
                  )}
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
