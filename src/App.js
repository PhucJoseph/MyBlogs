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

const HomePage = lazy(() => import("./pages/TypeOfBlog"));
const BlogId = lazy(() => import("./pages/BlogId"));
const Login = lazy(() => import("./pages/Auth"));
const CreatePost = lazy(() => import("./pages/CreatePost"));
const EditPost = lazy(() => import("./pages/EditPost"));

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
            path="/:type"
          />
          <Route
            element={
              <Suspense fallback={<Loading />}>
                <BlogId />
              </Suspense>
            }
            path="/:type/:id"
          />
          <Route
            element={
              <Suspense fallback={<Loading />}>
                <CreatePost />
              </Suspense>
            }
            path="/create-post"
          />
          <Route
            element={
              <Suspense fallback={<Loading />}>
                <EditPost />
              </Suspense>
            }
            path="/edit-post/:id"
          />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
