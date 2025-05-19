import React from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  IconButton,
  Grid2,
  Box,
  useMediaQuery,
  Avatar,
} from "@mui/material";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DOMPurify from "dompurify";
import { getBlogById } from "../../firebase/Blogs/blogs";
import { convertTimestampToDate } from "../../utils/helper";
import { TAG_COLORS } from "../../constants/const";
import avatar from "../../assets/image/avata.jpeg";
import CircleIcon from "@mui/icons-material/Circle";
import Loading from "../../components/Loading";
import useAsync from "../../hooks/useAsync";

export default function BlogId() {
  const param = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [previousPath, setPreviousPath] = useState(null);
  const isMobile = useMediaQuery("(max-width:600px)");
  const {loading,error,value} = useAsync(() => {
    return new Promise((resolve, reject) => {
      getBlogById(param.id).then((data) => {
        if (data) {
          resolve(data)
        } else {
          reject("No data")
        }
      }).catch((error) => {
        reject(error)
      })

    })
  },[param.id]);

  const handleGoBack = () => {
    if (previousPath) {
      navigate(previousPath);
    } else {
      navigate("/home-page"); // Default fallback if no previous page is stored
    }
  };

  React.useEffect(() => {
    setPreviousPath((prev) => (location.pathname !== prev ? prev : null));
  }, [param.id, location.pathname]);

  if (loading) {
    return <Loading />;
  }

  return (
    <Grid2
      container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "60px",
      }}
    >
      <IconButton
        onClick={() => handleGoBack()}
        sx={{ position: "absolute", left: "1%" }}
      >
        <KeyboardDoubleArrowLeftIcon />
      </IconButton>
      <Grid2
        item
        sx={{
          height: "auto",
          minWidth: "450px",
          width: "80vw",
          backgroundColor: "white",
          borderRadius: "10px",
          padding: "30px",
        }}
      >
        <Typography
          variant="body2"
          sx={{
            display: "flex",
            alignItems: "center",
            fontFamily: "var(--font-text-SSP)",
            gap: 1,
            marginTop: 2,
          }}
        >
          <Box
            sx={{
              backgroundColor: TAG_COLORS[value?.type]?.bgColor,
              color: "var(--dark)",
              padding: "0.4rem 0.7rem",
              textAlign: "center",
              borderRadius: "5px",
              fontSize: isMobile ? "0.8rem" : "0.95rem",
            }}
          >
            {value?.type}
          </Box>
          {value?.date && convertTimestampToDate(value?.date)}
        </Typography>
        <Typography
          variant={isMobile ? "h6" : "h3"}
          sx={{
            fontFamily: "var(--font-text-SSP)",
            fontWeight: 600,
            marginTop: 2,
          }}
        >
          {value?.title}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", marginTop: 4 }}>
          <Avatar
            src={avatar}
            alt={"Phuc Joseph"}
            sx={{ width: isMobile ? 30 : 40, height: isMobile ? 30 : 40 }}
          />
          <Typography
            variant="body2"
            sx={{
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              marginLeft: "0.5rem",
            }}
          >
            Phuc Joseph
            <Typography
              sx={{
                marginLeft: "0.8rem",
                color: "#555",
                fontWeight: "500",
                display: "flex",
                alignItems: "center",
                gap: "0.25rem",
              }}
            >
              <CircleIcon sx={{ fontSize: "0.45rem" }} /> {value?.readingTime} to
              read
            </Typography>
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ fontFamily: "var(--font-text-SSP)", }}>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(value.content),
            }}
          />
        </Typography>
      </Grid2>
    </Grid2>
  );
}
