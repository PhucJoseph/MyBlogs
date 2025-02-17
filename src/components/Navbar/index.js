import React, { useEffect, useState } from "react";
import { getAllTypeOfBlogs } from "../../firebase/Blogs/blogs";
import toast from "react-hot-toast";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css"; // Import your CSS file

const drawerWidth = 240;

export default function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [navItems, setNavItems] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const handleNavigate = (path) => {
    navigate("/" + path);
  };

  const fetchData = async () => {
    try {
      let result = await getAllTypeOfBlogs();
      const token = localStorage.getItem("token");
      if (token !== null) {
        result.push({ id: "0", name: "Create post", url: "create-post" });
      }
      setNavItems(result);
    } catch (error) {
      toast.error("OOPS, Có lỗi rồi 〒▽〒");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        textAlign: "center",
        backgroundColor: "var(--secondary-color)",
        height: "100%",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          paddingY: 2,
          fontFamily: "Old Standard TT",
          backgroundColor: "white",
        }}
      >
        PhucJoseph
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem
            onClick={() => handleNavigate(item.url)}
            key={item.id}
            disablePadding
          >
            <ListItemButton
              sx={{ textAlign: "center" }}
              className={location.pathname === "/" + item.url ? "active ListItemButton" : "ListItemButton"}
            >
              <Typography sx={{ color: "white", fontFamily: "Merienda" }}>
                {item.name}
              </Typography>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        component="nav"
        sx={{ backgroundColor: "var(--secondary-color)" }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            className="Button"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
              fontFamily: "Old Standard TT",
            }}
          >
            PhucJoseph
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button
                onClick={() => handleNavigate(item.url)}
                key={item.id}
                sx={{ color: "#fff", fontFamily: "Merienda" }}
                className={location.pathname === "/" + item.url ? "active Button" : "Button"}
              >
                {item.name}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Toolbar />
    </Box>
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};