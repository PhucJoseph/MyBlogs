import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import  BlogId  from "./pages/blogId";

function App() {
  

  return (
    <Routes>
      <Route element={<HomePage />} path="/"/>
      <Route element={<BlogId />} path="/:id"/>
    </Routes>
  );
}

export default App;
