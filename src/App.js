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

      </Route>
    </Routes>
  );
}

export default App;
