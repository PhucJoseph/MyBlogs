import React, { useState, useEffect } from "react";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";
import { TAG_COLORS } from "../../constants/const";
import "./carousel.css";

const Carousel = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isMobile = useMediaQuery("(max-width:600px)");
  const isTablet = useMediaQuery("(max-width:900px)");
  const isSingleItem = data.length === 1;

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

  return (
    <Box
      className="carousel-container"
      sx={{ maxWidth: isTablet ? "90%" : "70%", margin: "auto" }}
    >
      {!isMobile && !isSingleItem && (
        <Button
          className="carousel-btn left"
          onClick={prevSlide}
          disabled={currentIndex === 0}
        >
          <ArrowBackIos />
        </Button>
      )}
      <Box className="carousel-slide fade">
        <Box
          className="carousel-content"
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "center",
          }}
        >
          <Box
            className="carousel-text"
            sx={{ flex: 1, padding: isMobile ? "1rem" : "2rem" }}
          >
            <Box className="carousel-meta">
              <Box
                className="category"
                sx={{
                  backgroundColor: TAG_COLORS[data[currentIndex]?.type]?.bgColor,
                  color: 'var(--dark)',
                  padding: "0.2rem 0.5rem",
                  borderRadius: "5px",
                  fontSize: isMobile ? "0.8rem" : "1rem" }}
              >
                {data[currentIndex]?.type}
              </Box>
              {/* <Typography variant="body2">{data[currentIndex].date}</Typography> */}
            </Box>
            <Typography
              variant={isMobile ? "h6" : "h4"}
              className="carousel-title"
            >
              {data[currentIndex]?.title}
            </Typography>
            <Typography
              variant="body1"
              className="carousel-description"
              sx={{ fontSize: isMobile ? "0.9rem" : "1.1rem" }}
            >
              {/* {data[currentIndex].description} */}
            </Typography>
            <Box
              className="carousel-author"
              sx={{ display: "flex", alignItems: "center" }}
            >
              {/* <Avatar src={data[currentIndex].avatar} alt={data[currentIndex].author} sx={{ width: isMobile ? 30 : 40, height: isMobile ? 30 : 40 }} /> */}
              {/* <Typography variant="body2" sx={{ marginLeft: '0.5rem' }}>{data[currentIndex].author} • {data[currentIndex].readingTime}</Typography> */}
            </Box>
          </Box>
          <Box
            className="carousel-image"
            sx={{
              backgroundImage: `url(${data[currentIndex]?.thumbnail})`,
              height: isMobile ? "250px" : isTablet ? "350px" : "400px",
              width: "100%",
              backgroundSize: "cover",
              borderRadius: "10px",
            }}
          />
        </Box>
      </Box>
      {!isMobile && !isSingleItem && (
        <Button
          className="carousel-btn right"
          onClick={nextSlide}
          disabled={currentIndex === data.length - 1}
        >
          <ArrowForwardIos />
        </Button>
      )}
    </Box>
  );
};

export default Carousel;
