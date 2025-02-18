import React from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase/firebase";
import { getDoc, doc } from "firebase/firestore";
import { Stack, Typography, TextField, IconButton, Grid2 } from "@mui/material";
import { formatDate } from "../../utils/helper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function BlogId() {
  const param = useParams();
  const [data, setData] = React.useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [previousPath, setPreviousPath] = useState(null);

  const fetchUsers = async () => {
    const docRef = doc(db, "blogs", param.id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const datas = { id: docSnap.id, ...docSnap.data() };
      setData(datas);
    } else {
      console.log("No such document!");
    }
  };

  const handleGoBack = () => {
    if (previousPath) {
      navigate(previousPath);
    } else {
      navigate("/home-page"); // Default fallback if no previous page is stored
    }
  };

  React.useEffect(() => {
    setPreviousPath((prev) => location.pathname !== prev ? prev : null);
  

    fetchUsers();
  }, [param.id, location.pathname]);

  return (
    <Grid2
      container
      sx={{
        width: "100%",
        height: "calc(100vh - 64px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <IconButton onClick={() => handleGoBack()} sx={{marginTop:'5px', position:'absolute' , left:'1%'}}><KeyboardDoubleArrowLeftIcon/></IconButton>
      <Grid2
        item
        sx={{
          height: "auto",
          minWidth: "450px",
          width: "50vw",
          backgroundColor: "white",
          marginTop: "50px",
          borderRadius: "10px",
          padding:'30px'
        }}
      >
        <Typography variant="h5" sx={{ fontFamily: "Merienda" }}>
          {data.title}
        </Typography>

        <Typography
          variant="body2"
          sx={{ display: "flex", alignItems: "center", fontFamily: "Merienda", gap: 1, marginTop: 2 }}
        >
          <AccessTimeIcon sx={{fontSize:'20px'}} />
          {formatDate(data.date)}
          <LocalOfferIcon sx={{fontSize:'18px'}}  />
          {data.type}
        </Typography>

        <Typography variant="body1" sx={{ fontFamily: "Merienda" }}>
          <div dangerouslySetInnerHTML={{ __html: data.content }} />
        </Typography>
        
      </Grid2>
    </Grid2>
  );
}
