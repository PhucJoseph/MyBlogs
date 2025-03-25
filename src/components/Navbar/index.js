import React, { useEffect, useState } from "react";
import { getAllTypeOfBlogs } from "../../firebase/Blogs/blogs";
import toast from "react-hot-toast";
import Menu from "../Menu";
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
import { logout } from "../../firebase/Auth/authentication";
import { Avatar } from "@mui/material";
import avatar from "../../assets/image/avata.jpeg";
import LogoutIcon from "@mui/icons-material/Logout";
import CreateIcon from "@mui/icons-material/Create";

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

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleNavigateCreate = () => {
    navigate("/create-post");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let result = await getAllTypeOfBlogs();
        setNavItems(result);
      } catch (error) {
        toast.error("OOPS, Có lỗi rồi 〒▽〒");
      }
    };

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
              className={
                location.pathname === "/" + item.url
                  ? "active ListItemButton"
                  : "ListItemButton"
              }
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

  const options = [
    { name: "Create post", action: handleNavigateCreate, icon: <CreateIcon /> },
    { name: "Signout", action: handleLogout, icon: <LogoutIcon /> },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        component="nav"
        sx={{ backgroundColor: "transparent", padding: "30px 10vw", position:'absolute', zIndex: 1000 }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            className="Button"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon sx={{ width: 32, height: 32, color:'var(--dark)' }} />
          </IconButton>
          <Typography
            variant="h5"
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "block" },
              fontFamily: "Old Standard TT",
              fontWeight: "600",
              color: "var(--dark)",
            }}
          >
            PhucJoseph
          </Typography>
          <Box
            sx={{
              position: "absolute",
              left: "170px",
              display: { xs: "none", md: "block" },
            }}
          >
            {navItems.map((item) => (
              <Button
                onClick={() => handleNavigate(item.url)}
                key={item.id}
                sx={{ color: "var(--dark)" }}
                className={
                  location.pathname === "/" + item.url
                    ? "active Button"
                    : "Button"
                }
              >
                {item.name}
              </Button>
            ))}
          </Box>
          <Menu
            options={options}
            iconMenu={
              <Avatar
                alt="Phuc Joseph"
                src={avatar}
                sx={{ width: 56, height: 56 }}
              />
            }
          />
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
            display: { sm: "block", md: "none" },
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