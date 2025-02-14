import React, { Suspense, lazy, useEffect } from "react";
import {
  Route,
  Routes,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";

const HomePage = lazy(() => import("./pages/homePage"));
const BlogId = lazy(() => import("./pages/blogId"));
const Login = lazy(() => import("./pages/Auth/login"));

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
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route index element={<Login />} path="/login" />
      <Route element={<HomePage />} path="/home-page" />
      <Route element={<BlogId />} path="/:id" />
    </Routes>
  );
}

export default App;
