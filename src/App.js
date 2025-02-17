import React, { Suspense, lazy, useEffect } from "react";
import {
  Route,
  Routes,
  useNavigate,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import CustomToaster from "./components/Toast";
import Loading from "./components/Loading";

const HomePage = lazy(() => import("./pages/Home"));
const BlogId = lazy(() => import("./pages/BlogId"));
const Login = lazy(() => import("./pages/Auth"));
const CreatePost = lazy(() => import("./pages/CreatePost"));

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
        <Route
          index
          element={
            <Suspense fallback={<Loading />}>
              <Login />
            </Suspense>
          }
          path="/login"
        />
        <Route
          element={
            <>
              <Navbar />
              <Outlet />
            </>
          }
        >
          <Route
            element={
              <Suspense fallback={<Loading />}>
                <HomePage />
              </Suspense>
            }
            path="/home-page"
          />
          <Route
            element={
              <Suspense fallback={<Loading />}>
                <BlogId />
              </Suspense>
            }
            path="/:id"
          />
          <Route
            element={
              <Suspense fallback={<Loading />}>
                <CreatePost />
              </Suspense>
            }
            path="/create-post"
          />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
