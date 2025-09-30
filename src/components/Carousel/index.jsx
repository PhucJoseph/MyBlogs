import React, { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  Typography,
  useMediaQuery,
  Avatar,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { TAG_COLORS } from "../../constants/const";
import { convertTimestampToDate } from "../../utils/helper";
import avatar from "../../assets/image/avata.jpeg";
import CircleIcon from "@mui/icons-material/Circle";
import "./carousel.css";
import MenuComponent from "../../components/Menu";
import CreateIcon from "@mui/icons-material/Create";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useNavigate } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import usePermission from "../../hooks/usePermission";
import VisibilityIcon from "@mui/icons-material/Visibility";
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';

const Carousel = ({ data, handleNavigate }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isMobile = useMediaQuery("(max-width:600px)");
  const isTablet = useMediaQuery("(max-width:900px)");
  const permit = usePermission();

  let navigate = useNavigate();

  const isSingleItem = data.length === 1;
  const dateTime =
    data[currentIndex]?.date &&
    convertTimestampToDate(data[currentIndex]?.date);

  const nextSlide = React.useCallback(() => {
    if (!isSingleItem) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
    }
  }, [isSingleItem, data.length]);

  useEffect(() => {
    if (!isSingleItem) {
      const interval = setInterval(() => {
        nextSlide();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [currentIndex, isSingleItem, nextSlide]);

  const prevSlide = () => {
    if (!isSingleItem) {
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + data.length) % data.length
      );
    }
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

  const handleEditPost = (id) => {
    navigate(`/edit-post/${id}`);
  };

  const options = [
    { name: "Edit", icon: <CreateIcon />, action: handleEditPost },
    { name: "Delete", icon: <DeleteForeverIcon />, action: () => {} },
  ];

  return (
    data.length > 0 && (
      <Box
        className="carousel-container"
        sx={{ maxWidth: isTablet ? "90%" : "70%", margin: "auto" }}
      >
        {!isTablet && !isSingleItem && (
          <IconButton
            className="carousel-btn left"
            onClick={prevSlide}
            disabled={currentIndex === 0}
          >
            <ChevronLeftIcon fontSize="large" />
          </IconButton>
        )}
        <Box className="carousel-slide fade">
          <Box
            className="carousel-content"
            sx={{
              display: "flex",
              flexDirection: isTablet ? "column" : "row",
              alignItems: "center",
            }}
          >
            <Box
              className="carousel-text"
              sx={{ flex: 1, padding: isTablet ? "1rem" : "2rem" }}
            >
              <Box className="carousel-meta">
                <Box
                  className="category"
                  sx={{
                    backgroundColor:
                      TAG_COLORS[data[currentIndex]?.type]?.bgColor,
                    color: "var(--dark)",
                    padding: "0.4rem 0.7rem",
                    textAlign: "center",
                    borderRadius: "5px",
                    fontSize: isTablet ? "0.8rem" : "0.95rem",
                  }}
                >
                  {data[currentIndex]?.type}
                </Box>
                <Typography
                  variant="body2"
                  sx={{ color: "#555", fontSize: isTablet ? "10px" : "14px" }}
                >
                  {dateTime}
                </Typography>
                <HorizontalRuleIcon />
                <VisibilityIcon fontSize={isTablet ? "10px" : "14px"} />
                <Typography
                  sx={{ color: "#555", fontSize: isTablet ? "10px" : "14px" }}
                >
                  {data[currentIndex]?.views}
                </Typography>
              </Box>
              <Typography
                variant={isTablet ? "h6" : "h4"}
                className="carousel-title"
                onClick={() =>
                  handleNavigate(
                    data[currentIndex]?.type,
                    data[currentIndex]?.id
                  )
                }
              >
                {data[currentIndex]?.title}
              </Typography>

              <Typography
                variant="body1"
                className="carousel-description"
                sx={{
                  fontSize: isTablet ? "0.9rem" : "1.1rem",
                  width: isMobile ? "250px" : isTablet ? "300px" : "350px",
                }}
              >
                {data[currentIndex]?.description}
              </Typography>
              <Box
                className="carousel-author"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Avatar
                  src={avatar}
                  alt={"Phuc Joseph"}
                  sx={{ width: isTablet ? 30 : 40, height: isTablet ? 30 : 40 }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  Phuc Joseph
                  {data[currentIndex]?.readingTime && (
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
                      <CircleIcon sx={{ fontSize: "0.45rem" }} />{" "}
                      {data[currentIndex]?.readingTime} to read
                    </Typography>
                  )}
                </Typography>
              </Box>
            </Box>
            <Box
              className="carousel-image"
              sx={{
                backgroundImage: `url(${data[currentIndex]?.thumbnail})`,
                height: isMobile ? "250px" : isTablet ? "300px" : "350px",
                width: isMobile ? "250px" : isTablet ? "300px" : "350px",
                backgroundSize: "cover",
                borderRadius: "10px",
                position: "relative",
              }}
            >
              {permit && (
                <MenuComponent
                  idPost={data[currentIndex].id}
                  options={options}
                  iconMenu={<MoreVertIcon />}
                />
              )}
            </Box>
          </Box>
        </Box>
        {!isTablet && !isSingleItem && (
          <IconButton
            className="carousel-btn right"
            onClick={nextSlide}
            disabled={currentIndex === data.length - 1}
          >
            <ChevronRightIcon fontSize="large" />
          </IconButton>
        )}
      </Box>
    )
  );
};

export default Carousel;
