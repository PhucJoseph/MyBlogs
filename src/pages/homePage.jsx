import React from "react";
import "../App.css";
import { db } from "../firebase/firebase";
import { query, where, getDocs, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import TextEditor from "../components/TextEditor";
import { getAllBlogs } from "../firebase/Blogs/blogs";
import CardCover from "../components/Card";
import { Grid2, Stack, Typography, Divider } from "@mui/material";

function HomePage() {
  const [data, setData] = React.useState([]);
  let navigate = useNavigate();
  const fetchBlogs = async () => {
    const resData = await getAllBlogs();
    setData(resData);
  };
  React.useEffect(() => {
    // const addUser = async () => {
    //   try {
    //     const docRef = await addDoc(collection(db, "blogs"), {
    //       name: "Alice Smith",
    //       age: 25,
    //       email: "alice@example.com",
    //     });
    //     //console.log("Document written with ID: ", docRef.id);
    //   } catch (e) {
    //     console.error("Error adding document: ", e);
    //   }
    // };
    // addUser();

    fetchBlogs();
  }, []);

  const handleNavigate = (type, id) => {
    let path = ""
    if (type === "Daily life") {
      path = "/daily-life/" + id;
    }
    path = '/' + String(type).toLowerCase() +'/' + id
    
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
      }}
    >
      <Grid2
        container
        xs={12}
        md={12}
        sx={{
          minWidth: "400px",
          width: "80vw",
          height: "100%",
          flexWrap: "wrap",
          padding: "20px",
          paddingTop: "40px",
          display: "flex",
          justifyContent: "space-around",
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
                <Typography>{item.title}</Typography>
                <Typography>{item.type}</Typography>
              </Stack>
            </CardCover>
          </Grid2>
        ))}
      </Grid2>
    </Grid2>
  );
}

export default HomePage;
