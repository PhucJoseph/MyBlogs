import {
  Route,
  Routes,
  useNavigate,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";
import { useEffect } from "react";
import HomePage from "./pages/homePage";
import BlogId from "./pages/blogId";
import Login from "./pages/Auth/login";
import Navbar from "./components/Navbar";


import CustomToaster from "./components/Toast";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && location.pathname === "/login") {
      navigate("/home-page");
    } else if (!token && location.pathname === "/login") {
      navigate("/login");
    }
  }, [navigate, location.pathname]);

  return (
    <Routes>
      <Route
        element={
          <>
            <CustomToaster />
            <Outlet />
          </>
        }
      >
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route index element={<Login />} path="/login" />
        <Route
          element={
            <>
              <Navbar />
              <Outlet />
            </>
          }
        >
          <Route element={<HomePage />} path="/home-page" />
          <Route element={<BlogId />} path="/:id" />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
