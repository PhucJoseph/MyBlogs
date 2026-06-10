import React, { Suspense, lazy, useEffect } from "react";
import {
  Route,
  Routes,
  useNavigate,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";

import CustomToaster from "./components/Toast";

const LeftMenu = lazy(() => import("./components/LeftMenu/LeftMenu"));

function App() {
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

        {/* Layout for main app */}
        <Route element={
          <>
            <LeftMenu />
            <Outlet />
          </>
        }>
          <Route path="/" element={<>test a</>} />
          <Route path="/test" element={<>test b</>} />

        </Route>
      </Route>
    </Routes>
  );
}

export default App;
