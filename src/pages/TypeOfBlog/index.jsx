import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllBlogs, getBlogByTab, deleteDocument } from "../../firebase/Blogs/blogs";
import { Grid2, Box } from "@mui/material";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Carousel from "../../components/Carousel";
import toast from "react-hot-toast";

const tab = {
  "home-page": "home",
  sharing: "Sharing",
  cooking: "Cooking",
  health: "Health",
  traveling: "Traveling",
};

function HomePage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { type } = useParams();
  const param = tab[type];

  // ✅ fetch blogs
  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ["blogs", param],
    queryFn: async () => {
      if (param !== "home") return getBlogByTab(param);
      return getAllBlogs();
    },
  });

  // ✅ delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id) => deleteDocument(id),
    onSuccess: (res, id) => {
      if (res.success) {
        toast.success(res.message);
        // remove deleted blog from cache
        queryClient.setQueryData(["blogs", param], (old = []) =>
          old.filter((b) => b.id !== id)
        );
      } else {
        toast.error(res.message);
      }
    },
    onError: () => {
      toast.error("Failed to delete blog");
    },
  });

  // navigate to blog detail
  const handleNavigate = (type, id) => {
    navigate(`/${String(type).toLowerCase()}/${id}`);
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
      />
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
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <Carousel
            data={blogs}
            handleNavigate={handleNavigate}
            handleDelete={(id) => deleteMutation.mutate(id)}
          />
        )}
      </Grid2>
    </Grid2>
  );
}

export default HomePage;
